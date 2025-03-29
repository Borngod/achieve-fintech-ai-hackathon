"use client";

import { useTransactionsStore } from "@/store/transactionsStore";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { useState, useCallback } from "react";

type Account = { name: string; id: string };
type Transaction = {
  _id: string;
  type: "debit" | "credit";
  amount: number;
  narration: string;
  date: string;
  currency: string;
};

const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

export default function LinkAccounts() {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [linkedAccounts, setLinkedAccounts] = useState<Account[]>([]);
  const [showTransactions, setShowTransactions] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    transactions,
    transformedData,
    setTransactions,
    setTransformedData,
    setCreditScore,
  } = useTransactionsStore();

  const openMonoWidget = useCallback(async () => {
    //@ts-ignore
    const MonoConnect = (await import("@mono.co/connect.js")).default;

    const monoInstance = new MonoConnect({
      key: process.env.NEXT_PUBLIC_MONO_PUBLIC_KEY,
      onClose: () => console.log("Widget closed"),
      onLoad: () => setScriptLoaded(true),
      onSuccess: async ({ code }: any) => {
        try {
          const response = await fetch("/api/link-account", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
          });
          const data = await response.json();
          if (data.accountId) {
            setLinkedAccounts((prev) => [
              ...prev,
              { name: "Linked Account", id: data.accountId },
            ]);
          }
        } catch (error) {
          console.error("Error linking account:", error);
        }
      },
    });

    monoInstance.setup();
    monoInstance.open();
  }, []);

  const fetchTransactions = useCallback(
    async (accountId: string) => {
      setLoading(true);
      try {
        // Fetch transaction data
        const response = await fetch(`/api/transactions/${accountId}`);
        const data = await response.json();
        setTransactions(data);

        // Transform transaction data
        const transformed = {
          transactionDates: data.map((t: Transaction) => t.date),
          sendReceive: data.map((t: Transaction) => (t.type === "debit" ? 1 : 0)),
          frequency: data.length / 1, // Simplified; adjust based on date range
          totalAmountSent: data
            .filter((t: Transaction) => t.type === "debit")
            .reduce((sum: number, t: Transaction) => sum + t.amount / 100, 0),
          totalAmountReceived: data
            .filter((t: Transaction) => t.type === "credit")
            .reduce((sum: number, t: Transaction) => sum + t.amount / 100, 0),
          numberOfSendsToUserX: data.filter(
            (t: Transaction) => t.type === "debit" && t.narration.includes("user_x_id")
          ).length,
        };
        setTransformedData(transformed);

        // Prepare prompt for Claude
        const prompt = `
Given a user’s transaction data:
- Transaction Dates: [${transformed.transactionDates.join(", ")}]
- Send/Receive: [${transformed.sendReceive.join(", ")}]
- Frequency: ${transformed.frequency} transactions/week
- Total Amount Sent: ${transformed.totalAmountSent} GHS
- Total Amount Received: ${transformed.totalAmountReceived} GHS
- Number of Sends to User X: ${transformed.numberOfSendsToUserX}

Using a Bayesian Network, Gradient Boosting, HMM, and Isolation Forest:
1. Calculate the repayment probability (0–1).
2. Detect gaming (e.g., back-and-forth sends).
3. Ensure fairness across user groups.
4. Map to a 300–850 score with categories: Poor (300–579), Fair (580–669), Good (670–739), Very Good (740–799), Excellent (800–850).
5. Provide a transparent explanation (e.g., ‘High sends to one user lowered your score’).

Return in JSON format: { "score": number, "category": string, "confidenceRange": [number, number], "explanation": string }
`;

        // Call Claude via server-side proxy
        const claudeResponse = await fetch("/api/claude", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
          });
        if (!claudeResponse.ok) {
            const errorText = await claudeResponse.text();
            throw new Error(`Claude API request failed: ${claudeResponse.status} - ${errorText}`);
          }
      
          const claudeData = await claudeResponse.json();
          console.log("Claude raw response:", claudeData.response);
          const result = JSON.parse(claudeData.response);
        setCreditScore({
          score: result.score,
          category: result.category,
          confidenceRange: result.confidenceRange,
          explanation: result.explanation,
        });
      } catch (error) {
        console.error("Error fetching transactions or computing score:", error);
        setCreditScore(null); // Reset on error
      }
      setLoading(false);
    },
    [setTransactions, setTransformedData, setCreditScore]
  );

  const handleActionsClick = (account: Account) => {
    setSelectedAccount(account);
    setShowBottomSheet(true);
  };

  const handleViewTransactions = (account: Account) => {
    setSelectedAccount(account);
    setShowBottomSheet(false);
    fetchTransactions(account.id);
    setShowTransactions(true);
  };

  return (
    <div className="p-4 min-h-screen">
      {!showTransactions ? (
        <>
          <button
            className="mb-2 text-gray-700 font-semibold flex items-center"
            onClick={() => window.history.back()}
          >
            <ChevronLeft size={28} className="mr-2" />
          </button>

          <h2 className="text-xl font-semibold mt-4">Manage External Accounts</h2>
          <p className="text-gray-600 text-sm mb-6 mt-4">
            Add and remove external accounts to enable faster and instant Unbanked scoring.
          </p>

          <button onClick={() => openMonoWidget()} className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4">
            + Add Account
          </button>

          {linkedAccounts.length > 0 && (
            <div className="mt-4">
              {linkedAccounts.map((account, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-gray-100 p-3 rounded-md flex justify-between items-center mb-2"
                >
                  <p className="text-base font-medium">{account.name}</p>
                  <button
                    className="border border-gray-300 rounded-md px-2 py-1 flex items-center gap-1 text-gray-700"
                    onClick={() => handleActionsClick(account)}
                  >
                    Actions <ChevronDown size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-4">
            <button
              className="text-gray-700 font-semibold flex items-center"
              onClick={() => setShowTransactions(false)}
            >
              <ChevronLeft size={28} className="mr-2" /> Back to Accounts
            </button>
          </div>

          <h3 className="text-lg font-semibold mb-4">{selectedAccount?.name} Transactions</h3>
          {loading ? (
            <p className="text-gray-600">Loading transactions...</p>
          ) : transactions.length > 0 ? (
            <div className="flex-1 overflow-y-auto">
              {transformedData && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg mb-4">
                  <h4 className="text-md font-semibold mb-2">Transaction Summary</h4>
                  <p>Total Sent: GHS {transformedData.totalAmountSent.toFixed(2)}</p>
                  <p>Total Received: GHS {transformedData.totalAmountReceived.toFixed(2)}</p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction._id}
                    className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">
                        {truncateText(transaction.narration, 15)}
                      </span>
                      <span
                        className={`font-semibold whitespace-nowrap ${
                          transaction.type === "debit" ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {transaction.type === "debit" ? "- " : "+ "}
                        GHS {(transaction.amount / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No transactions found.</p>
          )}
        </div>
      )}

      {showBottomSheet && selectedAccount && (
        <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg border-t rounded-t-lg">
          <button
            className="absolute top-2 right-2 text-black font-bold text-lg"
            onClick={() => setShowBottomSheet(false)}
          >
            ✕
          </button>
          <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
          <button
            className="w-full text-left py-2 flex justify-between items-center"
            onClick={() => handleViewTransactions(selectedAccount)}
          >
            View Account Transactions <ChevronDown size={16} />
          </button>
          <button className="w-full text-left py-2 flex justify-between items-center text-red-600">
            Remove Account <ChevronDown size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
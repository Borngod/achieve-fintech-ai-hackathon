"use client";

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

export default function LinkAccounts() {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [linkedAccounts, setLinkedAccounts] = useState<Account[]>([]);
  const [showTransactions, setShowTransactions] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const openMonoWidget = useCallback(async () => {
        // @ts-ignore
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
              { name: "Linked Account", id: data.accountId }, // You could fetch account name separately
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

  const fetchTransactions = useCallback(async (accountId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/transactions/${accountId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
    setLoading(false);
  }, []);

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
    <div className="p-4">
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

      {!showTransactions && linkedAccounts.length > 0 && (
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

      {showTransactions && selectedAccount && (
        <div className="mt-4">
          <button
            className="mb-4 text-gray-700 font-semibold flex items-center"
            onClick={() => setShowTransactions(false)}
          >
            <ChevronLeft size={28} className="mr-2" /> Back to Accounts
          </button>
          <h3 className="text-lg font-semibold mb-4">{selectedAccount.name} Transactions</h3>
          {loading ? (
            <p>Loading transactions...</p>
          ) : transactions.length > 0 ? (
            <div className="space-y-2">
              {transactions.map((transaction) => (
                <div key={transaction._id} className="border border-gray-300 p-3 rounded-md">
                  <div className="flex justify-between">
                    <span>{transaction.narration}</span>
                    <span className={transaction.type === "debit" ? "text-red-600" : "text-green-600"}>
                      {transaction.type === "debit" ? "-" : "+"}
                      {(transaction.amount / 100).toFixed(2)} {transaction.currency}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(transaction.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No transactions found.</p>
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
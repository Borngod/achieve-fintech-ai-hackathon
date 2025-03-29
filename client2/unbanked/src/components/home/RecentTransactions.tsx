"use client";
import Image from "next/image";

const RecentTransactions = () => {
  // Sample transaction data (replace with real data from your app/store)
  const transactions = [
    {
      id: 1,
      profilePic: "/unbanked.png", // Placeholder image path
      receiverName: "John Doe",
      purpose: "Food Payment",
      status: "Sent",
      amount: "300.00",
      date: "2025-03-12T14:30:00Z",
    },
    {
      id: 2,
      profilePic: "/female.png",
      receiverName: "Jane Smith",
      purpose: "Salary",
      status: "Received",
      amount: "500.00",
      date: "2025-03-11T09:15:00Z",
    },
  ];

  // Format date and time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }); // e.g., "12 Mar 2025, 14:30"
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#250537]">
          Recent Transactions
        </h2>
        <button className="text-sm text-[#1266D4] font-medium">See All</button>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {transactions.map((txn, index) => {
          const [mainAmount, decimalPart] = txn.amount.split(".");
          const isSent = txn.status === "Sent";
          const sign = isSent ? "-" : "+";
          const statusColor = isSent ? "text-[#EF4444]" : "text-[#10B981]";

          return (
            <div
              key={txn.id}
              className={`flex justify-between items-center ${
                index < transactions.length - 1 ? "border-b border-gray-200 pb-4" : ""
              }`}
            >
              {/* Left: Profile Pic + Names */}
              <div className="flex items-center gap-3">
                <Image
                  src={txn.profilePic}
                  alt={`${txn.receiverName}'s profile`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#250537]">
                    {txn.receiverName}
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    {txn.status}
                  </span>
                </div>
              </div>

              {/* Right: Status + Amount + Date */}
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-baseline">
                  <span className="text-base font-semibold text-[#250537]">
                    {sign} GHS {mainAmount}
                  </span>
                  {decimalPart && (
                    <span className="text-sm font-medium text-[#250537]">
                      .{decimalPart}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {formatDate(txn.date)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentTransactions;
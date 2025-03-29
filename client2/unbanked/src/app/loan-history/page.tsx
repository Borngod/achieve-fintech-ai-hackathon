"use client";

import { MoreVertical, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

const loans = [
  {
    type: "Processed loan",
    amount: "GHS 500.00",
    status: "Processed",
    color: "border-green-500 text-green-600",
    hasOptions: true,
  },
  {
    type: "Educational loan",
    amount: "GHS 500.00",
    status: "Overdue",
    color: "border-red-500 text-red-600",
    hasOptions: true,
  },
  {
    type: "Educational loan",
    amount: "GHS 500.00",
    status: "Settled",
    color: "border-blue-500 text-blue-600",
    hasOptions: false,
  },
];

export default function LoanHistory() {
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  return (
    <div className="p-4">
      {/* Back Button */}
      <button className="mb-2 text-gray-700 font-semibold flex items-center" onClick={() => window.history.back()}>
        <ChevronLeft size={28} />
      </button>

      <h2 className="text-xl font-semibold mt-4">Recent Loans</h2>
      <p className="text-gray-600 text-sm mb-4">
        Manage your recent Unbanked loans. View, approve, or cancel with ease.
      </p>

      {/* Loan List */}
      {loans.map((loan, index) => (
        <div key={index} className="mb-4">
          {/* Loan Row Header */}
          {index === 0 && (
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">{loan.type}</h3>
              {loan.hasOptions && <MoreVertical className="cursor-pointer" />}
            </div>
          )}

          {/* Loan Card */}
          <div className={`border-l-4 ${loan.color} bg-gray-100 p-3 rounded-md flex justify-between items-center`}>
            <div>
              <p className="text-base font-medium">{loan.type}</p>
              <p className="text-gray-700">{loan.amount}</p>
              <p className={`font-semibold ${loan.color}`}>{loan.status}</p>
            </div>
            {loan.status === "Overdue" && (
              <button
                className="border border-gray-300 rounded-md px-2 py-1 flex items-center gap-1 text-gray-700"
                onClick={() => setShowBottomSheet(true)}
              >
                Actions <ChevronDown size={16} />
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Bottom Sheet */}
      {showBottomSheet && (
        <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg border-t rounded-t-lg">
          <button
            className="absolute top-2 right-2 text-black font-bold text-lg"
            onClick={() => setShowBottomSheet(false)}
          >
            ✕
          </button>
          <h3 className="text-lg font-semibold mb-4">Loan Actions</h3>
          <button className="w-full text-left py-2 flex justify-between items-center">
            Settle Loan <ChevronRight size={16} />
          </button>
          <button className="w-full text-left py-2 flex justify-between items-center">
            View Loan Agreement <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

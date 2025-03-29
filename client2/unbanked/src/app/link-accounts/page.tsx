"use client";

import { ChevronLeft, ChevronDown } from "lucide-react";
import { useState } from "react";

const linkedAccounts = [
  { name: "Bank of Africa" },
  { name: "MTN Mobile Money" },
];

export default function LinkAccounts() {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleActionsClick = (account: any) => {
    setSelectedAccount(account);
    setShowBottomSheet(true);
  };

  return (
    <div className="p-4">
      {/* Back Button */}
      <button className="mb-2 text-gray-700 font-semibold flex items-center" onClick={() => window.history.back()}>
        <ChevronLeft size={28} className="mr-2" />
      </button>

      <h2 className="text-xl font-semibold mt-4">Manage External Accounts</h2>
      <p className="text-gray-600 text-sm mb-6 mt-4">
        Add and remove external accounts to enable faster and instant Unbanked scoring.
      </p>

      {/* Add Account Button */}
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4">+ Add Account</button>

      {/* Linked Accounts */}
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

      {/* Bottom Sheet */}
      {showBottomSheet && (
        <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg border-t rounded-t-lg">
          <button
            className="absolute top-2 right-2 text-black font-bold text-lg"
            onClick={() => setShowBottomSheet(false)}
          >
            ✕
          </button>
          <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
          <button className="w-full text-left py-2 flex justify-between items-center">
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
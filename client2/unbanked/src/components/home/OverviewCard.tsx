"use client";
import {
  Send,
  Plus,
  Wallet,
  CreditCard,
  DollarSign,
} from "lucide-react";

const OverviewCard = () => {
  // Sample data (replace with real data from your app/store)
  const balance = "500.00"; // Example balance
  const score = "85"; // Example unbanked score

  // Split balance into main amount and decimal part
  const [mainAmount, decimalPart] = balance.split(".");

  return (
    <div
      className="p-5 rounded-xl text-white mt-6 bg-gradient-to-br from-[rgba(10,53,110,1)] to-[rgba(19,103,212,1)]"
    
    >
      {/* First Row */}
      <div className="flex justify-between items-start mb-6">
        {/* Left: Balance */}
        <div className="flex flex-col">
          <span className="text-xs font-medium">Available Balance</span>
          <div className="flex items-baseline">
            <span className="text-2xl font-semibold">GHS {mainAmount}</span>
            {decimalPart && (
              <span className="text-lg font-medium">.{decimalPart}</span>
            )}
          </div>
        </div>

        {/* Right: Score */}
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#A3CFFA]">
          <span className="text-lg font-bold text-white">{score}</span>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-5 gap-2">
        {/* Send */}
        <div className="flex flex-col items-center">
          <div className="p-2 bg-white rounded-full">
            <Send className="h-5 w-5 text-[#1266D4]" />
          </div>
          <span className="text-xs mt-1">Send</span>
        </div>

        {/* Add */}
        <div className="flex flex-col items-center">
          <div className="p-2 bg-white rounded-full">
            <Plus className="h-5 w-5 text-[#1266D4]" />
          </div>
          <span className="text-xs mt-1">Add</span>
        </div>

        {/* Wallet */}
        <div className="flex flex-col items-center">
          <div className="p-2 bg-white rounded-full">
            <Wallet className="h-5 w-5 text-[#1266D4]" />
          </div>
          <span className="text-xs mt-1">Wallet</span>
        </div>

        {/* Top-Up */}
        <div className="flex flex-col items-center">
          <div className="p-2 bg-white rounded-full">
            <CreditCard className="h-5 w-5 text-[#1266D4]" />
          </div>
          <span className="text-xs mt-1">Top-Up</span>
        </div>

        {/* Loan */}
        <div className="flex flex-col items-center">
          <div className="p-2 bg-white rounded-full">
            <DollarSign className="h-5 w-5 text-[#1266D4]" />
          </div>
          <span className="text-xs mt-1">Loan</span>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
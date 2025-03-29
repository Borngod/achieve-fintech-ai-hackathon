"use client";
import {
  Send,
  Plus,
  Wallet,
  CreditCard,
  DollarSign,
} from "lucide-react";
import CreditScore from "./credit-score";

const OverviewCard = () => {
  // Sample data (replace with real data from your app/store)
  const balance = "500.00"; // Example balance
 

  const currentScore = 0; 
  const totalScore = 850;

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
          <span className="text-xs ">Available Balance</span>
          <div className="flex items-baseline">
            <span className="mt-2  font-semibold text-white text-[34.7px] tracking-[0] leading-normal">GHS {mainAmount}</span>
            {decimalPart && (
              <span className="text-lg font-[500] text-[22.7px]">.{decimalPart}</span>
            )}
          </div>
        </div>

        {/* Right: Score */}
        <CreditScore totalScore={totalScore} currentScore={currentScore}/>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-5 gap-2">
        {/* Send */}
        <div className="flex flex-col items-center">
          <div className="p-2 bg-[rgba(37, 118, 225, 0.50)] rounded-full shadow-md shadow-black/45">
            <Send className="h-5 w-5 text-white" />
          </div>
          <span className="text-xs mt-1">Send</span>
        </div>

        {/* Add */}
        <div className="flex flex-col items-center">
          <div className="p-2 bg-[rgba(37, 118, 225, 0.50)] rounded-full shadow-md shadow-black/45">
            <Plus className="h-5 w-5 text-white" />
          </div>
          <span className="text-xs mt-1">Add</span>
        </div>

        {/* Wallet */}
        <div className="flex flex-col items-center">
          <div className="p-2 bg-[rgba(37, 118, 225, 0.50)] rounded-full shadow-md shadow-black/45">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <span className="text-xs mt-1">Wallet</span>
        </div>

        {/* Top-Up */}
        <div className="flex flex-col items-center">
          <div className="p-2 bg-[rgba(37, 118, 225, 0.50)] rounded-full shadow-md shadow-black/45">
            <CreditCard className="h-5 w-5 text-white" />
          </div>
          <span className="text-xs mt-1">Top-Up</span>
        </div>

        {/* Loan */}
        <div className="flex flex-col items-center">
          <div className="p-2 bg-[rgba(37, 118, 225, 0.50)] rounded-full shadow-md shadow-black/45">
            <DollarSign className="h-5 w-5 text-white" />
          </div>
          <span className="text-xs mt-1">Loan</span>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
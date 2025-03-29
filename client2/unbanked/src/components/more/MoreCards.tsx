"use client";

import { useRouter } from "next/navigation";
import { User, CreditCard, Link, History, HelpCircle, Settings } from "lucide-react";

const cards = [
  { label: "Profile", icon: User, active: false, path: "/profile" },
  { label: "Financial Summary", icon: CreditCard, active: false, path: "/financial-summary" },
  { label: "Link Accounts", icon: Link, active: true, path: "/link-accounts" },
  { label: "Loan History", icon: History, active: true, path: "/loan-history" },
  { label: "Help & Support", icon: HelpCircle, active: false, path: "/help-support" },
  { label: "Settings", icon: Settings, active: false, path: "/settings" },
];

export default function DashboardCards() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 gap-4 p-4 mt-10">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`border rounded-[10px] px-5 py-5 cursor-pointer transition-colors ${
            card.active ? "text-black border-black" : "text-gray-400 border-gray-300 cursor-not-allowed"
          }`}
          onClick={() => card.active && router.push(card.path)}
        >
          <card.icon size={32} />
          <p className="mt-2 text-sm font-medium">{card.label}</p>
        </div>
      ))}
    </div>
  );
}

"use client";
import { useRouter, usePathname } from "next/navigation";
import { Home as HomeIcon, DollarSign, MoreHorizontal, Bot } from "lucide-react";
import Header from "@/components/ui/Header";
import OverviewCard from "@/components/home/OverviewCard";
import RecentTransactions from "@/components/home/RecentTransactions";

const Home = () => {
    const router = useRouter();
    const pathname = usePathname(); // Get the current route

    // Navigation handler
    const navigateTo = (path: string) => {
        router.push(path);
    };
    const handleChatClick = () => {
        alert("AI Chat feature coming soon!"); // Replace with actual chat logic
      };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="px-5">
                <Header />
                
                <OverviewCard />
                <RecentTransactions />
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16">
                {/* Home Icon */}
                <button
                    onClick={() => navigateTo("/home")}
                    className="p-2 focus:outline-none"
                >
                    <HomeIcon
                        className={`h-6 w-6 ${pathname === "/home"
                            ? "text-[#1266d4] fill-[#1266d4]"
                            : "text-gray-500"}`}
                    />
                </button>

                {/* Loans Icon */}
                <button
                    onClick={() => navigateTo("/loans")}
                    className="p-2 focus:outline-none"
                >
                    <DollarSign
                        className={`h-6 w-6 ${pathname === "/loans"
                            ? "text-[#1266d4] fill-[#1266d4]"
                            : "text-gray-500"}`}
                    />
                </button>

                {/* More Icon */}
                <button
                    onClick={() => navigateTo("/more")}
                    className="p-2 focus:outline-none"
                >
                    <MoreHorizontal
                        className={`h-6 w-6 ${pathname === "/more"
                            ? "text-[#1266d4] fill-[#1266d4]"
                            : "text-gray-500"}`}
                    />
                </button>
            </div>

            <button
        onClick={handleChatClick}
        className="fixed bottom-20 right-4 p-4 bg-[#1266D4] rounded-full shadow-lg focus:outline-none hover:bg-[#0D5BBF]"
      >
        <Bot className="h-6 w-6 text-white" />
      </button>
        </div>
    );
};

export default Home;

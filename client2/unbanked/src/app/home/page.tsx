"use client";
import {
    Home as HomeIcon,
    DollarSign,
    MoreHorizontal,
    Bot
} from "lucide-react";
import Header from "@/components/ui/Header";
import OverviewCard from "@/components/home/OverviewCard";
import RecentTransactions from "@/components/home/RecentTransactions";
import ConnectAccount from "@/components/home/connect-account";
import BottomNavigation from "@/components/navigation/bottom-navigation";

const Home = () => {
    const handleChatClick = () => {
        alert("AI Chat feature coming soon!"); // Replace with actual chat logic
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="">
                <ConnectAccount />
                <div className="pt-2">
                    <Header />
                </div>
                <div className="pt-2 px-3">
                    <OverviewCard />
                </div>

                <RecentTransactions />
            </div>

            {/* Bottom Navigation */}
            <BottomNavigation />

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

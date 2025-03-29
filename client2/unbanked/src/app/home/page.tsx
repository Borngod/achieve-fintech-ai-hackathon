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
import Chatbot from "@/components/chatbot/bot";

const Home = () => {
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
            <Chatbot />

            {/* Bottom Navigation */}
            <BottomNavigation />
        </div>
    );
};

export default Home;

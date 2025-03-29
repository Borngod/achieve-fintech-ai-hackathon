"use client";
import { useRouter, usePathname } from "next/navigation";
import { Home as HomeIcon, DollarSign, MoreHorizontal } from "lucide-react";
import DashboardCards from "@/components/more/MoreCards";
import BottomNavigation from "@/components/navigation/bottom-navigation";

const More = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Main Content */}
      <DashboardCards />
      <BottomNavigation />
    </div>
  );
};

export default More;
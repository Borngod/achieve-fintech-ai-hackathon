"use client";
import { User, BarChart2, Bell } from "lucide-react";
import useStoreLogin from "@/store"; // Adjust path to your Zustand store

const Header = () => {
  const { name } = useStoreLogin(); // Get user's name from Zustand store

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-[#CDDEF4]">
      {/* Left Section: User Icon + Greeting + Name */}
      <div className="flex items-center gap-3">
        {/* User Icon */}
        <div className="p-2 bg-white rounded-full">
          <User className="h-6 w-6 text-[#1367D4]" />
        </div>

        {/* Vertical Texts */}
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 font-medium">Hello</span>
          <span className="text-lg font-bold text-[#250537]">
            {name || "Guest"} {/* Fallback to "Guest" if name is empty */}
          </span>
        </div>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center gap-3">
        {/* Analytics/Progress Icon */}
        <div className="p-2 bg-white rounded-full">
          <BarChart2 className="h-6 w-6 text-[#1367D4]" />
        </div>

        {/* Bell Icon */}
        <div className="p-2 bg-white rounded-full">
          <Bell className="h-6 w-6 text-[#1367D4]" />
        </div>
      </div>
    </header>
  );
};

export default Header;
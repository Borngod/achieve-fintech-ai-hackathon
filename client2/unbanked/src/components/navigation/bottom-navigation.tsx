"use client";
import { CreditCard, DollarSign, HomeIcon, MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const BottomNavigation = () => {
    const router = useRouter();
    const pathname = usePathname(); // Get the current route

    // Navigation handler
    const navigateTo = (path:any) => {
        router.push(path);
    };
    
    return (
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
                <CreditCard
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
    );
}

export default BottomNavigation;
"use client";
import { useRouter, usePathname } from "next/navigation";
import { Home as HomeIcon, DollarSign, MoreHorizontal } from "lucide-react";

const Loans = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-[#250537]">
          This is the Loans page
        </h1>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16">
        <button onClick={() => navigateTo("/home")} className="p-2 focus:outline-none">
          <HomeIcon
            className={`h-6 w-6 ${
              pathname === "/home" ? "text-[#1266d4] fill-[#1266d4]" : "text-gray-500"
            }`}
          />
        </button>
        <button onClick={() => navigateTo("/loans")} className="p-2 focus:outline-none">
          <DollarSign
            className={`h-6 w-6 ${
              pathname === "/loans" ? "text-[#1266d4] fill-[#1266d4]" : "text-gray-500"
            }`}
          />
        </button>
        <button onClick={() => navigateTo("/more")} className="p-2 focus:outline-none">
          <MoreHorizontal
            className={`h-6 w-6 ${
              pathname === "/more" ? "text-[#1266d4] fill-[#1266d4]" : "text-gray-500"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default Loans;
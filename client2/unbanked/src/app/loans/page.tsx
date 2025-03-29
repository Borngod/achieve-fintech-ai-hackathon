"use client";
import { useRouter, usePathname } from "next/navigation";
import { Home as HomeIcon, DollarSign, MoreHorizontal } from "lucide-react";
import ConnectAccount from "@/components/home/connect-account";
import Header from "@/components/ui/Header";
import LoanOverview from "@/components/loan/loan-overview";
import BottomNavigation from "@/components/navigation/bottom-navigation";
import FinancialCard from "@/components/loan/financial-success";
import LoanTypes from "@/components/loan/loan-types";

const Loans = () => {


  return (
    <>
      <ConnectAccount />
            <div className="pt-2 h-screen ">
                    <Header />
                    <div className="pt-5 px-4">
                       <LoanOverview/>
                    </div>
                    <div className="pt-5 px-4">
                      <FinancialCard/>
                    </div>
                    <div className="pt-5 px-4">
                      <LoanTypes/>
                    </div>
                   
            </div>
           
            <BottomNavigation/>

          
    </>
  );
};

export default Loans;
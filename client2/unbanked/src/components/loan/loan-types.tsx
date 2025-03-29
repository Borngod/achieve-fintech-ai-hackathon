import { Card, CardContent } from "@/components/ui/card";
import { Asterisk, Briefcase, GraduationCap, Heart, Home } from "lucide-react";
import React from "react";

export default function LoanTypes() {
    const loans = [
        {
            title: "Educational Loan",
            description: "School, Exams, Books",
            bgColor: "bg-[#4a90e2]",
            icon: <GraduationCap className="h-6 w-6 text-[#1053A2]" />,
            iconBg: true
        },
        {
            title: "Healthcare Loan",
            description: "Bills, Medicine, Maternity",
            bgColor: "bg-[#d0021b]",
            icon: <Heart className="h-6 w-6 text-[#890616]" />,
            iconBg: true
        },
        {
            title: "Business Loan",
            description: "Micro-Business, Farming, Freelancers",
            bgColor: "bg-[#f5a623]",
            icon: <Briefcase className="h-6 w-6 text-[#B27105]" />,
            iconBg: true
        },
        {
            title: "Emergency Loan",
            description: "Home Repairs, Funerals, Disasters",
            bgColor: "bg-[#9013fe]",
            icon: <Asterisk className="h-6 w-6 text-[#6104B2]" />,
            iconBg: true
        }
    ];

    return (
        <section className="flex flex-col gap-3 overflow-y-auto">
            <h2 className="font-semibold text-[19px] text-[#250537]">
                Active loans
            </h2>

            {loans.map((loan, index) =>
                <Card
                    key={index}
                    className={`${loan.bgColor} rounded-[20px] p-0 border-none shadow-none `}
                >
                    <CardContent className="p-2.5 flex items-center gap-2.5">
                        {loan.iconBg
                            ? <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ffffff99]">
                                  {loan.icon}
                              </div>
                            : <div className="w-10 h-10 flex items-center justify-center">
                                  {loan.icon}
                              </div>}

                        <div className="flex flex-col gap-[3px] w-[219px]">
                            <h3 className="text-xl font-bold text-white leading-[24.4px] ">
                                {loan.title}
                            </h3>
                            <p className="text-[10px] font-[300] text-[#ffffffcc] leading-[12.2px]">
                                {loan.description}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </section>
    );
}

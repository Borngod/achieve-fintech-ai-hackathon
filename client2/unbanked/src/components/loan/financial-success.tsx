import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, HandCoins } from "lucide-react";
import React from "react";

const FinancialCard = () => {
    return (
        <div className="flex flex-col items-start gap-3">
            <h2
                className="self-stretch font-semibold text-[#250537] text-[19px]"
            
            >
                Empower your financial success
            </h2>

            <div className="flex items-center  relative w-full gap-4">
                <Card className="w-[200px] bg-[#1266d4] rounded-[10px] border-none overflow-hidden p-0">
                    <CardContent className="flex flex-col items-start justify-center gap-2.5 p-2.5 pt-5 pb-5">
                        <div className="flex items-center gap-10 w-full">
                            <div className="inline-flex items-end gap-[5px]">
                                <CreditCard className="w-[25px] h-[25px] text-white" />
                                <div
                                    className="w-fit text-[#ffffffcc] text-[10px] leading-[12.2px]"
                                >
                                    unBanked
                                    <br />
                                    score
                                </div>
                            </div>
                        </div>

                        <div className="flex w-[115px] items-end gap-[3.03px]">
                            <div
                                className="w-fit mt-[-1.51px] text-white text-[33.3px] font-[500]"
                            >
                                456
                            </div>
                            <div
                                className="w-[48.42px] h-[33.29px] text-white text-[21.2px]"
                            >
                                /850
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="w-[200px] h-[116px] bg-[#a8ab0d] rounded-[10px] border-none overflow-hidden p-0">
                    <CardContent className="flex flex-col items-start justify-center gap-2.5 p-2.5 pt-5 pb-5">
                        <div className="flex items-center gap-10 w-full mt-[-1.50px]">
                            <div className="inline-flex items-end gap-[5px]">
                                <HandCoins className="w-[25px] h-[25px] text-white" />
                                <div
                                    className="w-fit text-[#ffffffcc] text-[10px] leading-[12.2px]"
                                >
                                    Loan
                                    <br />
                                    Application
                                </div>
                            </div>
                        </div>

                        <div
                            className="w-[115px] mb-[-0.50px] text-white text-lg leading-[21.9px] font-[500]"
                        >
                            Apply for
                            <br />a Microloan
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default FinancialCard;

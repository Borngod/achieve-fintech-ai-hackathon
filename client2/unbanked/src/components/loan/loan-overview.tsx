import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function LoanOverview() {
    return (
        <Card className="w-full rounded-[15px] overflow-hidden border-0 [background:linear-gradient(216deg,rgba(10,53,110,1)_0%,rgba(19,103,212,1)_100%)]">
            <CardContent className="p-6">
                <div className="flex items-start justify-between w-full">
                    <div className="flex flex-col items-start gap-1">
                        <span className="font-medium text-[#ffffffcc] text-[12px]">
                            Outstanding loan balance
                        </span>

                        <div className="flex items-center justify-center" >
                            <span className="font-semibold text-white text-[32.7px] leading-normal">
                                GHS 1,500
                            </span>
                            <span className="font-normal text-[#ffffffcc] text-[19px] relative leading-normal mt-4">
                                .00
                            </span>
                        </div>

                        <Button
                          
                            className="mt-1 h-auto px-2.5 py-1 rounded-2xl bg-white text-[#1266d4] text-[14px] font-medium  border-[#a3a1a2]"
                        >
                            Settle loan
                        </Button>
                    </div>

                    <Badge className="bg-[#2576e180] text-white text-[10px] px-1.5 py-[3px] rounded-[15px] font-medium ">
                        21 days left
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
}


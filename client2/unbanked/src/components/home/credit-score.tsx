import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default function CreditScore({totalScore, currentScore}: {totalScore: number, currentScore: number}) {
  return (
    <Card className="inline-flex p-0 bg-[#2576e180] rounded-[15px] border-none shadow-none">
      <CardContent className="flex items-end gap-px p-[3px] pl-1.5 pr-1.5">
        <span className="font-semibold text-white text-[16px] leading-normal">
         {currentScore}
        </span>
        <span className="text-white text-[12px] leading-normal">
          / {totalScore}
        </span>
      </CardContent>
    </Card>
  );
}
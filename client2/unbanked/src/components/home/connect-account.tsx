import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import React from "react";

export default function ConnectAccount() {
  return (
    <Button
      className="flex w-full  h-[57px] items-center justify-between px-6 py-0 bg-[#1266d4] rounded-none hover:bg-[#1266d4]/90"
    >
      <span className="font-medium text-white text-sm ml-3">
        Connect Account
      </span>
      <ChevronRight className="w-5 h-5 text-white" />
    </Button>
  );
}
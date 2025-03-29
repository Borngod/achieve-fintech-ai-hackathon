"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bot, BotMessageSquare, ChevronLeft, Lightbulb, Mic } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

export default function Chat() {
    // Data for service cards
    const serviceCards = [
        {
            icon: "hand-withdraw",
            label: "Loan",
            title: "Get a Loan"
        },
        {
            icon: "lightbulb",
            label: "Advice",
            title: "Financial advice"
        }
    ];

    // Router for navigation
    const router = useRouter();

    const Backtohome = () => {
        // Redirect to the home page
        router.push("/home");
    };

    return (
        <div className="bg-white flex flex-row justify-center w-full">
            <div className="bg-white w-[393px] h-[852px] relative">
                {/* Header */}
                <div className="absolute w-[393px] h-[83px] top-px left-0">
                    <div className="flex w-[357px] items-center justify-between relative top-[46px] left-[18px]">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="p-0 h-[22px] w-[22px]"
                            onClick={() => Backtohome()}
                        >
                            <ChevronLeft className="h-[22px] w-[22px] text-[#250537]" />
                        </Button>
                        <div className="relative w-fit font-semibold text-[#250537] text-xl tracking-[0] leading-[normal] whitespace-nowrap">
                            unBanked AI
                        </div>
                        <div className="w-[22px]" />{" "}
                        {/* Spacer for alignment */}
                    </div>
                </div>

                {/* Home Indicator */}
                <div className="absolute w-[393px] h-3.5 top-[838px] left-0 flex justify-center">
                    <div className="w-[134px] h-[5px] bg-gray-300 rounded-full" />
                </div>

                {/* Main Heading */}
                <div className="absolute w-[359px] h-[98px] top-[161px] left-[18px]">
                    <div className="relative w-[357px] h-[98px]">
                        <div className="absolute w-[357px] top-0 left-0 font-semibold text-[#250537] text-[40px] tracking-[0] leading-[normal]">
                            What can I do for you?
                        </div>

                        {/* unBanked Logo */}
                        <div className="absolute w-[34px] h-[38px] top-[45px] left-28 rounded-md flex items-center justify-center">
                            <div className="relative w-[26px] h-[7px] text-white text-[4.7px] font-bold">
                            <BotMessageSquare className="h-12 w-12 text-black" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Voice Helper Card */}
                <Card className="absolute w-[357px] h-[308px] top-[410px] left-[18px] rounded-[25px] border border-solid border-black overflow-hidden">
                    <CardContent className="p-0">
                        {/* Voice Helper Header */}
                        <div className="p-[25px] pt-[7px]">
                            <div className="[font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-xs tracking-[0] leading-[normal]">
                                Voice helper
                            </div>

                            <div className="flex items-center justify-between mt-3">
                                <div className="inline-flex items-center gap-2">
                                    <div className="flex w-[35px] h-[35px] items-center justify-center bg-black rounded-full">
                                        <Mic className="w-[21px] h-[21px] text-white" />
                                    </div>
                                    <div className="[font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-xs">
                                        Recording.
                                    </div>
                                </div>

                                <Button className="bg-[#1266d4] text-white rounded-2xl h-auto py-2.5 px-4">
                                    <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-xs">
                                        Start recording
                                    </span>
                                </Button>
                            </div>
                        </div>

                        {/* Start Now Section */}
                        <div className="flex flex-col w-full h-[229px] items-start justify-center gap-2.5 p-[17px] bg-black rounded-[25px]">
                            <div className="[font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-lg text-white tracking-[0] leading-[normal]">
                                Start now
                            </div>

                            <div className="flex w-full items-center justify-center gap-6">
                                {serviceCards.map((card, index) =>
                                    <Card
                                        key={index}
                                        className="flex flex-col w-[150px] h-[155.26px] items-start justify-center gap-6 p-2.5 bg-white rounded-[20px]"
                                    >
                                        <CardContent className="p-0 w-full">
                                            <div className="inline-flex items-center gap-2">
                                                <div className="flex w-[35px] h-[35px] items-center justify-center bg-black rounded-full">
                                                    {card.icon ===
                                                    "hand-withdraw"
                                                        ? <div className="w-[21px] h-[21px] text-white flex items-center justify-center">
                                                              <svg
                                                                  width="21"
                                                                  height="21"
                                                                  viewBox="0 0 21 21"
                                                                  fill="none"
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                              >
                                                                  <path
                                                                      d="M10.5 0C4.701 0 0 4.701 0 10.5C0 16.299 4.701 21 10.5 21C16.299 21 21 16.299 21 10.5C21 4.701 16.299 0 10.5 0ZM15.75 11.55C15.75 11.865 15.54 12.075 15.225 12.075H12.6V14.7C12.6 15.015 12.39 15.225 12.075 15.225H8.925C8.61 15.225 8.4 15.015 8.4 14.7V12.075H5.775C5.46 12.075 5.25 11.865 5.25 11.55V8.4C5.25 8.085 5.46 7.875 5.775 7.875H8.4V5.25C8.4 4.935 8.61 4.725 8.925 4.725H12.075C12.39 4.725 12.6 4.935 12.6 5.25V7.875H15.225C15.54 7.875 15.75 8.085 15.75 8.4V11.55Z"
                                                                      fill="white"
                                                                  />
                                                              </svg>
                                                          </div>
                                                        : <Lightbulb className="w-[21px] h-[21px] text-white" />}
                                                </div>
                                                <div className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-[#00000080] text-sm">
                                                    {card.label}
                                                </div>
                                            </div>

                                            <div className="flex w-full items-end justify-between mt-6">
                                                <div className="[font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-black text-lg">
                                                    {card.title}
                                                </div>
                                                <ArrowRight className="w-[22px] h-[22px]" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Select Service Button */}
                <div className="flex w-[357px] h-[45px] items-center justify-center gap-2.5 p-2.5 absolute top-[781px] left-[18px] rounded-[25px]">
                    <div className="relative w-fit [font-family:'Montserrat-Medium',Helvetica] font-medium text-black text-sm tracking-[0] leading-[normal]">
                        Select a service
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";
import useStoreLogin from "@/store";
import { Battery, Eye, EyeOff, HelpCircle, Signal, Wifi } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginSignup() {
    const {
        name,
        id,
        password,
        showPassword,
        setName,
        setId,
        setPassword,
        toggleShowPassword
    } = useStoreLogin();
      const router = useRouter();

    return (
        <div className="bg-white flex flex-row justify-center w-full">
            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-between py-10 px-6 overflow-auto">
                <div className="w-full max-w-[345px]">
                    {/* Header */}
                    <div className="flex flex-col items-start gap-[13px]">
                        <h1
                            className="relative self-stretch mt-[-1.00px] font-semibold text-[#250537] text-[22px] tracking-[0] leading-normal"
                            style={{
                                fontFamily: "Montserrat-SemiBold, Helvetica"
                            }}
                        >
                            unBANKED
                        </h1>
                        <p
                            className="relative self-stretch font-medium text-[#250537b2] text-base tracking-[0] leading-normal"
                            style={{
                                fontFamily: "Montserrat-Medium, Helvetica"
                            }}
                        >
                            Create an account or log in to an existing one.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="flex flex-col items-start gap-4 mt-[38px]">
                        {/* Name Field */}
                        <div className="flex flex-col w-full gap-1">
                            <label
                                className="font-medium text-[#250537] text-sm"
                                style={{
                                    fontFamily: "Montserrat-Medium, Helvetica"
                                }}
                            >
                                Name
                            </label>
                            <div className="relative w-full h-[54px] rounded-[10px] overflow-hidden border-[0.6px] border-solid border-[#a3a1a266]">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Name"
                                    className="w-full h-full px-4 py-2 font-medium text-[#250537b2] text-sm bg-transparent"
                                />
                            </div>
                        </div>

                        {/* ID Field */}
                        <div className="flex flex-col w-full gap-1">
                            <label
                                className="font-medium text-[#250537] text-sm"
                                style={{
                                    fontFamily: "Montserrat-Medium, Helvetica"
                                }}
                            >
                                ID
                            </label>
                            <div className="relative w-full h-[54px] rounded-[10px] overflow-hidden border-[0.6px] border-solid border-[#a3a1a266]">
                                <input
                                    type="text"
                                    value={id}
                                    onChange={e => setId(e.target.value)}
                                    placeholder="ID"
                                    className="w-full h-full px-4 py-2 font-medium text-[#250537b2] text-sm bg-transparent"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col w-full gap-1">
                            <label
                                className="font-medium text-[#250537] text-sm"
                                style={{
                                    fontFamily: "Montserrat-Medium, Helvetica"
                                }}
                            >
                                Password
                            </label>
                            <div className="relative w-full h-[54px] rounded-[10px] overflow-hidden border-[0.7px] border-solid border-[#a3a1a266]">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full h-full px-4 py-2 font-medium text-[#250537b2] text-sm bg-transparent"
                                />
                              
                                {showPassword
                                    ? <EyeOff
                                          className="absolute w-6 h-6 top-[15px] right-[13px] text-[#250537] cursor-pointer"
                                          onClick={toggleShowPassword}
                                      />
                                    : <Eye
                                          className="absolute w-6 h-6 top-[15px] right-[13px] text-[#250537] cursor-pointer"
                                          onClick={toggleShowPassword}
                                      />}
                            </div>
                        </div>

                        {/* Continue Button */}
                        <button onClick={()=>router.push('/home')} className="flex h-[45px] items-center justify-center gap-2.5 px-2.5 py-6 relative self-stretch w-full bg-[#1266d4] rounded-[10px] hover:bg-[#0d5bbf]">
                            <span
                                className="relative font-semibold text-[#fcfcfc] text-lg tracking-[0] leading-normal"
                                style={{
                                    fontFamily: "Montserrat-SemiBold, Helvetica"
                                }}
                            >
                                Continue
                            </span>
                        </button>

                        {/* Forgot Password */}
                        <div className="flex flex-col items-start gap-1.5">
                            <button
                                className="relative self-stretch mt-[-1.00px] font-semibold text-[#1266d4] text-lg tracking-[0] leading-normal text-left hover:underline"
                                style={{
                                    fontFamily: "Montserrat-SemiBold, Helvetica"
                                }}
                            >
                                Forgot your password?
                            </button>
                        </div>
                    </div>
                </div>

                {/* Help Section */}
                <div className="inline-flex items-end gap-[5px]">
                    <HelpCircle className="relative w-6 h-6 text-[#1266d4]" />
                    <span
                        className="relative font-medium text-[#1266d4] text-lg tracking-[0] leading-normal"
                        style={{ fontFamily: "Montserrat-Medium, Helvetica" }}
                    >
                        Help
                    </span>
                </div>
            </div>

            {/* Home Button Indicator */}
            <div className="absolute w-full bottom-0 flex justify-center items-center h-[25px]">
                <div className="w-[134px] h-[5px] bg-[#250537] rounded-full" />
            </div>
        </div>
    );
}

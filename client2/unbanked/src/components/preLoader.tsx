"use client";
import React, { useRef } from "react";
import publicSvg from "../../public/noto_broken-chain.svg";

const Preloader = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-[linear-gradient(180deg,rgba(10,53,110,1)_0%,rgba(19,103,212,1)_100%)] z-50">
            <div className="relative w-[393px] h-[852px] max-w-[90vw] max-h-[90vh]" ref={containerRef}>
                {/* Logo and App Name */}
                <div className="absolute w-[204px] h-[68px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="relative w-[200px] h-[68px] mx-auto">
                        <div className="absolute top-0 left-[54px] font-bold text-white text-[45px] tracking-[-4.05px] [font-family:'Titillium_Web-Bold',Helvetica]">
                            BANKED
                        </div>

                        <div className="absolute top-0 left-0 font-bold text-white text-[45px] tracking-[-4.05px] [font-family:'Titillium_Web-Bold',Helvetica] animate-pulse">
                            un
                        </div>

                        {/* Logo element between "un" and "BANKED" */}
                        <div className="absolute w-[17px] h-[17px] top-[33px] left-[42px] overflow-hidden">
                            <div className="relative w-[19px] h-[18px] -top-px -left-px">
                                {/* This is a placeholder for the complex logo that was composed of multiple vector images */}
                                <img
                                    src={publicSvg.src}
                                    alt="Logo element"
                                    width={19}
                                    height={18}
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes pulse {
                    0% {
                        transform: scale(1);
                        opacity: 0.75;
                    }
                    50% {
                        transform: scale(1.1);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 0.75;
                    }
                }

                /* Mobile styles */
                @media (max-width: 768px) {
                    .mobile\:top-\[40\%\] {
                        top: 40%;
                    }
                    .mobile\:left-\[50\%\] {
                        left: 50%;
                    }
                    .mobile\:-translate-x-1\/2 {
                        transform: translateX(-50%);
                    }
                    .mobile\:-translate-y-1\/2 {
                        transform: translateY(-50%);
                    }
                }
            `}</style>
        </div>
    );
};

export default Preloader;

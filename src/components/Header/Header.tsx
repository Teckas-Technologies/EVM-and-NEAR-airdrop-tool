"use client";

import InlineSVG from "react-inlinesvg";
import './Header.css'
import { useAccount } from "wagmi";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
// import { useEffect } from "react";
// import { useContract } from "@/context/ContractProvider";

const navs = [
    { id: "discover", label: "Discover", path: "#discover" },
    { id: "build", label: "Build", path: "#build" },
    { id: "join", label: "Join", path: "#join" },
    { id: "contactus", label: "Contact Us", path: "#contact-us" },
];

export const Header: React.FC = () => {
    const { isConnected } = useAppKitAccount();
    const { address } = useAccount()
    const { open } = useAppKit();
    // const { disconnect } = useDisconnect();
    // const { myidBalance, refetchBalance } = useContract();

    // useEffect(() => {
    //     if (isConnected && address) {
    //         refetchBalance(address);
    //     }
    // }, [isConnected, address, refetchBalance]);

    // const handleConnectWallet = () => {
    //     open({ view: 'Connect' });
    // }

    const handleDisconnect = () => {
        // disconnect();
        open({ view: 'Account' });
    }

    const handleScrollToSection = (id: string) => {
        const section = document.querySelector(id);
        if (section) {
            const extra = id === "#featured" || id === "#buy-myid" ? 100 : 20;
            // Calculate the offset position, subtracting 6rem (96px assuming 1rem = 16px)
            const offsetTop = section.getBoundingClientRect().top + window.scrollY - extra; // 96px = 6rem

            // Scroll to the calculated position with smooth behavior
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    };


    return (
        <div className="w-full h-auto">
            <div className="header fixed z-50 top-0 w-full h-[7rem] flex justify-between items-center xl:px-[12rem] lg:px-[10rem] md:px-[8rem] px-3 py-2">
                <div className="logo rounded-full hidden md:block w-[5rem] h-[5rem]">
                    <img src="/images/teckas-logo.jpg" alt="myid" className="w-full h-full object-cover rounded-full" />
                </div>
                {/* Mobile logo */}
                <div className="logo md:hidden rounded-full w-[4.2rem] h-[4.3rem]">
                    <img src="/images/teckas-logo.jpg" alt="myid" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="nav-links hidden md:flex flex items-center justify-center gap-[3rem]">
                    {navs.map((nav, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <h3 className={`text-black font-semibold cursor-pointer text-lg`} onClick={() => handleScrollToSection(nav.path)}>
                                {nav?.label}
                            </h3>
                            <InlineSVG
                                src="/down-arrow.svg"
                                color="#000000"
                                className="fill-current md:w-4 md:h-4 w-4 h-4 cursor-pointer"
                            />
                        </div>
                    ))}
                </div>
                <div className="right-header flex justify-center items-center md:gap-[1.5rem] gap-[1rem]">
                    <div className="connect-btn flex items-center justify-center bg-white gap-[0.3rem] px-[1rem] py-[0.3rem] rounded-lg cursor-pointer">
                        <h2 className="text-black font-bold text-lg">Sign in</h2>
                    </div>
                    {!isConnected && !address ? <div className="connect-btn flex items-center justify-center bg-white gap-[0.3rem] px-[1rem] py-[0.3rem] rounded-lg cursor-pointer">
                        <h2 className="text-black font-bold text-lg">Sign in</h2>
                    </div> : <>
                        <h2 className="balance-text hidden md:block font-medium text-lg">Balance</h2>
                        <div className="balance md:px-[1.5rem] md:py-[0.5rem] px-[1.3rem] py-[0.3rem] rounded-[4rem] flex items-center justify-center md:gap-[1rem] gap-[0.5rem] cursor-pointer" onClick={handleDisconnect}>
                            <div className="value flex justify-center items-center gap-2">
                                <h3 className="asset font-bold md:text-xl text-md">MYID</h3>
                            </div>
                            <div className="myid-icon-round ">
                                {/* <InlineSVG
                                    src="/icons/myid.svg"
                                    className="md:w-[2.6rem] md:h-[2.7rem] w-[2.4rem] h-[2.5rem] "
                                /> */}
                            </div>
                        </div>
                    </>}
                    <div className="md:hidden menu">
                        {/* <InlineSVG
                            src="/icons/menu.svg"
                            className="w-7 h-7"
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
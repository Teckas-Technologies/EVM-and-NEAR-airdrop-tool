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


    return (
        <div className="w-full h-auto">
            <div className="header fixed z-50 top-0 w-full h-[7rem] flex gap-2 justify-center items-center xl:px-[12rem] lg:px-[10rem] md:px-[8rem] px-3 py-2">
                <div className="logo rounded-full hidden md:block w-[5rem] h-[5rem]">
                    <img src="/images/teckas-logo.jpg" alt="myid" className="w-full h-full object-cover rounded-full" />
                </div>
                {/* Mobile logo */}
                <div className="w-[5rem] h-auto flex justify-center items-center">
                    <div className="logo md:hidden rounded-full w-[4rem] h-[4rem]">
                        <img src="/images/teckas-logo.jpg" alt="myid" className="w-full h-full object-cover rounded-full" />
                    </div>
                </div>
                <div className="nav-links">
                    <h2 className="md:text-5xl text-3xl font-bold text-cente">AirDrop Claim Tool</h2>
                    {/* {navs.map((nav, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <h3 className={`text-black font-semibold cursor-pointer text-lg`}>
                                {nav?.label}
                            </h3>
                            <InlineSVG
                                src="/down-arrow.svg"
                                color="#000000"
                                className="fill-current md:w-4 md:h-4 w-4 h-4 cursor-pointer"
                            />
                        </div>
                    ))} */}
                </div>
                <div className="right-header md:flex hidden flex justify-center items-center gap-[3rem]">
                    {/* <div className="connect-btn flex items-center justify-center bg-white gap-[0.3rem] px-[1rem] py-[0.3rem] rounded-lg cursor-pointer">
                        <h2 className="text-black font-bold text-lg">Sign in</h2>
                    </div> */}
                    {/* <div className="md:hidden menu">
                        <InlineSVG
                            src="/icons/menu.svg"
                            className="w-7 h-7"
                        />
                    </div> */}
                </div>
            </div>
        </div>
    )
}
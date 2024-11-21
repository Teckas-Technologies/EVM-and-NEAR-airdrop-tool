"use client";

import { useAccount } from "wagmi";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import "./Hero.css"

export const Hero: React.FC = () => {

    const { isConnected } = useAppKitAccount();
    const { address } = useAccount();
    const { open } = useAppKit();
    // const { disconnect } = useDisconnect();

    const handleConnectWallet = () => {
        open({ view: 'Connect' });
    }

    // const handleDisconnect = () => {
    //     // disconnect();
    //     open({ view: 'Account' });
    // }


    return (
        <div className="hero w-full h-auto flex items-center justify-center pt-[7rem] pb-5 px-3">
            <div className="center-box flex flex-col justify-center items-center mt-[7rem]">
                <h2 className="claim-text md:text-[47px] text-[47px] text-center leading-[4rem] px-3">Claim your AirDrop NOW!</h2>
                <h3 className="text-2xl text-center font-bold py-6 my-2 px-3">Find out if you are eligible to participate.</h3>
                <p className="text-xl text-center font-medium pb-3 px-3">Connect your metamask wallet to see if you are eligible to claim tokens. Available tokens<br />are only available to eligible participants at this stage.</p>
                {!isConnected && !address ? <div className="connect-wallet-btn mt-6 rounded-sm cursor-pointer" onClick={handleConnectWallet}>
                    <h2 className="text-black text-lg font-bold px-20 py-4">Connect Wallet</h2>
                </div> : <div>
                    <h4 className="text-md font-semibold">Connected Address: <span className="address rounded-lg">{address}</span></h4>
                </div>
                }

                {isConnected && address && <div className="submit-near-address flex justify-center items-center my-10 px-3 py-1 rounded-lg">
                    <input type="text" placeholder="Enter your NEAR address..." className="w-[20rem] h-[3rem]" />
                    <div className="submit px-10 py-3 rounded-lg cursor-pointer">
                        <h3 className="text-md font-semibold">Submit</h3>
                    </div>
                </div>}
            </div>
        </div>
    )
}
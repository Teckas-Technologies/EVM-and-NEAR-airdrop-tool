"use client";

import { useAccount, useDisconnect } from "wagmi";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import "./Hero.css"
import { useAirDropTransfer, useFetchMetamaskAddress } from "@/hooks/useAirDrop";
import { useEffect, useState } from "react";
import Toast from "../Toast";
import Link from "next/link";

export const Hero: React.FC = () => {

    const { isConnected } = useAppKitAccount();
    const { address } = useAccount();
    const { open } = useAppKit();
    const { disconnect } = useDisconnect();

    const { fetchMetamaskAddressExist } = useFetchMetamaskAddress();
    const { loading, transferToken } = useAirDropTransfer();

    const [vallidEvmAddress, setValidEvmAddress] = useState(false);
    const [alreadyClaimed, setAlreadyClaimed] = useState(false);
    const [nearAddress, setNearAddress] = useState("");

    const [toastMessage, setToastMessage] = useState("");
    const [transactionHash, setTransactionHash] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (address) {
            const fetchIsExist = async () => {
                const response = await fetchMetamaskAddressExist(address);
                setAlreadyClaimed(response.isClaimed);
                setValidEvmAddress(response.success);
                // if (response.success && !response.isClaimed) {
                //     setValidEvmAddress(true);
                // } else {
                //     setValidEvmAddress(false);
                // }
            }
            fetchIsExist();
        }
    }, [address, isConnected])

    useEffect(() => {
        if (toastMessage) {
            setTimeout(() => setToastMessage(""), 3000);
        }
    }, [toastMessage])

    const handleConnectWallet = () => {
        open({ view: 'Connect' });
    }

    const handleClaimAirDrop = async () => {
        if (!vallidEvmAddress) {
            return;
        }
        if (!address) {
            return;
        }
        if (!nearAddress) {
            return;
        }
        try {
            const response = await transferToken({ address: nearAddress, EVMaddress: address });
            if (response.success) {
                setSuccess(true);
                setTransactionHash(response.transactionHash);
                setToastMessage("Claimed Successful!");
            } else {
                setSuccess(false);
                setTransactionHash("");
                setToastMessage("Claim Failed!");
            }
        } catch (err) {
            console.log("Error: ", err);
            setSuccess(false);
            setTransactionHash("");
            setToastMessage("Claim Failed!");
        }
    }

    const handleDisconnect = () => {
        disconnect();
        // open({ view: 'Account' });
    }

    console.log("Already : ", alreadyClaimed)
    console.log("Valid : ", vallidEvmAddress)

    return (
        <div className="hero w-full h-auto flex items-center justify-center pt-[7rem] pb-5 px-3">
            <div className="center-box flex flex-col justify-center items-center md:mt-[7rem] mt-[5rem]">
                <h2 className="claim-text md:text-[47px] text-[47px] text-center leading-[4rem] px-3">Claim your AirDrop NOW!</h2>
                <h3 className="text-2xl text-center font-bold py-6 my-2 px-3">Find out if you are eligible to participate.</h3>
                <p className="text-xl text-center font-medium pb-3 px-3">Connect your metamask wallet to see if you are eligible to claim tokens. Available tokens are only available to eligible participants at this stage.</p>
                {!isConnected && !address ? <div className="connect-wallet-btn mt-6 rounded-sm cursor-pointer" onClick={handleConnectWallet}>
                    <h2 className="text-black text-lg font-bold px-20 py-4">Connect Wallet</h2>
                </div> : <div className="">
                    <h4 className="md:text-md text-sm font-semibold text-center">Connected Address: <span className="address rounded-lg" onClick={handleDisconnect}>{address}</span></h4>
                </div>
                }

                <div className="main-section w-full h-[5rem] flex flex-col justify-center items-center my-10">
                    {isConnected && address && !loading && !transactionHash && vallidEvmAddress && !alreadyClaimed && <h2>You are eligible to claim this AirDrop!</h2>}
                    {isConnected && address && !loading && !transactionHash && vallidEvmAddress && !alreadyClaimed &&  <div className="submit-near-address flex justify-center items-center px-3 py-1 rounded-lg">
                        <input type="text" placeholder="Enter your NEAR address..." value={nearAddress} onChange={(e) => setNearAddress(e.target.value)} className="w-[20rem] h-[3rem]" />
                        <div className="submit px-10 py-3 rounded-lg cursor-pointer" onClick={handleClaimAirDrop}>
                            <h3 className="text-md font-semibold">Claim</h3>
                        </div>
                    </div>}

                    {!vallidEvmAddress && !alreadyClaimed && address && <h2 className="text-red-500 font-semibold text-md">You are not eligible to claim this AirDrop!</h2>} 
                    {address && vallidEvmAddress && alreadyClaimed && <h2 className="text-red-500 font-semibold text-md">Already you claimed this AirDrop!</h2>}

                    {loading && <div className="loading w-full flex items-center justify-center gap-4">
                        <div role="status">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#00dba9]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <h2 className="text-center text-lg font-semibold">Your AirDrop Claim is in processing...</h2>
                    </div>}

                    {!loading && transactionHash && address && <div className="transactionHash w-full flex items-center justify-center">
                        <Link href={`https://testnet.nearblocks.io/txns/${transactionHash}`} target="_blank" className="w-full flex flex-col items-center justify-center gap-2">
                            <h2 className="text-md font-semibold">Go Near Explorer:</h2>
                            <h2 className="text-md font-medium cursor-pointer">https://testnet.nearblocks.io/txns/{transactionHash}test</h2>
                        </Link>
                    </div>}

                </div>
            </div>

            {toastMessage && <Toast success={success} message={toastMessage} onClose={() => setToastMessage("")} />}
        </div>
    )
}
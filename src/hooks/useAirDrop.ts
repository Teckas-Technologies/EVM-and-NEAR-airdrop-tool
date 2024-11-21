import { useState } from "react";

export const useAirDropTransfer = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);

    const transferToken = async (data: { address: string, EVMaddress: `0x${string}` }) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch('/api/transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to transfer token');
            }

            const responseText = await response.text();
            if (responseText) {
                const responseData = JSON.parse(responseText);
                console.log("Response Data >> ", responseData);
                const successValue = responseData?.success;
                const transactionHash = responseData?.transactionResult?.transaction?.hash
                setSuccess(true);
                return { success: successValue, transactionHash: transactionHash }
            } else {
                console.warn('Empty response from server');
                setSuccess(false);
                return { success: false, transactionHash: "" };
            }
        } catch (error) {
            console.error('Error in transfer token:', error);
            setError('Failed to token transfer!');
            return { success: false, transactionHash: "" };
        } finally {
            setLoading(false);
        }
    };

    return { transferToken, loading, error, success };
};


export const useFetchMetamaskAddress = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMetamaskAddressExist = async (metamaskAddress: string): Promise<{ success: boolean; isClaimed: boolean; }> => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/walletaddress?address=${metamaskAddress}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log("Response Data >> ", data);
            const successVale = data.success;
            const isClaimed = data.data.isClaimed;
            return { success: successVale, isClaimed: isClaimed };
        } catch (err) {
            setError("Error fetching metamask address");
            return { success: false, isClaimed: false };
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, fetchMetamaskAddressExist };
}
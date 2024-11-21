import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongoose";
import WalletAddress from "../../models/Wallet";
import { transferNear, transferUSDT } from "../../utils/transferUtils";
import ClaimedWalletAddress from "../../models/ClaimedWallets";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    try {
        await connectToDatabase(); 
        if(req.method=="POST"){
            try {
                const {address,EVMaddress} = req.body;
                const existing = await ClaimedWalletAddress.findOne({EVMaddress:EVMaddress});
                if(!existing){
                   const transactionResult = await transferUSDT(address,"1");
                   const claimed = new ClaimedWalletAddress({
                    EVMaddress:EVMaddress,
                    walletAddress:address
                   });
                   claimed.save();
                   res.status(200).json({success:true,transactionResult});
                }else{
                    res.status(200).json({success:false,message:"wallet address claimed"});
                }
            } catch (error:any) {
                res.status(400).json({error:error.message});
            }
        }
    } catch (error:any) {
        res.status(400).json({error:error.message});
    }
}

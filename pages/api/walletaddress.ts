import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongoose";
import WalletAddress from "../../models/Wallet";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    try {
        await connectToDatabase();
        if(req.method=="GET"){
            try {
                const address = req.query.address;
                const existing = await WalletAddress.findOne({walletAddress:address});
                if(existing){
                    res.status(200).json({success:true,data:existing});
                }else{
                    res.status(200).json({success:false,message:"wallet address not found"});
                }
            } catch (error:any) {
                res.status(400).json({error:error.message});
            }
        }
    } catch (error:any) {
        res.status(400).json({error:error.message});
    }
}
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongoose";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method=="GET"){
        await connectToDatabase();
        res.status(200).json({message:"vanakam da mapla"});
    }
}
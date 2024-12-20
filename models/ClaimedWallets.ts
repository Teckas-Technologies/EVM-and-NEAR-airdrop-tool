import mongoose, { Document, Model } from 'mongoose';

interface ClaimedWalletAddress extends Document {
    walletAddress:string;
}

const ClaimedWalletAddressSchema = new mongoose.Schema({
    EVMaddress: {
        type: String,
        required: true,
        unique:true,
      },
    walletAddress: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const ClaimedWalletAddress: Model<ClaimedWalletAddress> = mongoose.models.ClaimedWalletAddress || mongoose.model<ClaimedWalletAddress>('ClaimedWalletAddress', ClaimedWalletAddressSchema);

export default ClaimedWalletAddress;
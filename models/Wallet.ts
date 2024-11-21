import mongoose, { Document, Model } from 'mongoose';

interface WalletAddress extends Document {
    walletAddress:string;
}

const WalletAddressSchema = new mongoose.Schema({
    walletAddress: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const WalletAddress: Model<WalletAddress> = mongoose.models.WalletAddress || mongoose.model<WalletAddress>('WalletAddress', WalletAddressSchema);

export default WalletAddress;
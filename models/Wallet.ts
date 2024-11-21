import mongoose, { Document, Model } from 'mongoose';

interface WalletAddress extends Document {
    EVMaddress:string;
    isClaimed:boolean;
}

const WalletAddressSchema = new mongoose.Schema({
    EVMaddress: {
    type: String,
    required: true,
  },
  isClaimed: {
    type: Boolean,
    required: false,
    default:false
  },
}, { timestamps: true });

const WalletAddress: Model<WalletAddress> = mongoose.models.WalletAddress || mongoose.model<WalletAddress>('WalletAddress', WalletAddressSchema);

export default WalletAddress;
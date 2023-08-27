import mongoose from "mongoose";

const VendorStatsSchema = new mongoose.Schema(
  {
    vendorID: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    vestimateLowerRange: {
      type: Number,
      required: true,
    },
    vestimateUpperRange: {
      type: Number,
      required: true,
    },
    vestimateCloseTime: {
      type: [String],
    },
    vestimateSavings: {
      type: [String],
    },
  },
  { timestamps: true }
);

const VendorStats = mongoose.model("VendorStats", VendorStatsSchema);
export default VendorStats;
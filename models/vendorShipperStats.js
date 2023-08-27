import mongoose from "mongoose";

const VendorShipperStatsSchema = new mongoose.Schema(
  {
    vendorID: {
      type: String,
      required: true,
    },
    shipperID: {
      type: String,
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

const VendorShipperStats = mongoose.model("VendorShipperStats", VendorShipperStatsSchema);
export default VendorShipperStats;
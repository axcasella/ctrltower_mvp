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
      type: Number,
    },
    vestimateSavings: {
      type: Number,
    },
    vestimateMarketShare: {
      type: Number,
    },
  },
  { timestamps: true }
);

const VendorShipperStats = mongoose.model("VendorShipperStats", VendorShipperStatsSchema);
export default VendorShipperStats;
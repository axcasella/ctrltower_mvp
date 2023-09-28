import mongoose from "mongoose";

const RFPRequestSchema = new mongoose.Schema(
  {
    RFPRequestID: {
      type: String,
      required: true,
    },
    vendorID: {
      type: String,
      required: true,
    },
    vendorName: {
      type: String,
      required: true,
    },
    shipperID: {
      type: String,
      required: true,
    },
    RFPRequestStatus: {
      type: String,
      required: true,
    },
    RFPRequestShipperOwners: {
      type: Array,
    },
    RFPRequestVendorOwners: {
      type: Array,
    },
    data: {
      type: Object,
    },
  },
  { timestamps: true }
);

const RFPRequest = mongoose.model("RFPRequest", RFPRequestSchema);
export default RFPRequest;
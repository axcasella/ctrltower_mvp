import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema(
  {
    contractID: {
      type: String,
      required: true,
    },
    contractName: {
      type: String,
      required: true,
    },
    vendorID: {
      type: String,
      required: true,
    },
    shipperID: {
      type: String,
      required: true,
    },
    contractStatus: {
      type: String,
      required: true,
    },
    contractShipperOwners: {
      type: Array,
    },
    contractVendorOwners: {
      type: Array,
    },
    price: {
      type: Number,
      required: true,
    },
    data: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Contract = mongoose.model("Contract", ContractSchema);
export default Contract;
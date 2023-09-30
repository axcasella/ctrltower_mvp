import mongoose from 'mongoose';

const ShipperSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    freight_types: {
      type: [String],
    },
    industry: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    primary_contact_name: {
      type: String,
      required: true,
    },
    shipping_frequency: {
      type: String,
    },
    common_routes: {
      type: [String],
    },
    hazard_requirement: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Shipper = mongoose.model("Shipper", ShipperSchema);
export default Shipper;
import mongoose from 'mongoose';

// Load Schema
// ⁃	Payment term (upon delivery, net-30 days)
// ⁃	Hazmat (yes no)

// TODO: add active status
const LoadSchema = new mongoose.Schema(
  {
    shipperID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipper",
      required: true,
    },
    origin_address: {
      type: String,
      required: true,
    },
    origin_city: {
      type: String,
      required: true,
    },
    origin_state: {
      type: String,
      required: true,
    },
    origin_country: {
      type: String,
      required: true,
    },
    origin_zip_code: {
      type: Number,
      required: true,
    },
    destination_address: {
      type: String,
      required: true,
    },
    destination_city: {
      type: String,
      required: true,
    },
    destination_state: {
      type: String,
      required: true,
    },
    destination_country: {
      type: String,
      required: true,
    },
    destination_zip_code: {
      type: Number,
      required: true,
    },
    pick_up_date: {
      type: Date,
      required: true,
    },
    pick_up_time: {
      type: String,
      required: true,
    },
    delivery_date: {
      type: Date,
      required: true,
    },
    delivery_time: {
      type: String,
      required: true,
    },
    freight_type: {
      type: String,
      required: true,
    },
    freight_weight: {
      type: String,
      required: true,
    },
    dimension_length: {
      type: String,
      required: true,
    },
    dimension_width: {
      type: String,
      required: true,
    },
    dimension_height: {
      type: String,
      required: true,
    },
    freight_description: {
      type: String,
      required: true,
    },
    trailer_needed: {
      type: String,
      required: true,
    },
    special_equipment_description: {
      type: String,
      required: true,
    },
    rate: {
      type: String,
      required: true,
    },
    payment_term: {
      type: String,
      required: true,
    },
    check_in_instruction: {
      type: String,
      required: true,
    },
    reference_number: {
      type: String,
      required: true,
    },
    hazmat: {
      type: Boolean,
      required: true,
    }
  },
  { timestamps: true }
);

const Load = mongoose.model("Load", LoadSchema);
export default Load;
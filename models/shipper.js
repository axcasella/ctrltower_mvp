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
    tags: {
      type: [String],
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: Number,
    },
    phone_number: {
      type: String,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
    annual_volume: {
      type: String,
    },
    annual_spend: {
      type: String,
    },
  },
  { timestamps: true }
);

const Shipper = mongoose.model("Shipper", ShipperSchema);
export default Shipper;
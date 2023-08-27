import mongoose from "mongoose";

const VendorComplianceSchema = new mongoose.Schema(
  {
    vendorID: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    safer_fmcsa: {
      entity_type: String,
      legal_name: String,
      physical_address: String,
      phone: String, 
      mailing_address: String, 
      usdot: String, 
      duns_number: String, 
      drivers: String, 
      mileage: String, 
      out_of_service_date: String, 
      operation_classification: String, 
      cargo_carried: String, 
      tow: String, 
      injury: String, 
      fatal: String, 
      safety_rating: String, 
      safety_rating_date: String, 
      safety_review_date: String
    }
  },
  { timestamps: true }
);

const VendorCompliance = mongoose.model("VendorCompliance", VendorComplianceSchema);
export default VendorCompliance;
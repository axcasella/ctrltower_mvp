import Vendor from "../models/vendor.js";
import VendorCompliance from "../models/vendorCompliance.js";
import VendorShipperStats from "../models/vendorShipperStats.js"; 

export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();

    const vendorsWithCompliance = await Promise.all(
      vendors.map(async (vendor) => {
        const complianceInfo = await VendorCompliance.find({
          vendorID: vendor._id,
        });
        return {
          ...vendor._doc,
          complianceInfo,
        };
      })
    );

    res.status(200).json(vendorsWithCompliance);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
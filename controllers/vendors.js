import Vendor from "../models/vendor.js";
import VendorCompliance from "../models/vendorCompliance.js";
import VendorShipperStats from "../models/vendorShipperStats.js"; 

export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    const vendorIds = vendors.map(vendor => vendor._id);

    // Fetch all compliance info for the array of vendor IDs
    const allComplianceInfo = await VendorCompliance.find({
      vendorID: { $in: vendorIds },
    });

    // Fetch all shipper stats for the array of vendor IDs
    const allShipperStats = await VendorShipperStats.find({
      vendorID: { $in: vendorIds },
      shipperID: req.shipperID,
    });

    // Combine the data
    const vendorsWithAllInfo = vendors.map(vendor => ({
      ...vendor._doc,
      complianceInfo: allComplianceInfo.find(compliance => String(compliance.vendorID) === String(vendor._id)),
      shipperStats: allShipperStats.find(stats => String(stats.vendorID) === String(vendor._id) && String(stats.shipperID) === String(req.shipperID)),
    }));

    res.status(200).json(vendorsWithAllInfo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getVendorByID = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendorID);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found." });
    }

    // Fetch compliance info for the vendor ID
    const complianceInfo = await VendorCompliance.findOne({
      vendorID: req.vendorID,
    });

    // Fetch shipper stats for the vendor ID
    const shipperStats = await VendorShipperStats.findOne({
      vendorID: req.vendorID,
      shipperID: req.shipperID,
    });

    // Combine the data
    const vendorWithAllInfo = {
      ...vendor._doc,
      complianceInfo,
      shipperStats,
    };

    res.status(200).json(vendorWithAllInfo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};





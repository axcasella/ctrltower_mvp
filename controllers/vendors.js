import Vendor from "../models/vendor.js";
import VendorCompliance from "../models/vendorCompliance.js";
import VendorShipperStats from "../models/vendorShipperStats.js"; 
import axios from "axios";

// Integration with Safer search API
export const searchVendors = async(req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'The "name" parameter is required.' });
  }

  // URL for the saferwebapi
  const apiUrl = `https://saferwebapi.com/v2/name/${name}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'x-api-key': process.env.SAFERWEB_API_KEY
      }
    });

    if (response.data && response.status === 200) {
      console.log(response.data);
      return res.status(200).json(response.data);
    } else {
      return res.status(response.status).json({ error: 'Unexpected response from SaferWebAPI.' });
    }

  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return res.status(error.response.status).json({ error: error.response.data });
    } else {
      // Something happened in setting up the request that triggered an Error
      return res.status(500).json({ error: `Error: ${error.message}` });
    }
  }
};

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
      shipperID: req.query.shipperID,
    });

    // Combine the data
    const vendorsWithAllInfo = vendors.map(vendor => ({
      ...vendor._doc,
      complianceInfo: allComplianceInfo.find(compliance => String(compliance.vendorID) === String(vendor._id)),
      shipperStats: allShipperStats.find(stats => String(stats.vendorID) === String(vendor._id) && String(stats.shipperID) === String(req.query.shipperID)),
    }));

    res.status(200).json(vendorsWithAllInfo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getVendorByID = async (req, res) => {
  try {
    const { vendorID } = req.params; 
    const { shipperID } = req.query;

    if (!vendorID || !shipperID) {
      return res.status(404).json({ message: "IDs not provided." });
    }

    const vendor = await Vendor.findById(vendorID);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found." });
    }

    // Fetch compliance info for the vendor ID
    const complianceInfo = await VendorCompliance.findOne({
      vendorID: vendorID,
    });

    // Fetch shipper stats for the vendor ID
    const shipperStats = await VendorShipperStats.findOne({
      vendorID: vendorID,
      shipperID: shipperID,
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





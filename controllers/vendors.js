import Vendor from "../models/vendor.js";
import VendorCompliance from "../models/vendorCompliance.js";
import VendorShipperStats from "../models/vendorShipperStats.js"; 
import axios from "axios";
import { createClient } from "redis";

// Redis client
const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));
await client.connect();
client.on('connect', () => {
  console.log('Redis client connected');
});

const fetchDataFromSaferWebAP = async(name) => {
  // URL for the saferwebapi
  const apiUrl = `https://saferwebapi.com/v2/name/${name}`;

  const response = await axios.get(apiUrl, {
    headers: {
      'x-api-key': process.env.SAFERWEB_API_KEY
    }
  });

  return response.data;
}

// Integration with Safer search API
const searchVendorsFromFMCSA = async(name, page, size) => {
  const start = (page - 1) * size;
  const end = page * size;

  try {
    let results = [];

    // Try to fetch from cache
    const cachedData = await client.get(name);

    if (cachedData) {
      console.log("got fmcsa search data from cache");
      results = JSON.parse(cachedData);
    } else {
      const data = await fetchDataFromSaferWebAP(name);

      if (data) {
        // Cache the data
        await client.set(name, JSON.stringify(data), {
          EX: process.env.REDIS_CACHE_EXPIRE_TIME
        });

        console.log("fmcsa search data cached");
        results = data;
      } 
    }

    // return paginated results
    return results.slice(start, end);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchDataFromSaferWebAPIByUSDOT = async(usdot) => {
  const apiUrl = `https://saferwebapi.com/v2/usdot/snapshot/${usdot}`;

  const response = await axios.get(apiUrl, {
    headers: {
      'x-api-key': process.env.SAFERWEB_API_KEY
    }
  });

  return response.data;
}

export const getVendorByUSDOTFromFMCSA = async(req, res) => {
  const { usdot } = req.params;

  if (!usdot) {
    return res.status(400).json({ error: 'USDOT is required.' });
  }

  try {
    // Try to fetch from cache first
    const cachedData = await client.get(`fmcsa_data_usdot:${usdot}`);

    if (cachedData) {
      console.log("got fmcsa vendor usdot data from cache");
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      const data = await fetchDataFromSaferWebAPIByUSDOT(usdot);

      if (data) {
        // Cache the data with prefix "usdot:" for distinction
        await client.set(`fmcsa_data_usdot:${usdot}`, JSON.stringify(data), {
          EX: process.env.REDIS_CACHE_EXPIRE_TIME
        });

        console.log("fmcsa vendor usdot data cached");
        return res.status(200).json(data);
      } else {
        return res.status(400).json({ error: 'Unexpected response from SaferWebAPI.' });
      }
    }
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data });
    } else {
      return res.status(500).json({ error: `Error: ${error.message}` });
    }
  }
};

export const searchVendors = async(req, res) => {
  const { name, pageNumber, pageSize } = req.query;

  const page = pageNumber || 1;
  const size = pageSize || 12;
  
  if (!name) {
    return res.status(400).json({ error: 'The "name" parameter is required.' });
  }

  try {
    let result = [];
    // search vendors from FMCSA
    const vendors = await searchVendorsFromFMCSA(name, page, size);
    // for each vendor in data, call fetchDataFromSaferWebAPIByUSDOT to get the details and append to result
    for (const vendor of vendors) {
      const data = await fetchDataFromSaferWebAPIByUSDOT(vendor.usdot);
      if (data) result.push(data);
    }
    
    // return the data
    return res.status(200).json({
      currentPage: vendors.currentPage,
      pageSize: vendors.pageSize,
      totalPages: vendors.totalPages,
      totalResults: vendors.totalResults,
      data: result
    });
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
}

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





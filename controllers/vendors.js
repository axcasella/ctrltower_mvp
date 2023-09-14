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

const fetchDataFromSaferWebAPI = async(name) => {
  // URL for the saferwebapi
  const apiUrl = `https://saferwebapi.com/v2/name/${name}`;

  const response = await axios.get(apiUrl, {
    headers: {
      'x-api-key': process.env.SAFERWEB_API_KEY
    }
  });

  return response.data;
}

const fetchDataFromMobileFMCSA = async(usdot) => {
  const apiUrl = `https://mobile.fmcsa.dot.gov/qc/services/carriers/${usdot}?webKey=${process.env.FMCSA_WEB_KEY}`;

  const response = await axios.get(apiUrl);

  return response.data;
}

const fetchDataFromSaferWebAPIByUSDOT = async(usdot) => {
  const apiUrl = `https://saferwebapi.com/v2/usdot/snapshot/${usdot}`;

  const response = await axios.get(apiUrl, {
    headers: {
      'x-api-key': process.env.SAFERWEB_API_KEY
    }
  });

  return response.data;
}

// Calls both MobileFMCSA and SaferWebAPI to get vendor details
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
      let data;
      const saferData = await fetchDataFromSaferWebAPIByUSDOT(usdot);
      const mobileFMCSAData = await fetchDataFromMobileFMCSA(usdot);

      console.log("mobileFMCSAData", mobileFMCSAData);
      
      data = {
        saferData,
        mobileFMCSAData
      }

      if (saferData || mobileFMCSAData) {
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

const fetchVendorDetailsForVendorsSearch = async (usdot) => {
  const cacheKey = `vendorsearch_vendor_details_USDOT_${usdot}`;

  // Try to get the vendor detail from cache
  const cachedVendorData = await client.get(cacheKey);
  
  if (cachedVendorData) {
    console.log(`got vendor detail for USDOT: ${usdot} from cache`);
    return JSON.parse(cachedVendorData);
  } else {
    const data = await fetchDataFromSaferWebAPIByUSDOT(usdot);
    // Cache the vendor detail
    await client.set(cacheKey, JSON.stringify(data), {
      EX: process.env.REDIS_CACHE_EXPIRE_TIME
    });
    console.log(`cached vendor detail for USDOT: ${usdot}`);
    return data;
  }
};

export const searchVendors = async(req, res) => {
  const { name, pageSize, cargoFilter, cursor } = req.query;

  const size = parseInt(pageSize) || 12;
  let lastCheckedVendorIndex = cursor ? parseInt(cursor) : 0; 
  
  if (!name) {
    return res.status(400).json({ error: 'The "name" parameter is required.' });
  }

  let vendors = [];
  let searchData;

  // Try to get the entire search data from cache
  const cachedSearchData = await client.get(name);
  
  if (cachedSearchData) {
    console.log("got entire search data from cache");
    searchData = JSON.parse(cachedSearchData);
  } else {
    searchData = await fetchDataFromSaferWebAPI(name);
    // Cache the entire search results
    await client.set(name, JSON.stringify(searchData), {
      EX: process.env.REDIS_CACHE_EXPIRE_TIME
    });
    console.log("entire search data cached");
  }
  
  try {
    // Start fetching details from the last checked index
    const toFetchVendors = searchData.slice(lastCheckedVendorIndex);

    // Fetch details for the sliced vendors
    const detailsArray = await Promise.all(toFetchVendors.map(vendor => fetchVendorDetailsForVendorsSearch(vendor.usdot)));
    
    const detailsSet = new Set();
    for (const details of detailsArray) {
      lastCheckedVendorIndex++; // Always increment the cursor to keep track of the last checked vendor

      if (details.usdot && !detailsSet.has(details.usdot)) {
        if (!cargoFilter || (details.cargo_carried.includes(cargoFilter))) {
            vendors.push(details);
            if (vendors.length === size) break; // Stop if we've reached the desired number of vendors
        }
        detailsSet.add(details.usdot);
      }
    }

    // Return the results along with the new cursor
    return res.status(200).json({
        data: vendors,
        cursor: lastCheckedVendorIndex,
        totalResults: searchData.length 
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





import RFPRequest from "../models/rfp_request.js";
import { v4 as uuidv4 } from 'uuid';

export const getRFPRequestsWithShipperID = async (req, res) => {
  const { shipperID } = req.params;  
  
  if (!shipperID) {
    return res.status(404).json({ message: "Shipper ID not provided." });
  }

  try {
    const RFPRequests = await RFPRequest.find({
      shipperID: shipperID,
    });

    res.status(200).json(RFPRequests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getRFPRequestsWithShipperIDAndVendorID = async (req, res) => {
  if (!req.query.shipperID || !req.query.vendorID) {
    return res.status(404).json({ message: "Shipper ID or vendor ID not provided." });
  }

  try {
    const RFPRequests = await RFPRequest.find({
      shipperID: req.query.shipperID,
      vendorID: req.query.vendorID,
    });

    res.status(200).json(RFPRequests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createRFPRequest = async (req, res) => {
  // if req.body is missing any required fields, return 404
  if (!req.body.RFPRequestName || !req.body.vendorID || !req.body.shipperID || !req.body.vendorName) {
    return res.status(404).json({ message: "Missing required fields." });
  }

  const newRFPRequest = new RFPRequest(req.body);
  newRFPRequest.RFPRequestID = uuidv4();
  newRFPRequest.RFPRequestStatus = "Initiated";

  try {
    await newRFPRequest.save();
    res.status(201).json(newRFPRequest);
  } catch (error) {
    res.status(409).json({ message: error.message });
  } 
}
import Contract from "../models/contract.js";
import { v4 as uuidv4 } from 'uuid';

export const getContractsWithShipperID = async (req, res) => {
  if (!req.query.shipperID) {
    return res.status(404).json({ message: "Shipper ID not provided." });
  }

  try {
    const contracts = await Contract.find({
      shipperID: req.query.shipperID,
    });

    res.status(200).json(contracts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getContractsWithShipperIDAndVendorID = async (req, res) => {
  if (!req.query.shipperID || !req.query.vendorID) {
    return res.status(404).json({ message: "Shipper ID or vendor ID not provided." });
  }

  try {
    const contracts = await Contract.find({
      shipperID: req.query.shipperID,
      vendorID: req.query.vendorID,
    });

    res.status(200).json(contracts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createContract = async (req, res) => {
  // if req.body is missing any required fields, return 404
  if (!req.body.contractName || !req.body.vendorID || !req.body.shipperID || !req.body.price) {
    return res.status(404).json({ message: "Missing required fields." });
  }

  const newContract = new Contract(req.body);
  newContract.status = "Initiated"
  newContract.contractID = uuidv4();

  try {
    await newContract.save();
    res.status(201).json(newContract);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}
import Shipper from "../models/shipper.js";
import Carrier from "../models/carrier.js";

export const onboardShipper = async (req, res) => {
  const newShipper = new Shipper(req.body);

  console.log("here");

  try {
    await newShipper.save();
    res.status(201).json(newShipper);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const onboardCarrier = async (req, res) => {
  const newCarrier = new Carrier(req.body);

  try {
    await newCarrier.save();
    res.status(201).json(newCarrier);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}
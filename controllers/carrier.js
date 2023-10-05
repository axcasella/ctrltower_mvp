import Carrier from "../models/carrier.js";

export const getCarriers = async (req, res) => {
  try {
    const carriers = await Carrier.find();
    res.status(200).json(carriers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
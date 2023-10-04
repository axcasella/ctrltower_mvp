import Load from "../models/load.js";

export const addLoad = async (req, res) => {
  try {
      const load = new Load(req.body);
      await load.save();
      res.status(201).json(load);
  } catch (error) {
      res.status(500).json({
          error: "Failed to add load",
          details: error.message
      });
  }
};

export const getLoadByShipperID = async (req, res) => {
    try {
        const loads = await Load.find({ shipperID: req.params.shipperID });
        res.status(200).json(loads);
    } catch (error) {
        res.status(404).json({
            error: "Load not found",
            details: error.message
        });
    }
}

export const getAllLoads = async (req, res) => {
    try {
        const loads = await Load.find();
        res.status(200).json(loads);
    } catch (error) {
        res.status(404).json({
            error: "Load not found",
            details: error.message
        });
    }
}

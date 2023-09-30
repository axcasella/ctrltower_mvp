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
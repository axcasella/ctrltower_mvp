import express from "express";
import { addLoad, getLoadsByShipperID, getAllLoads } from "../controllers/load.js"
import { checkRequiredLoadFields } from "../middleware/checkRequiredFields.js";

const router = express.Router();

router.post("/addLoad", checkRequiredLoadFields, addLoad);
router.get("/getLoadByShipperID/:shipperID", getLoadsByShipperID);
router.get("/getAllLoads", getAllLoads);

export default router;
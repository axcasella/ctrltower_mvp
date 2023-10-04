import express from "express";
import { addLoad, getLoadByShipperID, getAllLoads } from "../controllers/load.js"
import { checkRequiredLoadFields } from "../middleware/checkRequiredFields.js";

const router = express.Router();

router.post("/addLoad", checkRequiredLoadFields, addLoad);
// TODO: add these 2 new routes to postman
router.get("/getLoadByShipperID/:shipperID", getLoadByShipperID);
router.get("/getAllLoads", getAllLoads);

export default router;
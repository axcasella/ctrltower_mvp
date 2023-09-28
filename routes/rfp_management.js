import express from "express";
import { createRFPRequest, getRFPRequestsWithShipperID } from "../controllers/rfp_management.js"

const router = express.Router();

router.post("/newRequest", createRFPRequest);
router.get("/getRFPsWithShipperID/:shipperID", getRFPRequestsWithShipperID);

export default router;
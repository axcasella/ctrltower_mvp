import express from "express";
import { getVendors, getVendorByID, searchVendors, getVendorByUSDOTFromFMCSA } from "../controllers/vendors.js"

const router = express.Router();

router.get("/", getVendors);
router.get("/:vendorID", getVendorByID);
// FMCSA
router.get("/fmcsa/search", searchVendors);
router.get("/fmcsa/:usdot", getVendorByUSDOTFromFMCSA);

export default router;
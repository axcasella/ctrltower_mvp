import express from "express";
import { getVendors, getVendorByID, searchVendors } from "../controllers/vendors.js"

const router = express.Router();

router.get("/", getVendors);
router.get("/search", searchVendors);
router.get("/:vendorID", getVendorByID);

export default router;
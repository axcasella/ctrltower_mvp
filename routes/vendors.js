import express from "express";
import { getVendors, getVendorByID } from "../controllers/vendors.js"

const router = express.Router();

router.get("/", getVendors);
router.get("/id/:id", getVendorByID);

export default router;
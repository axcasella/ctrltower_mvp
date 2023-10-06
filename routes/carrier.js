import express from "express";
import { getCTCarriers } from "../controllers/carrier.js"

const router = express.Router();

router.get("/allCTCarriers", getCTCarriers);

export default router;
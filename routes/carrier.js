import express from "express";
import { getCarriers } from "../controllers/carrier.js"

const router = express.Router();

router.get("/carrier", getCarriers);

export default router;
import express from "express";
import { onboardCarrier, onboardShipper } from "../controllers/onboard.js"
import { checkRequiredCarrierFields, checkRequiredShipperFields } from "../middleware/checkRequiredFields.js";

const router = express.Router();

router.post("/shipper", checkRequiredShipperFields, onboardShipper);
router.post("/carrier", checkRequiredCarrierFields, onboardCarrier);

export default router;
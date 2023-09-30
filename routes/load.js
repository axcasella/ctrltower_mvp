import express from "express";
import { addLoad } from "../controllers/load.js"
import { checkRequiredLoadFields } from "../middleware/checkRequiredFields.js";

const router = express.Router();

router.post("/addLoad", checkRequiredLoadFields, addLoad);

export default router;
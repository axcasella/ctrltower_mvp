import express from "express";
import { getUser, loginUser, registerUser } from "../controllers/general.js"

const router = express.Router();

router.get("/user/:id", getUser);
router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
import express from "express";
import { login, updateCredentials } from "../controllers/authController.js";
const router = express.Router();

router.post("/login", login);
router.post("/update-credentials", updateCredentials);

export default router;

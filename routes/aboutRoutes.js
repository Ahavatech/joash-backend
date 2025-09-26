import express from "express";
import { getAbout, updateAbout } from "../controllers/aboutController.js";
import { upload } from "../config/cloudinary.js";
const router = express.Router();

router.get("/", getAbout);
router.put("/", updateAbout);

export default router;

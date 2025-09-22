import express from "express";
import { getHero, updateHero, uploadHeroImage, deleteHeroImage } from "../controllers/heroController.js";
import { upload } from "../config/cloudinary.js";
const router = express.Router();

router.get("/", getHero);
router.put("/", updateHero);
router.post("/upload", upload.single("backgroundImage"), uploadHeroImage);
router.delete("/image", deleteHeroImage);

export default router;

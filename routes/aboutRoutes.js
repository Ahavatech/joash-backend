import express from "express";
import { getAbout, updateAbout, addTechnology, deleteTechnology } from "../controllers/aboutController.js";
import { upload } from "../config/cloudinary.js";
const router = express.Router();

router.get("/", getAbout);
router.put("/", updateAbout);
router.post("/tech", upload.single("logo"), addTechnology);
router.delete("/tech/:id", deleteTechnology);

export default router;

import express from "express";
import { getSocials, addSocial, updateSocial, deleteSocial } from "../controllers/socialController.js";
import { upload } from "../config/cloudinary.js";
const router = express.Router();

router.get("/", getSocials);
router.post("/", upload.single("icon"), addSocial);
router.put("/:id", updateSocial);
router.delete("/:id", deleteSocial);

export default router;

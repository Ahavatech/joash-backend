import express from "express";
import { getTechnologies, addTechnology, updateTechnology, deleteTechnology, getTechnology } from "../controllers/technologyController.js";
import { upload } from "../config/cloudinary.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getTechnologies);
router.get("/:id", getTechnology);

// Admin routes (protected)
router.post("/", verifyToken, upload.single("icon"), addTechnology);
router.put("/:id", verifyToken, upload.single("icon"), updateTechnology);
router.delete("/:id", verifyToken, deleteTechnology);

export default router;
import express from "express";
import { getTechnologies, addTechnology, updateTechnology, deleteTechnology, getTechnology } from "../controllers/technologyController.js";
import { upload } from "../config/cloudinary.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getTechnologies);
router.get("/:id", getTechnology);

// Admin routes (protected)
router.post("/", auth, upload.single("icon"), addTechnology);
router.put("/:id", auth, upload.single("icon"), updateTechnology);
router.delete("/:id", auth, deleteTechnology);

export default router;
import express from "express";
import { getProjects, addProject, updateProject, deleteProject } from "../controllers/projectController.js";
import { upload } from "../config/cloudinary.js"; // Multer+Cloudinary middleware

const router = express.Router();

router.get("/", getProjects);
router.post("/", upload.single("image"), addProject);
router.put("/:id", upload.single("image"), updateProject);
router.delete("/:id", deleteProject);
router.delete("/:id", deleteProject);
export default router;
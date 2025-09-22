import express from "express";
import { getProjects, addProject, updateProject, deleteProject } from "../controllers/projectController.js";
import { upload } from "../config/cloudinary.js";
const router = express.Router();

router.get("/", getProjects);
router.post("/", upload.single("image"), addProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;

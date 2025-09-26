import express from "express";
import { getHero, updateHero} from "../controllers/heroController.js";
import { upload } from "../config/cloudinary.js";
const router = express.Router();

router.get("/", getHero);
router.put("/", updateHero);

export default router;

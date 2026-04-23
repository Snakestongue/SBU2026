import { Router  } from "express";
import createAI from "./Controllers/generate.js";

const router = Router();
router.route("/generate").post(createAI)

export default router;
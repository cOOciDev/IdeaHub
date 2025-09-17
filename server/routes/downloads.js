import { Router } from "express";

import { downloadFile } from "../controllers/downloadController.js";

const router = Router();

router.get("/", downloadFile);

export default router;

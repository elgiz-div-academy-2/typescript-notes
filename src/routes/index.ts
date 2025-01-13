import { Router } from "express";
import authRouter from "./auth.router";
import { authMiddleware } from "../middlewares/auth.middleware";
import noteRouter from "./note.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/note", authMiddleware, noteRouter);

export default router;

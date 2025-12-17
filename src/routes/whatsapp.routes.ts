import express from "express";
import { handleIncomingMessage } from "../controllers/whatsapp.controller";

const router = express.Router();
router.post("/", handleIncomingMessage);
export default router;

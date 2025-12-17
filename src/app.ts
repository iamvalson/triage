import express from "express";
import bodyParser from "body-parser";
import whatsappRouter from "./routes/whatsapp.routes";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// health
app.get("/health", (_req, res) => res.json({ ok: true }));

// Twilio webhook
app.use("/webhook/whatsapp", whatsappRouter);

export default app;

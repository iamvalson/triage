import dotenv from "dotenv";
dotenv.config();

export default {
  port: Number(process.env.PORT || 3000),
  mongodbUri: process.env.MONGODB_URI!,
  twilio: {
    sid: process.env.TWILIO_ACCOUNT_SID!,
    token: process.env.TWILIO_AUTH_TOKEN!,
    whatsappNumber: process.env.TWILIO_WHATSAPP_NUMBER!
  },
  geminiKey: process.env.GEMINI_API_KEY!,
  baseUrl: process.env.BASE_URL || "http://localhost:3000",
  adminPhone: process.env.ADMIN_PHONE || "",
  cronTipHour: Number(process.env.CRON_TIP_HOUR || 7)
};

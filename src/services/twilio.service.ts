import twilio from "twilio";
import axios from "axios";
import config from "../config";

const client = twilio(config.twilio.sid, config.twilio.token);

export async function sendWhatsApp(to: string, body: string) {
  try {
    const formatted = to.startsWith("whatsapp:") ? to : `whatsapp:${to}`;
    await client.messages.create({
      from: config.twilio.whatsappNumber,
      to: formatted,
      body,
    });
  } catch (error) {
    console.error("Failed to send WhatsApp message:", error);
    throw error;
  }
}

export async function sendSMS(to: string, body: string) {
  try {
    await client.messages.create({
      from: config.twilio.smsNumber,
      to,
      body,
    });
  } catch (error) {
    console.error("Failed to send SMS:", error);
    throw error;
  }
}

export async function simulateTyping(to: string) {
  try {
    const formatted = to.startsWith("whatsapp:") ? to : `whatsapp:${to}`;
    await client.messages.create({
      from: config.twilio.whatsappNumber,
      to: formatted,
      body: "Typing…",
    });
  } catch (error) {
    console.error("Failed to simulate typing:", error);
    throw error;
  }
}

export async function downloadMedia(url: string): Promise<Buffer> {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      auth: {
        username: config.twilio.sid,
        password: config.twilio.token,
      },
    });
    return Buffer.from(response.data);
  } catch (error) {
    console.error("Failed to download media:", error);
    throw error;
  }
}

export async function sendWhatsAppWithActions(to: string) {
  try {
    const formattedTo = to.startsWith("whatsapp:") 
      ? to
      : `whatsapp:${to}`;

    await client.messages.create({
      from: config.twilio.whatsappNumber,
      to: formattedTo,
      contentSid: config.twilio.templateSid,
    });
  } catch (error) {
    console.error("Failed to send WhatsApp with actions:", error);
    throw error;
  }
}

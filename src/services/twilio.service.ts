import twilio from "twilio";
import axios from "axios";
import config from "../config";

const client = twilio(config.twilio.sid, config.twilio.token);

export async function sendWhatsApp(to: string, body: string) {
  const formatted = to.startsWith("whatsapp:") ? to : `whatsapp:${to}`;
  await client.messages.create({
    from: config.twilio.whatsappNumber,
    to: formatted,
    body,
  });
}

export async function sendSMS(to: string, body: string) {
  await client.messages.create({
    from: config.twilio.smsNumber,
    to,
    body,
  });
}

/**
 * Simulates "typing…" (WhatsApp has no real typing indicator)
 */
export async function simulateTyping(to: string) {
  const formatted = to.startsWith("whatsapp:") ? to : `whatsapp:${to}`;
  await client.messages.create({
    from: config.twilio.whatsappNumber,
    to: formatted,
    body: "Typing…",
  });
}

/**
 * WhatsApp voice notes
 */
export async function downloadMedia(url: string): Promise<Buffer> {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
    auth: {
      username: config.twilio.sid,
      password: config.twilio.token,
    },
  });

  return Buffer.from(response.data);
}

export async function sendWhatsAppWithActions(
  to: string,
) {
  const formattedTo = to.startsWith("whatsapp:") 
    ? to
    : `whatsapp:${to}`;

  await client.messages.create({
    from: config.twilio.whatsappNumber,
    to: formattedTo,
    contentSid: config.twilio.templateSid,
  });
}


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
    from: config.twilio.whatsappNumber,
    to,
    body,
  });
}

/**
 * Simulates "typing…" (WhatsApp has no real typing indicator)
 */
export async function simulateTyping(to: string) {
  const msg = await client.messages.create({
    from: config.twilio.whatsappNumber,
    to: `whatsapp:${to}`,
    body: "Typing…",
  });

  await new Promise(r => setTimeout(r, 1200));
  await client.messages(msg.sid).remove();
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

/**
 * Action buttons (SOS always present)
 */
export async function sendActionButtons(to: string) {
  await client.messages.create({
    from: config.twilio.whatsappNumber,
    to: `whatsapp:${to}`,
    ...(({ interactive: {
      type: "button",
      body: { text: "How can I help you right now?" },
      action: {
        buttons: [
          {
            type: "reply",
            reply: { id: "ACTION_SOS", title: "🚨 Emergency Help" },
          },
          {
            type: "reply",
            reply: { id: "ACTION_SYMPTOMS", title: "🩺 Describe Symptoms" },
          },
          {
            type: "reply",
            reply: { id: "ACTION_ADD_CONTACT", title: "➕ Add Contact" },
          },
        ],
      },
    },
  } as any)),
  });
}

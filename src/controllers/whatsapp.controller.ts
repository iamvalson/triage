import { Request, Response } from "express";
import User from "../models/User";
import * as twilio from "../services/twilio.service";
import * as ai from "../services/ai.service";
import * as location from "../services/location.service";

type TwilioBody = {
  From: string;
  Body?: string;
  ButtonPayload?: string;
  MediaUrl0?: string;
  MediaContentType0?: string;
  Latitude?: string;
  Longitude?: string;
};

export async function handleIncomingMessage(req: Request, res: Response) {
  const body = req.body as TwilioBody;
  const phone = body.From;
  const text = body.Body?.trim();

  let user = await User.findOne({ phone });

  /* -------- REGISTRATION -------- */

  if (!user) {
    user = await User.create({
      phone,
      registrationState: "AWAITING_NAME",
    });

    await twilio.sendWhatsApp(
      phone,
      "Hi there 👋\n\nI’m here to help in health emergencies.\n\nWhat’s your name?"
    );
    return res.sendStatus(200);
  }

  if (user.registrationState === "AWAITING_NAME") {
    user.name = text;
    user.registrationState = "AWAITING_CONTACTS";
    await user.save();

    await twilio.sendWhatsApp(
      phone,
      `Thanks, ${user.name}.\n\nPlease send at least ONE emergency contact number.\nExample:\n+2348012345678`
    );
    return res.sendStatus(200);
  }

  if (user.registrationState === "AWAITING_CONTACTS") {
    const contacts =
      text?.split(",").map(c => c.trim()).filter(c => /^\+?\d{10,15}$/.test(c)) ||
      [];

    if (contacts.length < 1) {
      await twilio.sendWhatsApp(
        phone,
        "I need at least one valid phone number to continue."
      );
      return res.sendStatus(200);
    }

    user.emergencyContacts = contacts;
    user.registrationState = "ACTIVE";
    await user.save();

    await twilio.sendWhatsApp(
      phone,
      "You're all set.\n\nYou can describe symptoms anytime, or tap Emergency Help if needed."
    );
    await twilio.sendActionButtons(phone);
    return res.sendStatus(200);
  }

  /* -------- BUTTON ACTIONS -------- */

  if (body.ButtonPayload === "ACTION_SOS") {
    await triggerSOS(user, body);
    return res.sendStatus(200);
  }

  if (body.ButtonPayload === "ACTION_ADD_CONTACT") {
    user.registrationState = "AWAITING_CONTACTS";
    await user.save();

    await twilio.sendWhatsApp(
      phone,
      "Please send the emergency contact number(s)."
    );
    return res.sendStatus(200);
  }

  /* -------- TRIAGE -------- */

  let triage;
  if (body.MediaUrl0?.includes("audio")) {
    const audio = await twilio.downloadMedia(body.MediaUrl0);
    triage = await ai.triageSymptom(audio, true);
  } else if (text) {
    triage = await ai.triageSymptom(text, false);
  }

  if (!triage) {
    await twilio.sendWhatsApp(phone, "I couldn’t understand that. Please try again.");
    return res.sendStatus(200);
  }

  await twilio.simulateTyping(phone);

  let message = `Here’s what you can do right now:\n\n${triage.first_aid}`;

  if (triage.is_critical && triage.confidence >= 0.75) {
    message =
      `⚠️ This could be serious.\n\n${triage.first_aid}\n\nEmergency help is ready below.`;
  }

  await twilio.sendWhatsApp(phone, message);
  await twilio.sendActionButtons(phone);

  if (triage.is_critical && triage.confidence >= 0.75) {
    await triggerSOS(user, body, triage);
  }

  return res.sendStatus(200);
}

async function triggerSOS(user: any, body: TwilioBody, triage?: any) {
  const lat = Number(body.Latitude);
  const lon = Number(body.Longitude);

  let facility;
  if (lat && lon) {
    try {
      facility = await location.findNearestSpecialist(
        triage?.specialization || "Emergency",
        lat,
        lon
      );
    } catch {}
  }

  const map =
    lat && lon
      ? `https://www.google.com/maps?q=${lat},${lon}`
      : "Location unavailable";

  const alert = `🚨 Emergency Alert

${user.name} needs urgent help.

Possible issue: ${triage?.specialization || "Unknown"}
Location: ${map}

Nearest facility:
${facility?.name || "Not available"}
${facility?.address || ""}`;

  for (const c of user.emergencyContacts) {
    await twilio.sendSMS(c, alert);
  }

  await twilio.sendWhatsApp(
    user.phone,
    "Emergency help has been triggered.\nYour contacts have been notified."
  );
}

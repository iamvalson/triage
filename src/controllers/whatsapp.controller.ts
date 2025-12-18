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

  await twilio.simulateTyping(phone);
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
    if (!text || text.length < 2) {
      await twilio.sendWhatsApp(phone, "Please send a valid name.");
      return res.sendStatus(200);
    }

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
      text
        ?.split(",")
        .map((c) => c.trim())
        .filter((c) => /^\+?\d{10,15}$/.test(c)) || [];

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
    await twilio.sendWhatsAppWithActions(phone);
    return res.sendStatus(200);
  }


  /* -------- BUTTON ACTIONS -------- */

  if (body.ButtonPayload === "ACTION_SOS") {
    if (
      user.lastSOSAt &&
      Date.now() - user.lastSOSAt.getTime() < 5 * 60 * 1000
    ) {
      await twilio.sendWhatsApp(
        phone,
        "SOS already triggered recently. Help is on the way."
      );
      return res.sendStatus(200);
    }

    user.lastSOSAt = new Date();
    await user.save();

    await triggerSOS(user, body);
    await twilio.sendWhatsApp(
      phone,
      "Emergency help has been triggered.\nYour contacts have been notified."
    );
    return res.sendStatus(200);
  }

/* -------- BUTTON ACTIONS -------- */

if (body.ButtonPayload === "ACTION_HOSPITAL") {
  await twilio.sendWhatsApp(
    phone,
    "Please share your location so I can find the nearest health facility.\n\n" +
    "1️⃣ Use the attachment (paperclip) icon → Location\n" +
    "2️⃣ Or type your address like this: Location: <your address>"
  );
  return res.sendStatus(200);
}

/* -------- LOCATION HANDLING -------- */

// User typed "Location: ..." or sent geo coordinates
let lat: number | null = null;
let lon: number | null = null;

if (body.Latitude && body.Longitude) {
  lat = Number(body.Latitude);
  lon = Number(body.Longitude);
} else if (text?.toLowerCase().startsWith("location:")) {
  const address = text.substring(9).trim();
  if (address) {
    try {
      const coords = await location.geocodeAddress(address);
      lat = coords.lat;
      lon = coords.lon;
    } catch (err) {
      await twilio.sendWhatsApp(phone, "Sorry, I couldn't find that address. Please try again.");
      return res.sendStatus(200);
    }
  }
}

if (lat && lon) {
  try {
    const facility = await location.findNearestSpecialist("General Medicine", lat, lon);
    await twilio.sendWhatsApp(
      phone,
      `🏥 Nearest facility:\n${facility.name}\n${facility.address}\n[View on map](${facility.mapsUrl})`
    );
  } catch {
    await twilio.sendWhatsApp(phone, "No nearby facilities were found within 5km.");
  }
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
    await twilio.sendWhatsApp(
      phone,
      "I couldn’t understand that. Please try again."
    );
    return res.sendStatus(200);
  }

  let message = `Here’s what you can do right now:\n\n${triage.first_aid}`;

  if (triage.is_critical && triage.confidence >= 0.75) {
    message = `⚠️ This could be serious.\n\n${triage.first_aid}\n\nEmergency help is ready below.`;
  }

  await twilio.sendWhatsApp(phone, message);
  await twilio.sendWhatsAppWithActions(phone);

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

  try {
    for (const c of user.emergencyContacts) {
      await twilio.sendSMS(c, alert);
    }
  } catch (err) {
    console.error("Error sending SOS SMS:", err);
    await twilio.sendWhatsApp(
      user.phone,
      "Currently unable to notify your emergency contacts.\n Because this is Twilio Sandbox, SMS to unverified numbers may fail."
    );
  }
  await twilio.sendWhatsApp(
    user.phone,
    "Emergency help has been triggered.\nYour contacts have been notified."
  );
}

import Reminder from "../models/Reminder";

/**
 * Simple consult logger: saves as Reminder of type consult (demo).
 * In production, notify admin or connect to doctor platform.
 */
export async function logConsultRequest(phone: string, reason: string) {
  await Reminder.create({ phone, type: "consult", text: reason, cron: "" });
  // TODO: notify admin via Twilio SMS or email
}

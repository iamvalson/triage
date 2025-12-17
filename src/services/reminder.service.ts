import Reminder from "../models/Reminder";
import cron from "node-cron";
import * as twilioService from "./twilio.service";

const jobs: Record<string, cron.ScheduledTask> = {};

export async function loadAndScheduleAll() {
  const reminders = await Reminder.find({});
  for (const r of reminders) scheduleReminder(r);
}

export function scheduleReminder(reminder: any) {
  try {
    if (!reminder.cron) return;
    const id = reminder._id.toString();
    if (jobs[id]) jobs[id].stop();

    const job = cron.schedule(reminder.cron, async () => {
      try {
        await twilioService.sendWhatsApp(reminder.phone, `Reminder: ${reminder.text}`);
      } catch (err) {
        console.error("Reminder send failed", err);
      }
    });
    jobs[id] = job;
  } catch (err) {
    console.error("scheduleReminder error", err);
  }
}

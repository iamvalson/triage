import { parse } from "date-fns";

/**
 * Naive reminder parser for hackathon. Prefer using AI extraction for robust parsing.
 * Detects HH:MM in text and returns cron for daily at that time.
 */
export async function parseReminderText(text: string) {
  const m = text.match(/(\d{1,2}:\d{2})/);
  if (m) {
    const time = m[1];
    const [hh, mm] = time.split(":").map(Number);
    const cronExpr = `${mm} ${hh} * * *`;
    return { type: "medication", text, cron: cronExpr, nextRun: null };
  }
  // fallback: daily at 09:00
  return { type: "general", text, cron: "0 9 * * *", nextRun: null };
}

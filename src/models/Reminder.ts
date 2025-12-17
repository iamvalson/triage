import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  type: String,
  text: String,
  cron: String,
  nextRun: Date,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Reminder || mongoose.model("Reminder", ReminderSchema);

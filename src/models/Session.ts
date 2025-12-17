import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  mode: { type: String, default: "ai" },
  tempData: { type: mongoose.Schema.Types.Mixed, default: {} },
  location: {
    lat: Number,
    lon: Number,
    areaText: String
  },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Session || mongoose.model("Session", SessionSchema);

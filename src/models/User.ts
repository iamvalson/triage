import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },

  name: { type: String },

  emergencyContacts: {
    type: [String],
    default: [],
    validate: (v: string[]) => Array.isArray(v) && v.length >= 1,
  },

  registrationState: {
    type: String,
    enum: [
      "NEW",
      "AWAITING_NAME",
      "AWAITING_CONTACTS",
      "ACTIVE",
    ],
    default: "NEW",
  },

  createdAt: { type: Date, default: Date.now },
});


export default mongoose.models.User || mongoose.model("User", UserSchema);

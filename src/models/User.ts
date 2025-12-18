import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
    },

    lastSOSAt: { type: Date },
    currentIntent: { type: String, enum: ["HOSPITAL", "SOS", null] },



    emergencyContacts: {
      type: [String],
      validate: {
        validator: function (this: any, v: string[]) {
          // Only enforce when user is ACTIVE
          if (this.registrationState === "ACTIVE") {
            return Array.isArray(v) && v.length >= 1;
          }
          return true;
        },
        message: "At least one emergency contact is required",
      },
      default: [],
    },

    registrationState: {
      type: String,
      enum: ["AWAITING_NAME", "AWAITING_CONTACTS", "ACTIVE"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

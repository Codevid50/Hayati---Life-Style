import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      unique: true,
      sparse: true, // allow null but still unique when provided
    },

    email: {
      type: String,
      unique: true,
      sparse: true, // email may be null for phone-only users
    },

    name: {
      type: String,
    },

    image: {
      type: String,
    },

    provider: {
      type: String, // "google" | "facebook" | "phone"
      default: "phone",
    },

    providerId: {
      type: String, // google id or facebook id
      unique: true,
      sparse: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);

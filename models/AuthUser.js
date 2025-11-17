import mongoose from "mongoose";

const authUserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  provider: String,
}, { timestamps: true });

export default mongoose.models.AuthUser || mongoose.model("AuthUser", authUserSchema);

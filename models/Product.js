import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  image: String,
  price: Number,
  oldPrice: Number,
  discount: Number,
  rating: Number,
  desc: String,
  briefDesc: String,
  category: String,
  type: String,
  sizes: [String],
  createdAt: { type: Date, default: Date.now },
});

// ✅ Explicitly define the exact collection names
export const MenProduct =
  mongoose.models.MenProduct ||
  mongoose.model("MenProduct", productSchema, "menProducts");

export const WomenProduct =
  mongoose.models.WomenProduct ||
  mongoose.model("WomenProduct", productSchema, "womenProducts");

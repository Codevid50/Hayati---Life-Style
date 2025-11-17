import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { MenProduct, WomenProduct } from "@/models/Product";

export async function GET(req, context) {
  try {
      const { params } = context;
       const { id } = await params;

    await connectDB();

    const product =
      (await MenProduct.findById(id)) ||
      (await WomenProduct.findById(id));

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });

  } catch (error) {
    console.error("PRODUCT API ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

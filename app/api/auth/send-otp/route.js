import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { success: false, message: "Phone number required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store or update OTP in MongoDB
    await User.findOneAndUpdate(
      { phone },
      { phone, otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // For now, return it directly (for testing)
    return NextResponse.json({
      success: true,
      otp,
      message: "OTP stored in MongoDB successfully",
    });
  } catch (err) {
    console.error("Error generating OTP:", err);
    return NextResponse.json(
      { success: false, message: "Error generating OTP" },
      { status: 500 }
    );
  }
}

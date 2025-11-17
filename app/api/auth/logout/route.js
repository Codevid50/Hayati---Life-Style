// app/api/auth/logout/route.js
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true, message: "Logged out" });
  res.cookies.set("authToken", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });
  return res;
}

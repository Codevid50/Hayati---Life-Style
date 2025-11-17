// in app/login/page.js (or wherever your Login component is)
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSendOtp = async () => {
    if (phone.length !== 10) return setMessage("Enter valid 10 digit number");
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    const data = await res.json();
    if (data.success) {
      setOtpSent(true);
      setMessage("OTP sent (for dev it is logged to response).");
    } else setMessage(data.message || "Error sending OTP");
  };

  const handleVerifyOtp = async () => {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp }),
    });
    const data = await res.json();

    if (res.ok && data.success) {
      // server sets httpOnly cookie (authToken). Also set client flag so Navbar updates instantly:
      localStorage.setItem("user", JSON.stringify({ phone })); // non-sensitive marker
      setMessage("Login successful — redirecting...");
      router.push("/"); // go home
    } else {
      setMessage(data.message || "OTP verification failed");
    }
  };

  return (
    /* ... your JSX unchanged, but call handleSendOtp and handleVerifyOtp ... */
  );
};

export default Login;

"use client"
import React, {useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [serverOtp, setServerOtp] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter()

  // 🧠 Function to send OTP
  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      setMessage("Please enter a valid 10-digit number");
      return;
    }

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      console.log(data.otp)

      if (data.success) {
        setOtpSent(true);
        setServerOtp(data.otp); // Temporary (remove in production)
        setMessage("OTP sent successfully!");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("Error sending OTP");
    }
  };

  // 🧠 Function to verify OTP
const handleVerifyOtp = () => {
  if (otp === serverOtp.toString()) {
    setMessage("✅ Login successful!");

    // ✅ Save user info in localStorage
    localStorage.setItem("user", JSON.stringify({ phone }));

    // ✅ Redirect to home
    router.push("/");
  } else {
    setMessage("❌ Invalid OTP. Try again.");
  }
};

  return (
    <div className="grid grid-cols-2">
      {/* LEFT IMAGE SECTION */}
      <div className="leftSection">
        <img
          src="https://images.bewakoof.com/web/rm-login-desk-v2.jpg"
          alt=""
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="rightSection">
        <div className="my-52 mx-12">
          <h3 className="font-semibold text-xl">Login / Sign up</h3>
          <p className="text-gray-500">
            Join us now to be a part of Bewakoof® family.
          </p>

          {!otpSent ? (
            <>
              <div className="number my-3 mx-4 border w-fit rounded-lg">
                <input
                  className="w-100 px-2 py-3 focus:outline focus:border-2"
                  placeholder="Enter Mobile Number"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button
                onClick={handleSendOtp}
                className="bg-yellow-400 w-100 mx-4 my-2 py-3 px-1 rounded-lg font-bold"
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <div className="number my-3 mx-4 border w-fit rounded-lg">
                <input
                  className="w-100 px-2 py-3 focus:outline focus:border-2"
                  placeholder="Enter OTP"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button
                onClick={handleVerifyOtp}
                className="bg-green-400 w-100 mx-4 my-2 py-3 px-1 rounded-lg font-bold"
              >
                Verify OTP
              </button>
            </>
          )}

          {message && (
            <p className="mx-4 my-2 text-sm text-gray-700">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

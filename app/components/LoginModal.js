"use client";
import { signIn } from "next-auth/react";

export default function LoginModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-xl relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl font-bold"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Login / Signup
        </h2>

        {/* Google Login */}
        <button
          onClick={() => signIn("google")}
          className="w-full border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <img src="/google.png" className="w-5" alt="Google" />
          Continue with Google
        </button>

        <p className="text-xs text-gray-500 mt-4 text-center leading-5 px-2">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}

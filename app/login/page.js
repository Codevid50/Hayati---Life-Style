"use client";
import { signIn } from "next-auth/react";

const Login = () => {
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

          <button
            onClick={() => signIn("google")}
            className="w-full border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors mt-4"
          >
            <img src="/google.png" className="w-5" alt="Google" />
            Continue with Google
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center leading-5 px-2">
            By continuing, you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

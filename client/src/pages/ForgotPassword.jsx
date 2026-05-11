import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { ArrowRight, Mail, Smartphone } from "lucide-react";
import axios from "axios";

import AuthLayout from "../layouts/Auth.layout.jsx";

function ForgotPassword() {
  // email OR phone
  const [method, setMethod] = useState("email");

  // flow steps
  const [step, setStep] = useState("input");

  // form states
  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  // send action
  const handleSend = async () => {

  if (method === "email") {
    await sendResetEmail();
  }

  if (method === "phone") {
    await sendOTP();
  }
};

  // verify otp
  const handleVerifyOtp = () => {
    // later real verification
    setStep("reset");
  };

  // reset password
  const handleResetPassword = async () => {

  try {

    if (
      newPassword !==
      confirmPassword
    ) {

      toast.error(
        "Passwords do not match"
      );

      return;
    }

    await axios.post(
      "http://localhost:8000/api/auth/reset-password-phone",
      {
        phone,
        newPassword,
      }
    );

    toast.success(
      "Password updated"
    );

    setStep("done");

  } catch (error) {

    toast.error(
      "Failed to reset password"
    );
  }
};

  const sendResetEmail = async () => {
  try {
    // backend request
    const response = await fetch(
      "http://localhost:8000/api/auth/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message);

      return;
    }

    // SEND EMAIL USING EMAILJS
    await emailjs.send(
      import.meta.env
        .VITE_EMAILJS_SERVICE_ID,

      import.meta.env
        .VITE_EMAILJS_TEMPLATE_ID,

      {
        user_name: data.userName,

        reset_link: data.resetLink,

        to_email: email,
      },

      import.meta.env
        .VITE_EMAILJS_PUBLIC_KEY
    );

    toast.success(
      "Reset email sent successfully"
    );

    setStep("success");

  } catch (error) {
    console.log(error);
    toast.error(
      "Failed to send reset email"
    );
  }
};

  const setupRecaptcha = () => {

  if (!window.recaptchaVerifier) {

    window.recaptchaVerifier =
      new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",

          callback: () => {
            console.log(
              "Recaptcha verified"
            );
          },
        }
      );
  }
};

  const sendOTP = async () => {

  try {

    const response = await axios.post(
      "http://localhost:8000/api/auth/check-phone",
      { phone }
    );

    if (!response.data.exists) {

      toast.error(
        "Phone number not found"
      );

      return;
    }

    setupRecaptcha();

    const appVerifier =
      window.recaptchaVerifier;

    const cleanPhone = String(phone).replace(/^0+/, "");

    const formattedPhone =
      `+91${cleanPhone}`;

    const confirmationResult =
      await signInWithPhoneNumber(
        auth,
        formattedPhone,
        appVerifier
      );

    window.confirmationResult =
      confirmationResult;

    toast.success("OTP Sent");

    setStep("otp");

  } catch (error) {

    console.log(error);

    toast.error(
      "Failed to send OTP"
    );
  }
};

  return (
    <AuthLayout>
      <div>
        {/* TITLE */}
        <h1 className="text-4xl font-black text-center text-slate-900">
          Forgot Password
        </h1>

        <p className="text-slate-600 text-center mt-3 leading-relaxed">
          Recover your account securely using
          email or mobile OTP.
        </p>

        {/* METHOD SELECT */}
        {step === "input" && (
          <>
            <div className="mt-10 flex gap-4">
              
              {/* EMAIL */}
              <button
                onClick={() =>
                  setMethod("email")
                }
                className={`flex-1 rounded-2xl py-4 flex items-center justify-center gap-2 font-semibold transition-all duration-300 ${
                  method === "email"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "bg-white/60 text-slate-700 border border-white/70"
                }`}
              >
                <Mail className="w-5 h-5" />

                Email
              </button>

              {/* PHONE */}
              <button
                onClick={() =>
                  setMethod("phone")
                }
                className={`flex-1 rounded-2xl py-4 flex items-center justify-center gap-2 font-semibold transition-all duration-300 ${
                  method === "phone"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "bg-white/60 text-slate-700 border border-white/70"
                }`}
              >
                <Smartphone className="w-5 h-5" />

                Mobile OTP
              </button>
            </div>

            {/* INPUT AREA */}
            <div className="mt-10">
              
              {/* EMAIL INPUT */}
              {method === "email" && (
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="flex-1 bg-white/60 border border-white/70 focus:border-blue-500 rounded-2xl px-5 py-4 outline-none transition-all duration-300"
                  />

                  <button
                    onClick={handleSend}
                    className="w-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-200 transition-all duration-300 hover:scale-105"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* PHONE INPUT */}
              {method === "phone" && (
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter mobile number"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    className="flex-1 bg-white/60 border border-white/70 focus:border-blue-500 rounded-2xl px-5 py-4 outline-none transition-all duration-300"
                  />

                  <button
                    onClick={handleSend}
                    className="w-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-200 transition-all duration-300 hover:scale-105"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-center">
              Verify OTP
            </h2>

            <p className="text-center text-slate-500 mt-2">
              Enter the OTP sent to your mobile
              number.
            </p>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
              className="w-full mt-8 bg-white/60 border border-white/70 focus:border-blue-500 rounded-2xl px-5 py-4 outline-none transition-all duration-300 text-center tracking-[10px] text-2xl"
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-blue-200 transition-all duration-300"
            >
              Verify OTP
            </button>

            <p className="text-center mt-5 text-sm text-slate-500">
              Didn’t receive OTP?{" "}

              <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                Resend
              </span>
            </p>
          </div>
        )}

        {/* RESET PASSWORD STEP */}
        {step === "reset" && (
          <div className="mt-10 space-y-6">
            <h2 className="text-xl font-bold text-center">
              Reset Password
            </h2>

            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              className="w-full bg-white/60 border border-white/70 focus:border-blue-500 rounded-2xl px-5 py-4 outline-none transition-all duration-300"
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="w-full bg-white/60 border border-white/70 focus:border-blue-500 rounded-2xl px-5 py-4 outline-none transition-all duration-300"
            />

            <button
              onClick={handleResetPassword}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-blue-200 transition-all duration-300"
            >
              Reset Password
            </button>
          </div>
        )}

        {/* EMAIL SUCCESS */}
        {step === "success" && (
          <div className="mt-12 text-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 mx-auto flex items-center justify-center">
              <Mail className="w-10 h-10 text-blue-600" />
            </div>

            <h2 className="text-2xl font-black mt-6">
              Reset Link Sent
            </h2>

            <p className="text-slate-500 mt-3 leading-relaxed">
              Please check your email to continue
              resetting your password.
            </p>
          </div>
        )}

        {/* FINAL SUCCESS */}
        {step === "done" && (
          <div className="mt-12 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 mx-auto flex items-center justify-center">
              <span className="text-3xl">
                ✓
              </span>
            </div>

            <h2 className="text-2xl font-black mt-6">
              Password Updated
            </h2>

            <p className="text-slate-500 mt-3">
              Your password has been reset
              successfully.
            </p>
          </div>
        )}
        <div id="recaptcha-container"></div>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
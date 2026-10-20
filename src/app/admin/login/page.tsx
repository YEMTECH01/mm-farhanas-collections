"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getLocalAdminCredentials,
  saveAdminCredentials,
  DEFAULT_ADMIN_USERNAME,
  DEFAULT_ADMIN_PASSWORD,
} from "@/lib/admin-credentials";

const ADMIN_WHATSAPP_NUMBER = "2349164042504";

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function buildOtpWhatsAppUrl(type: "username" | "password", otp: string) {
  const message = encodeURIComponent(
    `MM | FARHANA'S Admin Recovery%0A%0AYour ${type} reset OTP is: *${otp}*%0AUse this code to continue with your admin recovery.`,
  );

  return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${message}`;
}

export default function AdminLogin() {
  const [username, setUsername] = useState(DEFAULT_ADMIN_USERNAME);
  const [password, setPassword] = useState(DEFAULT_ADMIN_PASSWORD);
  const [error, setError] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [recoveryType, setRecoveryType] = useState<
    "username" | "password" | null
  >(null);
  const [otpCode, setOtpCode] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = getLocalAdminCredentials();
    if (saved) {
      setUsername(saved.username);
      setPassword(saved.password);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  const handleResetCredentials = (e: React.FormEvent) => {
    e.preventDefault();

    if (!recoveryType) {
      setResetMessage("Select a recovery type first.");
      return;
    }

    if (!isOtpSent) {
      const newOtp = generateOtp();
      localStorage.setItem("mm_admin_reset_otp", newOtp);
      localStorage.setItem("mm_admin_reset_type", recoveryType);
      setOtpCode(newOtp);
      setIsOtpSent(true);
      const otpUrl = buildOtpWhatsAppUrl(recoveryType, newOtp);
      window.open(otpUrl, "_blank");
      setResetMessage(
        `OTP sent to WhatsApp. Enter the 6-digit code you received to continue.`,
      );
      return;
    }

    if (otpInput.trim() !== otpCode) {
      setResetMessage("The OTP you entered is incorrect.");
      return;
    }

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (recoveryType === "username" && !trimmedUsername) {
      setResetMessage("Please enter a new username.");
      return;
    }

    if (recoveryType === "password" && !trimmedPassword) {
      setResetMessage("Please enter a new password.");
      return;
    }

    const success =
      recoveryType === "username"
        ? saveAdminCredentials(trimmedUsername, password)
        : saveAdminCredentials(username, trimmedPassword);

    setResetMessage(
      success
        ? `Admin ${recoveryType} updated successfully.`
        : `Could not update the admin ${recoveryType}.`,
    );

    if (success) {
      localStorage.removeItem("mm_admin_reset_otp");
      localStorage.removeItem("mm_admin_reset_type");
      setShowReset(false);
      setIsOtpSent(false);
      setOtpInput("");
      setOtpCode("");
      setRecoveryType(null);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-beige flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-sm border border-luxury-gray bg-white p-8 shadow-lg">
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-[#d9cbb2] bg-[#f7f1e8]/70 px-4 py-3 shadow-[0_0_0_1px_rgba(217,203,178,0.18)]">
            <div className="flex flex-col items-center leading-none">
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl tracking-[0.08em] text-luxury-dark">
                  MM |
                </span>
                <span className="font-serif text-xl tracking-[0.14em] text-luxury-dark">
                  FARHANA'S
                </span>
              </div>
              <span className="mt-1 font-serif text-[9px] uppercase tracking-[0.36em] text-luxury-dark/70">
                ADMIN
              </span>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-sm bg-red-50 p-3 text-center text-sm text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-sm border border-luxury-gray p-3 focus:border-luxury-gold focus:outline-none"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-luxury-gray p-3 focus:border-luxury-gold focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-luxury-dark py-3 tracking-widest text-white transition-colors hover:bg-black"
          >
            LOGIN
          </button>
        </form>

        <div className="mt-6 border-t border-luxury-gray pt-4">
          <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.18em] text-luxury-dark">
            <button
              type="button"
              onClick={() => {
                setRecoveryType("username");
                setShowReset(true);
                setIsOtpSent(false);
                setOtpInput("");
                setResetMessage("");
              }}
              className="text-left underline-offset-4 hover:underline"
            >
              Forgot username?
            </button>
            <button
              type="button"
              onClick={() => {
                setRecoveryType("password");
                setShowReset(true);
                setIsOtpSent(false);
                setOtpInput("");
                setResetMessage("");
              }}
              className="text-left underline-offset-4 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {showReset && (
            <form onSubmit={handleResetCredentials} className="mt-4 space-y-3">
              {!isOtpSent ? (
                <button
                  type="submit"
                  className="w-full bg-luxury-dark py-3 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-black"
                >
                  Send OTP to WhatsApp
                </button>
              ) : (
                <>
                  <input
                    type="text"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className="w-full rounded-sm border border-luxury-gray p-3 focus:border-luxury-gold focus:outline-none"
                  />

                  {recoveryType === "username" ? (
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="New username"
                      className="w-full rounded-sm border border-luxury-gray p-3 focus:border-luxury-gold focus:outline-none"
                    />
                  ) : (
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="New password"
                      className="w-full rounded-sm border border-luxury-gray p-3 focus:border-luxury-gold focus:outline-none"
                    />
                  )}

                  <button
                    type="submit"
                    className="w-full bg-luxury-dark py-3 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-black"
                  >
                    Verify OTP & Save
                  </button>
                </>
              )}

              {resetMessage && (
                <p className="text-center text-xs text-luxury-dark">
                  {resetMessage}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

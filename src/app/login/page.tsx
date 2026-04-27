"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { setToken, setUser, type UserStatus } from "@/lib/auth";
import { uploads } from "@/lib/api";

function routeByStatus(status: UserStatus | undefined) {
  if (status === "processing") return "/calibrating";
  if (status === "ready") return "/dashboard";
  return "/onboarding";
}

const BASE = "https://dunno-backend-production.up.railway.app";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegister = searchParams.get("mode") === "register";

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setEmail(val);
    setEmailError(val && !EMAIL_RE.test(val) ? "Enter a valid email address" : "");
  }

  async function handleSendOtp() {
    if (!EMAIL_RE.test(email)) { setEmailError("Enter a valid email address"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BASE}/auth/verification/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail ?? "Failed to send OTP");
      setSessionId(data.session_id);
      setStep("otp");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function firePostAuthUploads() {
    const b64 = sessionStorage.getItem("dunno_resume_b64");
    const name = sessionStorage.getItem("dunno_resume_name") ?? "resume.pdf";
    const type = sessionStorage.getItem("dunno_resume_type") ?? "application/pdf";
    const github = sessionStorage.getItem("dunno_github_url");
    await Promise.all([
      b64 ? uploads.resume(b64, name, type).catch(() => {}) : null,
      github ? uploads.github(github).catch(() => {}) : null,
    ]);
    sessionStorage.removeItem("dunno_resume_b64");
    sessionStorage.removeItem("dunno_resume_name");
    sessionStorage.removeItem("dunno_resume_type");
    sessionStorage.removeItem("dunno_github_url");
  }

  async function handleVerifyOtp() {
    if (otp.length !== 8) { setError("Enter the 8-digit code"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BASE}/auth/verification/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail ?? "Invalid code");
      setToken(data.access_token);
      setUser(data.user);
      await firePostAuthUploads();
      router.replace(routeByStatus(data.user.status));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f2e8] flex flex-col items-center justify-center px-6 py-16">

      {(isRegister || step === "otp") && (
        <button
          type="button"
          onClick={() => step === "otp" ? setStep("email") : router.back()}
          className="fixed top-5 left-6 flex items-center gap-2 text-[13px] font-[600] text-[#6b4a28] hover:text-[#D4834A] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      )}

      <div className="mb-12">
        <Logo size="md" />
      </div>

      <div className="w-full max-w-sm bg-white rounded-2xl shadow-[0_8px_40px_rgba(139,78,26,0.08)] p-10">
        <h1 className="headline-s text-[#1c0f00] mb-2">Sign in</h1>
        <p className="body-s text-[#6b4a28] mb-8">
          {step === "otp"
            ? `We sent a code to ${email}`
            : "Get your AI portfolio in minutes"}
        </p>

        {error && (
          <div className="mb-6 bg-[#fde8d8] rounded-lg px-4 py-3">
            <p className="text-[13px] font-[600] text-[#7a2a00]">{error}</p>
          </div>
        )}

        {step === "email" ? (
          <>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                placeholder="you@example.com"
                autoFocus
                className="w-full px-4 py-3 rounded-xl border text-[14px] font-[500] text-[#1c0f00] placeholder:text-[#d4b896] outline-none transition-colors"
                style={{ borderColor: emailError ? "#ea4335" : "rgba(212,184,150,0.40)" }}
              />
              {emailError && (
                <p className="mt-1.5 text-[12px] font-[600] text-[#ea4335]">{emailError}</p>
              )}
            </div>
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading || !email}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-[14px] font-[600] text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg, #D4834A, #8B4E1A)" }}
            >
              {loading ? "Sending…" : "Send code"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <div className="mb-4">
              <input
                type="text"
                inputMode="numeric"
                maxLength={8}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && handleVerifyOtp()}
                placeholder="123456"
                autoFocus
                className="w-full px-4 py-3 rounded-xl border text-[14px] font-[500] text-[#1c0f00] placeholder:text-[#d4b896] outline-none tracking-[0.2em] text-center transition-colors"
                style={{ borderColor: "rgba(212,184,150,0.40)" }}
              />
            </div>
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={loading || otp.length !== 8}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-[14px] font-[600] text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg, #D4834A, #8B4E1A)" }}
            >
              {loading ? "Verifying…" : "Verify & continue"}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full mt-3 text-[13px] font-[600] text-[#6b4a28] hover:text-[#D4834A] transition-colors"
            >
              Resend code
            </button>
          </>
        )}
      </div>

      <p className="mt-8 text-[13px] font-[600] text-[#6b4a28] text-center">
        By continuing you agree to Dunno&apos;s terms and privacy policy.
      </p>

      {/* DEV ONLY — remove before prod */}
      <button
        type="button"
        onClick={async () => {
          const res = await fetch(`${BASE}/auth/dev-login`, { method: "POST" });
          const data = await res.json();
          setToken(data.access_token);
          if (data.user) setUser(data.user);
          await firePostAuthUploads();
          router.replace(routeByStatus(data.user?.status));
        }}
        className="mt-6 text-[11px] text-[#d4b896] hover:text-[#6b4a28] transition-colors"
      >
        dev login
      </button>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f9f2e8]" />}>
      <LoginForm />
    </Suspense>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { setUser, getUser } from "@/lib/auth";
import { onboarding } from "@/lib/api";
import { useRequireUser } from "@/lib/useRequireUser";

const MESSAGES = [
  "Waking up the AI…",
  "Reading your resume…",
  "Scanning your projects…",
  "Quantifying your experience…",
  "Mapping your skills…",
  "Polishing your story…",
  "Crafting your narrative…",
  "Almost ready…",
];

const MSG_INTERVAL = 1800;

export default function CalibratingPage() {
  const router = useRouter();
  const [msgIndex, setMsgIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const { user, checkingUser } = useRequireUser();

  useEffect(() => {
    if (checkingUser) return;
    if (!user) return;
    if (user.status === "ready") { router.replace(`/${user.username}`); return; }

    // Cycle messages while generation runs
    let idx = 0;
    const msgTimer = setInterval(() => {
      idx = (idx + 1) % MESSAGES.length;
      setTextVisible(false);
      setTimeout(() => { setMsgIndex(idx); setTextVisible(true); }, 280);
    }, MSG_INTERVAL);

    // Fire POST /portfolio/generate and wait for the synchronous response
    onboarding
      .generate()
      .then((res) => {
        clearInterval(msgTimer);
        const current = getUser();
        if (current) setUser({ ...current, status: "ready" });
        // Use the username from stored user to navigate to portfolio
        const username = current?.username ?? user.username;
        void res; // generated_content is fetched fresh by the portfolio page
        router.replace(`/${username}`);
      })
      .catch((err: unknown) => {
        clearInterval(msgTimer);
        setErrorMsg(err instanceof Error ? err.message : "Generation failed. Please try again.");
      });

    return () => clearInterval(msgTimer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkingUser, user]);

  const name = user?.email?.split("@")[0] ?? "you";

  return (
    <div className="min-h-screen bg-[#f9f2e8] flex flex-col items-center justify-center px-6 text-center select-none">

      <div className="relative mb-12" style={{ animation: "logoBreath 2.4s ease-in-out infinite" }}>
        <div
          className="absolute rounded-full bg-[#F5A84A] blur-[64px]"
          style={{ inset: "-50%", animation: "glowPulse 2.4s ease-in-out infinite" }}
        />
        <Logo size="xl" showWordmark={false} href="" className="relative" />
      </div>

      <p className="label-m text-[#D4834A] mb-5">hey, {name} 👋</p>

      {errorMsg ? (
        <div style={{ maxWidth: 400 }}>
          <p className="headline-s text-[#7a2a00] mb-6">{errorMsg}</p>
          <button
            onClick={() => router.replace("/onboarding")}
            style={{
              background: "linear-gradient(135deg, #D4834A 0%, #8B4E1A 100%)",
              color: "#fff", padding: "10px 24px", borderRadius: 10,
              fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer",
            }}>
            Try again
          </button>
        </div>
      ) : (
        <>
          <p
            className="headline-s text-[#1c0f00]"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 280ms ease, transform 280ms ease",
              minHeight: "2rem",
            }}
          >
            {MESSAGES[msgIndex]}
          </p>

          <div className="flex gap-2 mt-10">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-1.5 w-1.5 rounded-full bg-[#D4834A]"
                style={{ animation: `dotBounce 1.2s ease-in-out ${i * 0.18}s infinite` }}
              />
            ))}
          </div>
        </>
      )}

      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.22; transform: scale(1); }
          50%       { opacity: 0.42; transform: scale(1.25); }
        }
        @keyframes logoBreath {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.07); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.35; }
          40%           { transform: translateY(-7px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

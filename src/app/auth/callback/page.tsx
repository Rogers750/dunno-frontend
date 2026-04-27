"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { setToken, setUser } from "@/lib/auth";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session?.access_token) {
        router.replace("/login");
        return;
      }

      try {
        const res = await fetch("https://dunno-backend-production.up.railway.app/auth/google", {
          method: "POST",
          headers: { Authorization: `Bearer ${session.access_token}` },
        });

        if (!res.ok) throw new Error(`Backend returned ${res.status}`);

        const user: { id: string; email: string; username: string; status: "onboarding" | "processing" | "ready" } = await res.json();

        if (!user.username) throw new Error("No username returned");

        setToken(session.access_token);
        setUser(user);
        if (user.status === "onboarding") router.replace("/onboarding");
        else if (user.status === "processing") router.replace("/calibrating");
        else router.replace("/dashboard");
      } catch (err) {
        console.error("Auth callback failed:", err);
        router.replace("/login");
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f9f2e8] flex items-center justify-center">
      <p className="text-[14px] font-[600] text-[#6b4a28]">Signing you in…</p>
    </div>
  );
}

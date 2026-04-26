"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { setToken, setUser } from "@/lib/auth";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        router.replace("/login");
        return;
      }

      setToken(session.access_token);

      // Fetch or create profile from backend
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/auth/me`,
          { headers: { Authorization: `Bearer ${session.access_token}` } }
        );
        if (res.ok) {
          const user = await res.json();
          setUser(user);
          router.replace("/dashboard");
        } else {
          // New user — send to onboarding
          router.replace("/onboarding");
        }
      } catch {
        router.replace("/onboarding");
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f9f2e8] flex items-center justify-center">
      <p className="text-[14px] font-[600] text-[#6b4a28]">Signing you in…</p>
    </div>
  );
}

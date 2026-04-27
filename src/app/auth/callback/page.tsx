"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f9f2e8] flex items-center justify-center">
      <p className="text-[14px] font-[600] text-[#6b4a28]">Redirecting to login…</p>
    </div>
  );
}

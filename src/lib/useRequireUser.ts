"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/api";
import { clearToken, setUser, type StoredUser } from "@/lib/auth";

export function useRequireUser() {
  const router = useRouter();
  const [user, setCurrentUser] = useState<StoredUser | null>(null);
  const [checkingUser, setCheckingUser] = useState(true);

  useEffect(() => {
    let cancelled = false;

    auth.me()
      .then((me) => {
        if (cancelled) return;
        setUser(me);
        setCurrentUser(me);
      })
      .catch(() => {
        if (cancelled) return;
        clearToken();
        router.replace("/");
      })
      .finally(() => {
        if (cancelled) return;
        setCheckingUser(false);
      });

    return () => {
      cancelled = true;
    };
  }, [router]);

  return { user, checkingUser };
}

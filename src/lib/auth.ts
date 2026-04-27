"use client";

const TOKEN_KEY = "dunno_token";
const USER_KEY  = "dunno_user";
const MAX_AGE   = 60 * 60 * 24 * 30; // 30 days

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${MAX_AGE}; SameSite=Strict`;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
  document.cookie = `${USER_KEY}=; path=/; max-age=0`;
}

export type UserStatus = "onboarding" | "processing" | "ready";
export type StoredUser = { id: string; email: string; username: string; status: UserStatus };

export function setUser(user: StoredUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  document.cookie = `${USER_KEY}=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=${MAX_AGE}; SameSite=Strict`;
}

export function getUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

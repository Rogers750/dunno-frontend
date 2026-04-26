"use client";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("dunno_token");
}

export function setToken(token: string): void {
  localStorage.setItem("dunno_token", token);
}

export function clearToken(): void {
  localStorage.removeItem("dunno_token");
  localStorage.removeItem("dunno_user");
}

export function getUser(): { id: string; email: string; username: string } | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("dunno_user");
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function setUser(user: { id: string; email: string; username: string }): void {
  localStorage.setItem("dunno_user", JSON.stringify(user));
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

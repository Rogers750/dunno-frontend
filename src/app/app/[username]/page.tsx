import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import type { Portfolio } from "@/lib/api";
import { adaptGeneratedContent, TEMPLATE_FROM_BACKEND, type TemplateId } from "@/lib/portfolioTypes";
import PortfolioClient from "@/components/portfolio/PortfolioClient";

const BASE = "https://dunno-backend-production.up.railway.app";

interface StoredUser { username: string; email: string; status: string }
type RawPortfolio = Portfolio & { user?: { username: string; name?: string; email?: string; github_url?: string } };

async function fetchPublic(username: string): Promise<RawPortfolio | null> {
  try {
    const res = await fetch(`${BASE}/portfolio/${username}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

async function fetchOwn(token: string): Promise<Portfolio | null> {
  try {
    const res = await fetch(`${BASE}/portfolio/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

async function autoPublish(token: string): Promise<void> {
  try {
    await fetch(`${BASE}/portfolio/publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ published: true }),
    });
  } catch { /* silent */ }
}

interface Props { params: Promise<{ username: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const data = await fetchPublic(username);
  const name = data?.generated_content?.personal?.name ?? username;
  return {
    title: `${name} — Portfolio`,
    description: data?.generated_content?.personal?.bio?.slice(0, 160) ?? `${name}'s portfolio`,
    openGraph: { title: `${name} — Portfolio`, type: "profile" },
  };
}

export default async function PublicPortfolioPage({ params }: Props) {
  const { username } = await params;

  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("dunno_token");
  const userCookie  = cookieStore.get("dunno_user");

  let storedUser: StoredUser | null = null;
  if (userCookie?.value) {
    try { storedUser = JSON.parse(decodeURIComponent(userCookie.value)); } catch { /* ignore */ }
  }
  const isOwner = storedUser?.username === username;

  // Always try the public endpoint first — it returns user.name correctly
  let raw = await fetchPublic(username);

  // Public endpoint failed (portfolio unpublished) — allow owner to still see it
  // and auto-publish so future visitors can access it
  if (!raw) {
    if (!isOwner || !tokenCookie?.value) notFound();
    const owned = await fetchOwn(tokenCookie.value);
    if (!owned) notFound();
    raw = { ...owned, user: { username, email: storedUser?.email } };
    // Publish so the link becomes accessible to everyone
    await autoPublish(tokenCookie.value);
  }

  const content = raw.generated_content;
  if (!content) {
    return (
      <div style={{
        minHeight: "100vh", background: "#fdfaf6",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Manrope', sans-serif", color: "#d4b896", fontSize: 14,
      }}>
        Portfolio generation in progress…
      </div>
    );
  }

  const portfolioData = adaptGeneratedContent(content);

  // Map backend template name → frontend ID, default to "minimal"
  const backendTemplate = (raw as unknown as Record<string, unknown>).selected_template as string | undefined;
  const initialTemplate: TemplateId = (backendTemplate ? TEMPLATE_FROM_BACKEND[backendTemplate] : undefined) ?? "minimal";

  return (
    <PortfolioClient
      data={portfolioData}
      username={username}
      initialTemplate={initialTemplate}
    />
  );
}

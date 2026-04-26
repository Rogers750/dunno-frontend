"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Globe, RefreshCw, Eye, EyeOff, ExternalLink, Copy, Check, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { portfolio, type Portfolio } from "@/lib/api";
import { clearToken, getUser, isAuthenticated } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const user = typeof window !== "undefined" ? getUser() : null;

  useEffect(() => {
    if (!isAuthenticated()) { router.replace("/login"); return; }
    portfolio.getOwn()
      .then(setData)
      .catch(() => setError("Failed to load portfolio"))
      .finally(() => setLoading(false));
  }, [router]);

  async function handlePublishToggle() {
    if (!data) return;
    setPublishing(true);
    try { const u = await portfolio.setPublished(!data.published); setData(u); }
    catch (err: unknown) { setError(err instanceof Error ? err.message : "Failed to update"); }
    finally { setPublishing(false); }
  }

  async function handleRegenerate() {
    setRegenerating(true); setError("");
    try { const r = await portfolio.regenerate(); setData(r.portfolio); }
    catch (err: unknown) { setError(err instanceof Error ? err.message : "Regeneration failed"); }
    finally { setRegenerating(false); }
  }

  function copyUrl() {
    if (!user) return;
    navigator.clipboard.writeText(`https://dunno.app/${user.username}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-white text-[#1c0f00]">

      {/* ── Nav ──────────────────────────────────────────────────── */}
      <nav className="glass sticky top-0 z-40 border-b border-[rgba(212,184,150,0.20)]">
        <div className="max-w-4xl mx-auto px-8 py-4 flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-4">
            {user && <span className="body-s text-[#d4b896] hidden sm:block">{user.email}</span>}
            <Button variant="ghost" size="sm" onClick={() => { clearToken(); router.push("/"); }}>
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-8 py-14">
        <h1 className="headline-l text-[#1c0f00] mb-12">Dashboard</h1>

        {loading && <p className="body-m text-[#d4b896]">Loading…</p>}

        {error && (
          <div className="bg-[#fde8d8] rounded-md px-5 py-4 mb-8">
            <p className="label-s text-[#7a2a00]">{error}</p>
          </div>
        )}

        {!loading && data && (
          <div className="flex flex-col gap-6">

            {/* ── Portfolio URL ─────────────────────────── */}
            <div className="bg-white rounded-lg p-8 shadow-[0_8px_40px_rgba(139,78,26,0.06)]">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="label-m text-[#6b4a28] mb-2">Your portfolio URL</p>
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${
                      data.published
                        ? "bg-[#D4834A] shadow-[0_0_8px_rgba(245,168,74,0.60)]"
                        : "bg-[#f3e8d8]"
                    }`} />
                    <span className="label-s text-[#d4b896]">
                      {data.published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
                <Globe className={`h-5 w-5 ${data.published ? "text-[#D4834A]" : "text-[#f3e8d8]"}`} />
              </div>

              {user && (
                <div className="flex items-center gap-3 bg-[#f9f2e8] rounded-md px-5 py-3.5 mb-6">
                  <span className="body-m text-[#6b4a28] flex-1">
                    dunno.app/<span className="font-[600] text-[#1c0f00]">{user.username}</span>
                  </span>
                  <button onClick={copyUrl}
                    className="text-[#d4b896] hover:text-[#D4834A] transition-colors" title="Copy URL">
                    {copied ? <Check className="h-4 w-4 text-[#D4834A]" /> : <Copy className="h-4 w-4" />}
                  </button>
                  {data.published && (
                    <a href={`/${user.username}`} target="_blank" rel="noreferrer"
                      className="text-[#d4b896] hover:text-[#D4834A] transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant={data.published ? "danger" : "primary"}
                  onClick={handlePublishToggle}
                  loading={publishing}
                  size="sm"
                >
                  {data.published
                    ? <><EyeOff className="h-4 w-4" />Unpublish</>
                    : <><Eye className="h-4 w-4" />Publish</>}
                </Button>
                {user && (
                  <a href={`/${user.username}`}>
                    <Button variant="secondary" size="sm">
                      Preview <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {/* ── Portfolio details ─────────────────────── */}
            <div className="bg-[#f9f2e8] rounded-lg p-8">
              <p className="label-m text-[#6b4a28] mb-6">Portfolio details</p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="label-s text-[#d4b896] mb-2">Theme color</p>
                  <p className="title-s text-[#1c0f00] capitalize">{data.theme_color}</p>
                </div>
                <div>
                  <p className="label-s text-[#d4b896] mb-2">Style</p>
                  <p className="title-s text-[#1c0f00] capitalize">
                    {data.theme_category === "ai_chosen" ? "AI chosen" : data.theme_category}
                  </p>
                </div>
                {data.target_roles.length > 0 && (
                  <div className="col-span-2">
                    <p className="label-s text-[#d4b896] mb-3">Target roles</p>
                    <div className="flex flex-wrap gap-2">
                      {data.target_roles.map((role) => (
                        <span key={role}
                          className="body-s bg-[#fde8cc] text-[#8B4E1A] font-[600] rounded-full px-4 py-1.5">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Regenerate ───────────────────────────── */}
            <div className="bg-white rounded-lg p-8 shadow-[0_8px_40px_rgba(139,78,26,0.06)]">
              <p className="label-m text-[#6b4a28] mb-2">Regenerate</p>
              <p className="body-m text-[#d4b896] mb-6">Re-run the AI generation with your current resume and links.</p>
              <Button variant="secondary" onClick={handleRegenerate} loading={regenerating} size="sm">
                <RefreshCw className="h-4 w-4" />
                Regenerate portfolio
              </Button>
            </div>
          </div>
        )}

        {!loading && !data && !error && (
          <div className="text-center py-24">
            <p className="body-l text-[#d4b896] mb-8">No portfolio yet.</p>
            <Button onClick={() => router.push("/onboarding")}>Start onboarding</Button>
          </div>
        )}
      </main>
    </div>
  );
}

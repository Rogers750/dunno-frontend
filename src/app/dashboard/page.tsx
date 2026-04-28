"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Globe, RefreshCw, Briefcase, FileText, LogOut, Copy, Check, ExternalLink } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { portfolio } from "@/lib/api";
import { clearToken } from "@/lib/auth";
import { useRequireUser } from "@/lib/useRequireUser";

type Tab = "portfolio" | "regenerate" | "jobs" | "resume";

const NAV: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "portfolio",   label: "Portfolio site",         icon: <Globe size={16} /> },
  { id: "regenerate",  label: "Regenerate portfolio",   icon: <RefreshCw size={16} /> },
  { id: "jobs",        label: "Jobs for me",            icon: <Briefcase size={16} /> },
  { id: "resume",      label: "Rebuild resume & cover", icon: <FileText size={16} /> },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, checkingUser } = useRequireUser();
  const [tab, setTab] = useState<Tab>("portfolio");
  const [published, setPublished] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (checkingUser || !user) return;
    if (user.status === "onboarding") { router.replace("/onboarding"); return; }
    if (user.status === "processing") { router.replace("/calibrating"); return; }
    portfolio.getOwn()
      .then((p) => setPublished(p.published))
      .catch((err: unknown) => {
        if (err instanceof Error && err.message.includes("404")) router.replace("/onboarding");
      });
  }, [checkingUser, router, user]);

  async function handleRegenerate() {
    setRegenerating(true); setError("");
    try { await portfolio.regenerate(); router.replace("/calibrating"); }
    catch (err: unknown) { setError(err instanceof Error ? err.message : "Failed"); }
    finally { setRegenerating(false); }
  }

  function copyUrl() {
    if (!user) return;
    navigator.clipboard.writeText(`https://dunnoai.com/app/${user.username}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Manrope', sans-serif", background: "#fdfaf6", color: "#1c0f00" }}>

      {/* ── Left sidebar ── */}
      <div style={{ width: 220, flexShrink: 0, borderRight: "1px solid rgba(212,184,150,0.20)", display: "flex", flexDirection: "column", padding: "20px 12px" }}>
        <div style={{ marginBottom: 32, paddingLeft: 8 }}>
          <Logo size="sm" />
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                fontSize: 13, fontWeight: tab === item.id ? 600 : 400, textAlign: "left",
                background: tab === item.id ? "rgba(212,131,74,0.10)" : "transparent",
                color: tab === item.id ? "#D4834A" : "#6b4a28",
                transition: "all 0.15s",
              }}
            >
              <span style={{ opacity: tab === item.id ? 1 : 0.6 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => { clearToken(); router.push("/"); }}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, background: "transparent", color: "#d4b896" }}
        >
          <LogOut size={14} /> Sign out
        </button>
      </div>

      {/* ── Right content ── */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>

        {/* Portfolio site */}
        {tab === "portfolio" && user?.username && (
          <>
            <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(212,184,150,0.20)", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "rgba(212,184,150,0.10)", borderRadius: 8, padding: "6px 12px", fontSize: 13, color: "#6b4a28" }}>
                <span style={{ color: "#d4b896" }}>dunnoai.com/app/</span>
                <span style={{ fontWeight: 600 }}>{user.username}</span>
                <span style={{ marginLeft: 4, width: 6, height: 6, borderRadius: "50%", background: published ? "#D4834A" : "#d4b896", boxShadow: published ? "0 0 6px rgba(212,131,74,0.6)" : "none", flexShrink: 0 }} />
              </div>
              <button onClick={copyUrl} title="Copy URL" style={{ border: "none", background: "transparent", cursor: "pointer", color: copied ? "#D4834A" : "#d4b896" }}>
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
              <a href={`/app/${user.username}`} target="_blank" rel="noreferrer" style={{ color: "#d4b896", display: "flex" }}>
                <ExternalLink size={15} />
              </a>
            </div>
            <iframe
              src={`/app/${user.username}`}
              style={{ flex: 1, border: "none", width: "100%" }}
            />
          </>
        )}

        {/* Regenerate */}
        {tab === "regenerate" && (
          <div style={{ padding: 40 }}>
            <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Regenerate portfolio</p>
            <p style={{ fontSize: 13, color: "#6b4a28", marginBottom: 24 }}>Re-run AI generation with your current resume and GitHub.</p>
            {error && <p style={{ color: "#7a2a00", fontSize: 13, marginBottom: 16 }}>{error}</p>}
            <Button onClick={handleRegenerate} loading={regenerating}>
              <RefreshCw size={14} /> Regenerate
            </Button>
          </div>
        )}

        {/* Jobs */}
        {tab === "jobs" && (
          <div style={{ padding: 40 }}>
            <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Jobs for me</p>
            <p style={{ fontSize: 13, color: "#d4b896" }}>Coming soon — AI-matched job recommendations based on your portfolio.</p>
          </div>
        )}

        {/* Resume & cover */}
        {tab === "resume" && (
          <div style={{ padding: 40 }}>
            <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Rebuild resume & write cover</p>
            <p style={{ fontSize: 13, color: "#d4b896" }}>Coming soon — AI-tailored resume and cover letter for any job posting.</p>
          </div>
        )}
      </div>
    </div>
  );
}

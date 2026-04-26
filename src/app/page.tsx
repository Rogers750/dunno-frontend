"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Zap, Globe, GitBranch, Layers, Paperclip, X, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

// ── Hero upload (chat-style) ──────────────────────────────────────────────────

function HeroUpload({ boxRef, highlight }: { boxRef: React.RefObject<HTMLDivElement | null>; highlight: boolean }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [step, setStep] = useState<"upload" | "github">("upload");
  const [github, setGithub] = useState("");

  // Restore github step when user navigates back from login
  useEffect(() => {
    if (sessionStorage.getItem("dunno_resume_name")) setStep("github");
    const saved = sessionStorage.getItem("dunno_github_url");
    if (saved) setGithub(saved);
  }, []);

  function handleFile(f: File) { setFile(f); }

  function handleBuildMine() {
    if (!file) return;
    setStep("github");
  }

  function handleGo() {
    if (!file) return;
    sessionStorage.setItem("dunno_resume_name", file.name);
    if (github.trim()) sessionStorage.setItem("dunno_github_url", github.trim());
    router.push("/login?mode=register");
  }

  const glowing = highlight || dragging;

  return (
    <div className="max-w-xl mx-auto mb-10">
      <input
        id="resume-upload"
        type="file"
        accept=".pdf,.doc,.docx"
        style={{ position: "fixed", top: -9999, left: -9999, opacity: 0 }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />

      {/* Chat bubble container */}
      <div
        ref={boxRef}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
        className="relative bg-white rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          border: glowing ? "1.5px solid #D4834A" : "1.5px solid rgba(212,131,74,0.30)",
          boxShadow: glowing
            ? "0 0 0 3px rgba(212,131,74,0.25), 0 16px 64px rgba(139,78,26,0.22)"
            : "0 4px 6px rgba(139,78,26,0.06), 0 16px 48px rgba(139,78,26,0.12)",
        }}
      >
        {/* Top label */}
        <div className="px-5 pt-4 pb-1 text-left">
          <p className="text-[11px] font-[700] tracking-[0.10em] uppercase text-[#D4834A]">
            {step === "upload" ? "Get started instantly" : "One more thing"}
          </p>
        </div>

        {step === "upload" ? (
          <>
            {/* File area */}
            <label
              htmlFor={!file ? "resume-upload" : undefined}
              className="px-5 py-3 min-h-[52px] flex items-center"
              style={{ cursor: file ? "default" : "pointer" }}
            >
              {file ? (
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-sm font-[500] text-[#1c0f00] truncate">{file.name}</span>
                  <span className="text-xs text-[#d4b896] shrink-0">{(file.size / 1024).toFixed(0)} KB</span>
                </div>
              ) : (
                <p className="text-sm text-[#6b4a28] text-left flex-1">
                  {dragging ? "Drop it here…" : "Upload your resume and get your portfolio created instantly."}
                </p>
              )}
            </label>

            {/* Action bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-t" style={{ borderColor: "rgba(212,184,150,0.18)" }}>
              <label
                htmlFor="resume-upload"
                className="flex items-center gap-1.5 text-[11px] font-[700] tracking-[0.08em] uppercase text-[#d4b896] hover:text-[#D4834A] transition-colors px-2 py-1.5 rounded-lg hover:bg-[#f9f2e8] cursor-pointer"
              >
                <Paperclip className="h-4 w-4" />
                {file ? "Change" : "Attach Resume"}
              </label>
              {file && (
                <button type="button" onClick={() => setFile(null)} className="text-[#d4b896] hover:text-[#7a2a00] transition-colors p-1.5 rounded-lg hover:bg-[#f9f2e8]">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              <div className="flex-1" />
              <button
                type="button"
                onClick={handleBuildMine}
                disabled={!file}
                className="flex items-center gap-2 text-[11px] font-[700] tracking-[0.08em] uppercase text-white px-4 py-2 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-85 active:scale-95"
                style={{ background: "linear-gradient(135deg, #D4834A, #8B4E1A)" }}
              >
                Build mine
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* GitHub input */}
            <div className="px-5 py-3 min-h-[52px] flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-[#d4b896] shrink-0" />
              <input
                autoFocus
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="github.com/yourhandle  (optional)"
                className="flex-1 text-sm text-[#1c0f00] placeholder:text-[#d4b896] bg-transparent outline-none"
              />
              {github && (
                <button type="button" onClick={() => setGithub("")} className="text-[#d4b896] hover:text-[#7a2a00] transition-colors">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Action bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-t" style={{ borderColor: "rgba(212,184,150,0.18)" }}>
              <button
                type="button"
                onClick={() => setStep("upload")}
                className="text-[11px] font-[700] tracking-[0.08em] uppercase text-[#d4b896] hover:text-[#D4834A] transition-colors px-2 py-1.5 rounded-lg hover:bg-[#f9f2e8]"
              >
                ← Back
              </button>
              <div className="flex-1" />
              <button
                type="button"
                onClick={handleGo}
                className="flex items-center gap-2 text-[11px] font-[700] tracking-[0.08em] uppercase text-white px-4 py-2 rounded-xl hover:opacity-85 active:scale-95 transition-all"
                style={{ background: "linear-gradient(135deg, #D4834A, #8B4E1A)" }}
              >
                {github.trim() ? "Build mine" : "Skip & build"}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Below box — secondary links */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <Link href="/example" className="body-s text-[#d4b896] hover:text-[#D4834A] transition-colors">
          See an example →
        </Link>
        <span className="text-[#f3e8d8]">·</span>
        <Link href="/login" className="body-s text-[#d4b896] hover:text-[#D4834A] transition-colors">
          Already have an account?
        </Link>
      </div>
    </div>
  );
}

const steps = [
  { icon: "📄", label: "Upload resume", desc: "PDF or paste text. Your data stays yours." },
  { icon: "🔗", label: "Add links", desc: "GitHub, Behance, Dribbble — AI fetches everything." },
  { icon: "✦",  label: "AI builds it", desc: "Your work, analysed and turned into a story." },
  { icon: "◎",  label: "Go live", desc: "Share dunno.app/yourname from day one." },
];

const features = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Written, not generated",
    desc: "Your actual work history shapes the output. The result sounds like you, not a template.",
  },
  {
    icon: <GitBranch className="h-5 w-5" />,
    title: "GitHub-connected",
    desc: "Auto-fetches repos, stars, and descriptions. Pick what to show, hide the rest.",
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Role-aware design",
    desc: "Software Engineer, Designer, PM — each gets a layout built for their audience.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "dunno.app/yourname",
    desc: "A clean URL for your resume, LinkedIn bio, and cold emails.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Done in minutes",
    desc: "Most people are live before their coffee gets cold.",
  },
];

export default function LandingPage() {
  const uploadBoxRef = useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = useState(false);

  function scrollToUpload() {
    uploadBoxRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setHighlight(true);
    setTimeout(() => setHighlight(false), 1800);
  }

  return (
    <div className="min-h-screen bg-white text-[#1c0f00]">

      {/* ── Navigation ──────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-[rgba(212,184,150,0.20)]">
        <div className="max-w-5xl mx-auto px-8 py-3.5 flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Button size="sm" onClick={scrollToUpload}>Get started</Button>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-44 pb-32 px-8 text-center">
        <div className="max-w-4xl mx-auto">

          {/* Logo mark — large, glowing */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              {/* Ambient glow behind logo */}
              <div className="absolute inset-0 rounded-full bg-[#F5A84A] blur-[48px] opacity-20 scale-150" />
              <Logo size="xl" showWordmark={false} href="" className="relative" />
            </div>
          </div>

          {/* Display headline */}
          <h1 className="display-l text-[#1c0f00] mb-6 max-w-3xl mx-auto">
            Your portfolio,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #8B4E1A 0%, #D4834A 50%, #F5C98A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              built by AI.
            </span>
          </h1>

          <p className="body-l text-[#6b4a28] max-w-xl mx-auto mb-12 leading-relaxed">
            Upload your resume. Add your GitHub. Dunno builds a beautiful portfolio at{" "}
            <span className="font-[600] text-[#1c0f00]">dunno.app/yourname</span> — in minutes.
          </p>

          {/* ── Chat-style upload box ──────────────────── */}
          <HeroUpload boxRef={uploadBoxRef} highlight={highlight} />
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────── */}
      <section className="bg-[#f9f2e8] py-28 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="label-m text-[#D4834A] text-center mb-4">Process</p>
          <h2 className="headline-l text-center text-[#1c0f00] mb-16">How it works</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col px-6 py-8">
                <div className="text-3xl mb-6">{step.icon}</div>
                <div className="label-s text-[#D4834A] mb-3">Step {i + 1}</div>
                <div className="title-m text-[#1c0f00] mb-3">{step.label}</div>
                <p className="body-s text-[#6b4a28]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────── */}
      <section className="py-28 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="label-m text-[#D4834A] text-center mb-4">Why Dunno</p>
          <h2 className="headline-l text-center text-[#1c0f00] mb-16">Built differently</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className={`p-8 rounded-lg ${i % 2 === 0 ? "bg-[#f9f2e8]" : "bg-white shadow-[0_4px_24px_rgba(139,78,26,0.06)]"}`}
              >
                <div
                  className="h-10 w-10 rounded-md flex items-center justify-center mb-6"
                  style={{
                    background: "linear-gradient(135deg, #fde8cc, #f9f2e8)",
                    color: "#D4834A",
                  }}
                >
                  {f.icon}
                </div>
                <div className="title-m text-[#1c0f00] mb-3">{f.title}</div>
                <p className="body-m text-[#6b4a28]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="bg-[#f9f2e8] py-28 px-8">
        <div className="max-w-xl mx-auto text-center">
          {/* Logo in CTA */}
          <div className="flex justify-center mb-8">
            <Logo size="md" showWordmark={false} href="" />
          </div>
          <h2 className="display-s text-[#1c0f00] mb-6">Ready to go live?</h2>
          <p className="body-l text-[#6b4a28] mb-10">Free to use. No credit card required.</p>
          <Link href="/login?mode=register">
            <Button size="lg">
              Create my portfolio
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="py-10 px-8">
        <div className="max-w-5xl mx-auto">
          <Logo size="sm" />
        </div>
      </footer>
    </div>
  );
}

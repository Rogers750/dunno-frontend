"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, X, Plus, Upload, Wand2, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Logo } from "@/components/ui/Logo";
import { onboarding, type Project } from "@/lib/api";
import { cn } from "@/lib/utils";

const STEP_LABELS = ["Style", "Resume", "Links", "Generate"] as const;

// ── Progress Embers ───────────────────────────────────────────────────────────

function ProgressEmbers({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-3">
      {STEP_LABELS.map((label, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "h-3 w-3 rounded-full transition-all duration-500",
                i < current
                  ? "bg-[#8B4E1A] shadow-[0_0_10px_rgba(139,78,26,0.55)]"
                  : i === current
                  ? "bg-[#F5A84A] shadow-[0_0_16px_rgba(245,168,74,0.65)] scale-125"
                  : "bg-[#f3e8d8]"
              )}
            />
            <span
              className={cn(
                "label-s transition-colors",
                i === current ? "text-[#D4834A]" : i < current ? "text-[#1c0f00]" : "text-[#d4b896]"
              )}
            >
              {label}
            </span>
          </div>
          {i < STEP_LABELS.length - 1 && (
            <div
              className="h-px w-10 mb-4 transition-all duration-500"
              style={{ background: i < current ? "#D4834A" : "#f3e8d8" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Theme step ────────────────────────────────────────────────────────────────

const COLORS = [
  { id: "indigo", label: "Indigo", hex: "#818cf8" },
  { id: "emerald", label: "Emerald", hex: "#34d399" },
  { id: "amber", label: "Amber", hex: "#F5A84A" },
  { id: "rose", label: "Rose", hex: "#fb7185" },
  { id: "sky", label: "Sky", hex: "#38bdf8" },
  { id: "slate", label: "Slate", hex: "#94a3b8" },
];

const CATEGORIES = [
  { id: "software", label: "Software Engineer", icon: "💻", desc: "Timeline-heavy, metrics-forward, skill tags" },
  { id: "design",   label: "Designer",           icon: "🎨", desc: "Project-grid first, visual, Behance prominent" },
  { id: "product",  label: "Product Manager",    icon: "📦", desc: "Story-first, impact metrics, roadmap experience" },
  { id: "ai_chosen",label: "Let AI decide",      icon: "✦",  desc: "Claude picks based on your resume tone and role" },
];

function ThemeStep({ color, category, onColorChange, onCategoryChange }: {
  color: string; category: string;
  onColorChange: (c: string) => void; onCategoryChange: (c: string) => void;
}) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="label-m text-[#6b4a28] mb-5">Accent color</p>
        <div className="flex gap-3 flex-wrap">
          {COLORS.map((c) => (
            <button
              key={c.id}
              onClick={() => onColorChange(c.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-[500] transition-all",
                color === c.id
                  ? "bg-[#fde8cc] text-[#1c0f00] shadow-[0_0_0_2px_rgba(212,131,74,0.30)]"
                  : "bg-[#f9f2e8] text-[#6b4a28] hover:bg-[#f3e8d8]"
              )}
            >
              <span className="h-3 w-3 rounded-full" style={{ background: c.hex }} />
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="label-m text-[#6b4a28] mb-5">Portfolio style</p>
        <div className="grid md:grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={cn(
                "text-left p-5 rounded-lg transition-all",
                category === cat.id
                  ? "bg-[#fde8cc]/60 shadow-[0_0_0_2px_rgba(212,131,74,0.25)]"
                  : "bg-[#f9f2e8] hover:bg-[#f3e8d8]"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{cat.icon}</span>
                <span className="title-s text-[#1c0f00]">{cat.label}</span>
                {category === cat.id && (
                  <span className="ml-auto h-5 w-5 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #D4834A, #8B4E1A)" }}>
                    <Check className="h-3 w-3 text-white" />
                  </span>
                )}
              </div>
              <p className="body-s text-[#d4b896]">{cat.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Resume step ───────────────────────────────────────────────────────────────

function ResumeStep({ file, targetRoles, onFileChange, onRolesChange }: {
  file: File | null; targetRoles: string[];
  onFileChange: (f: File | null) => void; onRolesChange: (r: string[]) => void;
}) {
  const [roleInput, setRoleInput] = useState("");
  const [dragging, setDragging] = useState(false);

  function addRole() {
    const t = roleInput.trim();
    if (t && !targetRoles.includes(t)) onRolesChange([...targetRoles, t]);
    setRoleInput("");
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="label-m text-[#6b4a28] mb-5">Resume PDF</p>
        <label
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault(); setDragging(false);
            const f = e.dataTransfer.files[0];
            if (f?.type === "application/pdf") onFileChange(f);
          }}
          className={cn(
            "flex flex-col items-center justify-center gap-4 rounded-lg p-12 cursor-pointer transition-all",
            dragging
              ? "bg-[#fde8cc]/60 shadow-[0_0_0_14px_rgba(245,168,74,0.18)]"
              : "bg-[#f9f2e8] hover:bg-[#f3e8d8]"
          )}
        >
          <input type="file" accept=".pdf" className="hidden"
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)} />
          {file ? (
            <>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #fde8cc, #f9f2e8)" }}>
                <Check className="h-6 w-6 text-[#D4834A]" />
              </div>
              <div className="text-center">
                <p className="title-s text-[#1c0f00]">{file.name}</p>
                <p className="body-s text-[#d4b896] mt-1">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
              <button type="button"
                onClick={(e) => { e.preventDefault(); onFileChange(null); }}
                className="label-s text-[#7a2a00] hover:underline">
                Remove
              </button>
            </>
          ) : (
            <>
              <div className="h-12 w-12 rounded-lg bg-[#f3e8d8] flex items-center justify-center">
                <Upload className="h-6 w-6 text-[#d4b896]" />
              </div>
              <div className="text-center">
                <p className="title-s text-[#1c0f00]">
                  Drop your resume here or{" "}
                  <span className="text-[#D4834A]">browse</span>
                </p>
                <p className="body-s text-[#d4b896] mt-1">PDF only · Max 10 MB</p>
              </div>
            </>
          )}
        </label>
      </div>

      <div>
        <p className="label-m text-[#6b4a28] mb-2">Target roles</p>
        <p className="body-s text-[#d4b896] mb-5">AI tailors the portfolio towards these roles.</p>
        <div className="flex gap-2 mb-5">
          <input
            value={roleInput}
            onChange={(e) => setRoleInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addRole())}
            placeholder="e.g. Senior Data Engineer"
            className="flex-1 bg-[#f9f2e8] text-[#1c0f00] text-sm rounded-md px-4 py-3 placeholder:text-[#d4b896] focus:outline-none focus:bg-white focus:shadow-[0_0_0_14px_rgba(245,168,74,0.18)] transition-all"
          />
          <Button variant="secondary" size="md" onClick={addRole} type="button">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {targetRoles.map((role) => (
            <span key={role}
              className="inline-flex items-center gap-2 bg-[#fde8cc] text-[#8B4E1A] text-xs font-[600] rounded-full px-4 py-1.5">
              {role}
              <button onClick={() => onRolesChange(targetRoles.filter((r) => r !== role))}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Links step ────────────────────────────────────────────────────────────────

const LINK_TYPES = [
  { id: "github_profile", label: "GitHub Profile", placeholder: "https://github.com/username" },
  { id: "github_repo",    label: "GitHub Repo",    placeholder: "https://github.com/username/repo" },
  { id: "behance",        label: "Behance",         placeholder: "https://www.behance.net/username" },
  { id: "dribbble",       label: "Dribbble",        placeholder: "https://dribbble.com/username" },
];

interface LinkEntry { type: string; url: string; id: string }

function LinksStep({ links, projects, fetched, onLinksChange, onProjectToggle, onFetch, fetchLoading }: {
  links: LinkEntry[]; projects: Project[]; fetched: boolean;
  onLinksChange: (l: LinkEntry[]) => void;
  onProjectToggle: (id: string, included: boolean) => void;
  onFetch: () => void; fetchLoading: boolean;
}) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="label-m text-[#6b4a28] mb-5">Add links</p>
        <div className="flex flex-col gap-4 mb-6">
          {links.map((link) => {
            const type = LINK_TYPES.find((t) => t.id === link.type);
            return (
              <div key={link.id} className="flex gap-3 items-center">
                <span className="body-s text-[#6b4a28] w-32 shrink-0">{type?.label}</span>
                <input
                  value={link.url}
                  onChange={(e) => onLinksChange(links.map((l) => l.id === link.id ? { ...l, url: e.target.value } : l))}
                  placeholder={type?.placeholder}
                  className="flex-1 bg-[#f9f2e8] text-[#1c0f00] text-sm rounded-md px-4 py-3 placeholder:text-[#d4b896] focus:outline-none focus:bg-white focus:shadow-[0_0_0_14px_rgba(245,168,74,0.18)] transition-all"
                />
                <button onClick={() => onLinksChange(links.filter((l) => l.id !== link.id))}
                  className="text-[#d4b896] hover:text-[#7a2a00] shrink-0">
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {LINK_TYPES.map((t) => (
            <button key={t.id}
              onClick={() => onLinksChange([...links, { type: t.id, url: "", id: crypto.randomUUID() }])}
              className="inline-flex items-center gap-1.5 bg-[#f9f2e8] hover:bg-[#fde8cc] text-[#6b4a28] hover:text-[#8B4E1A] text-xs font-[600] rounded-md px-3 py-2 transition-all">
              <Plus className="h-3 w-3" />
              {t.label}
            </button>
          ))}
        </div>

        {links.length > 0 && !fetched && (
          <Button variant="secondary" onClick={onFetch} loading={fetchLoading}>
            Fetch data from links
          </Button>
        )}
      </div>

      {fetched && projects.length > 0 && (
        <div>
          <p className="label-m text-[#6b4a28] mb-2">Found {projects.length} projects</p>
          <p className="body-s text-[#d4b896] mb-5">Uncheck any you want to exclude.</p>
          <div className="flex flex-col max-h-72 overflow-y-auto">
            {projects.map((p, i) => (
              <label key={p.id}
                className={cn(
                  "flex items-start gap-4 p-5 cursor-pointer transition-all rounded-lg hover:bg-[#fde8cc]/40",
                  i % 2 === 0 ? "bg-white" : "bg-[#f9f2e8]"
                )}>
                <input type="checkbox" checked={p.included}
                  onChange={(e) => onProjectToggle(p.id, e.target.checked)}
                  className="mt-0.5 accent-[#D4834A]" />
                <div>
                  <div className="title-s text-[#1c0f00]">{p.title}</div>
                  {p.description && <p className="body-s text-[#6b4a28] mt-1 line-clamp-2">{p.description}</p>}
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {p.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="label-s text-[#d4b896] bg-[#f3e8d8] rounded px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Generate step ─────────────────────────────────────────────────────────────

function GenerateStep({ generating, done, username }: { generating: boolean; done: boolean; username: string }) {
  const stages = ["Parsing resume", "Analysing projects", "Crafting narrative", "Generating portfolio"];
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 gap-8">
      {generating && (
        <>
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 rounded-full bg-[#F5A84A] animate-ping opacity-25" />
            <div className="relative h-20 w-20 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #fde8cc, #f9f2e8)", boxShadow: "0 0 40px rgba(245,168,74,0.35)" }}>
              <Wand2 className="h-8 w-8 text-[#D4834A]" />
            </div>
          </div>
          <div>
            <h3 className="headline-s text-[#1c0f00] mb-3">Building your portfolio…</h3>
            <p className="body-m text-[#6b4a28] max-w-sm">Claude is reading your resume and projects, extracting impact metrics, and crafting your story.</p>
          </div>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            {stages.map((stage, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-[#F5A84A] animate-pulse shadow-[0_0_8px_rgba(245,168,74,0.65)]" />
                <span className="body-s text-[#6b4a28]">{stage}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {done && (
        <>
          <div className="h-20 w-20 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #fde8cc, #f9f2e8)", boxShadow: "0 0 40px rgba(212,131,74,0.20)" }}>
            <Check className="h-10 w-10 text-[#D4834A]" />
          </div>
          <div>
            <h3 className="headline-s text-[#1c0f00] mb-3">Your portfolio is live!</h3>
            <p className="body-m text-[#6b4a28] mb-4">Share it with the world.</p>
            <a href={`/${username}`} className="title-s text-[#D4834A] hover:underline">dunno.app/{username}</a>
          </div>
        </>
      )}

      {!generating && !done && (
        <>
          <div className="h-20 w-20 rounded-full bg-[#f9f2e8] flex items-center justify-center">
            <Wand2 className="h-9 w-9 text-[#D4834A]" />
          </div>
          <div>
            <h3 className="headline-s text-[#1c0f00] mb-3">Ready to generate</h3>
            <p className="body-m text-[#6b4a28] max-w-sm">Claude will analyse everything and build your portfolio. This takes about 30 seconds.</p>
          </div>
        </>
      )}
    </div>
  );
}

// ── Main wizard ───────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [themeColor, setThemeColor] = useState("amber");
  const [themeCategory, setThemeCategory] = useState("software");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [targetRoles, setTargetRoles] = useState<string[]>([]);
  const [links, setLinks] = useState<LinkEntry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [linksFetched, setLinksFetched] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [portfolioUsername, setPortfolioUsername] = useState("");

  async function handleFetchLinks() {
    if (!links.filter((l) => l.url).length) return;
    setFetchLoading(true); setError("");
    try {
      const res = await onboarding.saveLinks({
        links: links.filter((l) => l.url).map(({ type, url }) => ({ type, url })),
      });
      setProjects(res.projects); setLinksFetched(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch links");
    } finally { setFetchLoading(false); }
  }

  async function handleProjectToggle(id: string, included: boolean) {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, included } : p)));
    try { await onboarding.updateProjectInclusion(id, included); }
    catch { setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, included: !included } : p))); }
  }

  async function handleNext() {
    setError(""); setLoading(true);
    try {
      if (step === 0) {
        await onboarding.saveTheme({ theme_color: themeColor, theme_category: themeCategory });
        setStep(1);
      } else if (step === 1) {
        if (!resumeFile) { setError("Please upload your resume."); setLoading(false); return; }
        await onboarding.uploadResume(resumeFile, targetRoles); setStep(2);
      } else if (step === 2) {
        setStep(3);
      } else if (step === 3) {
        setGenerating(true);
        const res = await onboarding.generate();
        setPortfolioUsername((res.portfolio as unknown as { username?: string }).username ?? "me");
        setGenerated(true); setGenerating(false);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setGenerating(false);
    } finally { setLoading(false); }
  }

  const stepTitles = ["Pick your style", "Upload resume", "Add your links", "Generate portfolio"];
  const stepDescs  = [
    "Choose a color theme and layout style for your portfolio.",
    "Upload your resume. AI will extract your experience and skills.",
    "Add links to auto-fetch project data. All optional — skip if needed.",
    "AI will analyse your data and build your portfolio.",
  ];

  return (
    <div className="min-h-screen bg-[#f9f2e8] flex flex-col items-center px-4 py-12">

      {/* Logo */}
      <div className="mb-12"><Logo size="md" /></div>

      {/* Progress Embers */}
      <div className="mb-12"><ProgressEmbers current={step} /></div>

      {/* Step card */}
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-[0_8px_40px_rgba(139,78,26,0.08)] p-10">
        <h2 className="headline-m text-[#1c0f00] mb-2">{stepTitles[step]}</h2>
        <p className="body-m text-[#d4b896] mb-10">{stepDescs[step]}</p>

        {step === 0 && <ThemeStep color={themeColor} category={themeCategory} onColorChange={setThemeColor} onCategoryChange={setThemeCategory} />}
        {step === 1 && <ResumeStep file={resumeFile} targetRoles={targetRoles} onFileChange={setResumeFile} onRolesChange={setTargetRoles} />}
        {step === 2 && <LinksStep links={links} projects={projects} fetched={linksFetched} onLinksChange={setLinks} onProjectToggle={handleProjectToggle} onFetch={handleFetchLinks} fetchLoading={fetchLoading} />}
        {step === 3 && <GenerateStep generating={generating} done={generated} username={portfolioUsername} />}

        {error && (
          <div className="mt-6 bg-[#fde8d8] rounded-md px-5 py-3">
            <p className="label-s text-[#7a2a00]">{error}</p>
          </div>
        )}

        <div className="mt-10 flex justify-between items-center">
          {step > 0 && !generated ? (
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)} disabled={generating}>Back</Button>
          ) : <div />}

          {!generated && (
            <Button onClick={handleNext} loading={loading || generating}>
              {step === 3 ? <><Wand2 className="h-4 w-4" />Generate</> : <>Continue <ArrowRight className="h-4 w-4" /></>}
            </Button>
          )}

          {generated && (
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => router.push("/dashboard")}>Dashboard</Button>
              <Button onClick={() => router.push(`/${portfolioUsername}`)}>View portfolio <ArrowRight className="h-4 w-4" /></Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

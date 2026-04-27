"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star, ExternalLink, Wand2, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { links as linksApi, type Repo } from "@/lib/api";
import { useRequireUser } from "@/lib/useRequireUser";
import { cn } from "@/lib/utils";

const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  "C++": "#f34b7d",
  C: "#555555",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  PHP: "#4F5D95",
  Shell: "#89e051",
  Dart: "#00B4AB",
};

export default function OnboardingPage() {
  const router = useRouter();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [generating, setGenerating] = useState(false);
  const [togglingIds, setTogglingIds] = useState<string[]>([]);
  const { user, checkingUser } = useRequireUser();

  useEffect(() => {
    if (checkingUser) return;
    if (!user) return;
    if (user.status === "processing") { router.replace("/calibrating"); return; }
    if (user.status === "ready") { router.replace("/dashboard"); return; }

    linksApi.getRepos()
      .then(setRepos)
      .catch(() => setError("Failed to load repos"))
      .finally(() => setLoading(false));
  }, [checkingUser, router, user]);

  async function handleToggle(id: string) {
    const prev = repos.find((r) => r.id === id);
    if (!prev || togglingIds.includes(id)) return;

    setError("");
    setTogglingIds((current) => [...current, id]);
    setRepos((r) => r.map((repo) => repo.id === id ? { ...repo, included: !repo.included } : repo));

    try {
      const res = await linksApi.toggleRepo(id);
      setRepos((r) => r.map((repo) => repo.id === id ? { ...repo, included: res.included } : repo));
    } catch {
      setRepos((r) => r.map((repo) => repo.id === id ? { ...repo, included: prev.included } : repo));
      setError("Failed to update repo selection");
    } finally {
      setTogglingIds((current) => current.filter((repoId) => repoId !== id));
    }
  }

  function handleBuild() {
    setGenerating(true);
    router.replace("/calibrating");
  }

  const included = repos.filter((r) => r.included).length;

  return (
    <div className="min-h-screen bg-[#f9f2e8] flex flex-col items-center px-4 py-12">
      <div className="mb-12"><Logo size="md" /></div>

      <div className="w-full max-w-2xl">
        <h2 className="headline-s text-[#1c0f00] mb-2">Your GitHub repos</h2>
        <p className="body-m text-[#d4b896] mb-8">
          {loading
            ? "Loading your repos…"
            : checkingUser
            ? "Loading your repos…"
            : repos.length > 0
            ? `Found ${repos.length} repos. Uncheck any you'd like to leave out.`
            : "No repos found — we'll build your portfolio from your resume."}
        </p>

        {error && (
          <div className="mb-6 bg-[#fde8d8] rounded-lg px-4 py-3">
            <p className="text-[13px] font-[600] text-[#7a2a00]">{error}</p>
          </div>
        )}

        {(checkingUser || loading) && (
          <div className="flex flex-col gap-3 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-[88px] rounded-xl bg-white animate-pulse shadow-[0_2px_12px_rgba(139,78,26,0.05)]" />
            ))}
          </div>
        )}

        {!loading && repos.length > 0 && (
          <div className="flex flex-col gap-2 mb-8">
            {repos.map((repo) => {
              const langColor = repo.language ? (LANG_COLORS[repo.language] ?? "#d4b896") : "#d4b896";
              const isToggling = togglingIds.includes(repo.id);
              return (
                <div
                  key={repo.id}
                  className={cn(
                    "flex items-start gap-4 p-5 rounded-xl transition-all bg-white shadow-[0_2px_12px_rgba(139,78,26,0.04)]",
                    repo.included
                      ? "hover:shadow-[0_4px_20px_rgba(139,78,26,0.10)]"
                      : "opacity-45 hover:opacity-60",
                    isToggling && "pointer-events-none"
                  )}
                >
                  {/* Checkbox */}
                  <div className="mt-0.5 shrink-0">
                    <button
                      type="button"
                      aria-pressed={repo.included}
                      aria-label={`${repo.included ? "Exclude" : "Include"} ${repo.name}`}
                      disabled={isToggling}
                      className={cn(
                        "h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all",
                        repo.included
                          ? "border-[#D4834A] bg-[#D4834A]"
                          : "border-[rgba(212,184,150,0.60)] bg-transparent"
                      )}
                      onClick={() => handleToggle(repo.id)}
                    >
                      {repo.included && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Repo icon */}
                  <div className="shrink-0 h-9 w-9 rounded-lg bg-[#f9f2e8] flex items-center justify-center mt-0.5">
                    <BookMarked className="h-4 w-4 text-[#D4834A]" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="title-s text-[#1c0f00] truncate">{repo.name}</span>
                      <div className="flex items-center gap-1.5 ml-auto shrink-0">
                        {repo.stars > 0 && (
                          <span className="flex items-center gap-1 text-[11px] font-[600] text-[#d4b896]">
                            <Star className="h-3 w-3" />
                            {repo.stars}
                          </span>
                        )}
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#d4b896] hover:text-[#D4834A] transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>

                    {repo.description && (
                      <p className="body-s text-[#6b4a28] line-clamp-2 mb-2">{repo.description}</p>
                    )}

                    <div className="flex items-center gap-2 flex-wrap">
                      {repo.language && (
                        <span className="flex items-center gap-1.5 text-[11px] font-[600] text-[#6b4a28]">
                          <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: langColor }} />
                          {repo.language}
                        </span>
                      )}
                      {repo.topics.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] font-[600] text-[#d4b896] bg-[#f9f2e8] rounded px-2 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          <span className="body-s text-[#8B4E1A] font-[700]">
            {!loading && repos.length > 0 && (
              <>
                <span>{included}</span>
                {" of "}
                <span>{repos.length}</span>
                {" selected"}
              </>
            )}
          </span>
          <Button onClick={handleBuild} loading={generating} disabled={loading}>
            <Wand2 className="h-4 w-4" />
            Build my portfolio
          </Button>
        </div>
      </div>
    </div>
  );
}

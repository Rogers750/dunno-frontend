"use client";

import { Mail, ExternalLink, Globe, MapPin, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/portfolio/SocialIcons";
import type { PortfolioData } from "@/lib/portfolioTypes";
import { extractGitHubUsername } from "@/lib/portfolioTypes";
import GitHubWall from "@/components/portfolio/GitHubWall";

interface Props { data: PortfolioData }

export default function DarkGlassTemplate({ data }: Props) {
  const { personal, social, skills, experience, projects, education, stats } = data;
  const ghUsername = extractGitHubUsername(social.github);

  const glass = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
  } as const;

  return (
    <div style={{ minHeight: "100vh", background: "#08080e", fontFamily: "'Manrope', sans-serif", color: "#e8e0d8" }}>
      <style>{`
        @keyframes dgFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dgGlow {
          0%, 100% { opacity: 0.20; transform: scale(1); }
          50%       { opacity: 0.38; transform: scale(1.12); }
        }
        .dg-fade { animation: dgFadeUp 0.7s ease both; }
        .dg-card { transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease; }
        .dg-card:hover { transform: translateY(-3px); border-color: rgba(212,131,74,0.30) !important; box-shadow: 0 16px 48px rgba(212,131,74,0.08) !important; }
        .dg-link { transition: color 0.18s; }
        .dg-link:hover { color: #F5C98A !important; }
        .dg-skill:hover { background: rgba(212,131,74,0.14) !important; border-color: rgba(212,131,74,0.40) !important; color: #F5C98A !important; }
      `}</style>

      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(8,8,14,0.85)", backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 32px", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "-0.02em", background: "linear-gradient(135deg, #F5C98A 0%, #D4834A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {personal.name.split(" ")[0]}.
          </span>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {["Experience", "Projects", "Skills", "Contact"].map(item => (
              <a key={item} href={`#dg-${item.toLowerCase()}`}
                style={{ fontSize: 13, fontWeight: 500, color: "rgba(232,224,216,0.55)", textDecoration: "none" }}
                className="dg-link">
                {item}
              </a>
            ))}
            {personal.email && (
              <a href={`mailto:${personal.email}`}
                style={{
                  fontSize: 12, fontWeight: 700, letterSpacing: "0.03em",
                  background: "linear-gradient(135deg, #D4834A 0%, #8B4E1A 100%)",
                  color: "#fff", padding: "7px 18px", borderRadius: 999, textDecoration: "none",
                }}>
                Contact
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", padding: "110px 32px 100px", textAlign: "center", overflow: "hidden" }}>
        {/* Ambient glow blobs */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(212,131,74,0.10) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", width: 500, height: 500,
          top: "50%", left: "30%", transform: "translate(-50%, -55%)",
          borderRadius: "50%", background: "rgba(245,168,74,0.06)",
          filter: "blur(80px)", animation: "dgGlow 5s ease-in-out infinite",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: 780, margin: "0 auto" }}>
          {/* Status badge */}
          <div className="dg-fade" style={{ display: "flex", justifyContent: "center", marginBottom: 32, animationDelay: "0.05s" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 999, padding: "6px 16px", fontSize: 12, fontWeight: 600, color: "rgba(232,224,216,0.65)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.70)", display: "inline-block" }} />
              Available for opportunities
            </span>
          </div>

          {/* Name */}
          <h1 className="dg-fade" style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(54px, 8vw, 96px)",
            fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.95,
            background: "linear-gradient(135deg, #f5f0ea 0%, #F5C98A 45%, #D4834A 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: 28, animationDelay: "0.14s",
          }}>
            {personal.name}
          </h1>

          {/* Title */}
          {personal.title && (
            <p className="dg-fade" style={{
              fontSize: 13, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
              color: "rgba(232,224,216,0.40)", marginBottom: 28, animationDelay: "0.22s",
            }}>
              {personal.title}{personal.location && ` · ${personal.location}`}
            </p>
          )}

          {/* Bio */}
          <p className="dg-fade" style={{
            fontSize: 18, lineHeight: 1.75, color: "rgba(232,224,216,0.60)",
            maxWidth: 560, margin: "0 auto 44px", animationDelay: "0.30s",
          }}>
            {personal.bio}
          </p>

          {/* CTAs */}
          <div className="dg-fade" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48, animationDelay: "0.38s" }}>
            {personal.email && (
              <a href={`mailto:${personal.email}`}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "linear-gradient(135deg, #D4834A 0%, #8B4E1A 100%)",
                  color: "#fff", padding: "12px 28px", borderRadius: 10,
                  fontSize: 14, fontWeight: 600, textDecoration: "none",
                }}>
                <Mail size={14} /> Get in touch
              </a>
            )}
            {social.github && (
              <a href={social.github} target="_blank" rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  ...glass, color: "rgba(232,224,216,0.80)",
                  padding: "12px 28px", borderRadius: 10,
                  fontSize: 14, fontWeight: 600, textDecoration: "none",
                }}>
                <GithubIcon size={14} /> GitHub <ArrowUpRight size={12} />
              </a>
            )}
          </div>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="dg-fade" style={{
              display: "flex", justifyContent: "center", gap: 0,
              ...glass, borderRadius: 16, padding: "0 8px",
              animationDelay: "0.44s", maxWidth: 520, margin: "0 auto",
            }}>
              {stats.map((stat, i) => (
                <div key={i} style={{
                  flex: 1, padding: "20px 24px", textAlign: "center",
                  borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 600, color: "#F5C98A" }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(232,224,216,0.35)", marginTop: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 32px" }}>

        {/* ── Experience ────────────────────────────────────────────── */}
        {experience.length > 0 && (
          <section id="dg-experience" style={{ padding: "72px 0" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,131,74,0.80)", marginBottom: 40 }}>
              Experience
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {experience.map((exp, i) => (
                <div key={i} style={{
                  display: "flex", gap: 0,
                  paddingLeft: 32, position: "relative",
                  borderLeft: "1px solid rgba(255,255,255,0.07)",
                  paddingBottom: i < experience.length - 1 ? 44 : 0,
                }}>
                  {/* Timeline dot */}
                  <div style={{
                    position: "absolute", left: -5, top: 4,
                    width: 9, height: 9, borderRadius: "50%",
                    background: "linear-gradient(135deg, #F5C98A 0%, #D4834A 100%)",
                    boxShadow: "0 0 12px rgba(212,131,74,0.50)",
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div>
                        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 16, color: "#e8e0d8", margin: "0 0 4px" }}>
                          {exp.role}
                        </h3>
                        <span style={{ fontSize: 14, color: "#D4834A", fontWeight: 500 }}>{exp.company}</span>
                      </div>
                      <span style={{ fontSize: 12, color: "rgba(232,224,216,0.30)", fontWeight: 600, whiteSpace: "nowrap", paddingLeft: 16 }}>
                        {exp.duration}
                      </span>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0", display: "flex", flexDirection: "column", gap: 8 }}>
                      {exp.highlights.map((h, j) => (
                        <li key={j} style={{ display: "flex", gap: 10, fontSize: 14, color: "rgba(232,224,216,0.55)", lineHeight: 1.65 }}>
                          <span style={{ color: "#D4834A", marginTop: 4, flexShrink: 0, fontSize: 9 }}>▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Projects ────────────────────────────────────────────────── */}
        {projects.length > 0 && (
          <section id="dg-projects" style={{ padding: "72px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,131,74,0.80)", marginBottom: 40 }}>
              Projects
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {projects.map((project, i) => (
                <div key={i}
                  className="dg-card"
                  style={{
                    ...glass, borderRadius: 16, padding: 24,
                    display: "flex", flexDirection: "column", gap: 14,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.20)",
                  }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15, color: "#e8e0d8", margin: 0 }}>
                      {project.name}
                    </h3>
                    {(project.github || project.live) && (
                      <a href={project.github || project.live} target="_blank" rel="noreferrer"
                        style={{ color: "rgba(232,224,216,0.30)", transition: "color 0.18s", flexShrink: 0, marginLeft: 12 }}
                        className="dg-link">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(232,224,216,0.50)", lineHeight: 1.68, flex: 1, margin: 0 }}>{project.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {project.tech.map((tag) => (
                      <span key={tag} style={{
                        fontSize: 11, fontWeight: 700, color: "#D4834A", letterSpacing: "0.03em",
                        background: "rgba(212,131,74,0.10)", border: "1px solid rgba(212,131,74,0.20)",
                        borderRadius: 5, padding: "3px 9px",
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Skills ──────────────────────────────────────────────────── */}
        {skills.length > 0 && (
          <section id="dg-skills" style={{ padding: "72px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,131,74,0.80)", marginBottom: 40 }}>
              Skills
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
              {skills.map((group) => (
                <div key={group.category} style={{ ...glass, borderRadius: 14, padding: "20px 22px" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#D4834A", letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: 14 }}>
                    {group.category}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {group.items.map((skill) => (
                      <span key={skill}
                        className="dg-skill"
                        style={{
                          fontSize: 12, fontWeight: 500, color: "rgba(232,224,216,0.65)",
                          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 6, padding: "4px 11px", transition: "all 0.18s", cursor: "default",
                        }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── GitHub wall ─────────────────────────────────────────────── */}
        {ghUsername && (
          <section style={{ padding: "72px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,131,74,0.80)", marginBottom: 32 }}>
              GitHub Activity
            </p>
            <GitHubWall username={ghUsername} theme="dark" />
          </section>
        )}

        {/* ── Education ───────────────────────────────────────────────── */}
        {education.length > 0 && (
          <section style={{ padding: "72px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,131,74,0.80)", marginBottom: 32 }}>
              Education
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {education.map((edu, i) => (
                <div key={i} style={{ ...glass, borderRadius: 12, padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15, color: "#e8e0d8" }}>{edu.degree}</div>
                    <div style={{ fontSize: 13, color: "rgba(232,224,216,0.45)", marginTop: 3 }}>{edu.institution}</div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(212,131,74,0.70)" }}>{edu.duration}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Contact ─────────────────────────────────────────────────── */}
        <section id="dg-contact" style={{ padding: "72px 0 96px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(212,131,74,0.80)", marginBottom: 20 }}>
            Contact
          </p>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 700, letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, #f5f0ea 0%, #F5C98A 50%, #D4834A 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: 16,
          }}>
            Let's build something remarkable.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(232,224,216,0.45)", maxWidth: 380, margin: "0 auto 44px", lineHeight: 1.7 }}>
            Open to new opportunities and interesting conversations.
          </p>
          {personal.email && (
            <a href={`mailto:${personal.email}`}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "linear-gradient(135deg, #D4834A 0%, #8B4E1A 100%)",
                color: "#fff", padding: "14px 32px", borderRadius: 10,
                fontSize: 14, fontWeight: 600, textDecoration: "none",
                boxShadow: "0 8px 32px rgba(212,131,74,0.35)",
              }}>
              <Mail size={15} /> Say hello
            </a>
          )}
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 36 }}>
            {social.github && (
              <a href={social.github} target="_blank" rel="noreferrer"
                style={{ color: "rgba(232,224,216,0.25)", transition: "color 0.18s" }} className="dg-link"><GithubIcon size={18} /></a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noreferrer"
                style={{ color: "rgba(232,224,216,0.25)", transition: "color 0.18s" }} className="dg-link"><LinkedinIcon size={18} /></a>
            )}
            {social.twitter && (
              <a href={social.twitter} target="_blank" rel="noreferrer"
                style={{ color: "rgba(232,224,216,0.25)", transition: "color 0.18s" }} className="dg-link"><TwitterIcon size={18} /></a>
            )}
          </div>
        </section>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "20px 32px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "rgba(232,224,216,0.20)" }}>
          Built with{" "}
          <a href="/" style={{ color: "#D4834A", textDecoration: "none", fontWeight: 600 }}>dunno</a>
          {" "}· AI-powered portfolio
        </p>
      </footer>
    </div>
  );
}

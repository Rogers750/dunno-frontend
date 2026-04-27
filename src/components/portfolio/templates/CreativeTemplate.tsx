"use client";

import { Mail, ExternalLink, MapPin, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/portfolio/SocialIcons";
import type { PortfolioData } from "@/lib/portfolioTypes";
import { extractGitHubUsername } from "@/lib/portfolioTypes";
import GitHubWall from "@/components/portfolio/GitHubWall";

interface Props { data: PortfolioData }

export default function CreativeTemplate({ data }: Props) {
  const { personal, social, skills, experience, projects, education, stats } = data;
  const ghUsername = extractGitHubUsername(social.github);
  const firstName = personal.name.split(" ")[0] ?? "";
  const lastName = personal.name.split(" ").slice(1).join(" ") ?? "";

  return (
    <div style={{ minHeight: "100vh", background: "#fffbf5", fontFamily: "'Manrope', sans-serif", color: "#1c0f00" }}>
      <style>{`
        @keyframes crFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cr-fade { animation: crFadeUp 0.65s ease both; }
        .cr-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(139,78,26,0.14) !important; }
        .cr-skill:hover { background: #D4834A !important; color: #fff !important; transform: scale(1.05); }
        .cr-proj-link:hover { color: #D4834A !important; }
        .cr-nav-link:hover { color: #D4834A !important; }
        .cr-exp-card:hover { border-color: rgba(212,131,74,0.50) !important; }
      `}</style>

      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(255,251,245,0.90)", backdropFilter: "blur(20px)",
        borderBottom: "1.5px solid rgba(212,184,150,0.18)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "-0.02em", color: "#1c0f00" }}>
            {personal.name.split(" ")[0]}<span style={{ color: "#D4834A" }}>.</span>
          </span>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {["Experience", "Projects", "Skills"].map(item => (
              <a key={item} href={`#cr-${item.toLowerCase()}`}
                style={{ fontSize: 13, fontWeight: 500, color: "#6b4a28", textDecoration: "none", transition: "color 0.18s" }}
                className="cr-nav-link">
                {item}
              </a>
            ))}
            <a href="#cr-contact"
              style={{
                fontSize: 12, fontWeight: 700,
                background: "#1c0f00", color: "#fffbf5",
                padding: "7px 18px", borderRadius: 999, textDecoration: "none",
              }}>
              Let's talk
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero (split layout) ─────────────────────────────────────── */}
      <section style={{
        maxWidth: 1100, margin: "0 auto", padding: "72px 32px 80px",
        display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 64, alignItems: "center",
      }}>
        {/* LEFT: bio + cta */}
        <div>
          {personal.title && (
            <div className="cr-fade" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(212,131,74,0.08)", border: "1.5px solid rgba(212,131,74,0.22)",
              borderRadius: 999, padding: "5px 14px", marginBottom: 28, animationDelay: "0.05s",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#D4834A", display: "inline-block" }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#8B4E1A", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {personal.title}
              </span>
            </div>
          )}

          <h2 className="cr-fade" style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(28px, 3.5vw, 44px)",
            fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1.2,
            color: "#1c0f00", marginBottom: 20, animationDelay: "0.12s",
          }}>
            Building remarkable<br />
            <span style={{ fontWeight: 700, color: "#D4834A" }}>products</span> people love.
          </h2>

          <p className="cr-fade" style={{
            fontSize: 16, lineHeight: 1.78, color: "#6b4a28",
            maxWidth: 440, marginBottom: 40, animationDelay: "0.20s",
          }}>
            {personal.bio}
          </p>

          <div className="cr-fade" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36, animationDelay: "0.28s" }}>
            {personal.email && (
              <a href={`mailto:${personal.email}`}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#1c0f00", color: "#fffbf5", padding: "12px 24px", borderRadius: 10,
                  fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "background 0.18s",
                }}>
                <Mail size={14} /> Say hello <ArrowRight size={14} />
              </a>
            )}
            {social.github && (
              <a href={social.github} target="_blank" rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "transparent", color: "#1c0f00", padding: "12px 24px", borderRadius: 10,
                  fontSize: 14, fontWeight: 600, textDecoration: "none",
                  border: "1.5px solid rgba(28,15,0,0.18)", transition: "border-color 0.18s",
                }}>
                <GithubIcon size={14} /> GitHub
              </a>
            )}
          </div>

          {/* Social + location */}
          <div className="cr-fade" style={{ display: "flex", alignItems: "center", gap: 16, animationDelay: "0.34s" }}>
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noreferrer" style={{ color: "#d4b896", transition: "color 0.18s" }} className="cr-proj-link">
                <LinkedinIcon size={17} />
              </a>
            )}
            {social.twitter && (
              <a href={social.twitter} target="_blank" rel="noreferrer" style={{ color: "#d4b896", transition: "color 0.18s" }} className="cr-proj-link">
                <TwitterIcon size={17} />
              </a>
            )}
            {personal.location && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: "#d4b896", fontWeight: 600 }}>
                <MapPin size={13} /> {personal.location}
              </span>
            )}
          </div>
        </div>

        {/* RIGHT: big name + stats */}
        <div style={{ position: "relative" }}>
          {/* Decorative big letter */}
          <div style={{
            position: "absolute", right: -12, top: -36,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(140px, 18vw, 220px)",
            fontWeight: 800, lineHeight: 1,
            background: "linear-gradient(160deg, rgba(245,201,138,0.15) 0%, rgba(212,131,74,0.08) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "-0.06em", pointerEvents: "none", userSelect: "none",
            zIndex: 0,
          }}>
            {firstName[0]}
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <h1 className="cr-fade" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(46px, 6vw, 76px)",
              fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.92,
              color: "#1c0f00", marginBottom: 10, animationDelay: "0.08s",
            }}>
              {firstName}
            </h1>
            <h1 className="cr-fade" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(46px, 6vw, 76px)",
              fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.92,
              color: "#D4834A", marginBottom: 28, animationDelay: "0.14s",
            }}>
              {lastName}
            </h1>

            {/* Stats grid */}
            {stats && stats.length > 0 && (
              <div className="cr-fade" style={{
                display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12,
                marginTop: 32, animationDelay: "0.30s",
              }}>
                {stats.map((stat, i) => (
                  <div key={i} style={{
                    background: "#fff", borderRadius: 12, padding: "16px 20px",
                    border: "1.5px solid rgba(212,184,150,0.22)",
                    boxShadow: "0 2px 16px rgba(139,78,26,0.05)",
                  }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 700, color: "#D4834A", lineHeight: 1 }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#d4b896", marginTop: 5, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>

        {/* ── Experience ────────────────────────────────────────────── */}
        {experience.length > 0 && (
          <section id="cr-experience" style={{ padding: "72px 0", borderTop: "2px solid rgba(212,184,150,0.18)" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 48 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D4834A", margin: 0 }}>
                Experience
              </p>
              <div style={{ flex: 1, height: 1, background: "rgba(212,184,150,0.20)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {experience.map((exp, i) => (
                <div key={i}
                  className="cr-exp-card"
                  style={{
                    background: "#fff", borderRadius: 16, padding: "28px 32px",
                    border: "1.5px solid rgba(212,184,150,0.22)",
                    boxShadow: "0 2px 20px rgba(139,78,26,0.04)",
                    transition: "border-color 0.22s",
                    display: "grid", gridTemplateColumns: "auto 1fr", gap: "0 32px",
                  }}>
                  {/* Number accent */}
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 40, fontWeight: 800, color: "rgba(212,131,74,0.12)",
                    lineHeight: 1, letterSpacing: "-0.04em", paddingTop: 4,
                    minWidth: 48,
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                      <div>
                        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, color: "#1c0f00", margin: "0 0 4px" }}>
                          {exp.role}
                        </h3>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#D4834A" }}>{exp.company}</span>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#d4b896", whiteSpace: "nowrap", paddingLeft: 16, paddingTop: 2 }}>
                        {exp.duration}
                      </span>
                    </div>
                    {exp.description && (
                      <p style={{ fontSize: 14, color: "#6b4a28", margin: "10px 0 14px", lineHeight: 1.65 }}>{exp.description}</p>
                    )}
                    <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "flex", flexDirection: "column", gap: 8 }}>
                      {exp.highlights.map((h, j) => (
                        <li key={j} style={{ display: "flex", gap: 10, fontSize: 14, color: "#6b4a28", lineHeight: 1.65 }}>
                          <span style={{ color: "#D4834A", marginTop: 3, flexShrink: 0, fontSize: 10 }}>▸</span>
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

        {/* ── Projects (Bento grid) ────────────────────────────────── */}
        {projects.length > 0 && (
          <section id="cr-projects" style={{ padding: "72px 0", borderTop: "2px solid rgba(212,184,150,0.18)" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 48 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D4834A", margin: 0 }}>
                Projects
              </p>
              <div style={{ flex: 1, height: 1, background: "rgba(212,184,150,0.20)" }} />
            </div>

            {/* Bento grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gridTemplateRows: "auto", gap: 16 }}>
              {projects.map((project, i) => {
                // First project spans 4 cols, rest span 2
                const isFeatured = i === 0;
                return (
                  <div key={i}
                    className="cr-card"
                    style={{
                      gridColumn: isFeatured ? "span 4" : "span 2",
                      background: isFeatured ? "#1c0f00" : "#fff",
                      borderRadius: 18, padding: isFeatured ? 36 : 26,
                      border: isFeatured ? "none" : "1.5px solid rgba(212,184,150,0.22)",
                      boxShadow: isFeatured
                        ? "0 8px 40px rgba(139,78,26,0.18)"
                        : "0 2px 20px rgba(139,78,26,0.05)",
                      display: "flex", flexDirection: "column", gap: 14,
                      transition: "transform 0.22s ease, box-shadow 0.22s ease",
                    }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <h3 style={{
                        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                        fontSize: isFeatured ? 20 : 15,
                        color: isFeatured ? "#F5C98A" : "#1c0f00", margin: 0,
                      }}>
                        {project.name}
                      </h3>
                      {(project.github || project.live) && (
                        <a href={project.github || project.live} target="_blank" rel="noreferrer"
                          style={{ color: isFeatured ? "rgba(245,201,138,0.50)" : "#d4b896", transition: "color 0.18s", flexShrink: 0, marginLeft: 12 }}
                          className="cr-proj-link">
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                    <p style={{
                      fontSize: 13, lineHeight: 1.7, flex: 1, margin: 0,
                      color: isFeatured ? "rgba(245,240,234,0.65)" : "#6b4a28",
                    }}>
                      {project.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {project.tech.map((tag) => (
                        <span key={tag} style={{
                          fontSize: 11, fontWeight: 700, letterSpacing: "0.03em",
                          borderRadius: 5, padding: "3px 9px",
                          color: isFeatured ? "#F5C98A" : "#D4834A",
                          background: isFeatured ? "rgba(245,201,138,0.12)" : "rgba(212,131,74,0.08)",
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Skills ──────────────────────────────────────────────────── */}
        {skills.length > 0 && (
          <section id="cr-skills" style={{ padding: "72px 0", borderTop: "2px solid rgba(212,184,150,0.18)" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 48 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D4834A", margin: 0 }}>
                Skills
              </p>
              <div style={{ flex: 1, height: 1, background: "rgba(212,184,150,0.20)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {skills.map((group) => (
                <div key={group.category}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#d4b896", letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: 12 }}>
                    {group.category}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {group.items.map((skill) => (
                      <span key={skill}
                        className="cr-skill"
                        style={{
                          fontSize: 13, fontWeight: 600, color: "#1c0f00",
                          background: "#fff", border: "1.5px solid rgba(212,184,150,0.35)",
                          borderRadius: 8, padding: "6px 16px",
                          transition: "all 0.18s", cursor: "default",
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
          <section style={{ padding: "72px 0", borderTop: "2px solid rgba(212,184,150,0.18)" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 32 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D4834A", margin: 0 }}>
                GitHub Activity
              </p>
              <div style={{ flex: 1, height: 1, background: "rgba(212,184,150,0.20)" }} />
            </div>
            <GitHubWall username={ghUsername} theme="light" />
          </section>
        )}

        {/* ── Education ───────────────────────────────────────────────── */}
        {education.length > 0 && (
          <section style={{ padding: "72px 0", borderTop: "2px solid rgba(212,184,150,0.18)" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 40 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D4834A", margin: 0 }}>
                Education
              </p>
              <div style={{ flex: 1, height: 1, background: "rgba(212,184,150,0.20)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {education.map((edu, i) => (
                <div key={i} style={{
                  background: "#fff", borderRadius: 12, padding: "20px 24px",
                  border: "1.5px solid rgba(212,184,150,0.22)",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: "#1c0f00" }}>{edu.degree}</div>
                    <div style={{ fontSize: 13, color: "#6b4a28", marginTop: 3 }}>{edu.institution}</div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#D4834A", whiteSpace: "nowrap", paddingLeft: 16 }}>{edu.duration}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Contact ─────────────────────────────────────────────────── */}
        <section id="cr-contact" style={{ padding: "72px 0 96px", borderTop: "2px solid rgba(212,184,150,0.18)" }}>
          <div style={{
            background: "#1c0f00", borderRadius: 24, padding: "64px 48px",
            display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
          }}>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(245,201,138,0.60)", marginBottom: 20, display: "block",
            }}>
              Contact
            </span>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700, letterSpacing: "-0.03em",
              color: "#fffbf5", marginBottom: 16,
            }}>
              Want to work together?
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,251,245,0.50)", maxWidth: 380, margin: "0 auto 44px", lineHeight: 1.7 }}>
              Open to new opportunities, collaborations, and interesting conversations.
            </p>
            {personal.email && (
              <a href={`mailto:${personal.email}`}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "linear-gradient(135deg, #D4834A 0%, #F5C98A 100%)",
                  color: "#fff", padding: "14px 32px", borderRadius: 10,
                  fontSize: 14, fontWeight: 700, textDecoration: "none",
                  boxShadow: "0 8px 32px rgba(212,131,74,0.40)",
                }}>
                <Mail size={15} /> Let's connect
              </a>
            )}
            <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 36 }}>
              {social.github && (
                <a href={social.github} target="_blank" rel="noreferrer"
                  style={{ color: "rgba(255,251,245,0.30)", transition: "color 0.18s" }} className="cr-proj-link"><GithubIcon size={18} /></a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noreferrer"
                  style={{ color: "rgba(255,251,245,0.30)", transition: "color 0.18s" }} className="cr-proj-link"><LinkedinIcon size={18} /></a>
              )}
              {social.twitter && (
                <a href={social.twitter} target="_blank" rel="noreferrer"
                  style={{ color: "rgba(255,251,245,0.30)", transition: "color 0.18s" }} className="cr-proj-link"><TwitterIcon size={18} /></a>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1.5px solid rgba(212,184,150,0.18)", padding: "20px 32px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#d4b896" }}>
          Built with{" "}
          <a href="/" style={{ color: "#D4834A", textDecoration: "none", fontWeight: 600 }}>dunno</a>
          {" "}· AI-powered portfolio
        </p>
      </footer>
    </div>
  );
}

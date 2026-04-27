"use client";

import { Mail, ExternalLink, Globe, MapPin, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/portfolio/SocialIcons";
import type { PortfolioData } from "@/lib/portfolioTypes";

interface Props { data: PortfolioData }

export default function MinimalTemplate({ data }: Props) {
  const { personal, social, skills, experience, projects, education, stats } = data;
  const navItems = ["Experience", "Skills", "Projects", "Contact"];

  return (
    <div style={{ minHeight: "100vh", background: "#fdfaf6", fontFamily: "'Manrope', sans-serif", color: "#1c0f00" }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .minimal-fade { animation: fadeUp 0.65s ease both; }
        .minimal-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(139,78,26,0.12) !important; }
        .minimal-skill-pill:hover { background: rgba(212,131,74,0.10) !important; border-color: rgba(212,131,74,0.50) !important; }
        .minimal-link:hover { color: #D4834A !important; }
        .minimal-btn-primary:hover { opacity: 0.88; }
        .minimal-btn-outline:hover { border-color: rgba(212,131,74,0.60) !important; }
      `}</style>

      {/* ── Sticky nav ──────────────────────────────────────────────── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(253,250,246,0.88)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(212,184,150,0.20)",
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 32px", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "-0.02em" }}>
            {personal.name.split(" ")[0]}
            <span style={{ color: "#D4834A" }}>.</span>
          </span>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {navItems.map(item => (
              <a key={item} href={`#minimal-${item.toLowerCase()}`}
                style={{ fontSize: 13, fontWeight: 500, color: "#6b4a28", textDecoration: "none", transition: "color 0.18s" }}
                className="minimal-link">
                {item}
              </a>
            ))}
            {personal.email && (
              <a href={`mailto:${personal.email}`}
                style={{
                  fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: "0.04em",
                  background: "linear-gradient(135deg, #D4834A 0%, #8B4E1A 100%)",
                  padding: "7px 18px", borderRadius: 999, textDecoration: "none",
                  transition: "opacity 0.18s", display: "inline-block",
                }}
                className="minimal-btn-primary">
                Hire me
              </a>
            )}
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "0 32px" }}>

        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section style={{ padding: "88px 0 80px" }}>

          {/* Role label */}
          {personal.title && (
            <p className="minimal-fade" style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
              color: "#D4834A", marginBottom: 22, animationDelay: "0.05s",
            }}>
              {personal.title}{personal.location && ` · ${personal.location}`}
            </p>
          )}

          {/* Name */}
          <h1 className="minimal-fade" style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(52px, 7.5vw, 86px)",
            fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.0,
            color: "#1c0f00", marginBottom: 28, animationDelay: "0.12s",
          }}>
            {personal.name}
          </h1>

          {/* Bio */}
          <p className="minimal-fade" style={{
            fontSize: 18, lineHeight: 1.75, color: "#6b4a28",
            maxWidth: 580, marginBottom: 40, animationDelay: "0.20s",
          }}>
            {personal.bio}
          </p>

          {/* CTAs */}
          <div className="minimal-fade" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32, animationDelay: "0.28s" }}>
            {personal.email && (
              <a href={`mailto:${personal.email}`}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "linear-gradient(135deg, #D4834A 0%, #8B4E1A 100%)",
                  color: "#fff", padding: "12px 24px", borderRadius: 10,
                  fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "opacity 0.18s",
                }}
                className="minimal-btn-primary">
                <Mail size={14} /> Get in touch
              </a>
            )}
            {social.github && (
              <a href={social.github} target="_blank" rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#fff", color: "#1c0f00", padding: "12px 24px", borderRadius: 10,
                  fontSize: 14, fontWeight: 600, textDecoration: "none",
                  border: "1.5px solid rgba(212,184,150,0.40)", transition: "border-color 0.18s",
                }}
                className="minimal-btn-outline">
                <GithubIcon size={14} /> GitHub <ArrowUpRight size={12} />
              </a>
            )}
          </div>

          {/* Social icons */}
          {(social.linkedin || social.twitter || personal.website) && (
            <div className="minimal-fade" style={{ display: "flex", gap: 18, animationDelay: "0.34s" }}>
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noreferrer"
                  style={{ color: "#d4b896", transition: "color 0.18s" }} className="minimal-link">
                  <LinkedinIcon size={17} />
                </a>
              )}
              {social.twitter && (
                <a href={social.twitter} target="_blank" rel="noreferrer"
                  style={{ color: "#d4b896", transition: "color 0.18s" }} className="minimal-link">
                  <TwitterIcon size={17} />
                </a>
              )}
              {personal.website && (
                <a href={personal.website} target="_blank" rel="noreferrer"
                  style={{ color: "#d4b896", transition: "color 0.18s" }} className="minimal-link">
                  <Globe size={17} />
                </a>
              )}
              {personal.location && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#d4b896", fontSize: 13 }}>
                  <MapPin size={14} /> {personal.location}
                </span>
              )}
            </div>
          )}

          {/* Stats row */}
          {stats && stats.length > 0 && (
            <div className="minimal-fade" style={{
              display: "flex", gap: 0, marginTop: 56,
              borderTop: "1px solid rgba(212,184,150,0.20)",
              paddingTop: 32, animationDelay: "0.40s",
            }}>
              {stats.map((stat, i) => (
                <div key={i} style={{
                  flex: 1, paddingRight: 32,
                  borderRight: i < stats.length - 1 ? "1px solid rgba(212,184,150,0.20)" : "none",
                  paddingLeft: i > 0 ? 32 : 0,
                }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 300, color: "#D4834A", lineHeight: 1 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#d4b896", marginTop: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Experience ──────────────────────────────────────────────── */}
        {experience.length > 0 && (
          <section id="minimal-experience" style={{ padding: "64px 0", borderTop: "1px solid rgba(212,184,150,0.20)" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D4834A", marginBottom: 44 }}>
              Experience
            </p>
            <div>
              {experience.map((exp, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "160px 1fr", gap: "0 40px",
                  paddingBottom: 44,
                  borderBottom: i < experience.length - 1 ? "1px solid rgba(212,184,150,0.14)" : "none",
                  marginBottom: i < experience.length - 1 ? 44 : 0,
                }}>
                  {/* Date */}
                  <div style={{ color: "#d4b896", fontSize: 12, fontWeight: 600, paddingTop: 3, lineHeight: 1.5 }}>
                    {exp.duration}
                  </div>
                  {/* Content */}
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 16, color: "#1c0f00", margin: 0 }}>
                        {exp.role}
                      </h3>
                      <span style={{ color: "rgba(212,184,150,0.60)", fontSize: 14 }}>·</span>
                      <span style={{ fontSize: 14, color: "#6b4a28", fontWeight: 500 }}>{exp.company}</span>
                    </div>
                    {exp.description && (
                      <p style={{ fontSize: 14, color: "#6b4a28", marginBottom: 14, lineHeight: 1.65, margin: "0 0 14px" }}>{exp.description}</p>
                    )}
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
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

        {/* ── Skills ──────────────────────────────────────────────────── */}
        {skills.length > 0 && (
          <section id="minimal-skills" style={{ padding: "64px 0", borderTop: "1px solid rgba(212,184,150,0.20)" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D4834A", marginBottom: 44 }}>
              Skills
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {skills.map((group) => (
                <div key={group.category} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "0 40px", alignItems: "flex-start" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#d4b896", paddingTop: 5, letterSpacing: "0.05em" }}>
                    {group.category}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {group.items.map((skill) => (
                      <span key={skill}
                        className="minimal-skill-pill"
                        style={{
                          fontSize: 13, fontWeight: 500, color: "#6b4a28",
                          background: "#fff", border: "1.5px solid rgba(212,184,150,0.30)",
                          borderRadius: 6, padding: "4px 13px", transition: "all 0.18s", cursor: "default",
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

        {/* ── Projects ────────────────────────────────────────────────── */}
        {projects.length > 0 && (
          <section id="minimal-projects" style={{ padding: "64px 0", borderTop: "1px solid rgba(212,184,150,0.20)" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D4834A", marginBottom: 44 }}>
              Projects
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 20 }}>
              {projects.map((project, i) => (
                <div key={i}
                  className="minimal-card"
                  style={{
                    background: "#fff", borderRadius: 14, padding: 24,
                    border: "1.5px solid rgba(212,184,150,0.22)",
                    boxShadow: "0 2px 20px rgba(139,78,26,0.05)",
                    display: "flex", flexDirection: "column", gap: 12,
                    transition: "transform 0.22s ease, box-shadow 0.22s ease",
                    cursor: "default",
                  }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15, color: "#1c0f00", margin: 0 }}>
                      {project.name}
                    </h3>
                    {(project.github || project.live) && (
                      <a href={project.github || project.live} target="_blank" rel="noreferrer"
                        style={{ color: "#d4b896", transition: "color 0.18s", flexShrink: 0, marginLeft: 8 }}
                        className="minimal-link">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                  <p style={{ fontSize: 13, color: "#6b4a28", lineHeight: 1.68, flex: 1, margin: 0 }}>{project.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {project.tech.map((tag) => (
                      <span key={tag} style={{
                        fontSize: 11, fontWeight: 700, color: "#D4834A", letterSpacing: "0.03em",
                        background: "rgba(212,131,74,0.08)", borderRadius: 5, padding: "3px 9px",
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

        {/* ── Education ───────────────────────────────────────────────── */}
        {education.length > 0 && (
          <section style={{ padding: "64px 0", borderTop: "1px solid rgba(212,184,150,0.20)" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D4834A", marginBottom: 44 }}>
              Education
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {education.map((edu, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "0 40px" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#d4b896", paddingTop: 2 }}>{edu.duration}</div>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15, color: "#1c0f00" }}>{edu.degree}</div>
                    <div style={{ fontSize: 13, color: "#6b4a28", marginTop: 3 }}>{edu.institution}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Contact ─────────────────────────────────────────────────── */}
        <section id="minimal-contact" style={{ padding: "72px 0 88px", borderTop: "1px solid rgba(212,184,150,0.20)", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D4834A", marginBottom: 20 }}>
            Contact
          </p>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 300, letterSpacing: "-0.03em", color: "#1c0f00", marginBottom: 16,
          }}>
            Let's build something great.
          </h2>
          <p style={{ fontSize: 15, color: "#6b4a28", maxWidth: 380, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Open to new opportunities, collaborations, and interesting conversations.
          </p>
          {personal.email && (
            <a href={`mailto:${personal.email}`}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "linear-gradient(135deg, #D4834A 0%, #8B4E1A 100%)",
                color: "#fff", padding: "14px 30px", borderRadius: 10,
                fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "opacity 0.18s",
              }}
              className="minimal-btn-primary">
              <Mail size={15} /> Say hello
            </a>
          )}
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 32 }}>
            {social.github && (
              <a href={social.github} target="_blank" rel="noreferrer"
                style={{ color: "#d4b896", transition: "color 0.18s" }} className="minimal-link"><GithubIcon size={18} /></a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noreferrer"
                style={{ color: "#d4b896", transition: "color 0.18s" }} className="minimal-link"><LinkedinIcon size={18} /></a>
            )}
            {social.twitter && (
              <a href={social.twitter} target="_blank" rel="noreferrer"
                style={{ color: "#d4b896", transition: "color 0.18s" }} className="minimal-link"><TwitterIcon size={18} /></a>
            )}
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: "1px solid rgba(212,184,150,0.20)", padding: "20px 32px",
        textAlign: "center", background: "#fdfaf6",
      }}>
        <p style={{ fontSize: 12, color: "#d4b896" }}>
          Built with{" "}
          <a href="/" style={{ color: "#D4834A", textDecoration: "none", fontWeight: 600 }}>dunno</a>
          {" "}· AI-powered portfolio
        </p>
      </footer>
    </div>
  );
}

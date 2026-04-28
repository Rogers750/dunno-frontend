"use client";

import { ExternalLink, Mail } from "lucide-react";
import type { GeneratedContent } from "@/lib/api";

interface Props {
  name: string;
  accentColor: string;
  content: GeneratedContent;
}

export default function DesignTemplate({ name, accentColor, content }: Props) {
  const navItems = ["Work", "About", "Skills", "Contact"];

  return (
    <div
      className="min-h-screen text-[#1a1a1a]"
      style={{ background: "#fafafa", fontFamily: "'Manrope', sans-serif" }}
    >
      {/* Nav */}
      <nav
        className="sticky top-0 z-40 border-b"
        style={{
          background: "rgba(250,250,250,0.85)",
          backdropFilter: "blur(20px)",
          borderColor: "#f0f0f0",
        }}
      >
        <div className="max-w-5xl mx-auto px-8 py-3.5 flex items-center justify-between">
          <span className="font-[700] text-lg" style={{ color: accentColor }}>
            {name.split(" ")[0]}
          </span>
          <div className="hidden md:flex gap-6">
            {navItems.map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase()}`}
                className="text-sm text-[#888] hover:text-[#1a1a1a] transition-colors"
              >
                {n}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="text-xs font-[700] tracking-[0.08em] uppercase text-white px-4 py-2 rounded-full"
            style={{ background: accentColor }}
          >
            Hire me
          </a>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-8">

        {/* Hero */}
        <section id="about" className="pt-20 pb-16 grid md:grid-cols-[1fr_200px] gap-12 items-start">
          <div>
            {content.stats && (
              <div className="flex flex-wrap gap-2 mb-8">
                {content.stats.map((s) => (
                  <span
                    key={s.label}
                    className="text-xs font-[700] px-3 py-1 rounded-full"
                    style={{ background: `${accentColor}18`, color: accentColor }}
                  >
                    {s.value} {s.label}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-5xl font-[300] leading-[1.1] text-[#1a1a1a] mb-6 tracking-[-0.02em]">
              {name}
            </h1>
            <p className="text-[#666] leading-relaxed text-lg max-w-xl">{content.personal.bio}</p>
            <div className="mt-8 flex gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-[700] tracking-[0.06em] uppercase text-white px-5 py-2.5 rounded-full transition-opacity hover:opacity-85"
                style={{ background: accentColor }}
              >
                <Mail className="h-4 w-4" /> Get in touch
              </a>
            </div>
          </div>
          {/* Accent block — purely decorative */}
          <div
            className="hidden md:block mt-4 h-40 w-40 rounded-3xl"
            style={{ background: `${accentColor}20` }}
          />
        </section>

        {/* Projects — large grid, FIRST */}
        {content.projects.length > 0 && (
          <section id="work" className="pb-20">
            <div className="flex items-baseline justify-between mb-10">
              <h2 className="text-3xl font-[600] text-[#1a1a1a]">Selected work</h2>
              <span className="text-sm text-[#bbb]">{content.projects.length} projects</span>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {content.projects.map((p, i) => (
                <a
                  key={i}
                  href={p.github || p.live || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <div
                    className="h-44 flex items-end p-5"
                    style={{
                      background: i % 3 === 0
                        ? `linear-gradient(135deg, ${accentColor}28, ${accentColor}08)`
                        : i % 3 === 1 ? "#f0f0f0"
                        : `linear-gradient(135deg, ${accentColor}14, #f5f5f5)`,
                    }}
                  >
                    <div className="flex gap-1.5 flex-wrap">
                      {p.tech.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] font-[700] tracking-[0.08em] uppercase px-2 py-1 rounded-md"
                          style={{ background: "rgba(255,255,255,0.85)", color: accentColor, backdropFilter: "blur(4px)" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white p-5 border-t" style={{ borderColor: "#f5f5f5" }}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-[600] text-[#1a1a1a]">{p.name}</h3>
                      <ExternalLink className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "#ddd" }} />
                    </div>
                    <p className="text-sm text-[#888] leading-relaxed line-clamp-2">{p.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Skills — tag cloud */}
        <section id="skills" className="pb-20">
          <h2 className="text-3xl font-[600] text-[#1a1a1a] mb-10">Toolbox</h2>
          <div className="flex flex-col gap-6">
            {content.skills.map((g) => (
              <div key={g.category} className="flex items-start gap-6">
                <span
                  className="text-[10px] font-[700] tracking-[0.10em] uppercase w-28 shrink-0 pt-1"
                  style={{ color: accentColor }}
                >
                  {g.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm bg-[#f5f5f5] text-[#444] px-3.5 py-1.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience — minimal timeline */}
        <section className="pb-20">
          <h2 className="text-3xl font-[600] text-[#1a1a1a] mb-10">Experience</h2>
          <div className="flex flex-col gap-8">
            {content.experience.map((exp, i) => (
              <div key={i} className="grid md:grid-cols-[160px_1fr] gap-4">
                <div>
                  <div
                    className="text-xs font-[700] tracking-[0.08em] uppercase"
                    style={{ color: accentColor }}
                  >
                    {exp.company}
                  </div>
                  <div className="text-xs text-[#bbb] mt-1">{exp.duration}</div>
                </div>
                <div>
                  <p className="font-[600] text-[#1a1a1a] mb-2">{exp.role}</p>
                  <p className="text-sm text-[#888] leading-relaxed">{exp.highlights[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="pb-24 text-center">
          <div
            className="rounded-3xl p-14"
            style={{ background: `${accentColor}0c` }}
          >
            <h2 className="text-4xl font-[300] text-[#1a1a1a] mb-3 tracking-[-0.01em]">
              Let's create together
            </h2>
            <p className="text-[#888] mb-8 max-w-sm mx-auto">
              Open to new projects, collaborations, and interesting conversations.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-white text-sm font-[700] tracking-[0.06em] uppercase px-7 py-3 rounded-full transition-opacity hover:opacity-85"
              style={{ background: accentColor }}
            >
              <Mail className="h-4 w-4" /> Say hello
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 text-center text-xs" style={{ borderColor: "#f0f0f0", color: "#ccc" }}>
        Built with{" "}
        <a href="/" style={{ color: accentColor }}>
          dunno
        </a>
      </footer>
    </div>
  );
}

"use client";

import { Mail, ExternalLink } from "lucide-react";
import type { GeneratedContent } from "@/lib/api";

interface Props {
  name: string;
  accentColor: string;
  content: GeneratedContent;
}

export default function ProductTemplate({ name, accentColor, content }: Props) {
  return (
    <div
      className="min-h-screen text-[#1a1a1a]"
      style={{ background: "#ffffff", fontFamily: "'Manrope', sans-serif" }}
    >
      {/* Full-width hero band with gradient */}
      <div style={{ background: `linear-gradient(160deg, ${accentColor}12 0%, #ffffff 55%)` }}>

        {/* Nav */}
        <nav className="max-w-5xl mx-auto px-8 py-4 flex items-center justify-between">
          <span className="font-[700] text-lg" style={{ color: accentColor }}>
            {name.split(" ")[0]}
          </span>
          <div className="hidden md:flex gap-6">
            {["Story", "Impact", "Work", "Contact"].map((n) => (
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
        </nav>

        {/* Hero */}
        <section id="story" className="max-w-5xl mx-auto px-8 pt-14 pb-20">
          <p
            className="text-xs font-[700] tracking-[0.14em] uppercase mb-6"
            style={{ color: accentColor }}
          >
            Frontend Engineer · Design Engineer
          </p>
          <h1 className="text-5xl md:text-6xl font-[300] leading-[1.08] text-[#1a1a1a] max-w-2xl mb-8 tracking-[-0.02em]">
            {name}
          </h1>
          <p className="text-lg text-[#555] max-w-xl leading-relaxed mb-12">
            {content.summary}
          </p>

          {/* Impact stats row — prominent */}
          {content.stats && (
            <div className="flex flex-wrap gap-0 mb-4">
              {content.stats.map((s, i) => (
                <div
                  key={s.label}
                  className="pr-10 mr-10 last:pr-0 last:mr-0"
                  style={{
                    borderRight: i < content.stats!.length - 1 ? `1.5px solid ${accentColor}30` : "none",
                  }}
                >
                  <div className="text-3xl font-[700]" style={{ color: accentColor }}>
                    {s.value}
                  </div>
                  <div className="text-xs text-[#aaa] font-[500] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <main className="max-w-5xl mx-auto px-8">

        {/* Experience — roadmap */}
        {content.experience.length > 0 && (
          <section id="impact" className="py-20">
            <p
              className="text-xs font-[700] tracking-[0.14em] uppercase mb-12"
              style={{ color: accentColor }}
            >
              Career roadmap
            </p>
            <div className="flex flex-col">
              {content.experience.map((exp, i) => (
                <div
                  key={i}
                  className="grid md:grid-cols-[200px_1fr] gap-6 pb-14"
                >
                  <div className="md:pt-1">
                    <div
                      className="text-xs font-[700] tracking-[0.08em] uppercase"
                      style={{ color: accentColor }}
                    >
                      {exp.company}
                    </div>
                    <div className="text-sm text-[#aaa] mt-1.5">{exp.period}</div>
                  </div>

                  <div
                    className="relative pl-7 border-l-2"
                    style={{ borderColor: `${accentColor}25` }}
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full"
                      style={{ background: accentColor }}
                    />
                    <h3 className="font-[600] text-[#1a1a1a] mb-4 text-lg">{exp.title}</h3>
                    <ul className="flex flex-col gap-2.5">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="text-sm text-[#666] flex gap-3 leading-relaxed">
                          <span
                            className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                            style={{ background: accentColor }}
                          />
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

        {/* Projects */}
        {content.projects.filter((p) => p.included).length > 0 && (
          <section id="work" className="pb-20">
            <p
              className="text-xs font-[700] tracking-[0.14em] uppercase mb-12"
              style={{ color: accentColor }}
            >
              Built things
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {content.projects.filter((p) => p.included).map((p) => (
                <a
                  key={p.id}
                  href={p.url ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-6 rounded-2xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                  style={{ background: `${accentColor}07` }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-[600] text-[#1a1a1a] text-base">{p.title}</h3>
                    <ExternalLink
                      className="h-4 w-4 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: accentColor }}
                    />
                  </div>
                  <p className="text-sm text-[#777] mb-5 leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-[700] tracking-[0.06em] uppercase px-2.5 py-1 rounded-md"
                        style={{ background: `${accentColor}18`, color: accentColor }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Skills — grouped columns */}
        {content.skills.length > 0 && (
          <section className="pb-20">
            <p
              className="text-xs font-[700] tracking-[0.14em] uppercase mb-12"
              style={{ color: accentColor }}
            >
              Skills
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {content.skills.map((g) => (
                <div key={g.category}>
                  <p
                    className="text-[10px] font-[700] tracking-[0.10em] uppercase mb-4"
                    style={{ color: accentColor }}
                  >
                    {g.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-3 py-1.5 rounded-full text-[#555]"
                        style={{ background: "#f5f5f5" }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {content.education.length > 0 && (
          <section className="pb-20">
            <p
              className="text-xs font-[700] tracking-[0.14em] uppercase mb-8"
              style={{ color: accentColor }}
            >
              Education
            </p>
            {content.education.map((edu, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <p className="font-[600] text-[#1a1a1a]">{edu.degree}</p>
                  <p className="text-sm text-[#aaa] mt-1">{edu.institution}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#aaa]">{edu.year}</p>
                  {edu.gpa && (
                    <p className="text-sm font-[700] mt-1" style={{ color: accentColor }}>
                      GPA {edu.gpa}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Contact */}
        <section id="contact" className="pb-24">
          <div
            className="rounded-3xl p-12 text-center"
            style={{ background: `${accentColor}0c` }}
          >
            <h2 className="text-3xl font-[300] text-[#1a1a1a] mb-3 tracking-[-0.01em]">
              Open to opportunities
            </h2>
            <p className="text-[#888] mb-8 max-w-sm mx-auto">
              New roles, collaborations, and interesting problems.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-white text-sm font-[700] tracking-[0.06em] uppercase px-7 py-3 rounded-full transition-opacity hover:opacity-85"
              style={{ background: accentColor }}
            >
              <Mail className="h-4 w-4" /> Get in touch
            </a>
          </div>
        </section>
      </main>

      <footer
        className="border-t py-6 text-center text-xs"
        style={{ borderColor: "#f5f5f5", color: "#ccc" }}
      >
        Built with{" "}
        <a href="/" style={{ color: accentColor }}>
          dunno
        </a>
      </footer>
    </div>
  );
}

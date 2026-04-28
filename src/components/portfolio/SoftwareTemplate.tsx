"use client";

import { useState } from "react";
import { GitBranch, ExternalLink, Mail, MessageSquare, X, Send } from "lucide-react";
import type { GeneratedContent } from "@/lib/api";

interface Props {
  username: string;
  name: string;
  accentColor: string;
  content: GeneratedContent;
}

// ── Chat widget ───────────────────────────────────────────────────────────────

function ChatWidget({ name, accentColor }: { name: string; accentColor: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    { role: "assistant", text: `Hi! I'm an AI assistant for ${name}'s portfolio. Ask me anything about their experience, projects, or skills.` },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch(`/api/chat/${encodeURIComponent(location.pathname.split("/")[1])}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply ?? "Sorry, I couldn't respond." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "I'm having trouble connecting right now." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ background: accentColor }}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl flex items-center justify-center text-white transition-transform hover:scale-105 z-50"
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-[#0f0f1a] border border-[#1e1e30] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">
          <div style={{ background: accentColor }} className="px-4 py-3">
            <p className="font-medium text-white text-sm">Chat with {name}&apos;s AI</p>
          </div>

          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 max-h-72">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm rounded-xl px-3 py-2 max-w-[85%] leading-relaxed ${
                  m.role === "assistant"
                    ? "bg-[#1a1a2e] text-[#e2e8f0] self-start"
                    : "text-white self-end"
                }`}
                style={m.role === "user" ? { background: accentColor } : {}}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="bg-[#1a1a2e] text-[#94a3b8] text-sm rounded-xl px-3 py-2 self-start">
                Thinking…
              </div>
            )}
          </div>

          <div className="p-3 border-t border-[#1e1e30] flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask anything…"
              className="flex-1 bg-[#07070f] border border-[#1e1e30] text-sm text-[#e2e8f0] placeholder:text-[#475569] rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#818cf8]"
            />
            <button
              onClick={sendMessage}
              style={{ background: accentColor }}
              className="h-9 w-9 rounded-lg flex items-center justify-center text-white shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ── Main template ─────────────────────────────────────────────────────────────

export default function SoftwareTemplate({ username, name, accentColor, content }: Props) {
  const navItems = ["About", "Experience", "Projects", "Skills", "Contact"];

  return (
    <div className="min-h-screen bg-[#07070f] text-[#e2e8f0]">
      {/* Sticky nav */}
      <nav className="sticky top-0 z-40 bg-[#07070f]/90 backdrop-blur border-b border-[#1e1e30]">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <span
            className="font-['Space_Grotesk'] font-bold text-lg"
            style={{ color: accentColor }}
          >
            {name.split(" ")[0]}
          </span>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-[#94a3b8] hover:text-[#e2e8f0] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href={`#contact`}
            style={{ background: accentColor }}
            className="text-white text-xs font-medium px-4 py-1.5 rounded-full hidden md:block"
          >
            Hire me
          </a>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6">
        {/* Hero / About */}
        <section id="about" className="pt-24 pb-20">
          {content.stats && content.stats.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-8">
              {content.stats.map((stat) => (
                <span
                  key={stat.label}
                  className="text-xs border rounded-full px-3 py-1"
                  style={{ borderColor: `${accentColor}40`, color: accentColor, background: `${accentColor}10` }}
                >
                  {stat.value} {stat.label}
                </span>
              ))}
            </div>
          )}
          <h1 className="font-['Space_Grotesk'] font-bold text-5xl md:text-6xl text-white mb-4 leading-tight">
            {name}
          </h1>
          <p className="text-lg md:text-xl text-[#94a3b8] max-w-2xl leading-relaxed mb-8">
            {content.personal.bio}
          </p>
          <div className="flex gap-3">
            <a href="#contact">
              <button
                style={{ background: accentColor }}
                className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
              >
                <Mail className="h-4 w-4" />
                Get in touch
              </button>
            </a>
          </div>
        </section>

        {/* Experience */}
        {content.experience.length > 0 && (
          <section id="experience" className="pb-20">
            <h2 className="font-['Space_Grotesk'] font-bold text-3xl text-white mb-8">Experience</h2>
            <div className="flex flex-col gap-0">
              {content.experience.map((exp, i) => (
                <div key={i} className="relative pl-6 pb-10 border-l border-[#1e1e30] last:border-l-0">
                  <div
                    className="absolute -left-1.5 top-0 h-3 w-3 rounded-full border-2 border-[#07070f]"
                    style={{ background: accentColor }}
                  />
                  <div className="mb-1">
                    <span className="font-['Space_Grotesk'] font-semibold text-white">{exp.role}</span>
                    <span className="text-[#64748b]"> · {exp.company}</span>
                  </div>
                  <div className="text-xs text-[#475569] mb-3">{exp.duration}</div>
                  <ul className="flex flex-col gap-1.5">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="text-sm text-[#94a3b8] flex gap-2">
                        <span style={{ color: accentColor }} className="mt-1 shrink-0">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {content.projects.length > 0 && (
          <section id="projects" className="pb-20">
            <h2 className="font-['Space_Grotesk'] font-bold text-3xl text-white mb-8">Projects</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {content.projects
                
                .map((p) => (
                  <div
                    key={p.name}
                    className="bg-[#0f0f1a] border border-[#1e1e30] hover:border-[#818cf8]/30 rounded-xl p-5 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-['Space_Grotesk'] font-semibold text-white">{p.name}</h3>
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#475569] group-hover:text-[#818cf8] transition-colors"
                        >
                          {p.live ? <ExternalLink className="h-4 w-4" /> : <GitBranch className="h-4 w-4" />}
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-[#64748b] mb-3 leading-relaxed">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] rounded px-2 py-0.5"
                          style={{
                            background: `${accentColor}15`,
                            color: accentColor,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {content.skills.length > 0 && (
          <section id="skills" className="pb-20">
            <h2 className="font-['Space_Grotesk'] font-bold text-3xl text-white mb-8">Skills</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.skills.map((group) => (
                <div key={group.category} className="bg-[#0f0f1a] border border-[#1e1e30] rounded-xl p-4">
                  <div
                    className="text-xs font-medium mb-3"
                    style={{ color: accentColor }}
                  >
                    {group.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-[#1a1a2e] text-[#94a3b8] border border-[#1e1e30] rounded px-2 py-1"
                      >
                        {skill}
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
            <h2 className="font-['Space_Grotesk'] font-bold text-3xl text-white mb-8">Education</h2>
            <div className="flex flex-col gap-4">
              {content.education.map((edu, i) => (
                <div key={i} className="bg-[#0f0f1a] border border-[#1e1e30] rounded-xl p-4">
                  <div className="font-['Space_Grotesk'] font-semibold text-white">{edu.degree}</div>
                  <div className="text-sm text-[#64748b] mt-0.5">{edu.institution} · {edu.duration}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" className="pb-24 text-center">
          <h2 className="font-['Space_Grotesk'] font-bold text-3xl text-white mb-4">Let&apos;s connect</h2>
          <p className="text-[#64748b] max-w-md mx-auto mb-8">
            Open to new opportunities, collaborations, and interesting conversations.
          </p>
          <a
            href={`mailto:${username}@example.com`}
            style={{ background: accentColor }}
            className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-medium transition-opacity hover:opacity-90"
          >
            <Mail className="h-4 w-4" />
            Say hello
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1e1e30] py-6 text-center text-xs text-[#334155]">
        Built with{" "}
        <a href="/" style={{ color: accentColor }} className="hover:underline">
          dunno
        </a>{" "}
        · Powered by Claude AI
      </footer>

      <ChatWidget name={name} accentColor={accentColor} />
    </div>
  );
}

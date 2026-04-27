"use client";

import { useState } from "react";
import { X, Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import type { PortfolioData } from "@/lib/portfolioTypes";

interface Props {
  data: PortfolioData;
  onChange: (updated: PortfolioData) => void;
  onClose: () => void;
  onSave: () => void;
  saving: boolean;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(212,184,150,0.20)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 0", background: "none", border: "none", cursor: "pointer",
          color: "#1c0f00", fontFamily: "'Manrope', sans-serif",
        }}>
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "#6b4a28" }}>{title}</span>
        {open ? <ChevronDown size={15} color="#d4b896" /> : <ChevronRight size={15} color="#d4b896" />}
      </button>
      {open && <div style={{ paddingBottom: 20 }}>{children}</div>}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "8px 12px", borderRadius: 8, border: "1.5px solid rgba(212,184,150,0.35)",
  fontSize: 13, fontFamily: "'Manrope', sans-serif", color: "#1c0f00",
  background: "#fff", outline: "none", boxSizing: "border-box",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle, resize: "vertical" as const, minHeight: 80, lineHeight: 1.6,
};

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, color: "#d4b896", letterSpacing: "0.08em",
  textTransform: "uppercase", display: "block", marginBottom: 6,
};

const Field = ({ label, value, onChange, multiline }: {
  label: string; value: string;
  onChange: (v: string) => void; multiline?: boolean;
}) => (
  <div style={{ marginBottom: 14 }}>
    <label style={labelStyle}>{label}</label>
    {multiline
      ? <textarea style={textareaStyle} value={value} onChange={e => onChange(e.target.value)} />
      : <input style={inputStyle} value={value} onChange={e => onChange(e.target.value)} />}
  </div>
);

export default function EditDrawer({ data, onChange, onClose, onSave, saving }: Props) {
  function updatePersonal<K extends keyof PortfolioData["personal"]>(key: K, val: PortfolioData["personal"][K]) {
    onChange({ ...data, personal: { ...data.personal, [key]: val } });
  }

  function updateSocial<K extends keyof PortfolioData["social"]>(key: K, val: PortfolioData["social"][K]) {
    onChange({ ...data, social: { ...data.social, [key]: val } });
  }

  function updateExp(i: number, field: string, val: string) {
    const exp = data.experience.map((e, idx) => idx === i ? { ...e, [field]: val } : e);
    onChange({ ...data, experience: exp });
  }

  function updateExpHighlight(expIdx: number, hIdx: number, val: string) {
    const exp = data.experience.map((e, i) => {
      if (i !== expIdx) return e;
      const highlights = e.highlights.map((h, j) => j === hIdx ? val : h);
      return { ...e, highlights };
    });
    onChange({ ...data, experience: exp });
  }

  function addExpHighlight(expIdx: number) {
    const exp = data.experience.map((e, i) =>
      i === expIdx ? { ...e, highlights: [...e.highlights, ""] } : e
    );
    onChange({ ...data, experience: exp });
  }

  function removeExpHighlight(expIdx: number, hIdx: number) {
    const exp = data.experience.map((e, i) =>
      i === expIdx ? { ...e, highlights: e.highlights.filter((_, j) => j !== hIdx) } : e
    );
    onChange({ ...data, experience: exp });
  }

  function addExp() {
    onChange({ ...data, experience: [...data.experience, { company: "", role: "", duration: "", description: "", highlights: [] }] });
  }

  function removeExp(i: number) {
    onChange({ ...data, experience: data.experience.filter((_, idx) => idx !== i) });
  }

  function updateProject(i: number, field: string, val: string) {
    const projects = data.projects.map((p, idx) => idx === i ? { ...p, [field]: val } : p);
    onChange({ ...data, projects });
  }

  function updateProjectTech(i: number, val: string) {
    const projects = data.projects.map((p, idx) => idx === i ? { ...p, tech: val.split(",").map(s => s.trim()).filter(Boolean) } : p);
    onChange({ ...data, projects });
  }

  function addProject() {
    onChange({ ...data, projects: [...data.projects, { name: "", description: "", tech: [], github: "", live: "", highlights: [] }] });
  }

  function removeProject(i: number) {
    onChange({ ...data, projects: data.projects.filter((_, idx) => idx !== i) });
  }

  function updateSkillCategory(i: number, val: string) {
    const skills = data.skills.map((s, idx) => idx === i ? { ...s, category: val } : s);
    onChange({ ...data, skills });
  }

  function updateSkillItems(i: number, val: string) {
    const skills = data.skills.map((s, idx) => idx === i ? { ...s, items: val.split(",").map(s => s.trim()).filter(Boolean) } : s);
    onChange({ ...data, skills });
  }

  function addSkillGroup() {
    onChange({ ...data, skills: [...data.skills, { category: "", items: [] }] });
  }

  function removeSkillGroup(i: number) {
    onChange({ ...data, skills: data.skills.filter((_, idx) => idx !== i) });
  }

  function updateEdu(i: number, field: string, val: string) {
    const education = data.education.map((e, idx) => idx === i ? { ...e, [field]: val } : e);
    onChange({ ...data, education });
  }

  function addEdu() {
    onChange({ ...data, education: [...data.education, { institution: "", degree: "", duration: "" }] });
  }

  function removeEdu(i: number) {
    onChange({ ...data, education: data.education.filter((_, idx) => idx !== i) });
  }

  const btnAdd: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "7px 14px", borderRadius: 8, border: "1.5px dashed rgba(212,184,150,0.40)",
    background: "transparent", color: "#6b4a28", fontSize: 12, fontWeight: 600,
    cursor: "pointer", fontFamily: "'Manrope', sans-serif", transition: "border-color 0.18s",
  };

  const btnRemove: React.CSSProperties = {
    background: "none", border: "none", cursor: "pointer", color: "#d4b896",
    padding: 4, borderRadius: 4, transition: "color 0.18s", flexShrink: 0,
  };

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 10000,
        background: "rgba(28,15,0,0.35)", backdropFilter: "blur(4px)",
      }} />

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 10001,
        width: 480, maxWidth: "95vw",
        background: "#fdfaf6", overflowY: "auto",
        boxShadow: "-8px 0 48px rgba(28,15,0,0.20)",
        display: "flex", flexDirection: "column",
        animation: "drawerSlideIn 0.28s cubic-bezier(0.22,1,0.36,1) both",
      }}>
        <style>{`
          @keyframes drawerSlideIn {
            from { transform: translateX(100%); opacity: 0; }
            to   { transform: translateX(0);    opacity: 1; }
          }
        `}</style>

        {/* Header */}
        <div style={{
          position: "sticky", top: 0, zIndex: 10,
          background: "rgba(253,250,246,0.96)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(212,184,150,0.25)",
          padding: "16px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#1c0f00", margin: 0 }}>Edit Portfolio</p>
            <p style={{ fontSize: 12, color: "#d4b896", margin: "2px 0 0" }}>Changes are live-previewed</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onSave} disabled={saving} style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "linear-gradient(135deg, #D4834A 0%, #8B4E1A 100%)",
              color: "#fff", padding: "8px 18px", borderRadius: 8,
              fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer",
              opacity: saving ? 0.6 : 1, fontFamily: "'Manrope', sans-serif",
            }}>
              {saving ? "Saving…" : "Save all"}
            </button>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#d4b896", padding: 8 }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "8px 24px 48px", flex: 1 }}>

          {/* Personal */}
          <Section title="Personal">
            <Field label="Full Name" value={data.personal.name} onChange={v => updatePersonal("name", v)} />
            <Field label="Title / Role" value={data.personal.title} onChange={v => updatePersonal("title", v)} />
            <Field label="Bio" value={data.personal.bio} onChange={v => updatePersonal("bio", v)} multiline />
            <Field label="Location" value={data.personal.location} onChange={v => updatePersonal("location", v)} />
            <Field label="Email" value={data.personal.email} onChange={v => updatePersonal("email", v)} />
            <Field label="Website" value={data.personal.website} onChange={v => updatePersonal("website", v)} />
          </Section>

          {/* Social */}
          <Section title="Social Links">
            <Field label="GitHub URL" value={data.social.github} onChange={v => updateSocial("github", v)} />
            <Field label="LinkedIn URL" value={data.social.linkedin} onChange={v => updateSocial("linkedin", v)} />
            <Field label="Twitter / X URL" value={data.social.twitter} onChange={v => updateSocial("twitter", v)} />
          </Section>

          {/* Experience */}
          <Section title="Experience">
            {data.experience.map((exp, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: 10, padding: 16, marginBottom: 12,
                border: "1.5px solid rgba(212,184,150,0.25)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#6b4a28" }}>Role {i + 1}</span>
                  <button onClick={() => removeExp(i)} style={btnRemove}><Trash2 size={13} /></button>
                </div>
                <Field label="Role / Title" value={exp.role} onChange={v => updateExp(i, "role", v)} />
                <Field label="Company" value={exp.company} onChange={v => updateExp(i, "company", v)} />
                <Field label="Duration" value={exp.duration} onChange={v => updateExp(i, "duration", v)} />
                <Field label="Description (optional)" value={exp.description} onChange={v => updateExp(i, "description", v)} multiline />
                <label style={labelStyle}>Highlights</label>
                {exp.highlights.map((h, j) => (
                  <div key={j} style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                    <input
                      style={{ ...inputStyle, flex: 1 }}
                      value={h}
                      onChange={e => updateExpHighlight(i, j, e.target.value)}
                      placeholder="What did you achieve?"
                    />
                    <button onClick={() => removeExpHighlight(i, j)} style={btnRemove}><X size={12} /></button>
                  </div>
                ))}
                <button onClick={() => addExpHighlight(i)} style={{ ...btnAdd, marginTop: 4 }}>
                  <Plus size={11} /> Add highlight
                </button>
              </div>
            ))}
            <button onClick={addExp} style={btnAdd}><Plus size={12} /> Add role</button>
          </Section>

          {/* Skills */}
          <Section title="Skills">
            {data.skills.map((group, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: 10, padding: 16, marginBottom: 12,
                border: "1.5px solid rgba(212,184,150,0.25)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#6b4a28" }}>{group.category || `Group ${i + 1}`}</span>
                  <button onClick={() => removeSkillGroup(i)} style={btnRemove}><Trash2 size={13} /></button>
                </div>
                <Field label="Category Name" value={group.category} onChange={v => updateSkillCategory(i, v)} />
                <div style={{ marginBottom: 0 }}>
                  <label style={labelStyle}>Skills (comma-separated)</label>
                  <input
                    style={inputStyle}
                    value={group.items.join(", ")}
                    onChange={e => updateSkillItems(i, e.target.value)}
                    placeholder="React, TypeScript, Node.js"
                  />
                </div>
              </div>
            ))}
            <button onClick={addSkillGroup} style={btnAdd}><Plus size={12} /> Add category</button>
          </Section>

          {/* Projects */}
          <Section title="Projects">
            {data.projects.map((proj, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: 10, padding: 16, marginBottom: 12,
                border: "1.5px solid rgba(212,184,150,0.25)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#6b4a28" }}>{proj.name || `Project ${i + 1}`}</span>
                  <button onClick={() => removeProject(i)} style={btnRemove}><Trash2 size={13} /></button>
                </div>
                <Field label="Name" value={proj.name} onChange={v => updateProject(i, "name", v)} />
                <Field label="Description" value={proj.description} onChange={v => updateProject(i, "description", v)} multiline />
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Tech stack (comma-separated)</label>
                  <input style={inputStyle} value={proj.tech.join(", ")} onChange={e => updateProjectTech(i, e.target.value)} placeholder="React, TypeScript" />
                </div>
                <Field label="GitHub URL" value={proj.github} onChange={v => updateProject(i, "github", v)} />
                <Field label="Live URL" value={proj.live} onChange={v => updateProject(i, "live", v)} />
              </div>
            ))}
            <button onClick={addProject} style={btnAdd}><Plus size={12} /> Add project</button>
          </Section>

          {/* Education */}
          <Section title="Education">
            {data.education.map((edu, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: 10, padding: 16, marginBottom: 12,
                border: "1.5px solid rgba(212,184,150,0.25)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#6b4a28" }}>{edu.institution || `Entry ${i + 1}`}</span>
                  <button onClick={() => removeEdu(i)} style={btnRemove}><Trash2 size={13} /></button>
                </div>
                <Field label="Degree" value={edu.degree} onChange={v => updateEdu(i, "degree", v)} />
                <Field label="Institution" value={edu.institution} onChange={v => updateEdu(i, "institution", v)} />
                <Field label="Duration / Year" value={edu.duration} onChange={v => updateEdu(i, "duration", v)} />
              </div>
            ))}
            <button onClick={addEdu} style={btnAdd}><Plus size={12} /> Add education</button>
          </Section>
        </div>
      </div>
    </>
  );
}

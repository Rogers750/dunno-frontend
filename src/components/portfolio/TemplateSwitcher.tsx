"use client";

import { Check, Pencil, Save, X, LayoutGrid, Loader } from "lucide-react";
import type { TemplateId } from "@/lib/portfolioTypes";
import { TEMPLATES } from "@/lib/portfolioTypes";

interface Props {
  selected: TemplateId;
  saved: TemplateId;
  onSelect: (id: TemplateId) => void;
  onSaveTemplate: () => void;
  templateSaving: boolean;
  editMode: boolean;
  onEditToggle: () => void;
  contentSaving: boolean;
  onSaveContent: () => void;
  username: string;
}

export default function TemplateSwitcher({
  selected, saved, onSelect, onSaveTemplate, templateSaving,
  editMode, onEditToggle, contentSaving, onSaveContent,
  username,
}: Props) {
  const hasUnsavedTemplate = selected !== saved;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "0 16px", pointerEvents: "none",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 4,
        background: "rgba(28,15,0,0.92)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(212,184,150,0.15)",
        borderRadius: 999, padding: "5px 6px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.30), 0 0 0 1px rgba(212,184,150,0.08)",
        marginTop: 12, pointerEvents: "auto",
        maxWidth: "calc(100vw - 32px)",
      }}>

        {/* Label */}
        <div style={{ padding: "4px 8px 4px 6px", borderRight: "1px solid rgba(212,184,150,0.15)", display: "flex", alignItems: "center", gap: 5, marginRight: 2 }}>
          <LayoutGrid size={12} style={{ color: "#D4834A", flexShrink: 0 }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(212,184,150,0.50)", letterSpacing: "0.10em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            Design
          </span>
        </div>

        {/* Template pills */}
        {TEMPLATES.map((tmpl) => {
          const isActive = selected === tmpl.id;
          const isSaved  = saved === tmpl.id;
          return (
            <button
              key={tmpl.id}
              onClick={() => onSelect(tmpl.id)}
              title={tmpl.description}
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "6px 13px", borderRadius: 999, border: "none",
                fontSize: 12, fontWeight: 600, cursor: "pointer",
                transition: "all 0.18s",
                background: isActive
                  ? "linear-gradient(135deg, #D4834A 0%, #8B4E1A 100%)"
                  : "transparent",
                color: isActive ? "#fff" : "rgba(212,184,150,0.55)",
                letterSpacing: "0.01em",
              }}>
              {isActive && isSaved && <Check size={10} />}
              {isActive && !isSaved && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F5C98A", display: "inline-block", flexShrink: 0 }} />}
              {tmpl.label}
            </button>
          );
        })}

        {/* Save template button — only shown when there's an unsaved selection */}
        {hasUnsavedTemplate && (
          <>
            <div style={{ width: 1, height: 18, background: "rgba(212,184,150,0.15)", margin: "0 2px" }} />
            <button
              onClick={onSaveTemplate}
              disabled={templateSaving}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "6px 14px", borderRadius: 999, border: "none",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
                background: templateSaving ? "rgba(212,131,74,0.40)" : "linear-gradient(135deg, #D4834A 0%, #8B4E1A 100%)",
                color: "#fff", transition: "all 0.18s", whiteSpace: "nowrap",
              }}>
              {templateSaving ? <Loader size={10} style={{ animation: "spin 0.8s linear infinite" }} /> : <Save size={10} />}
              {templateSaving ? "Publishing…" : "Publish"}
            </button>
          </>
        )}

        {/* Divider */}
        <div style={{ width: 1, height: 18, background: "rgba(212,184,150,0.15)", margin: "0 2px" }} />

        {/* Edit / Save content buttons */}
        {editMode ? (
          <>
            <button
              onClick={onSaveContent}
              disabled={contentSaving}
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "6px 13px", borderRadius: 999, border: "none",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
                background: contentSaving ? "rgba(212,131,74,0.40)" : "linear-gradient(135deg, #D4834A 0%, #8B4E1A 100%)",
                color: "#fff", transition: "all 0.18s",
              }}>
              {contentSaving ? <Loader size={10} style={{ animation: "spin 0.8s linear infinite" }} /> : <Save size={10} />}
              {contentSaving ? "Saving…" : "Save"}
            </button>
            <button
              onClick={onEditToggle}
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "6px 11px", borderRadius: 999, border: "none",
                fontSize: 12, fontWeight: 600, cursor: "pointer",
                background: "transparent", color: "rgba(212,184,150,0.45)",
              }}>
              <X size={10} /> Cancel
            </button>
          </>
        ) : (
          <button
            onClick={onEditToggle}
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "6px 13px", borderRadius: 999, border: "none",
              fontSize: 12, fontWeight: 600, cursor: "pointer",
              background: "rgba(255,255,255,0.07)", color: "rgba(232,224,216,0.65)",
              transition: "all 0.18s",
            }}>
            <Pencil size={10} /> Edit
          </button>
        )}

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

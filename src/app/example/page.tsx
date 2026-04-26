"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, X, Palette } from "lucide-react";
import SoftwareTemplate from "@/components/portfolio/SoftwareTemplate";
import DesignTemplate from "@/components/portfolio/DesignTemplate";
import ProductTemplate from "@/components/portfolio/ProductTemplate";
import { EXAMPLE_NAME, EXAMPLE_USERNAME, EXAMPLE_CONTENT } from "@/lib/exampleData";
import { cn } from "@/lib/utils";

// ── Theme config ──────────────────────────────────────────────────────────────

const COLORS = [
  { id: "indigo",  label: "Indigo",  hex: "#818cf8" },
  { id: "amber",   label: "Amber",   hex: "#F5A84A" },
  { id: "emerald", label: "Emerald", hex: "#34d399" },
  { id: "rose",    label: "Rose",    hex: "#fb7185" },
  { id: "sky",     label: "Sky",     hex: "#38bdf8" },
  { id: "slate",   label: "Slate",   hex: "#64748b" },
];

const TEMPLATES = [
  { id: "software", label: "Software",  icon: "💻" },
  { id: "design",   label: "Designer",  icon: "🎨" },
  { id: "product",  label: "Product",   icon: "📦" },
] as const;

type TemplateId = "software" | "design" | "product";

// ── Floating switcher panel ───────────────────────────────────────────────────

function SwitcherPanel({
  color, template, onColorChange, onTemplateChange, collapsed, onToggle,
}: {
  color: string; template: TemplateId;
  onColorChange: (c: string) => void; onTemplateChange: (t: TemplateId) => void;
  collapsed: boolean; onToggle: () => void;
}) {
  const accentHex = COLORS.find((c) => c.id === color)?.hex ?? "#818cf8";

  if (collapsed) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-24 right-5 z-50 h-12 w-12 rounded-full shadow-xl flex items-center justify-center text-white transition-transform hover:scale-105"
        style={{ background: accentHex }}
      >
        <Palette className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-5 z-50 w-56 bg-white rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.14)] overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#f5f5f5]">
        <span className="text-[11px] font-[700] tracking-[0.10em] uppercase text-[#aaa]">
          Try themes
        </span>
        <button onClick={onToggle} className="text-[#ccc] hover:text-[#888] transition-colors">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Template tabs */}
      <div className="px-4 pt-4 pb-3">
        <p className="text-[10px] font-[700] tracking-[0.10em] uppercase text-[#ccc] mb-2.5">Template</p>
        <div className="flex flex-col gap-1.5">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => onTemplateChange(t.id)}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-[500] text-left transition-all",
                template === t.id
                  ? "text-white"
                  : "bg-[#f9f9f9] text-[#666] hover:bg-[#f0f0f0]"
              )}
              style={template === t.id ? { background: accentHex } : {}}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Color swatches */}
      <div className="px-4 pb-4">
        <p className="text-[10px] font-[700] tracking-[0.10em] uppercase text-[#ccc] mb-2.5">Color</p>
        <div className="grid grid-cols-6 gap-2">
          {COLORS.map((c) => (
            <button
              key={c.id}
              onClick={() => onColorChange(c.id)}
              title={c.label}
              className="h-7 w-7 rounded-full transition-all hover:scale-110"
              style={{
                background: c.hex,
                boxShadow: color === c.id ? `0 0 0 2px white, 0 0 0 4px ${c.hex}` : "none",
                transform: color === c.id ? "scale(1.15)" : undefined,
              }}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        <Link href="/">
          <button
            className="w-full flex items-center justify-center gap-2 text-white text-[11px] font-[700] tracking-[0.08em] uppercase py-2.5 rounded-lg transition-all hover:opacity-90"
            style={{ background: accentHex }}
          >
            Build yours <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </Link>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ExamplePage() {
  const [color, setColor] = useState("indigo");
  const [template, setTemplate] = useState<TemplateId>("software");
  const [panelCollapsed, setPanelCollapsed] = useState(false);

  const accentColor = COLORS.find((c) => c.id === color)?.hex ?? "#818cf8";

  return (
    <div className="relative">
      {/* Example banner */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-5 py-2.5 text-white text-xs font-[600]"
        style={{ background: accentColor }}
      >
        <span>This is an example portfolio — yours will be generated from your resume.</span>
        <Link href="/" className="flex items-center gap-1.5 underline underline-offset-2 hover:no-underline">
          Build mine <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Live portfolio render */}
      {template === "software" && (
        <SoftwareTemplate
          username={EXAMPLE_USERNAME}
          name={EXAMPLE_NAME}
          accentColor={accentColor}
          content={EXAMPLE_CONTENT}
        />
      )}
      {template === "design" && (
        <DesignTemplate
          name={EXAMPLE_NAME}
          accentColor={accentColor}
          content={EXAMPLE_CONTENT}
        />
      )}
      {template === "product" && (
        <ProductTemplate
          name={EXAMPLE_NAME}
          accentColor={accentColor}
          content={EXAMPLE_CONTENT}
        />
      )}

      {/* Floating switcher */}
      <SwitcherPanel
        color={color}
        template={template}
        onColorChange={setColor}
        onTemplateChange={setTemplate}
        collapsed={panelCollapsed}
        onToggle={() => setPanelCollapsed((v) => !v)}
      />
    </div>
  );
}

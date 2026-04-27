"use client";

import { useState, useEffect } from "react";
import { getUser } from "@/lib/auth";
import type { PortfolioData, TemplateId } from "@/lib/portfolioTypes";
import { TEMPLATE_TO_BACKEND } from "@/lib/portfolioTypes";
import MinimalTemplate    from "@/components/portfolio/templates/MinimalTemplate";
import DarkGlassTemplate  from "@/components/portfolio/templates/DarkGlassTemplate";
import CreativeTemplate   from "@/components/portfolio/templates/CreativeTemplate";
import TemplateSwitcher   from "@/components/portfolio/TemplateSwitcher";
import EditDrawer         from "@/components/portfolio/EditDrawer";

const BASE = "https://dunno-backend-production.up.railway.app";

interface Props {
  data: PortfolioData;
  username: string;
  initialTemplate: TemplateId;
}

export default function PortfolioClient({ data: initialData, username, initialTemplate }: Props) {
  // Template state: savedTemplate = what's on the backend; selectedTemplate = what the user is currently viewing
  const [savedTemplate,    setSavedTemplate]    = useState<TemplateId>(initialTemplate);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(initialTemplate);
  const [templateSaving,   setTemplateSaving]   = useState(false);

  // Content editing state
  const [data,          setData]          = useState<PortfolioData>(initialData);
  const [editMode,      setEditMode]      = useState(false);
  const [contentSaving, setContentSaving] = useState(false);

  const [isOwner, setIsOwner] = useState(false);

  // Detect ownership client-side
  useEffect(() => {
    const user = getUser();
    setIsOwner(user?.username === username);
  }, [username]);

  async function handleSaveTemplate() {
    setTemplateSaving(true);
    try {
      const token = localStorage.getItem("dunno_token");
      if (!token) return;
      await fetch(`${BASE}/portfolio/template`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ selected_template: TEMPLATE_TO_BACKEND[selectedTemplate] }),
      });
      setSavedTemplate(selectedTemplate);
    } catch { /* silent — selection still previewed */ }
    finally { setTemplateSaving(false); }
  }

  async function handleSaveContent() {
    setContentSaving(true);
    try {
      const token = localStorage.getItem("dunno_token");
      if (!token) return;
      await fetch(`${BASE}/portfolio/me/content`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ portfolio_data: data }),
      });
      setEditMode(false);
    } catch { setEditMode(false); }
    finally { setContentSaving(false); }
  }

  return (
    <div>
      {isOwner && (
        <TemplateSwitcher
          selected={selectedTemplate}
          saved={savedTemplate}
          onSelect={setSelectedTemplate}
          onSaveTemplate={handleSaveTemplate}
          templateSaving={templateSaving}
          editMode={editMode}
          onEditToggle={() => setEditMode(!editMode)}
          contentSaving={contentSaving}
          onSaveContent={handleSaveContent}
          username={username}
        />
      )}

      {/* Push content below fixed switcher bar */}
      <div style={{ paddingTop: isOwner ? 58 : 0 }}>
        {selectedTemplate === "minimal"    && <MinimalTemplate   data={data} />}
        {selectedTemplate === "dark-glass" && <DarkGlassTemplate data={data} />}
        {selectedTemplate === "creative"   && <CreativeTemplate  data={data} />}
      </div>

      {isOwner && editMode && (
        <EditDrawer
          data={data}
          onChange={setData}
          onClose={() => setEditMode(false)}
          onSave={handleSaveContent}
          saving={contentSaving}
        />
      )}
    </div>
  );
}

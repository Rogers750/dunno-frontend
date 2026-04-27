"use client";

import { useEffect, useState } from "react";

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface Props {
  username: string;
  theme?: "light" | "dark";
}

const LIGHT_LEVELS = ["#f0e8dc", "#fde8cc", "#F5C98A", "#D4834A", "#8B4E1A"];
const DARK_LEVELS  = ["rgba(255,255,255,0.06)", "rgba(212,131,74,0.25)", "rgba(212,131,74,0.50)", "rgba(212,131,74,0.78)", "#D4834A"];

export default function GitHubWall({ username, theme = "light" }: Props) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d) => {
        setContributions(d.contributions ?? []);
        const year = new Date().getFullYear();
        setTotal(d.total?.[year] ?? d.total?.[year - 1] ?? 0);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <div style={{ display: "flex", gap: 3, flexWrap: "wrap", opacity: 0.3 }}>
        {[...Array(52 * 7)].map((_, i) => (
          <div key={i} style={{ width: 11, height: 11, borderRadius: 2, background: theme === "dark" ? "rgba(255,255,255,0.08)" : "#f0e8dc" }} />
        ))}
      </div>
    );
  }

  if (error || contributions.length === 0) return null;

  const colors = theme === "dark" ? DARK_LEVELS : LIGHT_LEVELS;

  // Group into weeks of 7 days
  const weeks: Contribution[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  // Month labels
  const monthLabels: Array<{ label: string; weekIdx: number }> = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    if (!week[0]) return;
    const month = new Date(week[0].date).getMonth();
    if (month !== lastMonth) {
      monthLabels.push({ label: new Date(week[0].date).toLocaleString("default", { month: "short" }), weekIdx: wi });
      lastMonth = month;
    }
  });

  const textColor = theme === "dark" ? "rgba(232,224,216,0.30)" : "#d4b896";

  return (
    <div>
      {/* Month labels */}
      <div style={{ display: "flex", gap: 3, marginBottom: 4, paddingLeft: 0, position: "relative", height: 16 }}>
        {monthLabels.map(({ label, weekIdx }) => (
          <span key={`${label}-${weekIdx}`} style={{
            position: "absolute", left: weekIdx * (11 + 3),
            fontSize: 10, fontWeight: 600, color: textColor, letterSpacing: "0.04em",
          }}>
            {label}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "flex", gap: 3, overflowX: "auto", paddingBottom: 4 }}>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {week.map((day, di) => (
              <div
                key={di}
                title={`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
                style={{
                  width: 11, height: 11, borderRadius: 2,
                  background: colors[day.level],
                  transition: "transform 0.15s",
                  cursor: "default",
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Total */}
      <p style={{ fontSize: 11, fontWeight: 600, color: textColor, marginTop: 10, letterSpacing: "0.04em" }}>
        {total.toLocaleString()} contributions in the last year
      </p>
    </div>
  );
}

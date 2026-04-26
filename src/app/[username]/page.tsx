import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { portfolio, type Portfolio } from "@/lib/api";
import SoftwareTemplate from "@/components/portfolio/SoftwareTemplate";

interface Props {
  params: Promise<{ username: string }>;
}

const COLOR_MAP: Record<string, string> = {
  indigo: "#818cf8",
  emerald: "#34d399",
  amber: "#fbbf24",
  rose: "#fb7185",
  sky: "#38bdf8",
  slate: "#94a3b8",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  try {
    const data = await portfolio.getByUsername(username);
    const name = (data as unknown as { user?: { name?: string } }).user?.name ?? username;
    return {
      title: `${name} — Portfolio`,
      description: data.generated_content?.summary?.slice(0, 160) ?? `${name}'s AI-powered portfolio`,
    };
  } catch {
    return { title: `${username} — Dunno` };
  }
}

export default async function PublicPortfolioPage({ params }: Props) {
  const { username } = await params;

  let data: Portfolio & { user?: { username: string; name?: string } };
  try {
    data = await portfolio.getByUsername(username);
  } catch {
    notFound();
  }

  if (!data.published) notFound();

  const accentColor = COLOR_MAP[data.theme_color] ?? COLOR_MAP.indigo;
  const content = data.generated_content;

  if (!content) {
    return (
      <div className="min-h-screen bg-[#07070f] flex items-center justify-center text-[#64748b]">
        Portfolio generation in progress…
      </div>
    );
  }

  return (
    <SoftwareTemplate
      username={username}
      name={data.user?.name ?? username}
      accentColor={accentColor}
      content={content}
    />
  );
}

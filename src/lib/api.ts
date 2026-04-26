const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function request<T>(
  path: string,
  options: RequestInit = {},
  auth = true
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (auth) {
    const token = typeof window !== "undefined" ? localStorage.getItem("dunno_token") : null;
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(error.detail ?? "Request failed");
  }

  return res.json();
}

// ── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: { id: string; email: string; username: string };
}

export const auth = {
  register: (email: string, password: string, username: string) =>
    request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, username }),
    }, false),

  login: (email: string, password: string) =>
    request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }, false),

  sendOtp: (email: string) =>
    request<{ message: string }>("/auth/otp/send", {
      method: "POST",
      body: JSON.stringify({ email }),
    }, false),

  verifyOtp: (email: string, otp: string) =>
    request<AuthResponse>("/auth/otp/verify", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    }, false),

  me: () => request<AuthResponse["user"]>("/auth/me"),
};

// ── Onboarding ────────────────────────────────────────────────────────────────

export interface ThemePayload {
  theme_color: string;
  theme_category: string;
}

export interface LinksPayload {
  links: Array<{ type: string; url: string }>;
}

export interface Project {
  id: string;
  source: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  included: boolean;
  display_order: number;
}

export interface Portfolio {
  id: string;
  theme_color: string;
  theme_category: string;
  target_roles: string[];
  published: boolean;
  generated_content?: GeneratedContent;
}

export interface GeneratedContent {
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    period: string;
    highlights: string[];
  }>;
  skills: Array<{ category: string; items: string[] }>;
  projects: Project[];
  education: Array<{ degree: string; institution: string; year: string; gpa?: string }>;
  stats?: Array<{ label: string; value: string }>;
}

export const onboarding = {
  saveTheme: (payload: ThemePayload) =>
    request<{ message: string }>("/onboarding/theme", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  uploadResume: (file: File, targetRoles: string[]) => {
    const form = new FormData();
    form.append("file", file);
    form.append("target_roles", JSON.stringify(targetRoles));
    return request<{ message: string; resume_id: string }>("/onboarding/resume", {
      method: "POST",
      body: form,
      headers: {},
    });
  },

  saveLinks: (payload: LinksPayload) =>
    request<{ projects: Project[] }>("/onboarding/links", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  updateProjectInclusion: (projectId: string, included: boolean) =>
    request<{ message: string }>(`/onboarding/projects/${projectId}`, {
      method: "PATCH",
      body: JSON.stringify({ included }),
    }),

  generate: () =>
    request<{ portfolio: Portfolio }>("/onboarding/generate", { method: "POST" }),
};

// ── Portfolio ─────────────────────────────────────────────────────────────────

export const portfolio = {
  getByUsername: (username: string) =>
    request<Portfolio & { user: { username: string; name?: string } }>(
      `/portfolio/${username}`,
      {},
      false
    ),

  getOwn: () => request<Portfolio>("/portfolio/me"),

  update: (data: Partial<ThemePayload & { target_roles: string[] }>) =>
    request<Portfolio>("/portfolio/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  regenerate: () =>
    request<{ portfolio: Portfolio }>("/portfolio/me/regenerate", { method: "POST" }),

  setPublished: (published: boolean) =>
    request<Portfolio>("/portfolio/me/publish", {
      method: "POST",
      body: JSON.stringify({ published }),
    }),
};

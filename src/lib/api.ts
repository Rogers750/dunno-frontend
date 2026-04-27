const BASE_URL = "https://dunno-backend-production.up.railway.app";

async function request<T>(
  path: string,
  options: RequestInit = {},
  auth = true
): Promise<T> {
  const isFormData = options.body instanceof FormData;
  const headers: Record<string, string> = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
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
  user: { id: string; email: string; username: string; status: "onboarding" | "processing" | "ready" };
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

  google: (supabaseToken: string) =>
    request<AuthResponse["user"]>("/auth/google", {
      method: "POST",
      headers: { Authorization: `Bearer ${supabaseToken}` },
    }, false),
};

// ── Pre-auth uploads (fired immediately after login) ─────────────────────────

export interface ResumeUploadResponse {
  id: string;
  file_url: string;
  chars_extracted: number;
}

export interface ResumeMetadata {
  id: string;
  file_url: string;
  chars_extracted: number;
}

export const uploads = {
  resume: (b64: string, filename: string, _mimeType: string) => {
    void _mimeType;
    const bytes = atob(b64);
    const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
    const safeName = filename.toLowerCase().endsWith(".pdf") ? filename : `${filename}.pdf`;
    const file = new File([arr], safeName, { type: "application/pdf" });
    const form = new FormData();
    form.append("file", file);
    return request<ResumeUploadResponse>("/resume/upload", { method: "POST", body: form });
  },

  github: (url: string) =>
    request<{ message: string }>("/links/github", {
      method: "POST",
      body: JSON.stringify({ url }),
    }),
};

export const resume = {
  getMe: () => request<ResumeMetadata>("/resume/me"),
};

// ── Onboarding ────────────────────────────────────────────────────────────────

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
  selected_template?: string;
  generated_content?: GeneratedContent;
  repos?: Repo[];
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

export interface GenerateResponse {
  portfolio_id: string;
  generated_content: GeneratedContent;
  repos_used: number;
  target_roles: string[];
}

export const onboarding = {
  generate: (body?: { target_roles?: string[]; extra_context?: string }) =>
    request<GenerateResponse>("/portfolio/generate", {
      method: "POST",
      body: JSON.stringify(body ?? {}),
    }),
};

// ── Links / repos ─────────────────────────────────────────────────────────────

export interface Repo {
  id: string;
  included: boolean;
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
  topics: string[];
}

export const links = {
  getRepos: () => request<Repo[]>("/links/repos"),
  toggleRepo: (id: string) => request<{ id: string; included: boolean }>(`/links/${id}/toggle`, { method: "PATCH" }),
};

// ── Portfolio ─────────────────────────────────────────────────────────────────

export const portfolio = {
  getByUsername: (username: string) =>
    request<Portfolio & { user: { username: string; name?: string; email?: string; github_url?: string } }>(
      `/portfolio/${username}`,
      {},
      false
    ),

  getOwn: () => request<Portfolio>("/portfolio/me"),

  update: (data: Partial<{ theme_color: string; theme_category: string; target_roles: string[] }>) =>
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

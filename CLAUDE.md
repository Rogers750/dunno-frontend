# Dunno — Frontend

## What is Dunno
SaaS platform where anyone signs up and gets a beautiful AI-generated portfolio page at `dunno.app/username`, built from their resume, GitHub, Behance, and Dribbble.

**Owner:** Sagar Singh Rawal (sagarsinghraw77@gmail.com)

---

## Tech stack
| Layer | Choice |
|---|---|
| Framework | Next.js 15 App Router |
| Auth | Google + LinkedIn OAuth (stubbed — not wired yet) |
| Database | Supabase Postgres |
| File storage | Supabase Storage |
| Resume parsing | PDF/DOCX + Claude API |
| AI generation | Claude API (claude-sonnet-4-6) |
| Styling | Tailwind CSS v4 + custom design system |
| Hosting | Vercel (team: `blacksoundsgoods-projects`) |

---

## Routes
```
/                   → Landing page (resume upload + github input)
/login              → Auth — Google + LinkedIn OAuth only
/onboarding         → Multi-step onboarding wizard (post-auth)
/dashboard          → Portfolio management
/[username]         → Public portfolio page
/example            → Example portfolio
/api/...            → Next.js API routes
```
`/start` has been deleted — resume + github are now collected on the landing page.

---

## Design system

**Philosophy:** Warm, premium, human. Not a cold SaaS tool.

### Palette
```
Background:     #ffffff  (page)   #f9f2e8  (sections/cards bg)
Text primary:   #1c0f00
Text secondary: #6b4a28
Text muted:     #d4b896
Borders:        rgba(212,184,150,0.20–0.40)

Amber (brand):
  --amber-deep:   #8B4E1A   (logo dark stop)
  --amber-mid:    #D4834A   (primary / CTA)
  --amber-light:  #F5C98A   (logo light stop)
  --amber-glow:   #F5A84A   (glow effects)
```

### Typography (Manrope body, Space Grotesk display)
```
.display-l   57px  weight-300   letter -0.02em
.display-s   36px  weight-300
.headline-s  24px  weight-600
.title-s     14px  weight-500
.label-m     12px  weight-700   uppercase  tracking-0.10em
.body-s      12px  weight-400
```

### Key CSS classes
- `.glass` — frosted white nav (backdrop-blur + 80% opacity)
- `.amber-glow` — logo glow box-shadow
- `.ember-focus` — amber focus ring on interactive elements

### Component conventions
- Cards: `bg-white rounded-2xl` with `shadow-[0_8px_40px_rgba(139,78,26,0.08)]`
- Buttons: gradient `#D4834A → #8B4E1A`, white text, `rounded-xl`
- Borders: always warm amber tint, never pure grey
- Back buttons: `fixed top-5 left-6`, `text-[#6b4a28]`, 13px font-600, hover `#D4834A`
- Label chips: `text-[11px] font-[700] tracking-[0.08em] uppercase`

---

## Landing page flow
1. User lands on `/` — sees resume upload box ("Get started instantly")
2. Attaches resume (PDF/DOCX) → clicks **Build mine** → box switches to GitHub step
3. Enters GitHub URL (optional) → clicks **Build mine** / **Skip & build**
4. Redirected to `/login?mode=register`
5. Auth via Google or LinkedIn
6. Redirected to `/onboarding`

**sessionStorage keys set during landing page flow:**
- `dunno_resume_name` — filename of uploaded resume
- `dunno_github_url` — GitHub profile URL (optional)

When user navigates back from `/login`, the landing page restores the github step from sessionStorage.

---

## Key files
```
src/app/page.tsx               — Landing page + HeroUpload component
src/app/login/page.tsx         — Auth page (Google + LinkedIn only)
src/app/onboarding/page.tsx    — Onboarding wizard
src/app/dashboard/page.tsx     — Dashboard
src/app/[username]/page.tsx    — Public portfolio renderer
src/app/globals.css            — Design system tokens + typography
src/components/ui/Button.tsx   — Button component
src/components/ui/Logo.tsx     — Logo component
src/components/ui/Input.tsx    — Input component
src/lib/api.ts                 — API client
src/lib/auth.ts                — Auth helpers (token, user storage)
```

---

## Dev setup
```bash
npm run dev        # starts on 0.0.0.0:3000 (accessible on local network)
```
HMR works over local network IP because of `-H 0.0.0.0` in the dev script.

---

## What's not built yet
- Google + LinkedIn OAuth (handlers stubbed in login page)
- Supabase connection
- Resume parsing pipeline
- GitHub API fetching
- Claude AI generation
- `/[username]` portfolio renderer with theme system
- Dashboard functionality

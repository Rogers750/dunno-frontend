# Dunno Frontend

Frontend for Dunno, an AI portfolio builder that turns a user's resume and selected GitHub repositories into a public portfolio.

## Goal

The product flow is:

1. User uploads a PDF resume from the landing page.
2. User optionally adds a GitHub profile link.
3. User signs in with email OTP.
4. Frontend uploads the stored resume and GitHub link after auth succeeds.
5. User reviews detected repositories on `/onboarding` and toggles which ones to include.
6. Frontend triggers portfolio generation.
7. User lands in a processing state, then a dashboard, then a public portfolio route at `/:username`.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Lucide icons

## Main Routes

- `/`
  Landing page with resume upload and optional GitHub input.
- `/login`
  Email OTP login flow. No automatic redirect runs here on page load.
- `/onboarding`
  Loads repos from `GET /links/repos` and toggles inclusion with `PATCH /links/{link_id}/toggle`.
- `/calibrating`
  Waiting state while portfolio generation is processing.
- `/dashboard`
  User dashboard for publish/unpublish and regeneration actions.
- `/:username`
  Public portfolio page.
- `/example`
  Static example/demo page.

## Backend Expectations

The frontend currently talks directly to the Dunno backend hosted at:

`https://dunno-backend-production.up.railway.app`

Important API usage in the current app:

- `POST /auth/verification/send`
- `POST /auth/verification/verify`
- `GET /auth/me`
- `POST /resume/upload`
- `GET /resume/me`
- `POST /links/github`
- `GET /links/repos`
- `PATCH /links/{link_id}/toggle`
- `POST /portfolio/generate`
- `GET /portfolio/me`
- `POST /portfolio/me/regenerate`
- `POST /portfolio/me/publish`
- `GET /portfolio/{username}`

## Resume Upload Contract

The frontend assumes:

- only PDF resumes are supported
- upload happens with `multipart/form-data`
- the file field name is `file`
- auth uses `Authorization: Bearer <token>`

The landing page now restricts uploads to PDFs before auth continues.

## Auth Model

Current auth is email OTP based.

- The frontend stores the session token in local storage and cookies.
- Protected routes verify the current user before proceeding.
- If a protected route is opened without a valid user session, the app redirects to `/`.
- Google/Supabase auth has been removed from this frontend.

## Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

Use `localhost`, not `0.0.0.0`, in the browser when testing CORS-sensitive backend calls.

## Environment

This frontend currently does not require Supabase environment variables.

If you later move backend URLs or add public client configuration, document them here and avoid hardcoding them in multiple places.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Build and Deploy

Production builds use webpack explicitly:

```bash
npm run build
```

This is intentional because the project hit Turbopack production build issues during deployment.

For Vercel:

1. Link the project with `vercel`
2. Ensure the backend allows the deployed frontend origin in CORS
3. Deploy with `vercel --prod`

## Notes

- `README.md` now reflects the current OTP auth and resume-first onboarding flow.
- If the backend auth model changes, update this file together with the frontend flow.

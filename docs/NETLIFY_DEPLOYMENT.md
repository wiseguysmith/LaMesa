# Netlify Deployment

## Build Settings

Recommended settings:

- Build command: `npm run build`
- Publish directory: `.next`
- Framework preset: Next.js

## Required Environment Variables

Set these in Netlify:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
NEXT_PUBLIC_SITE_URL=
```

Only one AI provider is required for MVP.

## netlify.toml

Recommended:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## Deployment Notes

- Do not commit `.env.local`.
- Use Netlify environment variables.
- Confirm Supabase URL and anon key are available to client.
- Keep service role key server-side only.
- Confirm AI API key is only used in server/API routes.

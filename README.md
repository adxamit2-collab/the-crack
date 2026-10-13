# THE CRACK

A luxury real-estate discovery and property showcase frontend built with React, TypeScript, Vite, Tailwind CSS v4, and React Router.

## Requirements

- Node.js 20.19+ (Node.js 22 LTS recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run lint
npm run build
npm run preview
```

The generated static site is written to `dist/`.

## Deployment

Deploy `dist/` to a static host such as Vercel or Netlify. Configure the host to rewrite unknown paths to `/index.html`, because the app uses client-side routes such as `/properties/the-ocean-house`.

For Vercel, a minimal `vercel.json` rewrite can be used:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Important demo limitations

- Listings, agents, locations, and articles are local sample data. They are not connected to a live MLS or property database.
- Viewing, valuation, consultation, listing, and newsletter forms are demo interactions. They do **not** notify an agent, send email, book a real appointment, or deliver leads to a server. The browser stores only the form type and timestamp for demo testing, not names, emails, phone numbers, or message content.
- Before production, connect forms to a secure backend or CRM, add server-side validation, abuse protection, privacy/consent handling, and a real email provider.
- Images are loaded from Unsplash URLs and require an internet connection.
- No Gemini API key is required by the current frontend.

## Project scripts

- `npm run dev`: start Vite development server
- `npm run lint`: run TypeScript checking
- `npm run build`: create production assets
- `npm run preview`: preview the production build locally

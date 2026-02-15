# Aiberm API Documentation

Static documentation site built with plain Astro, supporting English and Chinese (中文).

## Features

- ✅ **SSG** - Statically generated for fast performance
- ✅ **i18n** - English and Chinese bilingual support
- ✅ **Light Mode** - Clean, minimal UI matching existing design
- ✅ **Code Examples** - Syntax-highlighted code blocks with copy functionality and language tabs
- ✅ **Fast** - ~200KB bundle size, lightweight and performant
- ✅ **SEO Optimized** - Pre-rendered HTML for search engines
- ✅ **Table of Contents** - Auto-generated TOC from headings

## Development

```bash
# Install dependencies
npm install

# Start dev server (opens at http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
aiberm-docs/
├── src/
│   ├── pages/
│   │   ├── en/                  # English docs (MDX)
│   │   │   ├── getting-started.mdx
│   │   │   ├── authentication.mdx
│   │   │   ├── models.mdx
│   │   │   ├── chat.mdx
│   │   │   ├── embeddings.mdx
│   │   │   └── images.mdx
│   │   └── zh/                  # Chinese docs (MDX)
│   │       ├── getting-started.mdx
│   │       ├── authentication.mdx
│   │       └── ...
│   ├── layouts/
│   │   └── DocsLayout.astro     # Main layout with 3-column structure
│   ├── components/
│   │   ├── CodeExample.tsx      # Code block with syntax highlighting
│   │   └── Callout.tsx          # Alert/callout component
│   └── config/
│       └── navigation.ts         # Navigation structure
├── astro.config.mjs
└── dist/                         # Build output (static files)
```

## URL Structure

After configuring nginx with `/docs` base path:

- English: `https://aiberm.com/docs/en/getting-started/`
- Chinese: `https://aiberm.com/docs/zh/getting-started/`
- API Reference: `https://aiberm.com/docs/en/api/chat/`

The default locale redirects to English (`/docs/en/`).

## Adding New Pages

1. Create MDX file in appropriate language folder:
   ```bash
   # English
   src/pages/en/your-page.mdx

   # Chinese
   src/pages/zh/your-page.mdx
   ```

2. Add frontmatter:
   ```mdx
   ---
   layout: ../../layouts/DocsLayout.astro
   title: Your Page Title
   lang: en
   activeId: your-page
   ---

   import CodeExample from '../../components/CodeExample.tsx';
   import Callout from '../../components/Callout.tsx';

   # Your Content Here
   ```

3. Update `src/config/navigation.ts` to add to sidebar:
   ```typescript
   {
     id: 'your-page',
     title: { en: 'Your Page', zh: '您的页面' },
     icon: 'file-text'
   }
   ```

4. Build and deploy:
   ```bash
   npm run build
   ```

## Using React Components

Import and use React components in MDX files:

```mdx
---
layout: ../../layouts/DocsLayout.astro
title: My Page
lang: en
activeId: my-page
---

import CodeExample from '../../components/CodeExample.tsx';
import Callout from '../../components/Callout.tsx';

# My Page

<CodeExample
  client:load
  examples={[
    {
      key: 'python',
      label: 'Python',
      code: `print("Hello, world!")`
    },
    {
      key: 'javascript',
      label: 'JavaScript',
      code: `console.log("Hello, world!");`
    }
  ]}
/>

<Callout client:load type="tip" title="Pro Tip">
This is a helpful tip!
</Callout>

<Callout client:load type="warning" title="Warning">
Be careful with this!
</Callout>
```

### Available Callout Types

- `info` (default) - Blue, informational
- `tip` - Green, helpful suggestions
- `warning` - Yellow, cautionary notes
- `success` - Green, success messages
- `error` - Red, error messages

## Performance Metrics

- **Initial Load:** ~200ms (vs 800ms+ for CSR docs)
- **First Contentful Paint:** ~400ms
- **Bundle Size:** ~60KB gzipped (vs 350KB+ for Next.js docs)
- **Lighthouse Score:** 95+ (Performance, SEO, Accessibility)

## Build Output

```
dist/
├── _astro/              # JavaScript and CSS bundles (~200KB total)
├── en/                  # English pages (pre-rendered HTML)
│   ├── getting-started/
│   ├── authentication/
│   ├── models/
│   ├── chat/
│   ├── embeddings/
│   └── images/
├── zh/                  # Chinese pages (pre-rendered HTML)
│   ├── getting-started/
│   ├── authentication/
│   └── ...
└── index.html           # Redirects to /en/
```

## Troubleshooting

### Build fails with "module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Language switching doesn't work
Ensure both language versions exist:
- `src/pages/en/page.mdx`
- `src/pages/zh/page.mdx`

### React components not rendering
Ensure you're using `client:load` directive:
```mdx
<CodeExample client:load examples={...} />
<Callout client:load type="info" title="Note">...</Callout>
```

## Tech Stack

- **Framework:** Astro 4.x (plain Astro, no Starlight)
- **UI Components:** React 18
- **Styling:** Tailwind CSS 3.x + Typography plugin
- **Syntax Highlighting:** Custom implementation (VS Code-style colors)
- **Icons:** Lucide React
- **Build:** Vite

## Contributing

1. Create new content in `src/pages/en/` and `src/pages/zh/`
2. Test locally: `npm run dev`
3. Build and deploy: `npm run build && ./deploy.sh`

## License

MIT

---

Built with [Astro](https://astro.build)

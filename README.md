# RePO-VLA Project Website

This repository contains the official project page source for:

**RePO-VLA: Recovery-Driven Policy Optimization for Vision-Language-Action Models**

Built with Vue 3 + Vite, deployed to GitHub Pages.

## How to Update Website Content

Main content is configured in:

- `src/mock/data.ts`

This file controls:

- title / subtitle / abstract
- author and affiliation display
- figures and captions
- demo video sections
- resource links and BibTeX

## Media Assets

Put static assets under `public/`, for example:

- `public/Figures/` for figures and logos
- `public/Demo/` for demo videos

Use `asset('...')` paths in `src/mock/data.ts` for references.

## Development

Install dependencies:

```sh
npm install
```

Run local dev server:

```sh
npm run dev
```

Type-check:

```sh
npm run type-check
```

Build for production:

```sh
npm run build
```

## Deployment

This project is configured for GitHub Pages deployment via GitHub Actions.

- Ensure `vite.config.ts` uses the correct `base` for your repository path.
- Push to `main` to trigger deployment workflow.

# Aditya's Cinematic Portfolio

A high-end, dark-themed personal portfolio website featuring a scroll-scrubbed image sequence, cinematic text overlays, and dynamic project fetching from GitHub.

## 🚀 Live Demo

[**https://theallmyti.netlify.app/**](https://theallmyti.netlify.app/)

## ✨ Features

- **Scrollytelling Experience**: 120-frame image sequence controlled by scroll position.
- **Cinematic Overlays**: Text animations that fade in/out with parallax effects.
- **Dynamic Projects**: Fetches public repositories from GitHub (`theallmyti`) automatically.
- **Performance**: Optimized WebP image sequence (~93% size reduction) and static export.
- **Dark Mode**: Strict `#121212` aesthetic with glassmorphism UI.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Rendering**: HTML5 Canvas (Custom implementation)
- **Deployment**: Netlify / GitHub Pages (Static Export)

## 🏃‍♂️ Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 📦 Deployment

The project is configured for universal static deployment (`output: 'export'`).

- **Netlify**: Connect repo, set build command to `npm run build` and publish directory to `out`.
- **GitHub Pages**: Pushing to `main` triggers a GitHub Action to deploy to `gh-pages`.

---
© 2026 Aditya. All rights reserved.

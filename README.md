# Vidi

Minimalist PWA for voluntary silence. Show a phrase, tap it, fill the screen — readable from across the room.

**Pure black. White text. No fluff.**

## How It Works

1. Edit `public/phrases.md` — categories are `## Headings`, phrases are `- list items`
2. Tap a phrase → fullscreen flashcard with fit-to-screen text
3. Tap anywhere or ✕ to dismiss

## Setup

```bash
# Enter dev shell (requires Nix)
nix develop

# Install & run
just install
just dev
```

## Build

```bash
# Nix build → static site in result/
nix build
```

## Customize

Fork this repo, edit `public/phrases.md`, deploy. See [`example/`](./example) for a Cloudflare Pages deployment setup.

## Stack

- Vite + React
- Tailwind CSS v4
- PWA (vite-plugin-pwa) — offline-capable, installable
- Nix flake with `buildNpmPackage`

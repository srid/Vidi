# Vidi Example — Cloudflare Pages

A working example that deploys Vidi to Cloudflare Pages with custom phrases.

## Quick Start

```bash
# One-time: create Cloudflare Pages project
just create

# Deploy
just deploy
```

## Customize

1. Edit `phrases.md` with your own categories and phrases
2. Change `projectName` in `flake.nix` to your Cloudflare Pages project name
3. `just deploy`

## Available Commands

```
just          # List all targets
just create   # Create Cloudflare Pages project
just build    # Build the site locally
just preview  # Build & open in browser
just deploy   # Deploy to Cloudflare Pages
```

#!/usr/bin/env bash
set -e

# ── Check node_modules ────────────────────────────────────────────────────────
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# ── Check .env.local ──────────────────────────────────────────────────────────
if [ ! -f ".env.local" ]; then
  cp .env.local.example .env.local
  echo ""
  echo "  Created .env.local from example."
  echo "  Open .env.local and set your ANTHROPIC_API_KEY, then re-run this script."
  echo ""
  exit 1
fi

if grep -q "sk-ant-your-key-here" .env.local; then
  echo ""
  echo "  .env.local still has the placeholder key."
  echo "  Open .env.local and replace it with your real ANTHROPIC_API_KEY."
  echo "  Get one at: https://console.anthropic.com"
  echo ""
  exit 1
fi

# ── Start ─────────────────────────────────────────────────────────────────────
echo "Starting AXIOM Intelligence → http://localhost:3000"
npm run dev

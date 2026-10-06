#!/usr/bin/env bash
# Build with the /casus base path and publish ./out to the gh-pages branch.
# GitHub Pages serves that branch at https://scencyk.github.io/casus/
set -euo pipefail
cd "$(dirname "$0")/.."

GIT="${GIT:-git}"
REMOTE="$($GIT remote get-url origin)"

BASE_PATH=/casus npm run build
touch out/.nojekyll   # keep the _next/ folder (Jekyll would drop it)

cd out
rm -rf .git
$GIT init -q -b gh-pages
$GIT add -A
$GIT -c user.name="$($GIT -C .. config user.name)" -c user.email="$($GIT -C .. config user.email)" \
  commit -q -m "deploy $(date -u +%Y-%m-%dT%H:%MZ)"
$GIT push -f "$REMOTE" gh-pages "$@"
rm -rf .git
echo "Deployed → https://scencyk.github.io/casus/"

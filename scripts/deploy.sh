#!/usr/bin/env bash
# Build with the /casus base path and publish ./out to the gh-pages branch.
# GitHub Pages serves that branch at https://scencyk.github.io/casus/
set -euo pipefail
cd "$(dirname "$0")/.."

# /usr/bin/git is blocked until the Xcode licence is accepted — prefer the CLT binary.
CLT_GIT=/Library/Developer/CommandLineTools/usr/bin/git
GIT="${GIT:-$([ -x "$CLT_GIT" ] && echo "$CLT_GIT" || echo git)}"
# Authenticate the push with the gh CLI login (no global git config needed).
AUTH=(-c credential.helper= -c 'credential.helper=!gh auth git-credential')

REMOTE="$($GIT remote get-url origin)"
NAME="$($GIT config user.name)"
EMAIL="$($GIT config user.email)"

BASE_PATH=/casus npm run build
touch out/.nojekyll   # keep the _next/ folder (Jekyll would drop it)

cd out
rm -rf .git
$GIT init -q -b gh-pages
$GIT add -A
$GIT -c user.name="$NAME" -c user.email="$EMAIL" commit -q -m "deploy $(date -u +%Y-%m-%dT%H:%MZ)"
$GIT "${AUTH[@]}" push -f "$REMOTE" gh-pages
rm -rf .git
echo "Deployed → https://scencyk.github.io/casus/"

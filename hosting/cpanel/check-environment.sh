#!/bin/bash
# Staging only: inspect build tools. Never copy files to the live document root.
set -eu
umask 077
root=$(git rev-parse --show-toplevel)
cd "$root"
report="$HOME/school-deploy-environment.txt"
tmp=$(mktemp "$HOME/.school-deploy-environment.XXXXXX")
trap 'rm -f "$tmp"' EXIT
{
  printf '%s\n' 'School Git deployment environment check: staging only'
  printf 'commit='; git rev-parse HEAD
  printf 'branch='; git branch --show-current
  for tool in git node npm pnpm corepack php tar cp mv flock; do
    printf '%s=' "$tool"
    command -v "$tool" || true
  done
  for node in /opt/alt/alt-nodejs*/root/usr/bin/node /usr/bin/node /usr/local/bin/node; do
    if [ -x "$node" ]; then printf 'node-candidate=%s ' "$node"; "$node" --version; fi
  done
  for php in /usr/local/bin/php /usr/bin/php; do
    if [ -x "$php" ]; then "$php" -r 'echo "php-version=", PHP_VERSION, PHP_EOL;'; fi
  done
  printf '%s\n' 'No dependency install, mail, public files, secrets, hooks or SSH keys were changed.'
} > "$tmp" 2>&1
chmod 600 "$tmp"
mv "$tmp" "$report"
printf '%s\n' 'Staging environment check complete. Private report: ~/school-deploy-environment.txt'

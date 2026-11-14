#!/bin/bash
# Staging only: inspect build tools. Never copy files to the live document root.
# No single probe may abort the run: Afrihost confirmed the previous version died
# because /usr/local/bin/php is PHP-CGI, not CLI, and the unguarded probe exited 255.
set -u
umask 077
root=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
cd "$root" || exit 1
report="$HOME/school-deploy-environment.txt"
tmp=$(mktemp "$HOME/.school-deploy-environment.XXXXXX") || exit 1
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
    if [ -x "$node" ]; then printf 'node-candidate=%s ' "$node"; "$node" --version 2>&1 || true; fi
  done
  for dir in /opt/alt/alt-nodejs*/root/usr/bin; do
    for tool in npm npx pnpm corepack; do
      if [ -x "$dir/$tool" ]; then
        printf 'tool-candidate=%s/%s ' "$dir" "$tool"
        (PATH="$dir:$PATH" "$dir/$tool" --version 2>&1 | head -1) || true
      fi
    done
  done
  for php in /usr/local/bin/php /usr/bin/php; do
    if [ -x "$php" ]; then
      if "$php" -v 2>/dev/null | grep -qi '(cli)'; then
        "$php" -r 'echo "php-cli-version=", PHP_VERSION, PHP_EOL;' 2>/dev/null || printf 'php-cli-probe-failed=%s\n' "$php"
      else
        printf 'php-candidate=%s not-cli-skipped\n' "$php"
      fi
    fi
  done
  printf '%s\n' 'No dependency install, mail, public files, secrets, hooks or SSH keys were changed.'
} > "$tmp" 2>&1
chmod 600 "$tmp"
mv "$tmp" "$report"
printf '%s\n' 'Staging environment check complete. Private report: ~/school-deploy-environment.txt'

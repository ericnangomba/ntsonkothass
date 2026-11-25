#!/bin/bash
# Production release for ntsonkothasec.school.za via cPanel Git Version Control.
# Runs as the single deployment task in hosting/cpanel/cpanel-production.yml
# after the owner approves that specific deployment. Builds the site on the
# server from this checkout, backs up public_html, then publishes.
#
# Safeguards honoured here (hosting/php/DEPLOYMENT.md):
# - Never place source, ZIPs or private config inside public_html.
# - Timestamped backup of public_html (including hidden files) OUTSIDE the
#   served root before anything is copied.
# - Private form code lives in ~/school-forms, never in public_html.
# - An existing ~/school-forms/config.php is never overwritten; a fresh one
#   is created from the example with every gate disabled.
# - Learner intake stays gated: this build never sets
#   VITE_APPLICATIONS_ENABLED, and the PHP config keeps
#   application_enabled=false until the school records its
#   privacy/retention/deletion decisions.
set -u
umask 077
root=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
cd "$root" || exit 1
log="$HOME/school-deploy-release.log"
tmp=$(mktemp "$HOME/.school-deploy-release.XXXXXX") || exit 1
trap 'rm -f "$tmp"' EXIT
exec >"$tmp" 2>&1

fail() { printf 'FAIL: %s\n' "$1"; cp "$tmp" "$log"; chmod 600 "$log"; exit 1; }

printf '%s\n' "School release deploy: $(date -u '+%Y-%m-%dT%H:%M:%SZ')"
printf 'commit='; git rev-parse HEAD || fail 'git rev-parse'

# --- Build tools: alt-nodejs, absolute paths (measured 14 Nov) -----------
bindir=''
for v in 24 22 20 18 16 14; do
  cand="/opt/alt/alt-nodejs$v/root/usr/bin"
  if [ -x "$cand/node" ] && "$cand/corepack" --version >/dev/null 2>&1; then
    bindir="$cand"
    break
  fi
done
[ -n "$bindir" ] || fail 'no alt-nodejs with corepack found'
export PATH="$bindir:$PATH"
printf 'node=%s\n' "$(node --version 2>&1)"

# --- Build ---------------------------------------------------------------
app="$root/artifacts/ntsonkotha-website"
[ -f "$app/package.json" ] || fail 'app package.json missing'
cd "$app" || exit 1
# Intake gate stays OFF: VITE_APPLICATIONS_ENABLED is never set here.
# Contact/application delivery endpoint is the same-origin PHP handler.
# taskset caps the CPU count pnpm sees: with the full 128 CPUs visible in this
# cage, pnpm's worker pool overspawns and dies with ERR_WORKER_INIT_FAILED
# EAGAIN (measured 25 Nov). 4 CPUs is plenty for this build.
if command -v taskset >/dev/null 2>&1; then TASKSET='taskset -c 0-3'; else TASKSET=''; fi
$TASKSET corepack pnpm install --frozen-lockfile || fail 'pnpm install'
VITE_APPLICATION_ENDPOINT=/api/forms.php $TASKSET corepack pnpm build || fail 'pnpm build'
[ -f "$app/dist/index.html" ] || fail 'dist/index.html missing after build'

# --- Backup (outside served root) ---------------------------------------
stamp=$(date -u '+%Y%m%d-%H%M%S')
backup="$HOME/school-backups/public_html-$stamp"
mkdir -p "$HOME/school-backups" || fail 'mkdir backups'
cp -a "$HOME/public_html" "$backup" || fail 'backup public_html'
printf 'backup=%s\n' "$backup"

# --- Publish static site -------------------------------------------------
cp -a "$app/dist/." "$HOME/public_html/" || fail 'copy dist'
cp "$root/hosting/public_html/.htaccess" "$HOME/public_html/.htaccess" || fail 'copy .htaccess'

# --- Form handler: public endpoint + private code -----------------------
mkdir -p "$HOME/public_html/api" || fail 'mkdir api'
cp "$root/hosting/php/public/api/forms.php" "$HOME/public_html/api/forms.php" || fail 'copy api forms.php'

# --- Public perms: the web server must be able to read the served tree ---
# This script runs under umask 077 so backups, logs and private config stay
# owner-only, but that leaves published files 600/700, which LiteSpeed
# cannot read (it then serves an autoindex or 404). Normalise only the
# public docroot; skip the system-managed .well-known directory.
find "$HOME/public_html" -path "$HOME/public_html/.well-known" -prune -o -type d -exec chmod 755 {} + || fail 'chmod public dirs'
find "$HOME/public_html" -path "$HOME/public_html/.well-known" -prune -o -type f -exec chmod 644 {} + || fail 'chmod public files'
mkdir -p "$HOME/school-forms" || fail 'mkdir school-forms'
cp -n "$root/hosting/php/private/forms.php" "$HOME/school-forms/forms.php" || fail 'copy private forms.php'
if [ ! -f "$HOME/school-forms/config.php" ]; then
  cp "$root/hosting/php/private/config.example.php" "$HOME/school-forms/config.php" || fail 'seed config.php'
  chmod 600 "$HOME/school-forms/config.php"
  printf '%s\n' 'config.php seeded from example: all delivery gates remain DISABLED'
fi
chmod 600 "$HOME/school-forms/"*.php 2>/dev/null || true
mkdir -p "$HOME/school-forms/state" && chmod 700 "$HOME/school-forms/state"

# --- Verify PHP syntax with CLI binary (never /usr/bin/php: it is CGI) ---
/usr/local/bin/php -l "$HOME/public_html/api/forms.php" || fail 'php -l public api'
/usr/local/bin/php -l "$HOME/school-forms/forms.php" || fail 'php -l private forms'

printf '%s\n' 'RELEASE DEPLOY OK'
cp "$tmp" "$log"
chmod 600 "$log"

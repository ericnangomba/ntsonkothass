# Release runbook: publish the school site from GitHub to Afrihost

Status: prepared, not activated. The owner approves each live deployment
(hosting/php/DEPLOYMENT.md: "a push goes live only when the owner approves
that deployment"). Nothing here runs until that approval.

## What a release does

`deploy-release.sh` (run by cPanel as the deployment task) builds the site
on the server from the checked-out master, backs up `public_html` to
`~/school-backups/public_html-<timestamp>` (outside the served root), then
publishes:

- built site (`artifacts/ntsonkotha-website/dist`) -> `~/public_html/`
- SPA fallback -> `~/public_html/.htaccess`
- form endpoint -> `~/public_html/api/forms.php`
- private form code -> `~/school-forms/` (never inside public_html;
  an existing `config.php` is never overwritten; a missing one is seeded
  from the example with all delivery gates disabled)

It writes a private log to `~/school-deploy-release.log` and refuses to
publish if the build, backup or PHP syntax check fails.

## Gates that stay closed after release

- Learner applications: the build never sets `VITE_APPLICATIONS_ENABLED`
  and `school-forms/config.php` keeps `application_enabled=false` until the
  school records its privacy/retention/deletion and admissions decisions.
- All form delivery stays off (`enabled=false`) until the school confirms
  sender/mail settings, HTTPS is trusted, and the owner enables them.

## One-time activation (part of the approved release)

1. Replace repo-root `.cpanel.yml` with `hosting/cpanel/cpanel-production.yml`
   (one commit with `[skip netlify]`). Until then, cPanel "Deploy HEAD
   Commit" runs only the read-only staging check.
2. Confirm `~/school-forms/config.php` sender/rate_key provisioning plan
   (gates remain disabled regardless).

## Release steps (owner walkthrough)

1. Commit to `master` on GitHub with `[skip netlify]` in the message.
2. Sign into ClientZone (GitHub sign-in) -> Hosting -> ntsonkothasec.school.za
   -> Website Manager.
3. cPanel -> Git Version Control -> ntsonkothass -> Pull or Deploy.
4. Update from Remote.
5. Verify HEAD SHA matches the GitHub commit.
6. Deploy HEAD Commit.
7. Read the deploy log under `~/.cpanel/logs/` and
   `~/school-deploy-release.log`; confirm `RELEASE DEPLOY OK`.
8. Verify https://www.ntsonkothasec.school.za serves the new bundle
   (requires DNS delegation fixed and a trusted certificate; both pending).

## Rollback

`cp -a ~/school-backups/public_html-<timestamp>/. ~/public_html/` restores
the previous site. The release never deletes the backup automatically.

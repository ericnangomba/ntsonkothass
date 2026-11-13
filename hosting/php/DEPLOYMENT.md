# School form handler: prepared, not deployed

This tree is a local implementation, not evidence that the school's live forms work.
Public static frontend and PHP handler must be deployed together on Afrihost via
the host's Git deployment path. A Netlify static deployment cannot execute PHP.
Source updates to master must use [skip netlify] until a release route is approved.

## Runtime and routing

- PHP 8.4 with mail(), fileinfo, image inspection and sessions is required.
- Fixed To administrator@ntsonkothasec.school.za, CC principal@ntsonkothasec.school.za,
  no personal BCC. Sender stays blank and configuration disabled by default.
- Private library/config must live outside the public document root.
- Public DNS, trusted HTTPS and email authentication must be verified before release.
- api/.user.ini narrows upload limits for this endpoint only; verify that these
  settings take effect before enabling uploads.
- No permanent test endpoint or public upload archive is included.

## Pre-deployment gates

1. Resolve public DNS and trusted HTTPS with Afrihost. Verify apex and www from
   independent public resolvers and a normal browser. Do not collect real learner
   data over HTTP or self-signed HTTPS.
2. Resolve school-approved intake/privacy and retention text, and the actual
   conduct/discipline policy currently referenced. Adult submission is required.
3. Keep the handler disabled until secure deployment is ready. The prior isolated
   test verified local administrator-sender delivery to both school inboxes. The
   normal production template and frontend still need an approved release check.
   If SMTP becomes necessary, add an authenticated TLS adapter; do not reset a
   mailbox solely for this or use an unrelated account's password.
4. Review any new synthetic message/attachments with the owner before sending.
   The previous single test approval is used, not a standing permission.
   Actual generated subjects are "School application <reference>" and
   "School enquiry <reference>". Body enumerates validated fields. A preliminary
   plain-language test proposal must not be mistaken for exact rendered output.

## Backup and staging plan (no remote writes have happened)

- Re-read current repo HEAD and remote document root before touching either.
- Download a timestamped full backup of public_html including hidden .htaccess and
  any api/config files. Inventory bytes/hashes and confirm it opens. Keep the backup
  outside the served root, with a local copy. Never place ZIPs/source/config in public_html.
- Check any existing private school-forms directory before creating/replacing it.
- Build frontend with VITE_APPLICATION_ENDPOINT=/api/forms.php. Preserve all existing
  fonts, design, media and SPA rewrite rules. Keep old hashed assets until verification
  is complete, so old clients can still load during rollout.
- Prepare /home/ACCOUNT/school-forms outside public_html with forms.php, config.php
  (mode 0600) and state/ (0700). Configure a locally generated random rate_key, never
  commit secrets. Config enabled=false and sender empty are defaults.
- Git-deploy public API handler and scoped .user.ini. Do not overwrite an existing API
  or .user.ini without merging/backing up it. Verify limits and private-file denial.
- Git-deploy built hashed frontend assets first, index.html last, only after the
  deployment path is approved and tested. Do not copy raw source into public_html.
  Keep private config/state outside the repository and preserve hidden server files.
- Check disabled endpoint returns accepted:false, same-origin session/CSRF works,
  and frontend truthfully preserves input on failure before enabling delivery.

## Delivery verification and release

Enable only the approved test path/scope, using synthetic fields and two real valid
PDFs visibly labelled TEST ONLY. Do not submit a real learner's identity. Verify:

- browser validation and actual multipart upload;
- actual server-side type/size checks and mail-system refusal behavior;
- BOTH administrator and principal inboxes receive the SAME reference and two readable
  attachments; examine From, Return-Path and available authentication headers;
- no personal copy, no unintended visitor auto-reply and no extra recipients;
- production mobile/desktop pixels, network failures, timeouts, duplicate clicks;
- rate checks and PHP upload limits actually active; private config/state not served.

mail() accepted:true means local mail acceptance, never guaranteed inbox delivery.
UI says queued and explains that distinction. A network timeout is unconfirmed, not
proof of no send. Do not tell the owner it is working until both-inbox verification
and secure production checks pass. If security/intake gates remain, keep disabled.

## Rollback

Disable config immediately to stop new transmissions. Restore the previous index.html
and changed public files from the verified backup; preserve unrelated later edits.
Remove only newly introduced API files after confirming they did not exist before.
Do not delete existing mail or applicant records. Do not undo DNS/SSL/mail settings
as part of code rollback. Verify homepage/register/contact render and API is disabled.
Record deployed/rolled-back hashes and what was actually tested.

## Local checks

- PHP 8.4 lint private/forms.php and public/api/forms.php.
- php tests/php-forms.test.php (validation, MIME, recipients, rate logic).
- PHP_BINARY=/path/to/php python tests/php-http.test.py (loopback HTTP; mail is a
  file capture, never a mail server; synthetic data only).
- node --experimental-strip-types --test tests/application-delivery.test.mjs.
- pnpm --filter @workspace/ntsonkotha-website typecheck and build.
- tests/visual-forms.mjs is an inspection harness for this preparation environment;
  it requires local Playwright/Chrome paths and mocks the delivery endpoint.

## Prior synthetic delivery evidence

One owner-approved synthetic test reached both school inboxes with two readable,
byte-intact PDF attachments. The temporary test endpoint and state were removed.
This test used an isolated fixture-only message composer, not the normal production
field-enumerating template or the public frontend. It does not establish external
MX ingress, trusted HTTPS, public form readiness or real learner intake approval.
Do not repeat or send a new test without the owner's approval.

## Source preservation without deployment

Save changes to the existing master production source branch as requested. Include
[skip netlify] in every commit message so Netlify does not build or deploy them.
Do not create a separate branch or pull request. Preserve remote changes and never
force-push. No Afrihost repository or automatic live deployment is configured yet.

The host exposes cPanel Git Version Control, but its current warning says shell
access must be enabled by the system administrator to view clone URLs. Standard
GitHub-clone pull deployment requires Update from Remote, then Deploy HEAD Commit.
Automatic cPanel deployment listens to pushes to the cPanel-managed repository,
not GitHub alone. Verify build tools and a secure automation path before enabling
push-to-live. Do not install an unverified plugin or public unauthenticated hook.

The owner confirmed that a parent, guardian or authorised adult must submit on the
learner's behalf. The form requires that declaration on frontend and backend; it
cannot verify the submitter's identity or authority. Public email is administrator,
and both application and contact messages copy principal. School retention text,
the actual referenced policy and admissions year/window still need confirmation.

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
2. School-owned handover item: approve application privacy/intake wording and how
   long applications, attachments and both mailbox copies are kept and deleted. No
   retention period is invented. Real application intake must stay disabled until
   the school settles this and secure release checks pass. Adult submission remains
   required; the unavailable conduct/discipline agreement checkbox is removed.
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

## Backup and staging plan (live release still pending)

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

Finish and test remaining changes before the next batched master update, as the
owner requested. Do not revert already-saved forms/calendar commits. Include
[skip netlify] in every commit message so Netlify does not build or deploy them.
Do not create a separate branch or pull request. Preserve remote changes and never
force-push. A nonpublic Afrihost Git clone exists. Automatic live deployment is not configured.

The host reports jailed shell enabled. Both private staging runner attempts still
failed with exit255 and no diagnostic output; the build path is not verified. A third
run of `hosting/cpanel/check-environment.sh` (a read-only staging environment check
writing a private mode-600 report, never touching public_html, dependencies or mail)
also failed with exit255 and no report. Afrihost confirmed on ticket YYR-460-84029
that the unguarded `/usr/local/bin/php` probe executed PHP-CGI with a CLI-only
command and terminated the script early. The script now runs with `set -u` only and
guards every probe so no single candidate can abort the run; non-CLI PHP candidates
are skipped explicitly and a failing probe is recorded in the report instead of
killing the task. Standard
GitHub-clone pull deployment requires Update from Remote, then Deploy HEAD Commit.
Automatic cPanel deployment listens to pushes to the cPanel-managed repository,
not GitHub alone. Verify build tools and a secure automation path before enabling
push-to-live. Do not install an unverified plugin or public unauthenticated hook.

The owner confirmed that a parent, guardian or authorised adult must submit on the
learner's behalf. The form requires that declaration on frontend and backend; it
cannot verify the submitter's identity or authority. Public email is administrator,
and both application and contact messages copy principal. Intake year is2027, with gazetted learner term dates. Admissions opening/closing
dates and current acceptance remain unconfirmed. School privacy/retention/deletion
arrangements remain an explicit handover item, not permission to collect records.

Form section 5 displays the school's standard Declaration and Indemnity verbatim
(supplied by the owner from the school's application form on 2026-11-13): the fees
liability declaration, the agreement to school policies and the prescribed code of
conduct, the blanket educational tour/outing/sport indemnity, and the
Father/Mother/Legal Guardian/Learner signature matrix. The printed form's "page 2"
applicant reference is annotated beside the text, not rewritten. The online form
captures no signatures and presents no electronic acceptance of this declaration;
whether online submission alone suffices or a signed paper copy must follow is a
school decision to record before launch. This supersedes the earlier removal of the
standalone policy-agreement checkbox only within this supplied section.

## Application-intake gate and handover responsibility

The rest of the site and contact enquiries can be prepared independently. Default
application UI has disabled controls, document inputs and Submit, with an explicit
no-personal-data notice. VITE_APPLICATIONS_ENABLED must remain unset/false for a
normal build. The private PHP config has application_enabled=false independently
of the shared enabled setting, so enabling contact cannot silently enable intake.
Do not switch either application gate on until school privacy/retention/deletion
approval, admissions arrangements and secure release verification are recorded.
Local tests may enable gates only against mocked or loopback capture endpoints.
No new real/synthetic external mail is authorized by those tests.

## Revised outcome and privacy preparation (13 November 2026)

The owner clarified the final outcome is OPEN online applications after secure
readiness, deployment and handover, not permanently disabled intake. Both gates
remain off during preparation. The /privacy route and pre-entry/footer links are
prepared locally; they are not a claim that collection is ready. The principal
request responsibility via the administrator mailbox is the prospective arrangement
prepared after the owner's proceed, not evidence about historical practice.

The signed25June2026 ECDoE privacy notice supplies structure, not school facts:
https://www.ecdoe.gov.za/assets/docs/paia-popia/ECDoE-POPIA-Privacy-Notice.pdf
Do not transplant Department officer/contact/security/foreign-transfer claims.
POPIA14 retention is purpose-based, with prescribed/decision-access periods and
lawful holds respected; no invented year count. School must settle applicable
records criteria/disposal owner and lawful child-processing ground/authority.
Do not add a checkbox that pretends general adult status proves competent-person
authority, or that notice acknowledgement alone establishes consent.

Before final publication, replace preparation wording together with actual launch
configuration only after the school facts and host checks below are settled.
- School: responsible identity/role, admissions access and onward recipients,
  necessary fields/documents and alternative route, child-processing basis and
  authority, records criteria/holds and disposal responsibility, intake dates.
- Technical: host/upload temp lifecycle, sessions/access logs, mail queues, both
  mailbox copies/deleted folders/downloads, backup expiry/restore/delete handling,
  processing locations and applicable safeguards/contract terms. No immediate
  all-copy deletion or South-Africa-only promise without verification.
- Release: runner/build/rollback, DNS and trusted HTTPS, same-origin endpoint and
  secure cookies, independently enabled contact/application flags and verified
  sender, delivery checks within explicit no-new-external-test authority.

Afrihost's current shared-hosting FAQ describes an infrastructure role, not an
already-established dedicated-managed application DPA. General terms16.4 permit
possible Client Data backups up to one year AFTER termination, which is not the
school retention rule or a confirmed live backup interval. Verify actual package
and technical handling rather than copying account privacy terms into this notice.
https://help.afrihost.com/entry/hosting-data-protection-compliance-faqs/
https://www.afrihost.com/terms-and-conditions/general

# Private KickMaths usage reports

Release 8.0.3. GA4 measurement ID: G-5226JP5Y9R, read from the owner’s screenshot. The integration loads the Google tag through this measurement ID. Live Tag Assistant identifies GTM-NDZS25QC and G-5226JP5Y9R as container IDs for that same tag and lists G-5226JP5Y9R as its destination. Do not install a second copy to resolve a pre-consent detection warning.

## Where the internal dashboard lives

Use the existing Google Analytics account/property for this measurement ID. Reports require Google account access; neither a report API credential nor a public statistics endpoint is embedded in KickMaths. The public site only sends consented measurements. A measurement ID is public installation configuration, not permission to read reports.

In Google Analytics, select the KickMaths property, then Reports > Engagement > Events. Depending on the selected report collection, Events may appear in another navigation group. Choose the date range first. Use the following rows and columns:

| Question | Event | Column |
| --- | --- | --- |
| How many measured browsers actually played? | player_active | Total users |
| How many measured browsers opened the game? | game_open | Total users |
| How many new full matches were started? | game_start | Event count |
| How many matches were completed? | game_complete | Event count |
| How many partial matches were saved? | game_save | Event count |
| How often were saved matches resumed? | game_resume | Event count |
| How much was the quick free demo used? | demo_answer | Event count |
| How many measured website/game page views? | page_view | Event count |

player_active is triggered only after a valid answer submission in a full match or an answer choice in the quick demo. Opening a page or creating a profile alone is not counted as playing. Never use player_active Event count as a count of children; use Total users as an estimate of browsers that played. Several pupil profiles sharing a browser can count as one Analytics user. Several devices, cleared cookies or 30-day cookie renewal can count the same person again.

A game_start is recorded after a new round is actually created. Resume does not create another game_start. Completion requires the game’s complete flag and at least one attempt; partial saves are separate. Local per-tab deduplication suppresses repeated lifecycle events and survives refresh, but statistics are not a tamper-proof transactional record.

## First live verification

1. In the owner’s GA4 web data stream, verify the measurement ID is G-5226JP5Y9R. The code does not create a new property or change Google account settings.
2. Review Enhanced measurement under Admin > Data streams > the web stream. Switch it off for this child-facing game so the installation’s explicit page/game events are the intended measurement set. In particular, avoid automatic form interaction, site search and file download collection. Review Google signals, advertising links and data retention at property level as well. These account settings could not be inspected through the available tools.
3. In a normal browser without a tracking blocker, make an adult-confirmed analytics choice in the website cookie controls or the game’s grown-up area. Localhost and other project hosts are intentionally excluded.
4. Open Reports > Realtime and check Event count by Event name while answering a demo question, starting a match, submitting a valid answer and completing it. game_open, demo_answer, player_active, game_start and game_complete should be visible as the corresponding actions occur. Do not send pupil details to debug tools.
5. Use the normal Events report for date ranges; Google says event data can take up to 24 hours to appear there.
6. Review Admin > Property access management. Give only the intended internal team access, using Viewer for people who only need reports. No access rights were added or broadened by this release.

A numerical property ID and private report access were not supplied. Therefore the standard private Events and Realtime reports are the supported dashboard, not a claim that a custom Exploration or account-level configuration was created or verified.

## Live Tag Assistant check: 22 November 2026

On https://kickmaths.co.uk/ in a fresh browser, the Google script was absent before any analytics choice. Selecting Allow Google Analytics usage statistics, confirming the adult checkbox and saving the choices inserted exactly one Google SDK script: https://www.googletagmanager.com/gtag/js?id=G-5226JP5Y9R.

The Google Tag Assistant session then connected to the production domain and displayed **1 Google tag found**. It identified both supplied IDs under Container IDs and the measurement ID under Destination ID. Its Hits Sent tab showed Page View, game_open, demo_answer and player_active after opening /play/ and answering the quick demo. This verifies browser-side detection and outgoing hits. It does not verify receipt in the owner's private GA4 reports, unique-player totals, full-match lifecycle events or account settings.

Evidence: [Tag Assistant screenshot](screenshots/analytics/tag-assistant-2026-11-22.jpg).

If the detector says No Google tags found:

1. On the public website, open Cookie settings in the footer.
2. Select Allow Google Analytics usage statistics and confirm the adult checkbox, then Save choices.
3. Reconnect Tag Assistant to the production domain. The detector must run in the same browser profile where the choice was saved.
4. If the Google script is still blocked, check browser privacy settings or a tracking blocker. The app deliberately respects Do Not Track and Global Privacy Control. Do not override these signals or remove opt-in simply to pass a tag scan.

The live Hits Sent tab also showed Scroll, confirming automatic enhanced measurement is active for this stream. The owner-side Enhanced measurement review in step 2 above remains outstanding. Tag Assistant reported that this session had no container access, so no private account settings were changed.

## Collection and consent

Google’s script is blocked until an adult-confirmed, separate analytics opt-in. Older reading-preference consent cannot grant analytics. Essential-only use and ordinary gameplay remain available without tracking. The game does not add the website cookie banner: controls are in its parent/carer/teacher area. Browser Global Privacy Control and Do Not Track are respected, and consent withdrawal in another tab disables future game events.

The integration sends a bounded event name, app area/version and optional coarse match type. No pupil/profile identifiers, names, answers, scores, year groups, school details, arbitrary strings, question text, typed input or round IDs enter its event payloads. Round IDs used for deduplication stay in the browser. Page URLs are limited to known public routes with queries/fragments removed; page titles are fixed and referrer addresses are not included. Google still processes browser identifiers and technical request/device information when enabled; do not describe this as collecting no personal data.

Google signals and ad personalisation are disabled in the configuration, advertising consent stays denied, analytics cookies have a 30-day configured expiry and no public GA reporting credentials exist. Browser choices and privacy copy describe this. The numbers cover consenting, unblocked browsers after installation; no historical player total can be reconstructed from local saves.

## Social previews

All marketing pages, the game entry and the old pricing redirect use the exact owner-supplied Kickmaths-sm.jpg bytes. Immutable URL: https://cleandesignuk.github.io/kickmaths/assets/kickmaths-share-00f8cc99ab2d.jpg. Dimensions: 1200 × 630. Legacy JPEG social asset URLs also serve those bytes. The GitHub Pages asset URL now redirects successfully to kickmaths.co.uk. Production HTTP checks returned 200 for the website, game, usage module and sharing image; version 8.0.3 and the supplied measurement ID are present, and the live image matches the uploaded bytes. Existing social platform caches may retain older cards until refreshed by the platform.

## Verification

The Node tests cover pre-consent blocking, adult confirmation, old/invalid choices, SDK configuration, URL redaction, event parameter allowlists, start/resume/complete/save semantics, deduplication across refresh, player_active, withdrawal, cross-tab withdrawal, privacy signals, non-production hosts, graceful analytics failure and all static social metadata/image bytes. The existing game tests also run.

The initial release had only HTTP/source verification. The follow-up production browser check above now verifies consent-gated SDK loading, Tag Assistant detection and outgoing page/demo/player events. Private GA4 report receipt and account-side settings remain an owner verification step; do not report observed player numbers or a verified custom dashboard until that check has happened.

Primary references checked 22 November 2026:
- https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic
- https://developers.google.com/analytics/devguides/collection/ga4/reference/config
- https://support.google.com/analytics/answer/12926615
- https://support.google.com/analytics/answer/9216061
- https://support.google.com/analytics/answer/9305587

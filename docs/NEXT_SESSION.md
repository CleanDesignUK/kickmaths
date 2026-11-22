# Current KickMaths checkpoint

Latest release source: KickMaths 8.0.3, consent-based private GA4 usage reports and the owner-supplied social sharing image. Read USAGE_REPORTS.md and FREE_BETA_LAUNCH.md. Publishing uses the existing GitHub Pages workflow after a verified PR merges; check the latest main SHA and Actions status before further changes.

Website: https://cleandesignuk.github.io/kickmaths/
Game: https://cleandesignuk.github.io/kickmaths/play/

- Current instruction: free beta for families and schools. A paid version is coming soon. Public prices and annual subscription offers have been removed. Do not reinstate the earlier £2 pupil/year price or implement checkout/code activation during beta.
- /beta/ replaces the public pricing page. The old /pricing/ URL redirects to /beta/ and is excluded from the sitemap. All 34 public pages, search metadata, social sharing artwork and the game entry/dashboard describe free beta access.
- Progress, reports and the Squad League stay in each browser. Local Backup/Restore remains important; no cloud account service has been added.
- GA4 G-5226JP5Y9R is connected directly. Statistics require separate adult-confirmed opt-in; Google signals and advertising personalisation are disabled. Reports stay in the private Google Analytics account. Use player_active / Total users as measured browser-players, game_start / Event count as started matches and game_complete / Event count as completed matches. No pupil identifiers, answers, scores or year groups are sent in game events. On 22 November the live browser/Tag Assistant check verified 1 Google tag found, both supplied IDs (GTM-NDZS25QC and G-5226JP5Y9R) for the same tag, and outgoing Page View, game_open, demo_answer and player_active hits. See USAGE_REPORTS.md for the screenshot and consent troubleshooting. Private GA4 receipt and account settings are unverified; Scroll appeared in live hits, so review Enhanced measurement and verify Realtime.
- The exact owner-supplied social image is assets/kickmaths-share-00f8cc99ab2d.jpg, used on all OG/Twitter cards including /play/ and the /pricing/ redirect.
- Contact: enquiries@kickmaths.co.uk. Feedback: https://forms.gle/SYBiVhoeEzwWpkvu9.
- The approved crests, 16px/18px website copy, accessible navigation, no website button arrows and explicitly labelled dyslexia-friendly mode remain. Game audio is removed.
- Pages activation is complete; do not ask the owner to enable it again.
- Production verified: https://kickmaths.co.uk/ and /play/ both return HTTP 200 and serve version 8.0.3. GitHub Pages URLs now redirect to the custom domain. Do not undo this connected domain setup. The live usage module has the supplied measurement ID, and the live sharing-image bytes match the uploaded graphic. This is HTTP/source verification, not observed GA4 event receipt.
- The original primary-uk-maths repository is unchanged. Full game history is preserved in CleanDesignUK/kickmaths.
- Before paid work was paused, £5 lifetime per activated device/browser with Tide was discussed. It was not built. PAYMENT_ACCESS_PLAN.md is archived context, not the current launch requirements.

- Latest release checks: all 163 tests, syntax, marketing generation, Worker packaging and public local-link checks pass. Follow-up live browser QA verified consent-gated SDK loading and Tag Assistant detection/outgoing page/demo/player events. No runtime changes were needed for this follow-up. Do not claim private GA4 receipt, a verified custom Exploration or actual player totals.

Keep changes in focused commits. Run appropriate tests and builds, inspect the affected desktop and phone layouts, and merge through checked PRs before reporting an update live.

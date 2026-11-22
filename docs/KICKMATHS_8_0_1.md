# KickMaths 8.0.1: crest and player layout

22 November 2026

## Changes

- Apply the four owner-supplied crest assets without redrawing them. Keep exact transparent and white-background originals under `dist/assets`. Header variants only trim transparent padding.
- Use the approved crest in the public header/footer and game header. Add ICO, PNG favicon, Apple touch and web app icon exports, with relative links valid at the GitHub Pages subpath and intended domain.
- Keep Parents inside the player picker header with explicit padding. Hide the redundant current-player shortcut on this picker only.
- Put Play on its own line below the position/kit number with a 14px measured gap. The whole player card remains one accessible button.
- Package image bytes as base64 with the right MIME type in the optional Worker build. The new runtime test checks complete byte equality for PNG, JPEG and ICO responses, empty HEAD bodies and served manifest icons.
- Bump all game module/cache references to 8.0.1 so the published HTML requests the new modules and styles.

## Verification

- 150 tests passed; JavaScript syntax checks, public page generation and Worker packaging passed.
- Desktop browser: Defender / No. 14 player, Play below metadata, crest visible, Parents inset.
- 320px phone browser: document client/scroll widths both 305px (15px scrollbar), 26px from Parents to viewport edge, 10px from Parents to header edge, 14px Play gap; no horizontal overflow.
- Public website: approved crest loads in the header/footer; 320px expanded navigation has no horizontal overflow.
- Screenshots: `screenshots/kickmaths-8.0.1/players-desktop.jpg`, `players-320.jpg`, `website-320-menu.jpg`.

## Payment boundary

This release changes layout/branding. It does not collect payments, enable subscriptions or enforce licences. See `PAYMENT_ACCESS_PLAN.md` for the proposed free/paid flow and the information still required. Existing game progress remains on each device.

Merge through a checked PR and confirm both main verification and Publish KickMaths Actions succeed before reporting the release live.

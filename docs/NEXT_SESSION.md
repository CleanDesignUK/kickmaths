# Current KickMaths checkpoint

KickMaths 8.0.0 is live at https://cleandesignuk.github.io/kickmaths/ and the game at https://cleandesignuk.github.io/kickmaths/play/.

The entire original game and its full history are preserved in CleanDesignUK/kickmaths. The original primary-uk-maths repository is unchanged. PR #1 merged as 7d948d1746fd7ee320f93e8a2561d0135836ab80. Main verification and Pages publishing succeeded, and the browser confirmed the live homepage and game version.

- All 149 tests pass, alongside syntax and both builds. Desktop and 320px checks cover reading settings, consent, navigation, fonts, scoring, written help and the feedback form.
- £2 per pupil per year was explicitly confirmed by the owner for both families and schools.
- Contact is enquiries@kickmaths.co.uk; feedback uses https://forms.gle/SYBiVhoeEzwWpkvu9.
- 34 public pages, with About/Contact/Pricing/Dyslexia-friendly pages, 16px/18px body text, matching navigation, larger footers and no website button arrows.
- Game audio is removed. Dyslexia-friendly mode is clearly labelled. The learning/reward/shop rules and legacy backup format remain; new storage keys keep old-game data separate.
- Pages activation is complete. Do not ask the owner to enable it again.
- kickmaths.co.uk DNS is not connected. Canonicals and sitemap use the intended domain. Do not add a CNAME redirect until DNS is ready.
- Pricing is displayed, but payment checkout and licence enforcement are not implemented. Progress and the Squad League remain local to each browser; there is no cloud school dashboard.

See KICKMATHS_LAUNCH.md and the latest GitHub Actions before continuing. The final verification commit adds deployment records and the JPEG social image.

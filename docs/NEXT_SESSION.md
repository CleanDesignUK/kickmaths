# Current KickMaths checkpoint

Latest release source: KickMaths 8.0.1, covering the approved crest/favicon and player-picker layout. Read KICKMATHS_8_0_1.md for changes and browser evidence. This release is published by GitHub Pages after its PR merges; check the latest main SHA and Actions status before continuing.

Public website: https://cleandesignuk.github.io/kickmaths/
Game: https://cleandesignuk.github.io/kickmaths/play/

- The full original game and history are preserved in CleanDesignUK/kickmaths. The original primary-uk-maths repository is unchanged.
- All 150 tests pass, alongside syntax and both builds. The latest browser checks cover desktop and 320px player layout, header/footer crests and public mobile navigation. The Worker test verifies binary asset bytes and MIME types.
- £2 per pupil per year is confirmed for both families and schools.
- Contact: enquiries@kickmaths.co.uk. Feedback: https://forms.gle/SYBiVhoeEzwWpkvu9.
- 34 public pages include About, Contact, Pricing and Dyslexia-friendly maths, with 16px/18px body text, matching navigation, larger footers and no website button arrows.
- Game audio is removed. Dyslexia-friendly mode is explicitly labelled. Learning/reward/shop rules and legacy backup format remain; KickMaths storage keys keep old-game data separate.
- Pages activation is complete. Do not ask the owner to enable it again.
- kickmaths.co.uk DNS is not connected. Canonicals and sitemap use the intended domain. Do not add a CNAME redirect until DNS is ready.
- Pricing is displayed; checkout and paid access are not implemented. Progress and the Squad League remain local to each browser. The owner declined Stripe and uses Tide; Tide Instant Checkout has a £5 minimum. PayPal Business is proposed but unselected. Read PAYMENT_ACCESS_PLAN.md before implementing.

Keep changes in focused commits, test the actual affected screens and merge through verified PRs. Never report payments or domain setup complete without checking them.

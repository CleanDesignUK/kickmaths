# KickMaths launch, 22 November 2026

Original game: CleanDesignUK/primary-uk-maths at 262f7b17221c5b430a5a35ad4f2ad02c4bb3f651 (7.1.2).
Complete source and original commit history imported into CleanDesignUK/kickmaths. The original repository is unchanged. Import merge: 0b2411784e8c6dc98fa26e9c5f14568e10d275ea.

## Release 8.0.0

- Brand and game: KickMaths. Jargon: Train Your Brain. Win the Game.
- Parent-company attribution removed from website and game.
- 34 public pages with concrete maths and curriculum descriptions, unique titles/descriptions, canonical URLs, breadcrumbs, relevant FAQ schema, a product offer and sitemap for kickmaths.co.uk.
- About, Contact, Pricing and dedicated Dyslexia-friendly maths pages added.
- Annual price confirmed by the owner: £2 per pupil per year for both schools and families. Examples: 30 pupils £60/year; 100 pupils £200/year.
- Email enquiries@kickmaths.co.uk and the supplied Google feedback form linked from Contact. Dashboard feedback is also connected to that form.
- Website body text uses 18px or 16px on mobile. Footer text is 16px or 18px. Year navigation shares the 16px nav font and uses a drawn chevron. Website calls to action have no arrow icons.
- Dyslexia-friendly controls have visible labels; website preference persistence respects the cookie choice. Reduced motion remains separately configurable in the game.
- All speech controls, auto-reading and generated sound effects removed. Restored legacy sound preferences cannot re-enable them.
- Website cookie banner: essential choice or optional preference storage. No advertising/analytics scripts. No banner in the game.
- Original learning, question pools, rewards, written working, reports and paid-customisation guards retained. Version-1 backups remain supported. New KickMaths storage keys keep the original game's saved data independent.

## Deployment and remaining configuration

Publish KickMaths deploys dist/ to the repository's GitHub Pages root after syntax, build, tests and generated-file checks. Pages source must be GitHub Actions. Intended live repository URL: https://cleandesignuk.github.io/kickmaths/.

Custom domain: kickmaths.co.uk did not resolve during setup. Canonicals are prepared for that domain. Do not add a CNAME redirect until DNS is connected and verified.

The requested £2 price is published as pricing information. Payment checkout, paid accounts and licence enforcement are not implemented. The static launch retains browser-local reports and Squad League; it does not invent a cloud school dashboard.

Verification evidence and deployment results should be added as checks complete. Read the latest GitHub commit and Actions status before continuing after a disconnection.

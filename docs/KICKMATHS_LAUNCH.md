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

## Verification

- 149 automated tests pass; module syntax, marketing build, Worker build and whitespace checks pass.
- GitHub verification passed for source checkpoint 7d1d3d9a3e3b99d07dca13be38d8e2ee523296d8.
- Browser: desktop and 320px phone layouts checked; the phone viewport and scroll width both settle at 305px (320px frame including scrollbar). Mobile navigation opens and closes through the labelled Menu button.
- Body paragraph fonts resolve to 16px or 18px. Header/dropdown navigation resolves to 16px; footer links are 16px and tagline 18px.
- Cookie choices: Essential only lets reading mode work without persisting it after reload; Remember preferences persists the choice. Cookie settings reopens the banner.
- The game accepts a correct answer, awards pending independent XP and shows visual goal feedback. Asking Coach shows written working and a working next-question action. Speech buttons and read-aloud settings are absent. The dyslexia checkbox changes the reading font and layout.
- Contact email and feedback button verified. The supplied Google link opens the form titled KickMaths Feedback. No form response was submitted.
- Screenshots are in screenshots/kickmaths/.

GitHub Pages activation is still required for this new repository. The code is concrete and committed; the connector cannot change that repository setting, and the browser currently requires GitHub sign-in. Domain DNS also remains unconfigured. Read the latest GitHub commit and Actions status before continuing after a disconnection.

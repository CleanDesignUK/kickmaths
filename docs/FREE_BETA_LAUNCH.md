# KickMaths 8.0.2: free beta

22 November 2026

## Current product decision

Launch the current game as a free beta for families and schools. A paid version is coming soon. Payment work is paused; no purchase, annual subscription, activation code or published future price is part of this release.

## Public changes

- Replace Pricing navigation with Free beta and publish /beta/ with getting-started, local-progress and feedback information.
- Replace all public annual prices in the homepage, parent, school, about and contact copy. Shared headers, footers and calls to action describe the free beta and upcoming paid version.
- Remove paid Offers metadata and mark learning resources and the app accessible for free. Use beta copy in relevant descriptions and FAQs.
- Redirect /pricing/ to /beta/, with a usable fallback link and noindex metadata. Only /beta/ is included in the sitemap.
- Update editable and JPEG social sharing artwork. A new beta image filename avoids requesting an old cached price image; the original image URL also serves the updated artwork.
- Show a 16px beta notice on the game player picker and dashboard, plus a footer information link. Keep active match screens focused on the question. Existing local progress and earned-credit shop rules continue.
- Refresh game cache keys and public styles to 8.0.2.

## Validation

- All 151 tests pass. The launch tests verify every generated page has beta messaging without old prices or paid metadata, valid topic links, consistent free access metadata and the old pricing redirect/sitemap change.
- Module syntax, marketing generation, Worker packaging and git diff --check pass. A scan of all public HTML finds no old currency prices or pricing-page links.
- Desktop browser: homepage navigation, beta notice, CTA and sharing artwork checked.
- 320px phone: homepage, expanded navigation, beta information page and game picker have equal document client/scroll widths of 305px, including a 15px scrollbar. No horizontal overflow.
- Game notice uses 16px text, with explicit light paragraph colour on a dark green background. Add player opens the existing creation form without a checkout or code prompt.
- The old pricing URL visibly lands on the new beta page.
- Screenshots are stored in docs/screenshots/free-beta/.

Merge through a verified PR and confirm main verification and Publish KickMaths both succeed before reporting the update live. The intended custom domain still needs separately verified DNS; this release uses the existing GitHub Pages site.

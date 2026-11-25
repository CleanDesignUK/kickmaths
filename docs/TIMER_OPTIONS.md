# Player timer choices: 8.0.4

Players can choose **3 minutes**, **5 minutes** or **Unlimited** using Match timer beneath their dashboard player card, or in the new/edit player form. Dashboard changes save immediately for that profile. The profile form saves with Create & play or Save. The timer is visible without expanding Kit and style.

Existing 1- and 2-minute selections and profiles with no timer move to 3 minutes when local data or an older backup loads. Existing 3-minute choices stay at 3 minutes. New 5-minute and Unlimited choices persist across reloads, profile edits and backup restore. Save keys and backup schema remain version 1, so existing player progress stays available.

The choice applies to Coach matches, times-table challenges, manual and written practice, and promotion matches. Warm-ups, progress checks and 3-shot Coach drills retain their no-countdown behaviour. A round still ends after its planned number of shots, including in Unlimited mode. Existing feedback pauses and written thinking-time allowances remain in timed matches.

Changing the setting also updates that player's saved draft. It keeps answers, question state, XP candidates, attempts and active time already spent. Switching back to a timed choice uses that spent time; it does not reset the countdown. If the new budget has already been used, the round ends when resumed. Historical sessions and personal bests retain their original durations. New comparison keys separate the new timer configuration from legacy timing and each timer choice from the others. Other reward and league rules are unchanged.

Unlimited is stored as a finite duration of 0. Clock helpers return Infinity only to the live UI; the stored draft stays valid JSON and retains finite elapsed practice time. No expiry is triggered, and no written-work countdown or low-time warning is shown.

## Verification on 25 November 2026

- All 170 Node tests pass. Seven timer tests cover old-profile/import migration, invalid backup values, all local match types, saved answer/time retention, comparison keys, 3/5-minute expiry, pause/feedback handling, Unlimited JSON reload, eligible independent XP and the existing-player control.
- Module syntax checks, 34-page marketing generation and optional Worker asset packaging pass. Cache versions are 8.0.4 throughout the generated pages and module imports.
- Browser QA on the managed preview used an existing QA player. A new manual practice match started at 5:00. After one correct answer, choosing Unlimited and reloading/resuming retained 1 goal and 2/10 shot position, displaying ∞ / No timer. Changing to 3 minutes displayed the remaining 2:43, preserving time already spent.
- Existing-player Edit showed Unlimited selected; saving retained it. The new-player form exposed the three choices with 3 minutes selected by default.
- At a 320px iframe viewport, both 5 minutes and Unlimited selections worked. The body width and scroll width were both 305px, so the new control did not cause horizontal overflow. Screenshots show legible text and the dropdown fitting its card.
- No game-source JavaScript error was observed in the browser. The browser extension emitted its own metadata errors.

Evidence: [desktop dashboard](screenshots/timer-options/desktop.jpg) and [320px timer control](screenshots/timer-options/phone-320.jpg).

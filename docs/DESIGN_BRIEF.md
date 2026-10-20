# Titan Gym Website Design Brief

The website should make Titan Gym feel approachable to women who may feel intimidated by a gym, while retaining the strength and credibility that appeal to experienced lifters. This balance guides the marketing, copy, and visual design.

## Target audience

The primary audience is women ages 20–45, including women who feel out of shape or uncertain about entering a gym. They should be able to picture themselves belonging at Titan Gym before they feel fit or experienced.

The user's working assessment is that most target customers are returning to exercise rather than switching directly from another gym. Some will be first-time gym users. Develop messaging around getting back into a routine while making the experience and next steps understandable to someone who has never joined a gym.

The secondary audience includes men and experienced gym members. The brand should feel appropriate for people who take training seriously, across genders and experience levels.

Existing customers also include adults in their 60s who want to maintain strength and physical capacity as they age. Women ages 20–45 remain the primary marketing audience; the website should also make older adults feel welcome.

The business premise is that attracting women can also help attract men. This is an internal audience strategy, not customer-facing messaging.

## Local reach

Titan primarily serves customers close to its Alamo Ranch location. Some members travel farther, but that is uncommon. Keep the location clear and emphasize the actual local setting without implying customers regularly travel across San Antonio to train here.

## Search discovery and later review

Google searches for “gyms near me” are the largest reported source of new visitors. After the current website design and copy work, review keywords, SEO, and AI SEO. This is a later review item; no keyword or search-visibility audit has been completed in this task.

## Growth goal and capacity

The goal is 50 additional members. The user expects the gym can accommodate that growth across its existing hours as members attend on different days and at different times. Fifty additional members does not mean capacity for 50 people training at once; concentrating all new attendance in an afternoon period would create a problem.

Keep the overall membership offering broad. Quieter-time guidance can help people choose when to visit, but growth is not restricted to filling a specific time slot.

## Scope and timing

The soft planning target is the end of 2026, roughly the next two months. Focus this task on the website. Promotional materials and campaign planning belong in a separate task; the timing does not require promotional urgency in the website's design or copy.

## Member motivations

Weight loss and feeling healthier are common reasons customers come in. Confidence may be an underlying benefit, but customers do not commonly name it as a goal. Lead messaging exploration with the goals customers express rather than assuming confidence is their main motivation.

For some older members, the motivation is preserving strength and physical capacity as they age. Communicate this with respect and an emphasis on what they want to keep doing.

## Barriers to starting

The user's current assessment is that price and not knowing Titan exists are probably the biggest barriers to visiting. Prioritize clear membership value and local discoverability in the website's direction.

Fear of judgment, unfamiliar equipment, and the appeal of competing health-club offers remain secondary hypotheses. Scheduling has also been mentioned. Their relative importance has not been established; treat these concerns respectfully in public copy.

## Brand direction

Blend masculine and feminine qualities. Combine warmth, comfort, and approachability with strength, confidence, and a sense of purpose. Avoid both an intimidating gym atmosphere and a tone so soft or coddling that experienced lifters feel the gym is not for them.

The intended response is: “I can feel comfortable starting here, and I can train seriously here.”

## Visual direction

Use the current website as the starting point for refinement. The user likes its overall appearance and has no external visual references in mind. Refine the existing design against the audience, palette, and voice established here rather than introducing a new visual concept.

Decide which specific elements to preserve or adjust through iterative review of actual designs. A fixed list of changes to headings, spacing, photographs, or page length is not required before the first pass.

## Voice

The preferred direction is calm and straightforward. Explain the gym, its offering, and the next step clearly. Convey warmth through concrete details about the experience. A familiar neighborhood voice and an upbeat coach persona are not the preferred directions.

## Faith messaging

Faith is secondary to the gym's offering, atmosphere, and member goals. Small references can appear where they fit, but faith should not lead the homepage or become a central design theme. The footer's closing line is “As iron sharpens iron, so one person sharpens another.” — Proverbs 27:17, replacing “Strength grows here.”

## Homepage headline draft

The selected landing-page headline is “Make feeling good part of your routine” with no final period.

Use a compact inset arrangement with all words horizontal. Small “Make” sits above and almost touches “Feeling,” inset 2px from its left edge. Large “Feeling” spans the combined height of a right-hand stack: smaller “Good” above small “part of your.” The connector is slightly smaller than before and centered under “Good.” Large “routine” fills the entire combined width immediately below this block, with its size recalculated after removing the period. Fit words using their visible letter edges and proportional font sizes, without stretching letter shapes. Expose the complete sentence in normal reading order to screen readers. Refine the visual treatment iteratively.

## Homepage supporting copy draft

The selected supporting copy is:

> Find your rhythm with a family-owned gym in Alamo Ranch.

Keep the main headline unchanged. The supporting line emphasizes rhythm, family ownership, and location.

## Homepage introduction replacement

The highlights strip beneath the hero is a continuous scrolling carousel: Family owned, Open gym, Personal training, Alamo Ranch, TX, and All fitness levels. “Open gym” and “Personal training” replace the combined “Open gym & coaching” label. Scroll automatically without controls, hover pause, or other carousel interactions. Show a static wrapping list for reduced-motion preferences. Hide repeated visual items from screen readers.

The “Alamo Ranch · San Antonio” label above the hero headline has been removed. Keep the small green “Welcome to Titan Gym” label above the white introduction section's heading: “Family owned” followed by “In Alamo Ranch” on a new line. Its smaller supporting line is “A family tradition of health & wellness”, using lead-paragraph typography with a lighter font weight of 400 rather than the display heading font. The previous introductory copy and link have been removed.

Current supporting paragraph for iterative refinement:

> We’re a family team who believe taking care of yourself should fit into everyday life. We built Titan Gym as a place to do that with familiar faces and room to work towards your goals.

Try the existing community photo (`community.jpg`) as a background on the right of this white section, fading into the paper background toward the left. Increase its visibility from the initial version: use 45% image opacity (30% on mobile), with the left-to-right paper overlay becoming transparent at 65% of the image width. Position the image at center 40% to show more of its upper portion. Keep the text readable. This image treatment is exploratory and may be removed after review.

## Homepage gallery

Replace the former “Inside Titan Gym” image-and-copy section with a homepage photo gallery at `#gallery`. Use six photos as a fitted collage of large, small, wide, and taller thumbnails, echoing the mixed-size headline treatment. Its second tile uses `images/christmas-giveaway.jpg`, replacing the bench-press photo. Convert the supplied HEIC to a progressive 1200×1600 JPEG at approximately 353 KB, preserving orientation and the color profile. Retain the original HEIC in `../titan-gym-reference/archive/media-originals`. Keep the collage layout on mobile with adjusted tile positions. Use the eyebrow “Inside Titan Gym” and heading “Take a look around” The section uses the same lighter dark green background as the “Love this place” quote section (`--color-dark-surface`), separating it from the light membership section. Give each photo a 2px border using the existing near-black dark token. Do not add photo numbers or caption overlays.

Each thumbnail opens one shared native modal dialog. Background photos must remain inactive while it is open. Clicking the backdrop closes the viewer and stops propagation; clicking the photo keeps it open. Include close, previous, and next buttons, support Left/Right arrow keys, and wrap between first and last images. Escape closes through native dialog behavior. Return focus to the original thumbnail when the viewer closes and prevent background page scrolling while open.

Remove the separate Facility page, its route, and its page-specific content. Header navigation, footer navigation, and the hero's secondary button now point to the homepage gallery; use the navigation label “Gallery”. Keep the original site capture in the archive for reference.

## Brand colors

Use the supplied arrow and phone SVGs as shared `ArrowIcon` and `PhoneIcon` components in `frontend/src/Icons.tsx`. All website arrows use the same arrow artwork, rotated for their direction. `PhoneNumber` uses the shared phone icon wherever a phone number appears.

Footer Facebook, Instagram, and YouTube links now use the user-supplied SVGs through reusable `FacebookIcon`, `InstagramIcon`, and `YouTubeIcon` components in the same file. Keep existing destinations, use accessible platform labels on icon-only links, and provide 44px tap targets. Icons inherit existing footer and hover colors. Facebook clipping IDs must remain unique when reused.

The header uses `Logo_Dark_V2_w_Text.png`, which includes the Titan Gym name. Remove the separate header text for Titan Gym and Alamo Ranch, TX. The entire header and mobile navigation use the footer's existing dark green background token with light text. Remove the logo's separate background block, keeping modest padding. The footer branding is unchanged.

The established brand colors are green, black, and white. Preserve brand recognition while allowing softer supporting neutrals. The current website defines its bright green accent as `#07e607`.

One possible direction is approximately 45% cream, 45% charcoal, and 10% combined black, white, and brand green accents. This develops the earlier 45% black, 45% white, and 10% green idea into a softer palette. These proportions are exploratory guides to visual balance, not fixed area calculations. Decide exact shades and proportions by reviewing designs. Use green sparingly.

## Reasons to feel comfortable

Titan is a small business owned by a husband and wife. The owners are frequently present and readily available to help. Staff are very friendly, and members are generally friendly too.

The gym is small and generally not very busy, with many quiet periods. The user identifies almost all mornings, much of the daytime before roughly 1–2 p.m., and Sunday afternoons as commonly quieter. Treat these as approximate observations rather than a confirmed day-by-day schedule. Publishing clearer quiet-time guidance can help visitors choose a comfortable time to come in; confirm exact windows before presenting a schedule.

The space is approximately 2,000 square feet, with the gym visible at a glance. Photography and copy should reflect this compact scale.

These are initial reasons to build on as the positioning develops. Describe the personal support and quieter atmosphere without promising constant owner availability or an empty gym.

## Atmosphere

Music and lifting noise are generally moderate. Most noise comes from people talking to each other. Staff usually interact with people when there is activity. The gym is social rather than silent; quieter attendance periods do not imply a noise-free environment. No distinctive gym rules have been identified as important to the website's message.

## Practical amenities

- **Parking:** Shared shopping-center parking. Availability varies with the time of day and traffic to other stores; busy shopping periods can limit nearby spaces, while off hours offer ample parking.
- **Physical access:** The user confirms a step-free entrance and wheelchair access throughout, with no identified mobility limitations or additional parking instructions needed.
- **Bathrooms:** Two bathrooms, which members can use to change. There is no dedicated changing area.
- **Showers:** None.
- **Childcare:** None. Some members bring their children, but permitted ages, supervision requirements, and other conditions have not been established for website copy.

## Included support

The four offering galleries use media from their matching folders under `frontend/public/images/` and `frontend/public/videos/`. Use descriptive lowercase filenames. Treat these source folders as authoritative; the root `public/` folder is generated. Add gallery entries and ordering through `frontend/src/siteData.ts`.

Open gym contains `open-gym/bench-press.mp4`, `open-gym/seated-cable-row.mp4`, `open-gym/bench-press-spotter.mp4`, `open-gym/seated-dumbbell-press.mp4`, `open-gym/lat-pulldown.mp4`, and the `open-gym/training-floor.jpg` photo, in that order. Videos have matching JPEG posters in the images folder. The seated cable row replaces the former second item, the barbell squat photo; that photo remains available in the main gym photo gallery at `images/barbell-squat.jpg`. The bench-press clip retains the full source at 85% speed, 480×848 and 24 fps; it is 9.46 seconds and approximately 770 KB. The seated cable row uses the full `open-gym-3.MOV` from `C:\Users\Austin\Videos\titan-gym`, exported at its original speed to 720×1280 and 24 fps with corrected rotation and HDR-to-SDR color. The web copy is 16.67 seconds and approximately 2.78 MB, compared with the 19 MB original. The seated dumbbell press uses the full `open-gym-4.MOV` at its original speed, exported as a 16.96-second 720×1280 clip at 24 fps, approximately 1.26 MB compared with the 19.9 MB original. Correct phone rotation and HDR-to-SDR color, and use its matching JPEG poster. The lat-pulldown clip keeps source seconds 6–11.525 from the original `open-gym-2.mp4` at 85% speed, producing a 6.46-second 720×1280 loop at 24 fps and approximately 412 KB. The third clip is the full `open-gym-5.mov`, exported at its original speed as `bench-press-spotter.mp4` with matching JPEG poster: 10.83 seconds, 720×1280 and 24 fps, approximately 1.17 MB compared with the 4.07 MB original. Show its full frame without cropping. All five are silent, fast-start H.264 exports with BT.709 color. Original videos remain outside the deployed site.

Personal training contains the strength-machine coaching video, pull-up coaching video, new pull-up practice video, and existing bench-press assistance photo, in that order. Videos and posters use `pt/strength-machine-coaching` and `pt/pull-up-coaching` filenames. The first video retains source seconds 6–13 from `training1.MOV` at 85% speed: 8.25 seconds and approximately 677 KB. The second retains seconds 3–11 from `training2.MOV` at 85% speed: 9.42 seconds and approximately 1.02 MB. Both are silent, fast-start H.264 at 720×1280 and 24 fps.

The third Personal training item uses source `pt-1.MOV` from `C:\Users\Austin\Videos\titan-gym`. Remove everything before source second 11 and keep the remaining footage at its original speed. Export `videos/pt/pull-up-practice.mp4` and matching JPEG poster under `images/pt/`: 7.96 seconds, 720×1280, 24 fps, silent fast-start H.264 with corrected orientation and HDR-to-SDR color, approximately 983 KB. Display this clip in full without cropping.

Nutrition coaching starts with `progress-160-to-141-lb.png`, followed by the Winter Winner video as its second item. Then show `progress-152-to-137-lb.png`, `progress-247-to-195-lb.png`, `progress-woman-profile.png`, `progress-man.png`, and `progress-163-157-lb.jpg`. Winter Winner uses `videos/nutrition-coaching/winter-winner.mp4` and matching JPEG poster in the images folder: the full six-second clip at 720×1280 and its original 20 fps, exported as silent, fast-start H.264 at approximately 909 KB. Preserve the original `winner-winner.MOV` in `../titan-gym-reference/archive/media-originals`. The final progress image is labeled 163.5 lb and 157.2 lb and replaces the rice video. These are the actual selected assets, replacing temporary gallery placeholders. Bodybuilding contains `competition-stage.jpg` followed by `competition-collage.jpg`. Show progress and competition photos in full without cropping.

All four galleries use portrait 4:5 media frames with centered horizontal headings above the bordered images, previous/next arrows, Left/Right keyboard navigation, and clickable bottom thumbnails. Keep the selected thumbnail highlighted with the existing green accent. The thumbnail strip fits its contents vertically, hides scrollbars, supports native mobile swiping and mouse dragging, and still allows taps or clicks to select a slide. Pause videos when hidden, when the page is hidden, or when reduced motion is requested. Stack cards on mobile in Open gym, Personal training, Nutrition coaching, then Bodybuilding order. Coaching remains separate from standard gym access; do not invent package details or promise included coaching.

The section title is “Your Gym, Your Way”, selected as a shorter option intended to fit one line on desktop. Remove the section subtitle. Center all four gallery titles using the same heading style. Hide the entire Shake bar card through `showShakeBar = false`, retaining its markup, styles, menu, and video assets for possible reuse.

Remove the standalone Nutrition page, its route, and its navigation and footer links. Keep Nutrition coaching on the homepage as an inline gallery; its former text-and-video card is replaced. Its seven items include six progress photos and the Winter Winner video.

The retained Shake bar menu uses two separate line items, with bold drink names and smaller regular-weight details. The user supplied these product names and ranges:

- **Protein Shakes:** 24–36 g protein and 200–320 Calories.
- **Protein Ice Coffee:** 22 g protein and 120 Calories.

List creatine, caffeine, and protein as add-ons beneath the drinks in lighter text, using an existing semantic color token. The retained, hidden Shake bar layout uses a bright green title with 16px top padding and a full-height video occupying the right 40%. Nutrition coaching now uses the shared gallery layout instead.

The retired rice video is preserved in `../titan-gym-reference/archive/media-originals/weighing-rice.mp4` and is excluded from the deployed site.

Standard membership does not include structured beginner support, an orientation program, or a workout plan. Members can ask an owner or trainer for informal help when they are available. Keep this distinction clear when developing messages about a welcoming environment or personal attention.

The Shake bar card includes a portrait video from the supplied `b-shake17.MOV`, using a compressed H.264 MP4 with no audio and a JPEG poster. Give the video 40% of the card width and its full height, extending from the top edge to the bottom edge with cover cropping. The heading stays centered over the text column. Use original source timestamps 0.7–5.5 seconds, played at 40% of original speed for a roughly 12-second loop. Correct the source HDR colors for standard displays and strip camera metadata from the website export. Play silently in a loop inline without controls, and use the poster for reduced-motion preferences. Keep the original MOV outside the deployed site; copy only the web clip and poster during static builds. Keep the separately exported GIF consistent with the same trim and speed.

## Membership terms

The homepage membership heading is “Invest in yourself.” Omit the section subtitle and the fine-print paragraph about annual savings based on standard monthly pricing. Use the confirmed annual price of $494.00; do not charge the former 91 cents.

Show three bullets on each membership card. Monthly: “Month to month,” “Cancel anytime,” and “No enrollment fee.” Annual: “Annually,” “Cancel annually,” and “No enrollment fee.” Annual membership is paid upfront for the year; do not extend the monthly cancellation message to that plan. Annual refund and detailed cancellation requirements remain unspecified. Do not add a separate “No sign-up fee” bullet; the user considers it the same as the enrollment fee.

Monthly flexibility can suit military customers, but the gym does not want to center its positioning or offering on the military audience.

Label annual billing “One annual payment.” Show the comparison amount crossed out in muted gray, followed by the discounted prepaid annual price. Calculate the comparison from 12 monthly payments and use the confirmed prepaid annual price of $494.00, without describing annual billing as monthly installments. Remove the annual description “12 months of access for the price of 9. Paid upfront.” Label the same saving as “25% off (3 months free).” At the currently displayed monthly price of $54.99, this is $659.88 compared with $494.00 per year. Store the actual annual charge separately in integer cents; the user confirmed the gym does not charge the extra 91 cents.

Below the homepage's annual and monthly cards, use the large H2 message “Visit for current specials!” to encourage an in-person visit.

## Equipment

The gym primarily offers free weights and cable equipment, with two squat racks. Cardio equipment consists of one treadmill, one stair stepper, and one cardio bike.

The compact space limits the range of equipment. There is no hack squat machine, and many other specialized machines are not available. Present the actual equipment clearly rather than implying a large machine selection or extensive cardio floor.

## Local competition

The user reports many nearby gyms, including Club Studio across the street, described as a health club with more amenities and an approximate monthly price of $150 versus roughly $50 at Titan. These are discussion estimates, not verified current prices for publication.

This suggests exploring Titan's straightforward gym offering and lower price relative to a premium health club. Actual member reasons for choosing Titan remain unknown. Base public messaging on Titan's experience and offering rather than assumptions about competitors' customers.

The user sees Club Studio's offer as competing for the same audience and believes Titan delivers better results. Comparative results have not been established; use concrete features and approved member experiences to support value messaging.

## Visitor next step

The final homepage callout is for visitors who are still deciding. Use the descriptive green mini title “Visit Titan Gym” and the large white heading “Still deciding?” Split the copy into two short paragraphs: invite visitors to check out the gym and explain that day and week passes can be purchased at the front desk, in person only; then invite calls with questions. Use “Get directions” linking to the map and “Call us” linking directly to the phone number. Add “Sign up” underneath those actions, scrolling back to the homepage membership section. Keep the copy at a readable width. Do not imply passes are free or promise unconfirmed pass-credit terms.

Encouraging an in-person visit is the preferred primary website action. The user reports that in-person visits are better for sales. Emphasize the information needed to visit, including location, hours, and what happens on arrival, while retaining online signup as a secondary path for people ready to join.

“Join Now” on the homepage scrolls immediately to its membership section instead of opening another page or Gymdesk. Header links from other pages lead to that homepage section. The plan cards retain online signup links as a secondary option, and the large specials message below the plans encourages an in-person visit. A booked-visit workflow still requires operational confirmation.

There are no free trial workouts. Paid day and week passes are available, and their cost can be applied toward a membership. Exact prices, credit conditions, and purchase steps remain to be confirmed before publishing the offer.

## First visit

The user estimates that approximately 60% of walk-ins seek information and 40% arrive ready to sign up. These figures describe walk-in intent, not website traffic or conversion rates. What visitors already know, where they learned it, and which questions remain still need research.

Currently, an owner or staff member greets visitors when they arrive and offers a tour. Visitors can walk around and look at the gym.

The proposed improvement is a brief guided introduction: the owner or staff member walks with the visitor, asks about their interests and goals, and shows them the areas relevant to those needs. Given the compact space, its value would be conversation and relevant guidance. This is a service improvement to develop, not an established experience to promise in website copy yet.

## Photography

Many photos are available. Use placeholders during initial design work, then select actual photos to fit the agreed direction. The subjects and coverage of the available collection still need review.

## Member stories and draft content

Members could contribute stories about their experiences. Approved quotes, details, and any associated photos still need to be collected. Clearly marked fictional text may be used to develop the story layout in the meantime.

Place a visible **PLACEHOLDER — REPLACE BEFORE PUBLISHING** label beside each fictional story in the rendered draft. Use a generic identity such as “Example member” so it cannot be mistaken for an actual testimonial. Code comments alone are not sufficient. Replace the fictional text and identity with an approved member story before publishing that section.

## Member voices

**Temporarily disabled:** Hide this entire homepage section and stop loading the Google Maps integration or publishing its API key until application restrictions can be saved reliably. The following describes the retained design for a later restoration.

Show three existing Google review excerpts with reviewer names and dates, a five-star graphic, and a prominent 5.0/5 Google rating. The user confirmed that 5.0 is the current rating, superseding the older 4.9 shown in the captured business website. Link the rating and “Read more on Google” button to Titan Gym's Google Maps listing. Use the existing dark surfaces and green accent. Stack review cards on mobile. Those manually maintained values in `siteData.ts` now serve as the static fallback. With `GOOGLE_MAPS_API_KEY` configured during the build, the homepage lazily loads the Google Maps JavaScript Places library and requests live rating, review count, reviews, and the Google Maps listing URL. Use verified Place ID `ChIJrzXJpY9hJaYR6H4EusAGIEs` from `googleReviewsConfig.ts`, with optional `GOOGLE_MAPS_PLACE_ID` override. A live API check on October 20, 2026 UTC returned a 5.0 rating, 82 reviews, and five attributed review results; fetch current values at runtime rather than hardcoding that count. Show the first three attributed reviews returned by Google, preserving their order and ratings, and do not cache review content. Keep the fallback if the SDK or request fails; show a dismissible error toast above dialogs. Include Google Maps/provider attribution and public privacy/terms pages. Configure website/API restrictions, Maps JavaScript API, Places API (New), and billing in Google Cloud. Local builds read ignored `frontend/.env.local`; GitHub builds read Actions secrets and variables and publish the browser key in generated HTML.

## Hosting

The standalone Website Terms and Privacy Policy pages, their `/terms` and `/privacy` routes, and their footer links are removed.

The project contains only the static website, its build tooling, and active design documents. Original captures, copy research, archived media, conversion tools, and the retired database are preserved in the sibling `../titan-gym-reference/` folder. Use GitHub Pages for hosting and VS Code Live Server for local preview. Pages are generated as HTML with relative links. Contact currently uses email and phone links; membership signup uses Gymdesk. Future website interactions must work within static hosting or use a separately configured external service.

## Decision criteria

Evaluate future choices in copy, imagery, typography, color, and layout against two questions:

- Would a woman who feels out of shape or intimidated feel comfortable taking the next step?
- Would an experienced male lifter recognize this as a gym where he belongs and can train seriously?

## Open decisions

Specific refinements to the current design, messaging, photo selection, and page structure will be developed through subsequent iterations. The color balance, exact quiet hours, proposed guided visit, approved member stories, and prominence of the owners' story on the homepage remain open. Keywords, SEO, and AI SEO are deferred until after this design and copy pass.

Track research gaps and pending decisions in [Unanswered Questions](UNANSWERED_QUESTIONS.md).

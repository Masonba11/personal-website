# Meta ads funnel

The landing pages are built. The experiment is not live until the story video is uploaded and the ads point at these URLs.

## Pages

- Video-first: https://masonball.com/lp/video
- Results-first: https://masonball.com/lp/results
- Thank-you and Instant Form destination: https://masonball.com/lp/thank-you

Use the full URLs with UTM tags in Ads Manager, for example:

`https://masonball.com/lp/video?utm_source=meta&utm_medium=paid&utm_campaign=ppl-offer&utm_content=video-ad`

`https://masonball.com/lp/results?utm_source=meta&utm_medium=paid&utm_campaign=ppl-results&utm_content=results-ad`

The site does not rotate visitors between the two pages. Each ad should link to one URL. A visitor who opens a specific ad stays on that page.

## Add the videos

Edit `lib/videos.ts`.

For a file you host:

1. Put the MP4 in `public/videos/story.mp4`.
2. Set `storyVideo.mp4` to `"/videos/story.mp4"`.
3. Optional captions: add `public/videos/story.en.vtt` and set `captionsVtt`.

For YouTube, set `youtubeId` to the ID only, not the full URL. For Vimeo, set `vimeoId`. Use one source. The thank-you video is `thankYouVideo` in the same file. Until a source is set, the page shows a “Video Coming Soon” panel and the application still works.

Do not start the A/B read until `storyVideo` has a real source. Until then, `/lp/video` and `/lp/results` are different pages, but they are not a fair test of video versus results.

## How to run the test

There is no experimentation tool on this site. Split traffic in Meta, not with a random redirect.

1. Upload the story video and confirm it plays on `/lp/video`.
2. Create two ad sets with the same audience and budget.
3. Send one ad set to `/lp/video` and the other to `/lp/results`.
4. Keep each ad’s link stable. Do not send the same ad to both URLs.
5. Compare qualified applications, not link clicks. The email subject includes an internal fit label. The visitor never sees it.

Suggested budget split for the $100/day plan: keep the Instant Form ad set separate, and split the remaining website traffic evenly between the two URLs only after the video exists.

## Meta Instant Form

Create this form in Meta Ads Manager. It is not a form on the website.

Form type: Higher Intent. Turn on the review step so the person confirms their answers before Meta submits them.

Opening disclosure, placed in the form intro:

“MBall Marketing uses a pay-per-qualified-lead structure. Businesses are responsible for funding their advertising campaigns separately from lead fees.”

Questions:

- Full name
- Business name
- Email
- Phone number
- Business industry
- Average project value
- Monthly advertising budget available
- How many additional leads the business wants

Where Meta offers a website link after submit, use:

`https://masonball.com/lp/thank-you?utm_source=meta&utm_medium=paid&utm_campaign=instant-form`

That page does not say the website received the Instant Form. Meta keeps those leads.

## Where Instant Form leads arrive

This project has no CRM and no Meta Lead Ads webhook. Instant Form submissions stay in Meta.

Follow up from:

- Meta Ads Manager, the leads view for the form
- Meta Business Suite inbox, if lead notifications are turned on
- A CSV download from the form

Do not expect these leads to appear in the website email unless you connect a supported destination later, such as Meta’s lead integration or a CRM. The website application is a separate path and emails masonjball@gmail.com through Web3Forms.

## Tracking that still needs configuration

No Meta Pixel, Conversions API, or GA4 property is installed today. The pages record events in the browser and can forward them when these environment variables are set on Vercel:

- `NEXT_PUBLIC_META_PIXEL_ID`
- `META_PIXEL_ID` (same ID, used by the server)
- `META_CAPI_ACCESS_TOKEN`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`

Events already named in the code:

- `landing_page_view`
- `cta_click`
- `application_started`
- `application_submitted` (button press only, not a lead)
- `application_received` (Meta standard Lead event, only after Web3Forms accepts the application)
- `qualified_application` (internal fit is High Priority or Potential Fit; not shown to the visitor)
- `video_play`
- `video_progress` at 25, 50, 75, and 100 percent for an MP4 or YouTube source

The browser Lead event and the Conversions API Lead event share one event ID. Nothing personal is added to the thank-you page address. Consultation booked and signed client are not tracked because there is no scheduler or CRM.

A verified “we received your application” message appears only when the server sets a short-lived receipt cookie after a successful website submission. Opening `/lp/thank-you` directly does not show that confirmation.

/**
 * Landing-page videos. Leave a source empty until the file exists.
 * To publish the story video, set one source:
 *   mp4: "/videos/story.mp4"
 *   youtubeId: "the-id-only"
 *   vimeoId: "the-id-only"
 * Optional captions: captionsVtt: "/videos/story.en.vtt"
 * Place MP4 and VTT files in public/videos/.
 */
export type LandingVideo = {
  title: string;
  comingSoon: string;
  mp4?: string;
  poster?: string;
  youtubeId?: string;
  vimeoId?: string;
  captionsVtt?: string;
};

export const storyVideo: LandingVideo = {
  title: "My Story & Campaign Results",
  comingSoon: "Video Coming Soon",
};

export const thankYouVideo: LandingVideo = {
  title: "How I Built and Grew My Own Service Businesses",
  comingSoon: "Video Coming Soon",
};

export function videoIsReady(video: LandingVideo) {
  return Boolean(video.mp4 || video.youtubeId || video.vimeoId);
}

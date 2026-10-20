"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/components/landing/track";
import { videoIsReady, type LandingVideo } from "@/lib/videos";

const marks = [25, 50, 75, 100];

function YoutubePlayer({
  videoId,
  title,
  onPlay,
  onProgress,
}: {
  videoId: string;
  title: string;
  onPlay: () => void;
  onProgress: (ratio: number) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const playRef = useRef(onPlay);
  const progressRef = useRef(onProgress);

  useEffect(() => {
    playRef.current = onPlay;
    progressRef.current = onProgress;
  });

  useEffect(() => {
    let timer = 0;
    let player: { destroy?: () => void; getCurrentTime?: () => number; getDuration?: () => number } | null = null;
    const win = window as Window & { YT?: { Player: new (el: HTMLElement, options: object) => typeof player }; onYouTubeIframeAPIReady?: () => void };

    function mount() {
      if (!host.current || !win.YT?.Player) return;
      player = new win.YT.Player(host.current, {
        videoId,
        playerVars: { autoplay: 1, rel: 0, modestbranding: 1 },
        events: {
          onStateChange: (event: { data: number }) => {
            if (event.data === 1) playRef.current();
          },
        },
      });
      timer = window.setInterval(() => {
        const duration = player?.getDuration?.() || 0;
        const current = player?.getCurrentTime?.() || 0;
        if (duration > 0) progressRef.current(current / duration);
      }, 1000);
    }

    if (win.YT?.Player) mount();
    else {
      const previous = win.onYouTubeIframeAPIReady;
      win.onYouTubeIframeAPIReady = () => {
        previous?.();
        mount();
      };
      if (!document.getElementById("yt-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "yt-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    }

    return () => {
      window.clearInterval(timer);
      player?.destroy?.();
    };
  }, [videoId]);

  return <div ref={host} className="aspect-video w-full bg-charcoal" title={title} />;
}

export function VideoSlot({ video, variant }: { video: LandingVideo; variant: string }) {
  const [active, setActive] = useState(false);
  const played = useRef(false);
  const seen = useRef(new Set<number>());
  const ready = videoIsReady(video);

  function markPlay() {
    if (played.current) return;
    played.current = true;
    track("video_play", { variant, video: video.title });
  }

  function markProgress(ratio: number) {
    const percent = Math.floor(ratio * 100);
    for (const mark of marks) {
      if (percent >= mark && !seen.current.has(mark)) {
        seen.current.add(mark);
        track("video_progress", { variant, video: video.title, percent: mark });
      }
    }
  }

  if (!ready || !active) {
    const shell = (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden bg-charcoal px-6 text-center text-paper">
        <div className="pointer-events-none absolute inset-4 border border-gold/40" />
        <p className="font-script text-5xl text-gold">MBall</p>
        {ready ? (
          <span className="mt-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold text-gold" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        ) : (
          <span className="mt-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 text-gold/80" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        )}
        <p className="mt-5 font-serif text-2xl">{video.title}</p>
        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-gold">{ready ? "Play video" : video.comingSoon}</p>
      </div>
    );

    if (!ready) {
      return (
        <div role="img" aria-label={`${video.title}. ${video.comingSoon}.`}>
          {shell}
        </div>
      );
    }

    return (
      <button type="button" className="block w-full text-left" onClick={() => { setActive(true); markPlay(); }}>
        {shell}
        <span className="sr-only">Play {video.title}</span>
      </button>
    );
  }

  if (video.mp4) {
    return (
      <video
        className="aspect-video w-full bg-charcoal"
        controls
        playsInline
        preload="none"
        poster={video.poster}
        autoPlay
        onPlay={markPlay}
        onTimeUpdate={(event) => {
          const element = event.currentTarget;
          if (element.duration) markProgress(element.currentTime / element.duration);
        }}
      >
        <source src={video.mp4} type="video/mp4" />
        {video.captionsVtt ? <track kind="captions" src={video.captionsVtt} srcLang="en" label="English" default /> : null}
      </video>
    );
  }

  if (video.youtubeId) {
    return <YoutubePlayer videoId={video.youtubeId} title={video.title} onPlay={markPlay} onProgress={markProgress} />;
  }

  const vimeo = `https://player.vimeo.com/video/${encodeURIComponent(video.vimeoId || "")}?autoplay=1&dnt=1`;
  return (
    <iframe
      className="aspect-video w-full bg-charcoal"
      src={vimeo}
      title={video.title}
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}

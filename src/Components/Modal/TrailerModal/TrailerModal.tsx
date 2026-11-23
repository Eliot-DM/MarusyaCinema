import { useEffect, useRef, useState, type FC } from "react";
import styles from "./TrailerModal.module.css";

type YTPlayer = {
  setVolume: (volume: number) => void;
  getDuration: () => number;
  getCurrentTime: () => number;
  playVideo: () => void;
  pauseVideo: () => void;
};

type YTPlayerEvent = {
  data: number;
};

type YTNamespace = {
  Player: new (
    elementId: string,
    options: {
      videoId: string;
      playerVars?: { controls?: number; playsinline?: number };
      events?: {
        onReady?: () => void;
        onStateChange?: (event: YTPlayerEvent) => void;
      };
    },
  ) => YTPlayer;
  PlayerState: {
    PLAYING: number;
  };
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

type T = {
  videoUrl?: string;
  videoId: string;
  name: string;
  onClick: () => void;
};

export const TrailerModal: FC<T> = ({ videoId, name, onClick }) => {
  const playerRef = useRef<YTPlayer | null>(null);
  const seekRef = useRef<HTMLInputElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [duration, setDuration] = useState(0);
  const [, setCurrentTime] = useState(0);
  const [volume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    if (!window.YT) {
      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const initPlayer = () => {
    if (!window.YT) return;

    playerRef.current = new window.YT.Player("yt-player", {
      videoId,
      playerVars: { controls: 0, playsinline: 1 },
      events: {
        onReady: onPlayerReady,
        onStateChange: (e) => {
          setIsPlaying(e.data === window.YT?.PlayerState.PLAYING);
        },
      },
    });
  };

  const onPlayerReady = () => {
    playerRef.current?.setVolume(volume);
    setDuration(playerRef.current?.getDuration() ?? 0);
    setIsPlayerReady(true);

    intervalRef.current = setInterval(() => {
      const current = playerRef.current?.getCurrentTime() ?? 0;
      setCurrentTime(current);
      if (seekRef.current && duration > 0) {
        seekRef.current.value = ((current / duration) * 100).toString();
      }
    }, 1000);
  };

  return (
    <div className={styles.trailerModal} onClick={onClick}>
      <div onClick={(e) => e.stopPropagation()}>
        <div style={{ position: "relative" }}>
          <div className={styles.player} id="yt-player" />

          {!isPlaying && isPlayerReady && (
            <div className={styles.text}>{name}</div>
          )}

          <button className={styles.button} onClick={onClick}></button>
        </div>
      </div>
    </div>
  );
};

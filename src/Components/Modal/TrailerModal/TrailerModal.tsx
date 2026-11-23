import { useEffect, useRef, useState, type FC } from "react";
import styles from "./TrailerModal.module.css";

type T = {
  videoUrl?: string;
  videoId: string;
  name: string;
  onClick: () => void;
};

export const TrailerModal: FC<T> = ({ videoUrl, videoId, name, onClick }) => {
  const playerRef = useRef<any>(null);
  const seekRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50);
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
    playerRef.current = new window.YT.Player("yt-player", {
      videoId: videoId,

      playerVars: { controls: 0, playsinline: 1 },
      events: {
        onReady: onPlayerReady,
        onStateChange: (e) => {
          setIsPlaying(e.data === window.YT.PlayerState.PLAYING);
        },
      },
    });
  };

  const onPlayerReady = () => {
    playerRef.current.setVolume(volume);
    setDuration(playerRef.current.getDuration());
    setIsPlayerReady(true);

    intervalRef.current = setInterval(() => {
      const current = playerRef.current.getCurrentTime();
      setCurrentTime(current);
      if (seekRef.current && duration > 0) {
        seekRef.current.value = ((current / duration) * 100).toString();
      }
    }, 1000);
  };

  const togglePlayback = () => {
    if (!isPlayerReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };
  return (
    <div className={styles.trailerModal} onClick={onClick}>
      <div onClick={(e) => e.stopPropagation()}>
        <div style={{ position: "relative" }}>
          <div className={styles.player} id="yt-player" />

          {!isPlaying && isPlayerReady && (
            <div className={styles.text}>{name}</div>
          )}

          {/* {isPlayerReady && (
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              <span className={styles.time}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          )} */}
          <button className={styles.button} onClick={onClick}></button>
        </div>
      </div>
    </div>
  );
};

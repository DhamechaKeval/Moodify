import React, { useState, useRef, useEffect } from "react";
import "../style/player.scss";
import { useSong } from "../hooks/useSong";

const Player = () => {
  const { song } = useSong();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime - 5,
      );
    }
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        duration,
        audioRef.current.currentTime + 5,
      );
    }
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="player-container">
      <audio ref={audioRef} src={song?.url} crossOrigin="anonymous" />

      <div className="player-content">
        {/* Poster/Album Art */}
        <div className="player-poster">
          <img
            src={song?.posterUrl}
            alt={song?.title || "Album Art"}
            className={isPlaying ? "playing" : ""}
          />
        </div>

        {/* Song Info */}
        <div className="player-info">
          <h2 className="song-title">{song?.title || "No song selected"}</h2>
          <p className="song-mood">Mood: {song?.mood || "N/A"}</p>
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <span className="time-display">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="progress-bar"
            min="0"
            max="100"
            value={progressPercent}
            onChange={handleProgressChange}
          />
          <span className="time-display">{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="controls-section">
          <div className="main-controls">
            <button className="control-btn" title="Previous">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 6h2v12H6V6zm3.5 6L17 4v16L9.5 12z" />
              </svg>
            </button>

            <button
              className="control-btn backward-btn"
              onClick={handleBackward}
              title="Backward 5s"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6 0 1.23-.38 2.38-1.03 3.34l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.23.38-2.38 1.03-3.34L4.56 7.2C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v4l5-5-5-5v4z" />
              </svg>
              <span>-5s</span>
            </button>

            <button
              className="control-btn play-btn"
              onClick={togglePlay}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button
              className="control-btn forward-btn"
              onClick={handleForward}
              title="Forward 5s"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6 0 1.23.38 2.38 1.03 3.34l-1.46 1.46C4.46 15.03 4 13.57 4 12c0-4.42 3.58-8 8-8zm0 14c3.31 0 6-2.69 6-6 0-1.23-.38-2.38-1.03-3.34l1.46-1.46C19.54 8.97 20 10.43 20 12c0 4.42-3.58 8-8 8v4l-5-5 5-5v4z" />
              </svg>
              <span>+5s</span>
            </button>

            <button className="control-btn" title="Next">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16 18h2V6h-2v12zM2 12l8 8V4l-8 8z" />
              </svg>
            </button>
          </div>

          {/* Speed and Volume Controls */}
          <div className="secondary-controls">
            <div className="speed-control">
              <button
                className={`speed-btn ${showSpeedMenu ? "active" : ""}`}
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              >
                {playbackRate}x
              </button>
              {showSpeedMenu && (
                <div className="speed-menu">
                  {speedOptions.map((speed) => (
                    <button
                      key={speed}
                      className={`speed-option ${playbackRate === speed ? "selected" : ""}`}
                      onClick={() => {
                        setPlaybackRate(speed);
                        setShowSpeedMenu(false);
                      }}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="volume-control">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
              <input
                type="range"
                className="volume-slider"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
              />
              <span className="volume-percent">{volume}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;

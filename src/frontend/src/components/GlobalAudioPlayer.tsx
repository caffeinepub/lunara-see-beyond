import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Heart,
  ListPlus,
  Music,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { type Track, useAudioPlayer } from "../contexts/AudioContext";

function parseDurationToSeconds(duration: string): number {
  const parts = duration.split(":");
  if (parts.length !== 2) return 180;
  return Number.parseInt(parts[0], 10) * 60 + Number.parseInt(parts[1], 10);
}

function formatSeconds(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

let ytApiLoaded = false;
function loadYouTubeAPI() {
  if (ytApiLoaded) return;
  ytApiLoaded = true;
  if (!(window as any).YT || !(window as any).YT.Player) {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }
}

function PlaylistDropdown({
  track,
  onClose,
}: { track: Track; onClose: () => void }) {
  const { playlists, createPlaylist, addToPlaylist } = useAudioPlayer();
  const [newName, setNewName] = useState("");
  const [showNew, setShowNew] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute bottom-full right-0 mb-2 w-52 glass-card rounded-2xl border border-white/15 shadow-2xl overflow-hidden z-50"
    >
      <div className="p-2">
        <p className="text-xs text-white/50 px-2 py-1 font-medium">
          Add to playlist
        </p>
        {playlists.length === 0 && !showNew && (
          <p className="text-xs text-white/30 px-2 py-1">No playlists yet</p>
        )}
        {playlists.map((pl) => (
          <button
            key={pl.name}
            type="button"
            className="w-full text-left px-3 py-2 rounded-xl text-sm text-foreground hover:bg-white/10 transition-colors truncate"
            onClick={() => {
              addToPlaylist(pl.name, track);
              onClose();
            }}
          >
            {pl.name}
          </button>
        ))}
        {showNew ? (
          <div className="flex gap-2 px-2 py-1">
            <input
              type="text"
              className="flex-1 rounded-lg bg-white/10 border border-white/20 px-2 py-1 text-xs text-foreground placeholder-white/40 outline-none focus:border-accent/60"
              placeholder="Name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newName.trim()) {
                  createPlaylist(newName.trim());
                  addToPlaylist(newName.trim(), track);
                  setNewName("");
                  setShowNew(false);
                  onClose();
                }
              }}
            />
            <button
              type="button"
              className="text-accent text-xs font-semibold"
              onClick={() => {
                if (newName.trim()) {
                  createPlaylist(newName.trim());
                  addToPlaylist(newName.trim(), track);
                  setNewName("");
                  setShowNew(false);
                  onClose();
                }
              }}
            >
              Add
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="w-full text-left px-3 py-2 rounded-xl text-sm text-accent hover:bg-white/10 transition-colors"
            onClick={() => setShowNew(true)}
          >
            + New Playlist
          </button>
        )}
      </div>
    </div>
  );
}

function Player({ track }: { track: Track }) {
  const {
    setNowPlaying,
    isFavorite,
    toggleFavorite,
    skipToNext,
    skipToPrevious,
  } = useAudioPlayer();
  const [playing, setPlaying] = useState(true);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [effectiveDuration, setEffectiveDuration] = useState(() =>
    parseDurationToSeconds(track.duration),
  );
  const [volume, setVolume] = useState(75);
  const [ytReady, setYtReady] = useState(
    () => !!(window as any).YT && !!(window as any).YT.Player,
  );
  const [unavailable, setUnavailable] = useState(false);
  const [showPlaylistDropdown, setShowPlaylistDropdown] = useState(false);
  const ytPlayerRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerContainerId = useRef(
    `yt-player-${Math.random().toString(36).substr(2, 9)}`,
  ).current;

  useEffect(() => {
    loadYouTubeAPI();
    const prev = (window as any).onYouTubeIframeAPIReady;
    (window as any).onYouTubeIframeAPIReady = () => {
      setYtReady(true);
      if (prev) prev();
    };
    const poll = setInterval(() => {
      if ((window as any).YT?.Player) {
        setYtReady(true);
        clearInterval(poll);
      }
    }, 200);
    return () => clearInterval(poll);
  }, []);

  const trackKey = `${track.title}::${track.artist}::${track.youtubeId ?? track.audioSrc ?? ""}`;

  // biome-ignore lint/correctness/useExhaustiveDependencies: trackKey + ytReady are the deps
  useEffect(() => {
    if (!track.youtubeId) return;
    if (!ytReady) return;
    setCurrentSeconds(0);
    setEffectiveDuration(parseDurationToSeconds(track.duration));
    setPlaying(true);
    setUnavailable(false);
    if (
      ytPlayerRef.current &&
      typeof ytPlayerRef.current.loadVideoById === "function"
    ) {
      try {
        ytPlayerRef.current.loadVideoById(track.youtubeId);
        ytPlayerRef.current.setVolume(volume);
      } catch {}
    } else {
      try {
        ytPlayerRef.current?.destroy();
      } catch {}
      ytPlayerRef.current = new (window as any).YT.Player(playerContainerId, {
        videoId: track.youtubeId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          rel: 0,
          modestbranding: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (e: any) => {
            try {
              e.target.setVolume(volume);
              e.target.playVideo();
            } catch {}
          },
          onError: () => {
            setUnavailable(true);
          },
        },
      });
    }
  }, [trackKey, ytReady]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: trackKey is the dep
  useEffect(() => {
    if (track.youtubeId) return;
    setCurrentSeconds(0);
    setPlaying(true);
    if (audioRef.current && track.audioSrc) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, [trackKey]);

  useEffect(() => {
    if (!ytPlayerRef.current || !track.youtubeId) return;
    try {
      if (playing) ytPlayerRef.current.playVideo();
      else ytPlayerRef.current.pauseVideo();
    } catch {}
  }, [playing, track.youtubeId]);

  useEffect(() => {
    if (!audioRef.current || track.youtubeId) return;
    if (playing) audioRef.current.play().catch(() => {});
    else audioRef.current.pause();
  }, [playing, track.youtubeId]);

  useEffect(() => {
    try {
      ytPlayerRef.current?.setVolume(volume);
    } catch {}
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    if (!track.youtubeId) return;
    const interval = setInterval(() => {
      if (!ytPlayerRef.current) return;
      try {
        const cur = ytPlayerRef.current.getCurrentTime?.() ?? 0;
        const dur = ytPlayerRef.current.getDuration?.() ?? 0;
        setCurrentSeconds(Math.floor(cur));
        if (dur > 0) setEffectiveDuration(Math.floor(dur));
      } catch {}
    }, 500);
    return () => clearInterval(interval);
  }, [track.youtubeId]);

  const handleTimeUpdate = () => {
    if (audioRef.current)
      setCurrentSeconds(Math.floor(audioRef.current.currentTime));
  };
  const handleLoadedMetadata = () => {
    if (audioRef.current)
      setEffectiveDuration(Math.floor(audioRef.current.duration));
  };
  const handleEnded = () => {
    setPlaying(false);
    setCurrentSeconds(0);
  };

  const progress =
    effectiveDuration > 0 ? (currentSeconds / effectiveDuration) * 100 : 0;

  const handleTouchSeek = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0] || e.changedTouches[0];
    if (!touch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(
      0,
      Math.min(1, (touch.clientX - rect.left) / rect.width),
    );
    const seekTo = ratio * effectiveDuration;
    setCurrentSeconds(Math.floor(seekTo));
    if (track.youtubeId) {
      try {
        ytPlayerRef.current?.seekTo(seekTo, true);
      } catch {}
    } else if (audioRef.current) {
      audioRef.current.currentTime = seekTo;
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const seekTo = ratio * effectiveDuration;
    setCurrentSeconds(Math.floor(seekTo));
    if (track.youtubeId) {
      try {
        ytPlayerRef.current?.seekTo(seekTo, true);
      } catch {}
    } else if (audioRef.current) {
      audioRef.current.currentTime = seekTo;
    }
  };

  const fav = isFavorite(track);

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-40 glass-card px-4 py-3"
    >
      {track.youtubeId && (
        <div
          id={playerContainerId}
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            opacity: 0,
            pointerEvents: "none",
            overflow: "hidden",
            top: 0,
            left: 0,
          }}
        />
      )}
      {track.audioSrc && !track.youtubeId && (
        <audio
          ref={audioRef}
          src={track.audioSrc}
          autoPlay
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          aria-label={track.title}
          style={{ display: "none" }}
        >
          <track default kind="captions" srcLang="en" src="" label="English" />
        </audio>
      )}
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* Track info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-full gradient-soundscape flex items-center justify-center shrink-0">
            <Music className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-sm truncate">
              {track.title}
            </p>
            <p className="text-white/50 text-xs truncate">{track.artist}</p>
          </div>
          {unavailable && (
            <span className="text-xs text-red-400 ml-2 shrink-0">
              Unavailable
            </span>
          )}
          {/* Favorite button */}
          <button
            type="button"
            onClick={() => toggleFavorite(track)}
            className={`transition-colors ml-2 shrink-0 ${
              fav
                ? "text-red-400 hover:text-red-300"
                : "text-white/50 hover:text-red-400"
            }`}
            data-ocid="player.favorite_button"
          >
            <Heart className={`w-4 h-4 ${fav ? "fill-current" : ""}`} />
          </button>
          {/* Playlist button */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setShowPlaylistDropdown((v) => !v)}
              className="text-white/50 hover:text-accent transition-colors"
              data-ocid="player.add_to_playlist_button"
            >
              <ListPlus className="w-4 h-4" />
            </button>
            {showPlaylistDropdown && (
              <PlaylistDropdown
                track={track}
                onClose={() => setShowPlaylistDropdown(false)}
              />
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={skipToPrevious}
              className="text-white/50 hover:text-foreground transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-accent-foreground hover:bg-accent/80 transition-colors"
              data-ocid="player.toggle"
            >
              {playing ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>
            <button
              type="button"
              onClick={skipToNext}
              className="text-white/50 hover:text-foreground transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 w-56">
            <span className="text-xs text-white/50 w-8">
              {formatSeconds(currentSeconds)}
            </span>
            <div
              className="flex-1 h-1.5 bg-white/20 rounded-full cursor-pointer relative overflow-hidden"
              onClick={handleSeek}
              onTouchStart={handleTouchSeek}
              onKeyDown={() => {}}
              role="slider"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              tabIndex={0}
            >
              <div
                className="absolute left-0 top-0 h-full bg-accent rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-white/50 w-8">
              {formatSeconds(effectiveDuration)}
            </span>
          </div>
        </div>

        {/* Volume + close */}
        <div className="flex items-center gap-2 justify-end">
          <div className="hidden md:flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-white/50" />
            <Slider
              value={[volume]}
              onValueChange={(v) => setVolume(v[0])}
              max={100}
              className="w-24"
            />
          </div>
          <button
            type="button"
            onClick={() => setNowPlaying(null)}
            className="ml-1 md:ml-3 text-white/50 hover:text-foreground text-xs w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
            data-ocid="player.close_button"
          >
            ✕
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function GlobalAudioPlayer() {
  const { nowPlaying } = useAudioPlayer();
  return (
    <AnimatePresence>
      {nowPlaying && (
        <Player key={nowPlaying.title + nowPlaying.artist} track={nowPlaying} />
      )}
    </AnimatePresence>
  );
}

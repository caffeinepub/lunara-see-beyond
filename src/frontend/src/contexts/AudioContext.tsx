import { createContext, useContext, useState } from "react";

export type Track = {
  title: string;
  artist: string;
  duration: string;
  spotifyUrl?: string;
  audioSrc?: string;
  youtubeId?: string;
};

type Playlist = { name: string; tracks: Track[] };

type AudioContextType = {
  nowPlaying: Track | null;
  setNowPlaying: (track: Track | null) => void;
  currentQueue: Track[];
  setCurrentQueue: (tracks: Track[]) => void;
  skipToNext: () => void;
  skipToPrevious: () => void;
  favorites: Track[];
  toggleFavorite: (track: Track) => void;
  isFavorite: (track: Track) => boolean;
  playlists: Playlist[];
  createPlaylist: (name: string) => void;
  addToPlaylist: (playlistName: string, track: Track) => void;
  removeFromPlaylist: (playlistName: string, trackTitle: string) => void;
};

const AudioCtx = createContext<AudioContextType | null>(null);

function loadFavorites(): Track[] {
  try {
    return JSON.parse(localStorage.getItem("lunara_favorites") || "[]");
  } catch {
    return [];
  }
}

function loadPlaylists(): Playlist[] {
  try {
    return JSON.parse(localStorage.getItem("lunara_playlists") || "[]");
  } catch {
    return [];
  }
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [nowPlaying, setNowPlaying] = useState<Track | null>(null);
  const [currentQueue, setCurrentQueue] = useState<Track[]>([]);
  const [favorites, setFavorites] = useState<Track[]>(loadFavorites);
  const [playlists, setPlaylists] = useState<Playlist[]>(loadPlaylists);

  const skipToNext = () => {
    if (!nowPlaying || currentQueue.length === 0) return;
    const idx = currentQueue.findIndex(
      (t) => t.title === nowPlaying.title && t.artist === nowPlaying.artist,
    );
    const next = currentQueue[(idx + 1) % currentQueue.length];
    if (next) setNowPlaying(next);
  };

  const skipToPrevious = () => {
    if (!nowPlaying || currentQueue.length === 0) return;
    const idx = currentQueue.findIndex(
      (t) => t.title === nowPlaying.title && t.artist === nowPlaying.artist,
    );
    const prev =
      currentQueue[(idx - 1 + currentQueue.length) % currentQueue.length];
    if (prev) setNowPlaying(prev);
  };

  const toggleFavorite = (track: Track) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (f) => f.title === track.title && f.artist === track.artist,
      );
      const updated = exists
        ? prev.filter(
            (f) => !(f.title === track.title && f.artist === track.artist),
          )
        : [...prev, track];
      localStorage.setItem("lunara_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (track: Track) =>
    favorites.some((f) => f.title === track.title && f.artist === track.artist);

  const createPlaylist = (name: string) => {
    setPlaylists((prev) => {
      if (prev.some((p) => p.name === name)) return prev;
      const updated = [...prev, { name, tracks: [] }];
      localStorage.setItem("lunara_playlists", JSON.stringify(updated));
      return updated;
    });
  };

  const addToPlaylist = (playlistName: string, track: Track) => {
    setPlaylists((prev) => {
      const updated = prev.map((p) => {
        if (p.name !== playlistName) return p;
        if (
          p.tracks.some(
            (t) => t.title === track.title && t.artist === track.artist,
          )
        )
          return p;
        return { ...p, tracks: [...p.tracks, track] };
      });
      localStorage.setItem("lunara_playlists", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromPlaylist = (playlistName: string, trackTitle: string) => {
    setPlaylists((prev) => {
      const updated = prev.map((p) =>
        p.name !== playlistName
          ? p
          : { ...p, tracks: p.tracks.filter((t) => t.title !== trackTitle) },
      );
      localStorage.setItem("lunara_playlists", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AudioCtx.Provider
      value={{
        nowPlaying,
        setNowPlaying,
        currentQueue,
        setCurrentQueue,
        skipToNext,
        skipToPrevious,
        favorites,
        toggleFavorite,
        isFavorite,
        playlists,
        createPlaylist,
        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudioPlayer(): AudioContextType {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudioPlayer must be used within AudioProvider");
  return ctx;
}

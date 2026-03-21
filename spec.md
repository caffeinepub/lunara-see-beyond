# Lunara: See Beyond

## Current State
Soundscape.tsx has artists with tracks defined, but most tracks have no `audioSrc` and only a handful have `youtubeId`. The AudioPlayer renders a `<audio>` element only when `audioSrc` is set (never for featured tracks), or a YouTube iframe when `youtubeId` is set (but the timer/controls don't connect to the iframe). Result: almost no audio ever plays.

## Requested Changes (Diff)

### Add
- `youtubeId` values for all tracks across all artists (Tame Impala, Drake, Pink Floyd, Michael Jackson, Au5, Sabrina Carpenter, Dua Lipa, Sheryl Crow, Tate McRae)
- Sheryl Crow artist with full track list and youtubeIds (she appears in leaderboard data but had no tracks)
- More popular artists with tracks and youtubeIds
- YouTube IFrame Player API integration in AudioPlayer so play/pause, seek, volume, and timer all work via the iframe

### Modify
- AudioPlayer component: replace bare iframe embed with YouTube IFrame Player API (YT.Player) for full control (play, pause, seek, volume, duration, currentTime)
- Community Playlist playback: look up matching track from artist arrays to forward its youtubeId
- Controls visibility: always show controls (play/pause, progress, volume) regardless of youtubeId presence

### Remove
- "Preview not available" state for tracks (all tracks will have youtubeId)
- Dependency on `audioSrc` for featured artist tracks

## Implementation Plan
1. Integrate YouTube IFrame Player API via a script tag (load once globally)
2. Rewrite AudioPlayer to use `YT.Player` instance: initialize on mount, call playVideo/pauseVideo/seekTo/setVolume, read currentTime/duration via getters for the progress timer
3. Add youtubeId to every track in all artist arrays
4. Add Sheryl Crow artist section with tracks and youtubeIds
5. Add more artists (e.g. The Weeknd, Billie Eilish, Ed Sheeran, Taylor Swift, Coldplay, Ariana Grande) with tracks and youtubeIds
6. Fix community playlist playTrack() to include youtubeId lookup

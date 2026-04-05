# Lunara: See Beyond — Mobile & Bug Fix Pass

## Current State
The app is a fully-featured sci-fi community platform with 7 zones, LunaChat, Soundscape, Arcade, Marketplace, and more. The desktop layout works well. However, a comprehensive audit has revealed critical mobile layout breakages, inaccessible UI elements on mobile, and several logic/data bugs.

## Requested Changes (Diff)

### Add
- LunaChat mobile-responsive layout: on narrow screens, show only sidebar OR chat panel (toggle between them with a back button), never both at once
- Calls tab button in LunaChat sidebar (the calls panel exists but has no tab button)
- Close/dismiss button for the GlobalAudioPlayer that is always visible on mobile (not hidden)
- Touch-based seek on GlobalAudioPlayer (onTouchStart/onTouchMove handlers)
- Working skip-back and skip-forward buttons in GlobalAudioPlayer (wire to AudioContext)
- Footer: add missing links for Aloxide, MoonMart, LunaChat
- DevDen hero buttons: add flex-wrap so they don't overflow on narrow screens

### Modify
- LunaChat sidebar: fix from fixed `w-72` to responsive (`w-full md:w-72`) with mobile panel toggle logic
- GlobalAudioPlayer: move close button outside the `hidden md:flex` div so it shows on mobile
- Header.tsx: fix invalid Tailwind class `border-white/08` → `border-white/[0.08]` and `hover:bg-white/08` → `hover:bg-white/[0.08]`
- SettingsModal tabs: increase touch target height with `py-3` instead of `py-2` to meet 44px minimum
- About.tsx timeline: make alternating `flex-row`/`flex-row-reverse` collapse to `flex-col` on mobile (all cards same side)
- LunarArcadia car racing canvas: add `style={{ maxWidth: '100%' }}` and wrap in overflow-hidden container
- Soundscape: remove Tate McRae `'94` track (no youtubeId, unplayable)
- LunarArcadia global leaderboard: remove hardcoded fake users, show empty state "Be the first on the leaderboard" if no real data
- Artistic.tsx: remove fallbackPoems — show "Be the first to upload" if no real poems exist
- index.css: fix nuclear light-mode CSS override to not break intentionally white text in dark-gradient hero sections; ensure `.dark-section` covers all gradient hero sections or use a more surgical approach
- Marketplace: persist listings to localStorage so they survive page refresh
- WildGang & DevDen: persist chat messages to localStorage so they survive refresh (with reasonable max of 100 messages per room)
- SettingsModal: replace `useState` ref pattern with proper `useRef` for avatarInputRef
- LunaChat: scope chat data per logged-in user (key by username in localStorage)
- LunaChat message input max-height calc: account for GlobalAudioPlayer bar height (add 80px to offset)
- Mobile nav/general: ensure all interactive elements have min 44px touch targets
- Search overlay: hide `Ctrl+K` hint text on mobile (use `hidden md:inline`)
- GlobalAudioPlayer progress bar: respond to touch events for seeking on mobile

### Remove
- Fake hardcoded global leaderboard entries in LunarArcadia (`GLOBAL_ARCADE_DATA` fake users)
- `fallbackPoems` in Artistic.tsx (fake community content)
- Fake `'94` track from Soundscape (no playable source)

## Implementation Plan

1. **LunaChat mobile layout**: Add `showSidebar` state (default true on mobile, show chat panel when user selects a conversation, back button returns to sidebar). On `md+`, always show both panels.
2. **LunaChat calls tab**: Add a Calls tab button alongside Messages and Members in the sidebar tab bar.
3. **LunaChat data scoping**: Key `lunara_chats` storage by current user's username.
4. **LunaChat message area height**: Fix calc to `calc(100vh - 360px)` to account for global player.
5. **GlobalAudioPlayer**: Move close button before the `hidden md:flex` div. Add touch event handlers for seek. Wire SkipBack/SkipForward to load prev/next track in AudioContext.
6. **Header.tsx**: Fix `border-white/08` → `border-white/[0.08]` and `hover:bg-white/08` → `hover:bg-white/[0.08]`.
7. **SettingsModal**: Fix `avatarInputRef` to use `useRef`. Increase tab button height.
8. **Footer**: Add Aloxide, MoonMart, LunaChat links.
9. **About.tsx timeline**: Add `flex-col md:flex-row` and `md:flex-row-reverse` so mobile always shows cards in a single left-aligned column.
10. **LunarArcadia**: Wrap racing canvas in `overflow-x-auto` or set `max-w-full`. Remove fake global leaderboard entries.
11. **Soundscape**: Remove `'94` track.
12. **Artistic.tsx**: Remove `fallbackPoems`, show empty state.
13. **Marketplace**: Save/load listings from localStorage.
14. **WildGang & DevDen**: Save/load chat messages from localStorage (last 100 per room).
15. **index.css**: Refine light-mode overrides to not break dark-gradient hero sections.
16. **DevDen hero buttons**: Add `flex-wrap` to hero button row.
17. **Search overlay**: Hide keyboard hints on mobile.

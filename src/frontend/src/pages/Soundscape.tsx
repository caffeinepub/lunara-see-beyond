import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowRight,
  Bot,
  ExternalLink,
  Headphones,
  Heart,
  Link2,
  Mic2,
  Music,
  Pause,
  Play,
  RotateCcw,
  Send,
  SkipBack,
  SkipForward,
  Star,
  Trophy,
  Users,
  Volume2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Track = {
  title: string;
  artist: string;
  duration: string;
  spotifyUrl?: string;
  audioSrc?: string;
  youtubeId?: string;
};

const tameImpalaTracks: Track[] = [
  {
    title: "Let It Happen",
    artist: "Tame Impala",
    duration: "7:47",
    spotifyUrl: "https://open.spotify.com/track/6gHjZKhxbdBjnEsNbPKoRG",
    youtubeId: "pSfzBNOOn7I",
  },
  {
    title: "The Less I Know the Better",
    artist: "Tame Impala",
    duration: "3:36",
    spotifyUrl: "https://open.spotify.com/track/6K4t31amVTZDgR3sKmwUJJ",
    youtubeId: "2SUwOgmvzK4",
  },
  {
    title: "Feels Like We Only Go Backwards",
    artist: "Tame Impala",
    duration: "3:13",
    spotifyUrl: "https://open.spotify.com/track/1oMOsHKT1YAGZvqBouBMWq",
    youtubeId: "3ONBbQbBSFc",
  },
  {
    title: "Eventually",
    artist: "Tame Impala",
    duration: "5:18",
    spotifyUrl: "https://open.spotify.com/track/2RlgNHKcydI9sayD2Df2xp",
  },
  {
    title: "New Person, Same Old Mistakes",
    artist: "Tame Impala",
    duration: "6:03",
    spotifyUrl: "https://open.spotify.com/track/6wH8bsFJSEaWpSFoFnWFLP",
  },
  {
    title: "Elephant",
    artist: "Tame Impala",
    duration: "3:31",
    spotifyUrl: "https://open.spotify.com/track/4HLznoFMRFOoE0UuARQSoC",
  },
  {
    title: "Lost In Yesterday",
    artist: "Tame Impala",
    duration: "3:43",
    spotifyUrl: "https://open.spotify.com/track/5JCoSi02qi3jJeHdZXMmR8",
  },
  {
    title: "Breathe Deeper",
    artist: "Tame Impala",
    duration: "5:47",
    spotifyUrl: "https://open.spotify.com/track/7fNHUboAlsyoXfXnOb3Ro7",
  },
  {
    title: "Is It True",
    artist: "Tame Impala",
    duration: "3:45",
    spotifyUrl: "https://open.spotify.com/track/3OwdyOsJPkEkqlSEz87BFh",
  },
  {
    title: "It Might Be Time",
    artist: "Tame Impala",
    duration: "4:16",
    spotifyUrl: "https://open.spotify.com/track/0lSWGMzaLi4bBIJTgPrq5u",
  },
  {
    title: "Borderline",
    artist: "Tame Impala",
    duration: "3:53",
    spotifyUrl: "https://open.spotify.com/track/3Xc3TCo2tQFjFBFaqFE7V3",
  },
  {
    title: "On Track",
    artist: "Tame Impala",
    duration: "4:13",
    spotifyUrl: "https://open.spotify.com/track/6h4X5BaIgzrFRLJIzO3h5m",
  },
  {
    title: "One More Year",
    artist: "Tame Impala",
    duration: "4:26",
    spotifyUrl: "https://open.spotify.com/track/4vBzXxlEjXXZt5w6a4r4q5",
  },
  {
    title: "Posthumous Forgiveness",
    artist: "Tame Impala",
    duration: "5:21",
    spotifyUrl: "https://open.spotify.com/track/4nCGhvh4YFpFLNHTHBiLTr",
  },
  {
    title: "Patience",
    artist: "Tame Impala",
    duration: "5:10",
    spotifyUrl: "https://open.spotify.com/track/2BTZIqlo8icHNmBtJPmPeP",
  },
  {
    title: "Apocalypse Dreams",
    artist: "Tame Impala",
    duration: "5:67",
    spotifyUrl: "https://open.spotify.com/track/5nAFGiKFqpJn7bKoqZhBGT",
  },
  {
    title: "Mind Mischief",
    artist: "Tame Impala",
    duration: "4:53",
    spotifyUrl: "https://open.spotify.com/track/3UMLQzSFiRZeJcmRg2cyFQ",
  },
  {
    title: "Why Won't They Talk to Me?",
    artist: "Tame Impala",
    duration: "3:59",
    spotifyUrl: "https://open.spotify.com/track/4vl9fkDpIzAqb96NxhXMGJ",
  },
  {
    title: "Music to Walk Home By",
    artist: "Tame Impala",
    duration: "4:57",
    spotifyUrl: "https://open.spotify.com/track/3loPWrKHXKCdGWnYnpTJhp",
  },
  {
    title: "Keep On Lying",
    artist: "Tame Impala",
    duration: "6:43",
    spotifyUrl: "https://open.spotify.com/track/5mEHRCdYsJgjXuN2mJMfRg",
  },
  {
    title: "Endors Toi",
    artist: "Tame Impala",
    duration: "4:07",
    spotifyUrl: "https://open.spotify.com/track/5O2LNZW4CJlBxHiU0iFuKe",
  },
  {
    title: "Solitude Is Bliss",
    artist: "Tame Impala",
    duration: "4:05",
    spotifyUrl: "https://open.spotify.com/track/0vAUZFrPoiN4CZ4PNmaSij",
  },
  {
    title: "Be Above It",
    artist: "Tame Impala",
    duration: "3:30",
    spotifyUrl: "https://open.spotify.com/track/1L5qKrHt4g6HkAaW8FQLEW",
  },
  {
    title: "Lucidity",
    artist: "Tame Impala",
    duration: "4:48",
    spotifyUrl: "https://open.spotify.com/track/0YnUzD1H31E4LPIPiCsKY3",
  },
  {
    title: "Half Full Glass of Wine",
    artist: "Tame Impala",
    duration: "3:24",
    spotifyUrl: "https://open.spotify.com/track/4c0Ku4sSwdNj2Vc5R4DPQB",
  },
  {
    title: "Yes I'm Changing",
    artist: "Tame Impala",
    duration: "4:24",
    spotifyUrl: "https://open.spotify.com/track/2gNfxysfBRfl9Lvi9T3v6R",
  },
  {
    title: "Past Life",
    artist: "Tame Impala",
    duration: "3:47",
    spotifyUrl: "https://open.spotify.com/track/7JChKX9BbLx3gGaGFBzf9s",
  },
  {
    title: "Reality in Motion",
    artist: "Tame Impala",
    duration: "4:12",
    spotifyUrl: "https://open.spotify.com/track/6jtFCFyX0gVQbGQNvbAIqt",
  },
  {
    title: "The Moment",
    artist: "Tame Impala",
    duration: "4:00",
    spotifyUrl: "https://open.spotify.com/track/0Eo7ggUgNJQLCpb4O8o1B4",
  },
  {
    title: "Love / Paranoia",
    artist: "Tame Impala",
    duration: "2:57",
    spotifyUrl: "https://open.spotify.com/track/2sMvkALFzE1JidKgCJxXkk",
  },
  {
    title: "'Cause I'm a Man",
    artist: "Tame Impala",
    duration: "3:33",
    spotifyUrl: "https://open.spotify.com/track/6XVz1VJxKuIqbR9i1xzLGS",
  },
  {
    title: "Gossip",
    artist: "Tame Impala",
    duration: "3:44",
    spotifyUrl: "https://open.spotify.com/track/1j3hLlEIUUVvwBl1FZ8rFQ",
  },
  {
    title: "No Choice",
    artist: "Tame Impala",
    duration: "3:20",
    spotifyUrl: "https://open.spotify.com/track/6gV0uFJSh9qJmAvlMPG6O3",
  },
  {
    title: "Alter Ego",
    artist: "Tame Impala",
    duration: "4:50",
    spotifyUrl: "https://open.spotify.com/track/5ZgfvEpvNRhSz5OkbqcDmv",
  },
  {
    title: "Runway, Houses, City, Clouds",
    artist: "Tame Impala",
    duration: "5:31",
    spotifyUrl: "https://open.spotify.com/track/1AuGfJkuLBgrdIi8y5R3kk",
  },
  {
    title: "Nothing That Has Happened So Far",
    artist: "Tame Impala",
    duration: "6:29",
    spotifyUrl: "https://open.spotify.com/track/0UkjMuNjIlQmkIDc6BFYCS",
  },
  {
    title: "Sun's Coming Up",
    artist: "Tame Impala",
    duration: "3:16",
    spotifyUrl: "https://open.spotify.com/track/6Jzq2PtBrEH6p9MFsqmrAl",
  },
  {
    title: "Led Zeppelin",
    artist: "Tame Impala",
    duration: "2:16",
    spotifyUrl: "https://open.spotify.com/track/4X9e2DxW9OQ9KXv2SdS0ZM",
  },
  {
    title: "Disciples",
    artist: "Tame Impala",
    duration: "2:13",
    spotifyUrl: "https://open.spotify.com/track/5GrC0wCXBxZzxNq0SKUGv0",
  },
  {
    title: "Cause I'm a Man (Reprise)",
    artist: "Tame Impala",
    duration: "1:47",
    spotifyUrl: "https://open.spotify.com/track/2Q9mf9vQ4l1h2dD4t6XHVP",
  },
  {
    title: "Nangs",
    artist: "Tame Impala",
    duration: "1:46",
    spotifyUrl: "https://open.spotify.com/track/5fNFBJoJEEEPOAbNRRhGDI",
  },
  {
    title: "The Bold Arrow of Time",
    artist: "Tame Impala",
    duration: "3:04",
    spotifyUrl: "https://open.spotify.com/track/1oi7cDHTHXVJt2cAT0x6bD",
  },
  {
    title: "Desire Be Desire Go",
    artist: "Tame Impala",
    duration: "3:27",
    spotifyUrl: "https://open.spotify.com/track/5FKOC0GUDcQJdOxZ6WIy7E",
  },
  {
    title: "I Don't Really Mind",
    artist: "Tame Impala",
    duration: "3:48",
    spotifyUrl: "https://open.spotify.com/track/2lS0sLNDrDHxP7hpnxOiLO",
  },
  {
    title: "Wander",
    artist: "Tame Impala",
    duration: "2:44",
    spotifyUrl: "https://open.spotify.com/track/4dWJXRhJ8D2N5YUlPtBNiF",
  },
];

const drakeTracks: Track[] = [
  {
    title: "God's Plan",
    artist: "Drake",
    youtubeId: "xpVfcIGjX8I",
    duration: "3:18",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
  },
  {
    title: "Hotline Bling",
    artist: "Drake",
    duration: "4:27",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
    youtubeId: "uxpDa-c-4Mc",
  },
  {
    title: "One Dance",
    artist: "Drake",
    duration: "2:54",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
  },
  {
    title: "In My Feelings",
    artist: "Drake",
    duration: "3:37",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
  },
  {
    title: "Passionfruit",
    artist: "Drake",
    duration: "4:44",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
  },
  {
    title: "Hold On We're Going Home",
    artist: "Drake",
    duration: "3:47",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
  },
  {
    title: "Started From the Bottom",
    artist: "Drake",
    duration: "3:09",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
  },
  {
    title: "Best I Ever Had",
    artist: "Drake",
    duration: "4:16",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
  },
  {
    title: "Take Care",
    artist: "Drake",
    duration: "4:36",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
  },
  {
    title: "Controlla",
    artist: "Drake",
    duration: "3:33",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
  },
  {
    title: "Nice For What",
    artist: "Drake",
    duration: "3:30",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
  },
  {
    title: "Toosie Slide",
    artist: "Drake",
    duration: "4:04",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
  },
  {
    title: "Rich Flex",
    artist: "Drake",
    duration: "3:08",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
  },
  {
    title: "Jimmy Cooks",
    artist: "Drake",
    duration: "3:40",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
  },
  {
    title: "Texts Go Green",
    artist: "Drake",
    duration: "3:17",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
  },
];

const pinkFloydTracks: Track[] = [
  {
    title: "Comfortably Numb",
    artist: "Pink Floyd",
    duration: "6:23",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
    youtubeId: "_FrOQC-zEog",
  },
  {
    title: "Wish You Were Here",
    artist: "Pink Floyd",
    duration: "5:40",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
    youtubeId: "IXdNnw99-Ic",
  },
  {
    title: "Another Brick in the Wall",
    artist: "Pink Floyd",
    duration: "3:59",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
  },
  {
    title: "Time",
    artist: "Pink Floyd",
    duration: "6:53",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
  },
  {
    title: "Money",
    artist: "Pink Floyd",
    duration: "6:23",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
  },
  {
    title: "Hey You",
    artist: "Pink Floyd",
    duration: "4:40",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
  },
  {
    title: "Us and Them",
    artist: "Pink Floyd",
    duration: "7:49",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
  },
  {
    title: "Shine On You Crazy Diamond",
    artist: "Pink Floyd",
    duration: "13:30",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
  },
  {
    title: "Brain Damage",
    artist: "Pink Floyd",
    duration: "3:49",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
  },
  {
    title: "The Great Gig in the Sky",
    artist: "Pink Floyd",
    duration: "4:44",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
  },
  {
    title: "Breathe",
    artist: "Pink Floyd",
    duration: "2:50",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
  },
  {
    title: "Dogs",
    artist: "Pink Floyd",
    duration: "17:05",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
  },
  {
    title: "Pigs",
    artist: "Pink Floyd",
    duration: "11:28",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
  },
  {
    title: "Run Like Hell",
    artist: "Pink Floyd",
    duration: "4:20",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
  },
  {
    title: "Learning to Fly",
    artist: "Pink Floyd",
    duration: "4:53",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
  },
];

const michaelJacksonTracks: Track[] = [
  {
    title: "Thriller",
    artist: "Michael Jackson",
    duration: "5:57",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
    youtubeId: "sOnqjkJTMaA",
  },
  {
    title: "Billie Jean",
    artist: "Michael Jackson",
    duration: "4:54",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
    youtubeId: "Zi_XLOBDo_Y",
  },
  {
    title: "Beat It",
    artist: "Michael Jackson",
    duration: "4:18",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
  },
  {
    title: "Smooth Criminal",
    artist: "Michael Jackson",
    duration: "4:17",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
  },
  {
    title: "Man in the Mirror",
    artist: "Michael Jackson",
    duration: "5:18",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
  },
  {
    title: "Black or White",
    artist: "Michael Jackson",
    duration: "4:16",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
  },
  {
    title: "Don't Stop 'Til You Get Enough",
    artist: "Michael Jackson",
    duration: "6:04",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
  },
  {
    title: "PYT",
    artist: "Michael Jackson",
    duration: "3:58",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
  },
  {
    title: "Rock With You",
    artist: "Michael Jackson",
    duration: "3:40",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
  },
  {
    title: "Bad",
    artist: "Michael Jackson",
    duration: "4:07",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
  },
  {
    title: "Human Nature",
    artist: "Michael Jackson",
    duration: "4:06",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
  },
  {
    title: "Wanna Be Startin' Somethin'",
    artist: "Michael Jackson",
    duration: "6:02",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
  },
  {
    title: "Earth Song",
    artist: "Michael Jackson",
    duration: "6:46",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
  },
  {
    title: "You Are Not Alone",
    artist: "Michael Jackson",
    duration: "5:39",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
  },
  {
    title: "Remember the Time",
    artist: "Michael Jackson",
    duration: "3:59",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
  },
];

const au5Tracks: Track[] = [
  {
    title: "Snowblind",
    artist: "Au5",
    duration: "5:12",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
    youtubeId: "D6QoinCMg4Y",
  },
  {
    title: "Follow You",
    artist: "Au5",
    duration: "4:48",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
  },
  {
    title: "A New Morning",
    artist: "Au5",
    duration: "5:33",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
  },
  {
    title: "Closer",
    artist: "Au5",
    duration: "4:22",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
  },
  {
    title: "Proximity",
    artist: "Au5",
    duration: "5:01",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
  },
  {
    title: "Tidal Wave",
    artist: "Au5",
    duration: "4:55",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
  },
  {
    title: "Kaleidoscope",
    artist: "Au5",
    duration: "5:17",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
  },
  {
    title: "Stars Align",
    artist: "Au5",
    duration: "4:44",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
  },
  {
    title: "Reflection",
    artist: "Au5",
    duration: "5:08",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
  },
  {
    title: "Paper Skies",
    artist: "Au5",
    duration: "4:37",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
  },
  {
    title: "Reach",
    artist: "Au5",
    duration: "4:59",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
  },
  {
    title: "Without You",
    artist: "Au5",
    duration: "5:24",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
  },
];

const sabrinaCarpenterTracks: Track[] = [
  {
    title: "Espresso",
    artist: "Sabrina Carpenter",
    duration: "2:55",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
    youtubeId: "yjki-9NngAs",
  },
  {
    title: "Please Please Please",
    artist: "Sabrina Carpenter",
    duration: "3:06",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
    youtubeId: "cHVJDqXoHOU",
  },
  {
    title: "Nonsense",
    artist: "Sabrina Carpenter",
    duration: "2:58",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
  },
  {
    title: "Feather",
    artist: "Sabrina Carpenter",
    duration: "2:59",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
  },
  {
    title: "Bad for Business",
    artist: "Sabrina Carpenter",
    duration: "2:52",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
  },
  {
    title: "because i liked a boy",
    artist: "Sabrina Carpenter",
    duration: "2:41",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
  },
  {
    title: "Skin",
    artist: "Sabrina Carpenter",
    duration: "3:01",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
  },
  {
    title: "emails i can't send",
    artist: "Sabrina Carpenter",
    duration: "3:26",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
  },
  {
    title: "Read My Mind",
    artist: "Sabrina Carpenter",
    duration: "3:15",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
  },
  {
    title: "Fast Times",
    artist: "Sabrina Carpenter",
    duration: "3:11",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
  },
  {
    title: "Vicious",
    artist: "Sabrina Carpenter",
    duration: "2:48",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
  },
  {
    title: "Coincidence",
    artist: "Sabrina Carpenter",
    duration: "3:22",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
  },
];

const duaLipaTracks: Track[] = [
  {
    title: "Levitating",
    artist: "Dua Lipa",
    duration: "3:23",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
    youtubeId: "TUVcZfQe-Kw",
  },
  {
    title: "Don't Start Now",
    artist: "Dua Lipa",
    duration: "3:03",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
    youtubeId: "oygrmJFEBoY",
  },
  {
    title: "New Rules",
    artist: "Dua Lipa",
    duration: "3:29",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
  },
  {
    title: "Physical",
    artist: "Dua Lipa",
    duration: "3:13",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
  },
  {
    title: "One Kiss",
    artist: "Dua Lipa",
    duration: "3:34",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
  },
  {
    title: "Break My Heart",
    artist: "Dua Lipa",
    duration: "3:41",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
  },
  {
    title: "IDGAF",
    artist: "Dua Lipa",
    duration: "3:33",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
  },
  {
    title: "Hotter than Hell",
    artist: "Dua Lipa",
    duration: "3:31",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
  },
  {
    title: "Be the One",
    artist: "Dua Lipa",
    duration: "3:43",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
  },
  {
    title: "Hallucinate",
    artist: "Dua Lipa",
    duration: "3:28",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
  },
  {
    title: "Love Again",
    artist: "Dua Lipa",
    duration: "4:31",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
  },
  {
    title: "Training Season",
    artist: "Dua Lipa",
    duration: "3:05",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
  },
];

const tateMcRaeTracks: Track[] = [
  {
    title: "you broke me first",
    artist: "Tate McRae",
    duration: "3:02",
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
    youtubeId: "TKxbu-OpvOM",
  },
  {
    title: "greedy",
    artist: "Tate McRae",
    duration: "2:11",
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
  },
  {
    title: "she's all i wanna be",
    artist: "Tate McRae",
    duration: "2:29",
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
  },
  {
    title: "2 hands",
    artist: "Tate McRae",
    duration: "2:57",
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
  },
  {
    title: "chaotic",
    artist: "Tate McRae",
    duration: "2:40",
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
  },
  {
    title: "stupid",
    artist: "Tate McRae",
    duration: "2:58",
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
  },
  {
    title: "working",
    artist: "Tate McRae",
    duration: "3:06",
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
  },
  {
    title: "boy stopped calling",
    artist: "Tate McRae",
    duration: "2:53",
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
  },
  {
    title: "what would you do?",
    artist: "Tate McRae",
    duration: "3:18",
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
  },
  {
    title: "2WEI",
    artist: "Tate McRae",
    duration: "2:45",
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
  },
  {
    title: "\u201894",
    artist: "Tate McRae",
    duration: "3:01",
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
  },
  {
    title: "feel like shit",
    artist: "Tate McRae",
    duration: "2:52",
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
  },
];

const featuredArtists = [
  {
    name: "Tame Impala",
    genre: "Psychedelic Pop / Neo-Psychedelia",
    initials: "TI",
    listeners: "12.4M",
    latest: "The Slow Rush",
    tags: ["Psychedelic", "Indie", "Electronic"],
    trackCount: 45,
    spotifyUrl: "https://open.spotify.com/artist/5INjqkS1o8h1imAzPqGZBb",
    isExternal: true,
  },
  {
    name: "Drake",
    genre: "Hip-Hop / Rap",
    initials: "DR",
    listeners: "74.5M",
    latest: "For All The Dogs",
    tags: ["Hip-Hop", "Rap", "R&B"],
    trackCount: 15,
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
    isExternal: true,
  },
  {
    name: "Pink Floyd",
    genre: "Progressive Rock / Psychedelic",
    initials: "PF",
    listeners: "18.2M",
    latest: "The Wall",
    tags: ["Rock", "Psychedelic", "Classic"],
    trackCount: 15,
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
    isExternal: true,
  },
  {
    name: "Michael Jackson",
    genre: "Pop / R&B",
    initials: "MJ",
    listeners: "45.1M",
    latest: "Thriller",
    tags: ["Pop", "R&B", "Soul"],
    trackCount: 15,
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
    isExternal: true,
  },
  {
    name: "Au5",
    genre: "Electronic / Neurofunk",
    initials: "A5",
    listeners: "1.8M",
    latest: "Snowblind",
    tags: ["Electronic", "Dubstep", "Bass"],
    trackCount: 12,
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
    isExternal: true,
  },
  {
    name: "Sabrina Carpenter",
    genre: "Pop",
    initials: "SC",
    listeners: "38.6M",
    latest: "Short n' Sweet",
    tags: ["Pop", "Indie-Pop", "Contemporary"],
    trackCount: 12,
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
    isExternal: true,
  },
  {
    name: "Dua Lipa",
    genre: "Pop / Dance",
    initials: "DL",
    listeners: "58.3M",
    latest: "Radical Optimism",
    tags: ["Pop", "Dance", "Electronic"],
    trackCount: 12,
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
    isExternal: true,
  },
  {
    name: "Tate McRae",
    genre: "Pop / Alt-Pop",
    initials: "TM",
    listeners: "22.1M",
    latest: "THINK LATER",
    tags: ["Pop", "Alt-Pop", "Emotional"],
    trackCount: 12,
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
    isExternal: true,
  },
];

type PlaylistTrack = { title: string; artist: string };
type CommunityPlaylist = {
  title: string;
  count: number;
  curator: string;
  emoji: string;
  tracks: PlaylistTrack[];
};

const communityPlaylists: CommunityPlaylist[] = [
  {
    title: "Late Night Focus",
    count: 18,
    curator: "Community Pick",
    emoji: "🌙",
    tracks: [
      { title: "Passionfruit", artist: "Drake" },
      { title: "Comfortably Numb", artist: "Pink Floyd" },
      { title: "Breathe Deeper", artist: "Tame Impala" },
      { title: "Snowblind", artist: "Au5" },
      { title: "Wish You Were Here", artist: "Pink Floyd" },
      { title: "Lost In Yesterday", artist: "Tame Impala" },
    ],
  },
  {
    title: "Sunrise Sessions",
    count: 22,
    curator: "Dua Lipa Fan Mix",
    emoji: "🌅",
    tracks: [
      { title: "Levitating", artist: "Dua Lipa" },
      { title: "Espresso", artist: "Sabrina Carpenter" },
      { title: "Let It Happen", artist: "Tame Impala" },
      { title: "Don't Start Now", artist: "Dua Lipa" },
      { title: "Physical", artist: "Dua Lipa" },
      { title: "Feather", artist: "Sabrina Carpenter" },
    ],
  },
  {
    title: "Code & Beats",
    count: 30,
    curator: "Aloxide Collab",
    emoji: "💻",
    tracks: [
      { title: "A New Morning", artist: "Au5" },
      { title: "Proximity", artist: "Au5" },
      { title: "Time", artist: "Pink Floyd" },
      { title: "Follow You", artist: "Au5" },
      { title: "Kaleidoscope", artist: "Au5" },
      { title: "Elephant", artist: "Tame Impala" },
    ],
  },
  {
    title: "Rainy Day Poetry",
    count: 14,
    curator: "Pixel Hands",
    emoji: "🌧️",
    tracks: [
      { title: "Human Nature", artist: "Michael Jackson" },
      { title: "Feels Like We Only Go Backwards", artist: "Tame Impala" },
      { title: "Man in the Mirror", artist: "Michael Jackson" },
      { title: "You Are Not Alone", artist: "Michael Jackson" },
      { title: "Hold On We're Going Home", artist: "Drake" },
    ],
  },
  {
    title: "Classic Rock Legends",
    count: 11,
    curator: "Pink Floyd Vault",
    emoji: "🎸",
    tracks: [
      { title: "Comfortably Numb", artist: "Pink Floyd" },
      { title: "Another Brick in the Wall", artist: "Pink Floyd" },
      { title: "Money", artist: "Pink Floyd" },
      { title: "Shine On You Crazy Diamond", artist: "Pink Floyd" },
      { title: "Learning to Fly", artist: "Pink Floyd" },
    ],
  },
  {
    title: "Electric Dreams",
    count: 25,
    curator: "Community Remix",
    emoji: "⚡",
    tracks: [
      { title: "Tidal Wave", artist: "Au5" },
      { title: "New Rules", artist: "Dua Lipa" },
      { title: "God's Plan", artist: "Drake" },
      { title: "Stars Align", artist: "Au5" },
      { title: "Black or White", artist: "Michael Jackson" },
      { title: "Break My Heart", artist: "Dua Lipa" },
    ],
  },
  {
    title: "MJ Classics",
    count: 20,
    curator: "Michael Jackson Mix",
    emoji: "🕺",
    tracks: [
      { title: "Thriller", artist: "Michael Jackson" },
      { title: "Billie Jean", artist: "Michael Jackson" },
      { title: "Beat It", artist: "Michael Jackson" },
      { title: "Smooth Criminal", artist: "Michael Jackson" },
      { title: "PYT", artist: "Michael Jackson" },
      { title: "Rock With You", artist: "Michael Jackson" },
    ],
  },
  {
    title: "Pop Essentials",
    count: 16,
    curator: "Chart Toppers",
    emoji: "🎤",
    tracks: [
      { title: "Espresso", artist: "Sabrina Carpenter" },
      { title: "Levitating", artist: "Dua Lipa" },
      { title: "Please Please Please", artist: "Sabrina Carpenter" },
      { title: "One Kiss", artist: "Dua Lipa" },
      { title: "Nonsense", artist: "Sabrina Carpenter" },
    ],
  },
];

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

function AudioPlayer({
  track,
  onClose,
}: {
  track: Track;
  onClose: () => void;
}) {
  const [playing, setPlaying] = useState(true);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const audioRef = useRef<HTMLAudioElement>(null);

  const trackKey = track.title + track.artist;
  // biome-ignore lint/correctness/useExhaustiveDependencies: trackKey identifies track changes
  useEffect(() => {
    setCurrentSeconds(0);
    setPlaying(true);
    if (audioRef.current && track.audioSrc) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, [trackKey]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume / 100;
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentSeconds(Math.floor(audioRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(Math.floor(audioRef.current.duration));
    }
  };

  const handleEnded = () => {
    setPlaying(false);
    setCurrentSeconds(0);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = ratio * (audioRef.current.duration || 0);
  };

  const effectiveDuration =
    duration > 0 ? duration : parseDurationToSeconds(track.duration);
  const progress =
    effectiveDuration > 0 ? (currentSeconds / effectiveDuration) * 100 : 0;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-40 glass-card px-4 py-3"
    >
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
      {track.youtubeId && (
        <div className="fixed bottom-16 left-0 right-0 z-40 max-w-2xl mx-auto px-4 pb-2">
          <iframe
            src={`https://www.youtube.com/embed/${track.youtubeId}?autoplay=1&rel=0`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full rounded-xl"
            style={{ height: "200px", border: "none" }}
            title={track.title}
          />
        </div>
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
          <button
            type="button"
            className="text-white/50 hover:text-red-400 transition-colors ml-2"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Controls */}
        {track.audioSrc ? (
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="text-white/50 hover:text-foreground transition-colors"
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
                className="text-white/50 hover:text-foreground transition-colors"
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
                onClick={handleProgressClick}
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
                {track.duration}
              </span>
            </div>
          </div>
        ) : track.youtubeId ? null : (
          <div className="text-sm text-white/40">Preview not available</div>
        )}

        {/* Volume + close */}
        <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
          {track.audioSrc && (
            <>
              <Volume2 className="w-4 h-4 text-white/50" />
              <Slider
                value={[volume]}
                onValueChange={(v) => setVolume(v[0])}
                max={100}
                className="w-24"
              />
            </>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-3 text-white/50 hover:text-foreground text-xs px-2 py-1 rounded hover:bg-white/10 transition-colors"
            data-ocid="player.close_button"
          >
            ✕
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ──── Music Bot ────────────────────────────────────────────────────────────────

type ParsedLink = {
  type:
    | "youtube-video"
    | "youtube-playlist"
    | "spotify-track"
    | "spotify-playlist"
    | "spotify-album"
    | "spotify-artist"
    | null;
  embedUrl: string | null;
  label: string;
};

function parseMusicLink(url: string): ParsedLink {
  try {
    const u = new URL(url.trim());
    const host = u.hostname.replace("www.", "");

    if (host === "youtu.be") {
      const id = u.pathname.slice(1);
      if (id)
        return {
          type: "youtube-video",
          embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1`,
          label: "YouTube Video",
        };
    }
    if (host === "youtube.com") {
      const listId = u.searchParams.get("list");
      const videoId = u.searchParams.get("v");
      if (u.pathname === "/playlist" && listId) {
        return {
          type: "youtube-playlist",
          embedUrl: `https://www.youtube.com/embed/videoseries?list=${listId}&autoplay=1`,
          label: "YouTube Playlist",
        };
      }
      if (videoId && listId) {
        return {
          type: "youtube-playlist",
          embedUrl: `https://www.youtube.com/embed/${videoId}?list=${listId}&autoplay=1`,
          label: "YouTube Playlist",
        };
      }
      if (videoId) {
        return {
          type: "youtube-video",
          embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1`,
          label: "YouTube Video",
        };
      }
    }
    if (host === "open.spotify.com") {
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts.length >= 2) {
        const kind = parts[0] as string;
        const id = parts[1];
        const base = `https://open.spotify.com/embed/${kind}/${id}?utm_source=generator&theme=0`;
        if (kind === "track")
          return {
            type: "spotify-track",
            embedUrl: base,
            label: "Spotify Track",
          };
        if (kind === "playlist")
          return {
            type: "spotify-playlist",
            embedUrl: base,
            label: "Spotify Playlist",
          };
        if (kind === "album")
          return {
            type: "spotify-album",
            embedUrl: base,
            label: "Spotify Album",
          };
        if (kind === "artist")
          return {
            type: "spotify-artist",
            embedUrl: base,
            label: "Spotify Artist",
          };
      }
    }
  } catch {
    // invalid URL
  }
  return { type: null, embedUrl: null, label: "Unknown" };
}

type QueueItem = { url: string; parsed: ParsedLink };

function MusicBot() {
  const [input, setInput] = useState("");
  const [current, setCurrent] = useState<QueueItem | null>(null);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [error, setError] = useState("");

  const handlePlay = (url: string) => {
    const parsed = parseMusicLink(url);
    if (!parsed.embedUrl) {
      setError("Couldn't recognize that link. Try a YouTube or Spotify URL.");
      return;
    }
    setError("");
    const item: QueueItem = { url, parsed };
    setCurrent(item);
    setQueue((prev) => {
      const filtered = prev.filter((q) => q.url !== url);
      return [item, ...filtered].slice(0, 5);
    });
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) handlePlay(input.trim());
  };

  const isSpotify = current?.parsed.type?.startsWith("spotify");
  const embedHeight =
    current?.parsed.type === "spotify-track"
      ? 152
      : current?.parsed.type?.startsWith("spotify")
        ? 352
        : 315;

  const badgeColor = (type: ParsedLink["type"]) => {
    if (!type) return "bg-white/10 text-white/60";
    if (type.startsWith("youtube"))
      return "bg-red-500/20 text-red-400 border border-red-500/30";
    return "bg-green-600/20 text-green-400 border border-green-600/30";
  };

  return (
    <div className="glass-card rounded-2xl border border-white/10 p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
            <Bot className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Lunara Music Bot
            </h2>
            <p className="text-white/50 text-sm">
              Drop a YouTube or Spotify link to queue it up
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30 tracking-wider">
          ONLINE
        </span>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
        <div className="flex-1 flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-4 py-3">
          <Link2 className="w-4 h-4 text-white/40 shrink-0" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste a YouTube or Spotify link..."
            className="flex-1 bg-transparent text-white placeholder:text-white/30 text-sm outline-none"
            data-ocid="soundscape.input"
          />
        </div>
        <Button
          type="submit"
          className="bg-accent text-accent-foreground font-semibold px-5 rounded-xl hover:bg-accent/90"
          data-ocid="soundscape.primary_button"
        >
          <Play className="w-4 h-4 mr-1" /> Play
        </Button>
      </form>

      {/* Error */}
      {error && (
        <p
          className="text-red-400 text-sm mb-4"
          data-ocid="soundscape.error_state"
        >
          {error}
        </p>
      )}

      {/* Now Playing */}
      {current?.parsed.embedUrl && (
        <div className="mb-6" data-ocid="soundscape.panel">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-white/50 text-xs uppercase tracking-widest">
              Now Playing
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${badgeColor(current.parsed.type)}`}
            >
              {current.parsed.label}
            </span>
          </div>
          <div className="rounded-xl overflow-hidden border border-white/10">
            {isSpotify ? (
              <iframe
                src={current.parsed.embedUrl}
                width="100%"
                height={embedHeight}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Player"
                className="block"
              />
            ) : (
              <iframe
                src={current.parsed.embedUrl}
                width="100%"
                height={315}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Player"
                className="block"
              />
            )}
          </div>
        </div>
      )}

      {/* Recent Queue */}
      {queue.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-white/40 text-xs uppercase tracking-widest">
              Recent Queue
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="flex flex-wrap gap-2" data-ocid="soundscape.list">
            {queue.map((item, i) => (
              <button
                type="button"
                key={item.url}
                onClick={() => handlePlay(item.url)}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 text-sm text-white/70 hover:text-white transition-colors group"
                data-ocid={`soundscape.item.${i + 1}`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${item.parsed.type?.startsWith("youtube") ? "bg-red-400" : "bg-green-400"}`}
                />
                <span className="max-w-[180px] truncate">
                  {item.parsed.label}
                </span>
                <X
                  className="w-3 h-3 text-white/30 group-hover:text-white/60 ml-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setQueue((prev) => prev.filter((_, idx) => idx !== i));
                    if (current?.url === item.url) setCurrent(null);
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Upload Music ───────────────────────────────────────────────

type UploadedTrack = {
  id: string;
  title: string;
  artist: string;
  genre: string;
  description: string;
  duration: string;
  audioSrc: string;
};

function UploadMusicSection({ onPlay }: { onPlay: (track: Track) => void }) {
  const auth = useAuth();
  const [uploads, setUploads] = useState<UploadedTrack[]>([]);
  const [form, setForm] = useState({
    title: "",
    artist: "",
    genre: "Pop",
    description: "",
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load metadata from localStorage on mount
  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("lunara_uploaded_tracks") || "[]",
      );
      setUploads(stored.map((t: UploadedTrack) => ({ ...t, audioSrc: "" })));
    } catch {}
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAudioFile(file);
    if (audioBlobUrl) URL.revokeObjectURL(audioBlobUrl);
    const url = URL.createObjectURL(file);
    setAudioBlobUrl(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.artist || !audioBlobUrl) return;
    const newTrack: UploadedTrack = {
      id: Date.now().toString(),
      title: form.title,
      artist: form.artist,
      genre: form.genre,
      description: form.description,
      duration: "?:??",
      audioSrc: audioBlobUrl,
    };
    const updated = [newTrack, ...uploads];
    setUploads(updated);
    // Store only metadata (not blob URL) in localStorage
    const meta = updated.map(({ audioSrc: _a, ...rest }) => rest);
    localStorage.setItem("lunara_uploaded_tracks", JSON.stringify(meta));
    setForm({ title: "", artist: "", genre: "Pop", description: "" });
    setAudioFile(null);
    setAudioBlobUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (!auth.user) {
    return (
      <div
        className="glass-card rounded-2xl border border-white/10 p-12 text-center"
        data-ocid="upload.loading_state"
      >
        <Music className="w-12 h-12 text-accent/30 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Upload Your Music
        </h3>
        <p className="text-white/50 text-sm mb-6">
          Login to share your tracks with the Lunara community
        </p>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("lunara-open-auth"))
          }
          className="bg-accent text-accent-foreground font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-accent/80 transition-colors"
          data-ocid="upload.button"
        >
          Login to Upload
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Upload form */}
      <div className="glass-card rounded-2xl border border-white/10 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
          <Music className="w-5 h-5 text-accent" /> Share a Track
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="upload-title" className="text-sm text-white/70">
                Track Title *
              </label>
              <input
                id="upload-title"
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="My Awesome Track"
                className="w-full bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60"
                required
                data-ocid="upload.input"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="upload-artist" className="text-sm text-white/70">
                Artist Name *
              </label>
              <input
                id="upload-artist"
                type="text"
                value={form.artist}
                onChange={(e) =>
                  setForm((p) => ({ ...p, artist: e.target.value }))
                }
                placeholder="Your name or alias"
                className="w-full bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60"
                required
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="upload-genre" className="text-sm text-white/70">
              Genre
            </label>
            <select
              id="upload-genre"
              value={form.genre}
              onChange={(e) =>
                setForm((p) => ({ ...p, genre: e.target.value }))
              }
              className="w-full bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent/60"
              data-ocid="upload.select"
            >
              {[
                "Pop",
                "Rock",
                "Electronic",
                "Hip-Hop",
                "Indie",
                "Classical",
                "Jazz",
                "Other",
              ].map((g) => (
                <option key={g} value={g} className="bg-[#1a0033] text-white">
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="upload-desc" className="text-sm text-white/70">
              Description
            </label>
            <textarea
              id="upload-desc"
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              placeholder="Tell us about your track..."
              rows={2}
              className="w-full bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60 resize-none"
              data-ocid="upload.textarea"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="upload-audio" className="text-sm text-white/70">
              Audio File *
            </label>
            <button
              type="button"
              className="w-full border-2 border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer hover:border-accent/40 transition-colors"
              onClick={() => fileInputRef.current?.click()}
              data-ocid="upload.dropzone"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="hidden"
                data-ocid="upload.upload_button"
              />
              {audioFile ? (
                <div className="flex items-center justify-center gap-2 text-accent">
                  <Music className="w-5 h-5" />
                  <span className="text-sm font-medium">{audioFile.name}</span>
                </div>
              ) : (
                <div className="text-white/40 text-sm">
                  <Music className="w-8 h-8 mx-auto mb-2 text-white/20" />
                  Click to select audio file
                </div>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent/80 text-accent-foreground font-semibold py-3 rounded-xl transition-colors"
            data-ocid="upload.submit_button"
          >
            Upload Track
          </button>
          {success && (
            <p
              className="text-center text-green-400 text-sm"
              data-ocid="upload.success_state"
            >
              ✅ Track shared with the community!
            </p>
          )}
        </form>
      </div>

      {/* Community Tracks */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Community Tracks
        </h3>
        {uploads.length === 0 ? (
          <div
            className="glass-card rounded-2xl border border-white/10 p-12 text-center"
            data-ocid="upload.empty_state"
          >
            <Music className="w-12 h-12 text-accent/30 mx-auto mb-4" />
            <p className="text-white/40 text-sm">
              Be the first to share your music with the community
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploads.map((track, i) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="glass-card rounded-2xl border border-white/10 p-4 hover:border-accent/30 transition-colors"
                data-ocid={`upload.item.${i + 1}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">
                      {track.title}
                    </p>
                    <p className="text-white/50 text-xs">{track.artist}</p>
                  </div>
                  <span className="ml-2 shrink-0 text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                    {track.genre}
                  </span>
                </div>
                {track.description && (
                  <p className="text-white/40 text-xs mb-3 line-clamp-2">
                    {track.description}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (track.audioSrc) {
                      onPlay({
                        title: track.title,
                        artist: track.artist,
                        duration: track.duration,
                        audioSrc: track.audioSrc,
                      });
                    }
                  }}
                  disabled={!track.audioSrc}
                  className="w-full flex items-center justify-center gap-2 bg-accent/15 hover:bg-accent/25 disabled:opacity-40 text-accent text-sm font-medium py-2 rounded-xl transition-colors"
                  data-ocid={`upload.item.${i + 1}`}
                >
                  <Play className="w-4 h-4" /> Play
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Musician Lounge ────────────────────────────────────────────

type MusicianMessage = {
  id: string;
  username: string;
  text: string;
  timestamp: number;
};

function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function MusicianLounge() {
  const auth = useAuth();
  const [username, setUsername] = useState<string>(
    () =>
      auth.user?.name || localStorage.getItem("lunara_musician_username") || "",
  );
  const [nameInput, setNameInput] = useState("");
  const [messages, setMessages] = useState<MusicianMessage[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("lunara_musician_chat") || "[]");
    } catch {
      return [];
    }
  });
  const [msgInput, setMsgInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSetName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    localStorage.setItem("lunara_musician_username", nameInput.trim());
    setUsername(nameInput.trim());
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgInput.trim() || !username) return;
    const newMsg: MusicianMessage = {
      id: Date.now().toString(),
      username,
      text: msgInput.trim(),
      timestamp: Date.now(),
    };
    const updated = [...messages, newMsg].slice(-100);
    setMessages(updated);
    localStorage.setItem("lunara_musician_chat", JSON.stringify(updated));
    setMsgInput("");
  };

  if (!username) {
    return (
      <div className="glass-card rounded-2xl border border-white/10 p-8 max-w-md mx-auto text-center">
        <Mic2 className="w-12 h-12 text-accent/40 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Join the Musician Lounge
        </h3>
        <p className="text-white/50 text-sm mb-6">
          Choose a display name to start chatting
        </p>
        <form onSubmit={handleSetName} className="flex gap-2">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Your display name"
            className="flex-1 bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60"
            data-ocid="musician_chat.input"
          />
          <button
            type="submit"
            className="bg-accent text-accent-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent/80 transition-colors"
            data-ocid="musician_chat.submit_button"
          >
            Join
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-sm text-white/70">Live Chat</span>
        </div>
        <span className="text-xs text-white/40">
          Chatting as <span className="text-accent">{username}</span>
        </span>
      </div>
      <div
        className="max-h-96 overflow-y-auto p-4 space-y-3"
        data-ocid="musician_chat.panel"
      >
        {messages.length === 0 ? (
          <div
            className="text-center py-8"
            data-ocid="musician_chat.empty_state"
          >
            <p className="text-white/30 text-sm">No messages yet. Say hi! 👋</p>
          </div>
        ) : (
          messages.map((msg) => {
            const initials = msg.username.slice(0, 2).toUpperCase();
            return (
              <div key={msg.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/25 flex items-center justify-center text-accent text-xs font-bold shrink-0">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-foreground">
                      {msg.username}
                    </span>
                    <span className="text-xs text-white/30">
                      {timeAgo(msg.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-white/80 break-words">
                    {msg.text}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>
      <form
        onSubmit={handleSend}
        className="px-4 py-3 border-t border-white/10 flex gap-2"
        data-ocid="musician_chat.modal"
      >
        <input
          type="text"
          value={msgInput}
          onChange={(e) => setMsgInput(e.target.value)}
          placeholder="Share your thoughts..."
          className="flex-1 bg-white/08 border border-white/15 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60"
          data-ocid="musician_chat.input"
        />
        <button
          type="submit"
          className="bg-accent text-accent-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-accent/80 transition-colors flex items-center gap-1.5"
          data-ocid="musician_chat.submit_button"
        >
          <Send className="w-4 h-4" /> Send
        </button>
      </form>
    </div>
  );
}

const GLOBAL_LISTEN_DATA = [
  { name: "Tame Impala", seconds: 48600, initials: "TI" },
  { name: "Pink Floyd", seconds: 43200, initials: "PF" },
  { name: "Drake", seconds: 39600, initials: "DR" },
  { name: "Michael Jackson", seconds: 36000, initials: "MJ" },
  { name: "Dua Lipa", seconds: 32400, initials: "DL" },
  { name: "Au5", seconds: 28800, initials: "A5" },
  { name: "Sabrina Carpenter", seconds: 25200, initials: "SC" },
  { name: "Sheryl Crow", seconds: 21600, initials: "SC" },
  { name: "Tate McRae", seconds: 18000, initials: "TM" },
];

export default function Soundscape() {
  const [nowPlaying, setNowPlaying] = useState<Track | null>(null);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  const [lbTab, setLbTab] = useState<"global" | "personal">("global");
  const [expandedArtist, setExpandedArtist] = useState<string | null>(null);
  const [expandedPlaylist, setExpandedPlaylist] = useState<string | null>(null);

  const allArtistTracks: Record<string, Track[]> = {
    "Tame Impala": tameImpalaTracks,
    Drake: drakeTracks,
    "Pink Floyd": pinkFloydTracks,
    "Michael Jackson": michaelJacksonTracks,
    Au5: au5Tracks,
    "Sabrina Carpenter": sabrinaCarpenterTracks,
    "Dua Lipa": duaLipaTracks,
    "Tate McRae": tateMcRaeTracks,
  };

  const listenStartRef = useRef<number | null>(null);
  const currentArtistRef = useRef<string | null>(null);
  const [listenTimes, setListenTimes] = useState<Record<string, number>>(() => {
    try {
      return JSON.parse(
        localStorage.getItem("lunara_soundscape_listentime") || "{}",
      );
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const flush = () => {
      if (listenStartRef.current !== null && currentArtistRef.current) {
        const elapsed = (Date.now() - listenStartRef.current) / 1000;
        setListenTimes((prev) => {
          const updated = {
            ...prev,
            [currentArtistRef.current!]:
              (prev[currentArtistRef.current!] || 0) + elapsed,
          };
          localStorage.setItem(
            "lunara_soundscape_listentime",
            JSON.stringify(updated),
          );
          return updated;
        });
        listenStartRef.current = null;
      }
    };
    if (nowPlaying) {
      flush();
      currentArtistRef.current = nowPlaying.artist;
      listenStartRef.current = Date.now();
    } else {
      flush();
      currentArtistRef.current = null;
    }
    return () => {
      flush();
    };
  }, [nowPlaying]);

  const formatListenTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `0m ${s}s`;
  };

  const artistNames = Object.keys(allArtistTracks);
  const artistGenres: Record<string, string> = {
    "Tame Impala": "Psychedelic Rock",
    Drake: "Hip-Hop / R&B",
    "Pink Floyd": "Progressive Rock",
    "Michael Jackson": "Pop / Soul",
    Au5: "Electronic / Dubstep",
    "Sabrina Carpenter": "Pop",
    "Dua Lipa": "Dance-Pop",
    "Tate McRae": "Pop / Alt-Pop",
  };

  const leaderboardData = artistNames
    .map((name) => ({ name, seconds: listenTimes[name] || 0 }))
    .sort((a, b) => b.seconds - a.seconds);

  const maxSeconds = leaderboardData[0]?.seconds || 0;
  const hasAnyListens = maxSeconds > 0;

  const medals = ["🥇", "🥈", "🥉"];

  const resetListenTimes = () => {
    localStorage.removeItem("lunara_soundscape_listentime");
    setListenTimes({});
  };

  const playTrack = (track: Track) => {
    setNowPlaying(track);
  };

  return (
    <div className={nowPlaying ? "pb-24" : ""}>
      {/* Hero */}
      <section className="gradient-soundscape min-h-[60vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-white/20 text-white border-white/30 text-xs">
                Music Zone
              </Badge>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Soundscape Sanctuary
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              A safe haven for music lovers, emerging artists, and sound
              explorers. Discover new voices, stream playlists, and find your
              frequency.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button
                className="bg-accent text-accent-foreground font-semibold px-6 h-11 rounded-full hover:bg-accent/90"
                onClick={() =>
                  document
                    .getElementById("artists")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="soundscape.primary_button"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Listening
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 px-6 h-11 rounded-full"
                onClick={() =>
                  document
                    .getElementById("playlists")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="soundscape.secondary_button"
              >
                <Users className="w-4 h-4 mr-2" />
                Community Playlists
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 px-6 h-11 rounded-full"
                onClick={() =>
                  document
                    .getElementById("music-bot")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="soundscape.music_bot_button"
              >
                <Bot className="w-4 h-4 mr-2" />
                Music Bot
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 px-6 h-11 rounded-full"
                onClick={() =>
                  document
                    .getElementById("listening-leaderboard")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="soundscape.leaderboard_button"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Leaderboard
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Artists */}
      <section id="artists" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Featured Artists
              </h2>
              <p className="text-white/50 text-sm mt-1">
                World-class artists — stream their iconic tracks
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {featuredArtists.map((artist, ai) => {
              const tracks = allArtistTracks[artist.name];
              const isExpanded = expandedArtist === artist.name;
              const displayTracks = isExpanded ? tracks : tracks.slice(0, 9);

              return (
                <motion.div
                  key={artist.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ai * 0.1 }}
                  className="glass-card rounded-3xl p-6 shadow-card border border-white/10"
                  data-ocid={`artists.item.${ai + 1}`}
                >
                  {/* Artist header */}
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="w-14 h-14 rounded-full bg-lunara-soundscape border-2 border-white/10">
                      <AvatarFallback className="text-white font-bold bg-lunara-soundscape text-base rounded-full">
                        {artist.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-foreground text-lg">
                          {artist.name}
                        </h3>
                        {artist.isExternal && artist.spotifyUrl && (
                          <a
                            href={artist.spotifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-[#1DB954] hover:text-[#1ed760] transition-colors glass-section rounded-full px-2.5 py-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Open on Spotify
                          </a>
                        )}
                      </div>
                      <p className="text-white/50 text-sm">{artist.genre}</p>
                      <div className="flex gap-2 mt-1.5">
                        {artist.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-white/50 text-xs">Latest</p>
                      <p className="text-foreground font-medium text-sm">
                        {artist.latest}
                      </p>
                      <p className="text-white/50 text-xs mt-0.5">
                        <Users className="w-3 h-3 inline mr-1" />
                        {artist.listeners} listeners
                      </p>
                    </div>
                  </div>

                  {/* Track grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {displayTracks.map((track, ti) => (
                      <motion.div
                        key={`${track.title}-${ti}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: ti * 0.02 }}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer transition-colors group ${
                          nowPlaying?.title === track.title &&
                          nowPlaying?.artist === track.artist
                            ? "bg-accent/20 border border-accent/30"
                            : "hover:bg-white/10 border border-transparent"
                        }`}
                        onClick={() => playTrack(track)}
                        data-ocid={`tracks.item.${ti + 1}`}
                      >
                        <div className="w-7 h-7 rounded-full glass-section flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                          {nowPlaying?.title === track.title &&
                          nowPlaying?.artist === track.artist ? (
                            <Pause className="w-3 h-3 text-accent group-hover:text-accent-foreground" />
                          ) : (
                            <Play className="w-3 h-3 text-white/50 group-hover:text-accent-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-foreground text-xs font-medium truncate">
                            {track.title}
                          </p>
                          <p className="text-white/50 text-xs truncate">
                            {track.artist}
                          </p>
                        </div>
                        <span className="text-white/50 text-xs shrink-0">
                          {track.duration}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {tracks.length > 9 && (
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedArtist((prev) =>
                          prev === artist.name ? null : artist.name,
                        )
                      }
                      className="mt-4 flex items-center gap-2 text-accent text-sm font-medium hover:text-accent/80 transition-colors"
                      data-ocid={`artists.item.${ai + 1}`}
                    >
                      {isExpanded ? (
                        <>Show less</>
                      ) : (
                        <>
                          Show all {tracks.length} tracks
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Music Bot */}
      <section id="music-bot" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MusicBot />
        </div>
      </section>

      {/* Community Playlists */}
      <section id="playlists" className="py-16 glass-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Community Playlists
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {communityPlaylists.map((pl, i) => {
              const isExpanded = expandedPlaylist === pl.title;
              return (
                <motion.div
                  key={pl.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="glass-card rounded-2xl shadow-xs border border-white/10 hover:border-accent/30 transition-shadow overflow-hidden"
                  data-ocid={`playlists.item.${i + 1}`}
                >
                  {/* Playlist header — toggle open/close */}
                  <button
                    type="button"
                    className="w-full p-5 flex items-center gap-4 cursor-pointer text-left"
                    onClick={() =>
                      setExpandedPlaylist((prev) =>
                        prev === pl.title ? null : pl.title,
                      )
                    }
                  >
                    <div className="w-12 h-12 rounded-full gradient-soundscape flex items-center justify-center text-2xl shrink-0">
                      {pl.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate">
                        {pl.title}
                      </p>
                      <p className="text-white/50 text-xs">
                        {pl.count} tracks · {pl.curator}
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                    >
                      <ArrowRight className="w-3 h-3 text-accent" />
                    </div>
                  </button>

                  {/* Expanded track list */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden border-t border-white/08"
                      >
                        <div className="px-4 py-2 space-y-1">
                          {pl.tracks.map((t, ti) => (
                            <div
                              key={`${t.title}-${ti}`}
                              className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/08 transition-colors group"
                              data-ocid={`playlists.item.${i + 1}`}
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  playTrack({
                                    title: t.title,
                                    artist: t.artist,
                                    duration: "3:30",
                                  })
                                }
                                className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center hover:bg-accent transition-colors shrink-0"
                                data-ocid={`playlists.item.${i + 1}`}
                              >
                                <Play className="w-3 h-3 text-accent group-hover:text-accent-foreground" />
                              </button>
                              <div className="flex-1 min-w-0">
                                <p className="text-foreground text-xs font-medium truncate">
                                  {t.title}
                                </p>
                                <p className="text-white/40 text-xs truncate">
                                  {t.artist}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upload Your Music */}
      <section id="upload-music" className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Music className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Upload Your Music
                </h2>
                <p className="text-white/50 text-sm">
                  Share your tracks with the Lunara community
                </p>
              </div>
            </div>
            <UploadMusicSection onPlay={playTrack} />
          </motion.div>
        </div>
      </section>

      {/* Musician Lounge */}
      <section id="musician-lounge" className="py-16 glass-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Mic2 className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Musician Lounge
                </h2>
                <p className="text-white/50 text-sm">
                  Connect with fellow musicians. Share your work, find collabs,
                  talk music.
                </p>
              </div>
            </div>
            <MusicianLounge />
          </motion.div>
        </div>
      </section>

      {/* Listening Leaderboard */}
      <section id="listening-leaderboard" className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Listening Leaderboard
                  </h2>
                  <p className="text-white/50 text-sm">
                    Artists ranked by listen time
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/50 hover:text-white gap-1.5"
                onClick={resetListenTimes}
                data-ocid="soundscape.leaderboard_reset_button"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </Button>
            </div>

            {/* Tab buttons */}
            <div className="flex gap-2 mb-6">
              {(["global", "personal"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setLbTab(t)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    lbTab === t
                      ? "bg-accent text-accent-foreground"
                      : "glass-card border border-white/10 text-white/60 hover:text-white"
                  }`}
                  data-ocid="soundscape.leaderboard.tab"
                >
                  {t === "global" ? "🌍 Global" : "👤 Personal"}
                </button>
              ))}
            </div>

            {lbTab === "personal" ? (
              <div className="space-y-3">
                {!hasAnyListens ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-card rounded-2xl border border-white/10 p-12 text-center"
                    data-ocid="soundscape.leaderboard_empty_state"
                  >
                    <Headphones className="w-12 h-12 text-accent/40 mx-auto mb-4" />
                    <p className="text-white/50 text-sm">
                      Start listening to see your stats here!
                    </p>
                  </motion.div>
                ) : (
                  leaderboardData.map((entry, i) => {
                    const pct =
                      maxSeconds > 0 ? (entry.seconds / maxSeconds) * 100 : 0;
                    const rankLabel = i < 3 ? medals[i] : `${i + 1}th`;
                    const initials = entry.name
                      .split(" ")
                      .map((w: string) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();
                    return (
                      <motion.div
                        key={entry.name}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                        className="glass-card rounded-2xl border border-white/10 p-4 flex items-center gap-4 hover:border-accent/30 transition-colors"
                        data-ocid={`soundscape.leaderboard.item.${i + 1}`}
                      >
                        <span className="text-2xl w-8 text-center shrink-0">
                          {rankLabel}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm shrink-0">
                          {initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-foreground text-sm">
                              {entry.name}
                            </span>
                            <span className="text-accent text-xs font-mono ml-2 shrink-0">
                              {formatListenTime(entry.seconds)}
                            </span>
                          </div>
                          <p className="text-white/40 text-xs mb-2">
                            {artistGenres[entry.name] || "Music"}
                          </p>
                          <Progress value={pct} className="h-1.5 bg-white/10" />
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {GLOBAL_LISTEN_DATA.map((entry, i) => {
                  const maxG = GLOBAL_LISTEN_DATA[0]?.seconds || 1;
                  const pct = (entry.seconds / maxG) * 100;
                  const rankLabel = i < 3 ? medals[i] : `${i + 1}th`;
                  return (
                    <motion.div
                      key={entry.name}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="glass-card rounded-2xl border border-white/10 p-4 flex items-center gap-4 hover:border-accent/30 transition-colors"
                      data-ocid={`soundscape.leaderboard.item.${i + 1}`}
                    >
                      <span className="text-2xl w-8 text-center shrink-0">
                        {rankLabel}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm shrink-0">
                        {entry.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-foreground text-sm">
                            {entry.name}
                          </span>
                          <span className="text-accent text-xs font-mono ml-2 shrink-0">
                            {formatListenTime(entry.seconds)}
                          </span>
                        </div>
                        <p className="text-white/40 text-xs mb-2">
                          {artistGenres[entry.name] || "Global"}
                        </p>
                        <Progress value={pct} className="h-1.5 bg-white/10" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-soundscape">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Mic2 className="w-12 h-12 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Share Your Sound
          </h2>
          <p className="text-white/60 mb-8">
            Upload your music, join listening circles, and let Lunara amplify
            your voice.
          </p>
          <Button
            className="bg-accent text-accent-foreground font-semibold px-8 py-3 h-auto rounded-full hover:bg-accent/90"
            onClick={() => {
              document
                .getElementById("upload-music")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            data-ocid="soundscape.cta_button"
          >
            <Star className="w-4 h-4 mr-2" />
            Become an Artist Member
          </Button>
        </div>
      </section>

      {/* Floating audio player */}
      <AnimatePresence>
        {nowPlaying && (
          <AudioPlayer track={nowPlaying} onClose={() => setNowPlaying(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

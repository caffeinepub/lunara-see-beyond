import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowRight,
  Bot,
  Check,
  ExternalLink,
  Headphones,
  Heart,
  Link2,
  ListPlus,
  Mic2,
  Music,
  Pause,
  Pencil,
  Play,
  RotateCcw,
  Send,
  SkipBack,
  SkipForward,
  Star,
  Trash2,
  Trophy,
  Users,
  Volume2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useAudioPlayer } from "../contexts/AudioContext";

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
    youtubeId: "4LpAGnNGbBc",
  },
  {
    title: "New Person, Same Old Mistakes",
    artist: "Tame Impala",
    duration: "6:03",
    spotifyUrl: "https://open.spotify.com/track/6wH8bsFJSEaWpSFoFnWFLP",
    youtubeId: "7p3N3MrYTEc",
  },
  {
    title: "Elephant",
    artist: "Tame Impala",
    duration: "3:31",
    spotifyUrl: "https://open.spotify.com/track/4HLznoFMRFOoE0UuARQSoC",
    youtubeId: "P_vXyMHCb3o",
  },
  {
    title: "Lost In Yesterday",
    artist: "Tame Impala",
    duration: "3:43",
    spotifyUrl: "https://open.spotify.com/track/5JCoSi02qi3jJeHdZXMmR8",
    youtubeId: "g3AqSy5ZUFA",
  },
  {
    title: "Breathe Deeper",
    artist: "Tame Impala",
    duration: "5:47",
    spotifyUrl: "https://open.spotify.com/track/7fNHUboAlsyoXfXnOb3Ro7",
    youtubeId: "ACSVZ8Tn9Ko",
  },
  {
    title: "Is It True",
    artist: "Tame Impala",
    duration: "3:45",
    spotifyUrl: "https://open.spotify.com/track/3OwdyOsJPkEkqlSEz87BFh",
    youtubeId: "6BuHVNBnwOE",
  },
  {
    title: "It Might Be Time",
    artist: "Tame Impala",
    duration: "4:16",
    spotifyUrl: "https://open.spotify.com/track/0lSWGMzaLi4bBIJTgPrq5u",
    youtubeId: "7qrAXk9FRTg",
  },
  {
    title: "Borderline",
    artist: "Tame Impala",
    duration: "3:53",
    spotifyUrl: "https://open.spotify.com/track/3Xc3TCo2tQFjFBFaqFE7V3",
    youtubeId: "CQM8M0AaEsI",
  },
  {
    title: "On Track",
    artist: "Tame Impala",
    duration: "4:13",
    spotifyUrl: "https://open.spotify.com/track/6h4X5BaIgzrFRLJIzO3h5m",
    youtubeId: "3ZDaEJPHJfE",
  },
  {
    title: "One More Year",
    artist: "Tame Impala",
    duration: "4:26",
    spotifyUrl: "https://open.spotify.com/track/4vBzXxlEjXXZt5w6a4r4q5",
    youtubeId: "jdR0eBIFMus",
  },
  {
    title: "Posthumous Forgiveness",
    artist: "Tame Impala",
    duration: "5:21",
    spotifyUrl: "https://open.spotify.com/track/4nCGhvh4YFpFLNHTHBiLTr",
    youtubeId: "yVAYnIaP5rk",
  },
  {
    title: "Patience",
    artist: "Tame Impala",
    duration: "5:10",
    spotifyUrl: "https://open.spotify.com/track/2BTZIqlo8icHNmBtJPmPeP",
    youtubeId: "djqJNVKuRPs",
  },
  {
    title: "Apocalypse Dreams",
    artist: "Tame Impala",
    duration: "5:67",
    spotifyUrl: "https://open.spotify.com/track/5nAFGiKFqpJn7bKoqZhBGT",
    youtubeId: "siwIMXlYJDI",
  },
  {
    title: "Mind Mischief",
    artist: "Tame Impala",
    duration: "4:53",
    spotifyUrl: "https://open.spotify.com/track/3UMLQzSFiRZeJcmRg2cyFQ",
    youtubeId: "IiNNn5oJQko",
  },
  {
    title: "Why Won't They Talk to Me?",
    artist: "Tame Impala",
    duration: "3:59",
    spotifyUrl: "https://open.spotify.com/track/4vl9fkDpIzAqb96NxhXMGJ",
    youtubeId: "d-Z5BpF23qM",
  },
  {
    title: "Music to Walk Home By",
    artist: "Tame Impala",
    duration: "4:57",
    spotifyUrl: "https://open.spotify.com/track/3loPWrKHXKCdGWnYnpTJhp",
    youtubeId: "JhBL1gTyHJ4",
  },
  {
    title: "Keep On Lying",
    artist: "Tame Impala",
    duration: "6:43",
    spotifyUrl: "https://open.spotify.com/track/5mEHRCdYsJgjXuN2mJMfRg",
    youtubeId: "GVJlJTnLBsc",
  },
  {
    title: "Endors Toi",
    artist: "Tame Impala",
    duration: "4:07",
    spotifyUrl: "https://open.spotify.com/track/5O2LNZW4CJlBxHiU0iFuKe",
    youtubeId: "BPSFEBg-nho",
  },
  {
    title: "Solitude Is Bliss",
    artist: "Tame Impala",
    duration: "4:05",
    spotifyUrl: "https://open.spotify.com/track/0vAUZFrPoiN4CZ4PNmaSij",
    youtubeId: "aJHRRJkDYy0",
  },
  {
    title: "Be Above It",
    artist: "Tame Impala",
    duration: "3:30",
    spotifyUrl: "https://open.spotify.com/track/1L5qKrHt4g6HkAaW8FQLEW",
    youtubeId: "tWvY2Ee2VMg",
  },
  {
    title: "Lucidity",
    artist: "Tame Impala",
    duration: "4:48",
    spotifyUrl: "https://open.spotify.com/track/0YnUzD1H31E4LPIPiCsKY3",
    youtubeId: "7i0Uq6e0hHw",
  },
  {
    title: "Half Full Glass of Wine",
    artist: "Tame Impala",
    duration: "3:24",
    spotifyUrl: "https://open.spotify.com/track/4c0Ku4sSwdNj2Vc5R4DPQB",
    youtubeId: "qT7K2i1j7xo",
  },
  {
    title: "Yes I'm Changing",
    artist: "Tame Impala",
    duration: "4:24",
    spotifyUrl: "https://open.spotify.com/track/2gNfxysfBRfl9Lvi9T3v6R",
    youtubeId: "lFX6d0x0Yrs",
  },
  {
    title: "Past Life",
    artist: "Tame Impala",
    duration: "3:47",
    spotifyUrl: "https://open.spotify.com/track/7JChKX9BbLx3gGaGFBzf9s",
    youtubeId: "JlUm7mAKXKw",
  },
  {
    title: "Reality in Motion",
    artist: "Tame Impala",
    duration: "4:12",
    spotifyUrl: "https://open.spotify.com/track/6jtFCFyX0gVQbGQNvbAIqt",
    youtubeId: "b0TnXA2nKBo",
  },
  {
    title: "The Moment",
    artist: "Tame Impala",
    duration: "4:00",
    spotifyUrl: "https://open.spotify.com/track/0Eo7ggUgNJQLCpb4O8o1B4",
    youtubeId: "iF4Bc-7nRn4",
  },
  {
    title: "Love / Paranoia",
    artist: "Tame Impala",
    duration: "2:57",
    spotifyUrl: "https://open.spotify.com/track/2sMvkALFzE1JidKgCJxXkk",
    youtubeId: "q6W3A4BCFDA",
  },
  {
    title: "'Cause I'm a Man",
    artist: "Tame Impala",
    duration: "3:33",
    spotifyUrl: "https://open.spotify.com/track/6XVz1VJxKuIqbR9i1xzLGS",
    youtubeId: "gZeQuGZgIMc",
  },
  {
    title: "Gossip",
    artist: "Tame Impala",
    duration: "3:44",
    spotifyUrl: "https://open.spotify.com/track/1j3hLlEIUUVvwBl1FZ8rFQ",
    youtubeId: "Uo4TF7SGLMM",
  },
  {
    title: "No Choice",
    artist: "Tame Impala",
    duration: "3:20",
    spotifyUrl: "https://open.spotify.com/track/6gV0uFJSh9qJmAvlMPG6O3",
    youtubeId: "5bCcfkSABKs",
  },
  {
    title: "Alter Ego",
    artist: "Tame Impala",
    duration: "4:50",
    spotifyUrl: "https://open.spotify.com/track/5ZgfvEpvNRhSz5OkbqcDmv",
    youtubeId: "lsWXUmJCiH8",
  },
  {
    title: "Runway, Houses, City, Clouds",
    artist: "Tame Impala",
    duration: "5:31",
    spotifyUrl: "https://open.spotify.com/track/1AuGfJkuLBgrdIi8y5R3kk",
    youtubeId: "BZ2_1GtoFpY",
  },
  {
    title: "Nothing That Has Happened So Far",
    artist: "Tame Impala",
    duration: "6:29",
    spotifyUrl: "https://open.spotify.com/track/0UkjMuNjIlQmkIDc6BFYCS",
    youtubeId: "YuIE-xzA81k",
  },
  {
    title: "Sun's Coming Up",
    artist: "Tame Impala",
    duration: "3:16",
    spotifyUrl: "https://open.spotify.com/track/6Jzq2PtBrEH6p9MFsqmrAl",
    youtubeId: "r-eoiMFk-Ls",
  },
  {
    title: "Led Zeppelin",
    artist: "Tame Impala",
    duration: "2:16",
    spotifyUrl: "https://open.spotify.com/track/4X9e2DxW9OQ9KXv2SdS0ZM",
    youtubeId: "L9YGkWN_S3M",
  },
  {
    title: "Disciples",
    artist: "Tame Impala",
    duration: "2:13",
    spotifyUrl: "https://open.spotify.com/track/5GrC0wCXBxZzxNq0SKUGv0",
    youtubeId: "C1ib7wrA0Zo",
  },
  {
    title: "Cause I'm a Man (Reprise)",
    artist: "Tame Impala",
    duration: "1:47",
    spotifyUrl: "https://open.spotify.com/track/2Q9mf9vQ4l1h2dD4t6XHVP",
    youtubeId: "gZeQuGZgIMc",
  },
  {
    title: "Nangs",
    artist: "Tame Impala",
    duration: "1:46",
    spotifyUrl: "https://open.spotify.com/track/5fNFBJoJEEEPOAbNRRhGDI",
    youtubeId: "rUCAbCMKQoI",
  },
  {
    title: "The Bold Arrow of Time",
    artist: "Tame Impala",
    duration: "3:04",
    spotifyUrl: "https://open.spotify.com/track/1oi7cDHTHXVJt2cAT0x6bD",
    youtubeId: "oW7DCBQ3R2o",
  },
  {
    title: "Desire Be Desire Go",
    artist: "Tame Impala",
    duration: "3:27",
    spotifyUrl: "https://open.spotify.com/track/5FKOC0GUDcQJdOxZ6WIy7E",
    youtubeId: "3yf6qh6NWnQ",
  },
  {
    title: "I Don't Really Mind",
    artist: "Tame Impala",
    duration: "3:48",
    spotifyUrl: "https://open.spotify.com/track/2lS0sLNDrDHxP7hpnxOiLO",
    youtubeId: "dXjlDFaS7AM",
  },
  {
    title: "Wander",
    artist: "Tame Impala",
    duration: "2:44",
    spotifyUrl: "https://open.spotify.com/track/4dWJXRhJ8D2N5YUlPtBNiF",
    youtubeId: "iqvjNIhJBSs",
  },
];

const drakeTracks: Track[] = [
  {
    title: "God's Plan",
    artist: "Drake",
    youtubeId: "xpVfcZ0ZcFM",
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
    youtubeId: "iuP8KnJDHFc",
  },
  {
    title: "In My Feelings",
    artist: "Drake",
    duration: "3:37",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
    youtubeId: "DRS_PpOrUZ4",
  },
  {
    title: "Passionfruit",
    artist: "Drake",
    duration: "4:44",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
    youtubeId: "3QSNm5kUhOA",
  },
  {
    title: "Hold On We're Going Home",
    artist: "Drake",
    duration: "3:47",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
    youtubeId: "C17ANHy_EHk",
  },
  {
    title: "Started From the Bottom",
    artist: "Drake",
    duration: "3:09",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
    youtubeId: "RubFoFYIFdI",
  },
  {
    title: "Best I Ever Had",
    artist: "Drake",
    duration: "4:16",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
    youtubeId: "A0giTbD6VXc",
  },
  {
    title: "Take Care",
    artist: "Drake",
    duration: "4:36",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
    youtubeId: "MZd9Huf7WEE",
  },
  {
    title: "Controlla",
    artist: "Drake",
    duration: "3:33",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
    youtubeId: "6kAiUgTxBjg",
  },
  {
    title: "Nice For What",
    artist: "Drake",
    duration: "3:30",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
    youtubeId: "U9BU5CVkyOo",
  },
  {
    title: "Toosie Slide",
    artist: "Drake",
    duration: "4:04",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
    youtubeId: "xWggTb45brM",
  },
  {
    title: "Rich Flex",
    artist: "Drake",
    duration: "3:08",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
    youtubeId: "wWBmvH5UG0w",
  },
  {
    title: "Jimmy Cooks",
    artist: "Drake",
    duration: "3:40",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
    youtubeId: "DWkEYFqJqRo",
  },
  {
    title: "Texts Go Green",
    artist: "Drake",
    duration: "3:17",
    spotifyUrl: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
    youtubeId: "xS22y5gY-gc",
  },
];

const pinkFloydTracks: Track[] = [
  {
    title: "Comfortably Numb",
    artist: "Pink Floyd",
    duration: "6:23",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
    youtubeId: "vJAqNSHX6Rs",
  },
  {
    title: "Wish You Were Here",
    artist: "Pink Floyd",
    duration: "5:40",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
    youtubeId: "6mqEB4JFCfY",
  },
  {
    title: "Another Brick in the Wall",
    artist: "Pink Floyd",
    duration: "3:59",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
    youtubeId: "YR5ApYxkU-U",
  },
  {
    title: "Time",
    artist: "Pink Floyd",
    duration: "6:53",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
    youtubeId: "JwYX52BP2Sk",
  },
  {
    title: "Money",
    artist: "Pink Floyd",
    duration: "6:23",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
    youtubeId: "cpbbuaIA_Bg",
  },
  {
    title: "Hey You",
    artist: "Pink Floyd",
    duration: "4:40",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
    youtubeId: "9DKXxsRLCDc",
  },
  {
    title: "Us and Them",
    artist: "Pink Floyd",
    duration: "7:49",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
    youtubeId: "LMH2sYDeORY",
  },
  {
    title: "Shine On You Crazy Diamond",
    artist: "Pink Floyd",
    duration: "13:30",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
    youtubeId: "54W8kktFE_o",
  },
  {
    title: "Brain Damage",
    artist: "Pink Floyd",
    duration: "3:49",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
    youtubeId: "b3eXjCYpPFA",
  },
  {
    title: "The Great Gig in the Sky",
    artist: "Pink Floyd",
    duration: "4:44",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
    youtubeId: "k9ynIXcBAsQ",
  },
  {
    title: "Breathe",
    artist: "Pink Floyd",
    duration: "2:50",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
    youtubeId: "vBSAZbNEMkA",
  },
  {
    title: "Dogs",
    artist: "Pink Floyd",
    duration: "17:05",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
    youtubeId: "SuCGDEHgKgM",
  },
  {
    title: "Pigs",
    artist: "Pink Floyd",
    duration: "11:28",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
    youtubeId: "pHIL4gANVvE",
  },
  {
    title: "Run Like Hell",
    artist: "Pink Floyd",
    duration: "4:20",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
    youtubeId: "mO7bRSbCpP4",
  },
  {
    title: "Learning to Fly",
    artist: "Pink Floyd",
    duration: "4:53",
    spotifyUrl: "https://open.spotify.com/artist/0k17h0D3J5VfsdmQ1iZtE9",
    youtubeId: "_8mZoSMHfxs",
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
    youtubeId: "oRdxUFDoQe0",
  },
  {
    title: "Smooth Criminal",
    artist: "Michael Jackson",
    duration: "4:17",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
    youtubeId: "h_D3VFfhvs4",
  },
  {
    title: "Man in the Mirror",
    artist: "Michael Jackson",
    duration: "5:18",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
    youtubeId: "PivWY9wn5ps",
  },
  {
    title: "Black or White",
    artist: "Michael Jackson",
    duration: "4:16",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
    youtubeId: "F2AitTPI5U0",
  },
  {
    title: "Don't Stop 'Til You Get Enough",
    artist: "Michael Jackson",
    duration: "6:04",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
    youtubeId: "yURRmWtbTbo",
  },
  {
    title: "PYT",
    artist: "Michael Jackson",
    duration: "3:58",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
    youtubeId: "PpRxsEbRKzg",
  },
  {
    title: "Rock With You",
    artist: "Michael Jackson",
    duration: "3:40",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
    youtubeId: "5X4n0aboVUs",
  },
  {
    title: "Bad",
    artist: "Michael Jackson",
    duration: "4:07",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
    youtubeId: "dsUXAEzaC3Q",
  },
  {
    title: "Human Nature",
    artist: "Michael Jackson",
    duration: "4:06",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
    youtubeId: "AT6jMn9BhE0",
  },
  {
    title: "Wanna Be Startin' Somethin'",
    artist: "Michael Jackson",
    duration: "6:02",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
    youtubeId: "A-8KA_fUMqQ",
  },
  {
    title: "Earth Song",
    artist: "Michael Jackson",
    duration: "6:46",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
    youtubeId: "XAi3VTSdTxU",
  },
  {
    title: "You Are Not Alone",
    artist: "Michael Jackson",
    duration: "5:39",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
    youtubeId: "xU6DtfXmRJ8",
  },
  {
    title: "Remember the Time",
    artist: "Michael Jackson",
    duration: "3:59",
    spotifyUrl: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
    youtubeId: "LeiFF0jDlqA",
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
    youtubeId: "hZd5eFDuDI0",
  },
  {
    title: "A New Morning",
    artist: "Au5",
    duration: "5:33",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
    youtubeId: "VwJfFE8MRYQ",
  },
  {
    title: "Closer",
    artist: "Au5",
    duration: "4:22",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
    youtubeId: "hEuWm4glgOM",
  },
  {
    title: "Proximity",
    artist: "Au5",
    duration: "5:01",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
    youtubeId: "qvP7R7p9jto",
  },
  {
    title: "Tidal Wave",
    artist: "Au5",
    duration: "4:55",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
    youtubeId: "IqaLByoQVVc",
  },
  {
    title: "Kaleidoscope",
    artist: "Au5",
    duration: "5:17",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
    youtubeId: "Lnn3jKY5t24",
  },
  {
    title: "Stars Align",
    artist: "Au5",
    duration: "4:44",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
    youtubeId: "8Q8aFj2kNIE",
  },
  {
    title: "Reflection",
    artist: "Au5",
    duration: "5:08",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
    youtubeId: "y5FNqVl2ZSY",
  },
  {
    title: "Paper Skies",
    artist: "Au5",
    duration: "4:37",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
    youtubeId: "f7oGtYg7OFo",
  },
  {
    title: "Reach",
    artist: "Au5",
    duration: "4:59",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
    youtubeId: "ZFaW-xyFT5g",
  },
  {
    title: "Without You",
    artist: "Au5",
    duration: "5:24",
    spotifyUrl: "https://open.spotify.com/artist/5yqndF4ibFUEBxFAj8X0XD",
    youtubeId: "sSPbStVfqh0",
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
    youtubeId: "cWCMFHb2MJo",
  },
  {
    title: "Feather",
    artist: "Sabrina Carpenter",
    duration: "2:59",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
    youtubeId: "H_8TBzJjm4A",
  },
  {
    title: "Bad for Business",
    artist: "Sabrina Carpenter",
    duration: "2:52",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
    youtubeId: "HlW-t2DVkeA",
  },
  {
    title: "because i liked a boy",
    artist: "Sabrina Carpenter",
    duration: "2:41",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
    youtubeId: "z2qMv_4vViA",
  },
  {
    title: "Skin",
    artist: "Sabrina Carpenter",
    duration: "3:01",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
    youtubeId: "RqFf5wITLDM",
  },
  {
    title: "emails i can't send",
    artist: "Sabrina Carpenter",
    duration: "3:26",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
    youtubeId: "rF7oXFQmPbw",
  },
  {
    title: "Read My Mind",
    artist: "Sabrina Carpenter",
    duration: "3:15",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
    youtubeId: "9F0q2jvETdY",
  },
  {
    title: "Fast Times",
    artist: "Sabrina Carpenter",
    duration: "3:11",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
    youtubeId: "c6-hHH0UXdE",
  },
  {
    title: "Vicious",
    artist: "Sabrina Carpenter",
    duration: "2:48",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
    youtubeId: "nthvtulOGrc",
  },
  {
    title: "Coincidence",
    artist: "Sabrina Carpenter",
    duration: "3:22",
    spotifyUrl: "https://open.spotify.com/artist/74KM79TiuVKeVCqs8QtB0B",
    youtubeId: "l7yBxRpqJAM",
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
    youtubeId: "k2qgadSvNru",
  },
  {
    title: "Physical",
    artist: "Dua Lipa",
    duration: "3:13",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
    youtubeId: "9HDEHj2yzew",
  },
  {
    title: "One Kiss",
    artist: "Dua Lipa",
    duration: "3:34",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
    youtubeId: "DkeiKbqa02g",
  },
  {
    title: "Break My Heart",
    artist: "Dua Lipa",
    duration: "3:41",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
    youtubeId: "Nj2U6rhnucI",
  },
  {
    title: "IDGAF",
    artist: "Dua Lipa",
    duration: "3:33",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
    youtubeId: "V9tTaHMO4m8",
  },
  {
    title: "Hotter than Hell",
    artist: "Dua Lipa",
    duration: "3:31",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
    youtubeId: "kV9YNCoL3KI",
  },
  {
    title: "Be the One",
    artist: "Dua Lipa",
    duration: "3:43",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
    youtubeId: "_bdVTPNh7cg",
  },
  {
    title: "Hallucinate",
    artist: "Dua Lipa",
    duration: "3:28",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
    youtubeId: "jT5HWnW6ha0",
  },
  {
    title: "Love Again",
    artist: "Dua Lipa",
    duration: "4:31",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
    youtubeId: "AOeNGCEzYI8",
  },
  {
    title: "Training Season",
    artist: "Dua Lipa",
    duration: "3:05",
    spotifyUrl: "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we",
    youtubeId: "AYJHh8kMSmk",
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
    youtubeId: "TZIJLOtHvh8",
  },
  {
    title: "she's all i wanna be",
    artist: "Tate McRae",
    duration: "2:29",
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
    youtubeId: "FDO_uu9flgc",
  },
  {
    title: "2 hands",
    artist: "Tate McRae",
    duration: "2:57",
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
    youtubeId: "mvPTILMRBKg",
  },
  {
    title: "chaotic",
    artist: "Tate McRae",
    duration: "2:40",
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
    youtubeId: "8iGEyTiVWuU",
  },
  {
    title: "stupid",
    artist: "Tate McRae",
    duration: "2:58",
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
    youtubeId: "WYc-nYV-oac",
  },
  {
    title: "working",
    artist: "Tate McRae",
    duration: "3:06",
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
    youtubeId: "p_OBbLqMYnY",
  },
  {
    title: "boy stopped calling",
    artist: "Tate McRae",
    duration: "2:53",
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
    youtubeId: "r5RHePHKuSs",
  },
  {
    title: "what would you do?",
    artist: "Tate McRae",
    duration: "3:18",
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
    youtubeId: "xmFEMFRxazU",
  },
  {
    title: "2WEI",
    artist: "Tate McRae",
    duration: "2:45",
    spotifyUrl: "https://open.spotify.com/artist/45dkTj5sMRSjrmBSBeiHym",
    youtubeId: "6j0c7xPDMkY",
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
    youtubeId: "jqUkXHJNnR0",
  },
];

const sherylCrowTracks: Track[] = [
  {
    title: "All I Wanna Do",
    artist: "Sheryl Crow",
    duration: "4:33",
    youtubeId: "QKMm2s4wJO4",
  },
  {
    title: "If It Makes You Happy",
    artist: "Sheryl Crow",
    duration: "4:33",
    youtubeId: "PbFt1L0TIi4",
  },
  {
    title: "Strong Enough",
    artist: "Sheryl Crow",
    duration: "3:10",
    youtubeId: "O0_jYFBKUjo",
  },
  {
    title: "Everyday Is a Winding Road",
    artist: "Sheryl Crow",
    duration: "3:47",
    youtubeId: "xUBWM3PNRpI",
  },
  {
    title: "My Favorite Mistake",
    artist: "Sheryl Crow",
    duration: "4:04",
    youtubeId: "n1bX8gAj5KU",
  },
  {
    title: "Soak Up the Sun",
    artist: "Sheryl Crow",
    duration: "4:48",
    youtubeId: "_mzUIe7Lm6E",
  },
  {
    title: "The First Cut Is the Deepest",
    artist: "Sheryl Crow",
    duration: "3:52",
    youtubeId: "HECdM07A5Vw",
  },
  {
    title: "Run Baby Run",
    artist: "Sheryl Crow",
    duration: "4:15",
    youtubeId: "f-01GaZqM7s",
  },
  {
    title: "Leaving Las Vegas",
    artist: "Sheryl Crow",
    duration: "5:45",
    youtubeId: "l3_aHX5YIXM",
  },
  {
    title: "Hard to Make a Stand",
    artist: "Sheryl Crow",
    duration: "4:14",
    youtubeId: "Z6ksaLY0DMA",
  },
  {
    title: "Home",
    artist: "Sheryl Crow",
    duration: "3:08",
    youtubeId: "1VQQHNDFlbQ",
  },
  {
    title: "Are You Strong Enough",
    artist: "Sheryl Crow",
    duration: "4:04",
    youtubeId: "r8wWmUVBzgM",
  },
];

const theWeekndTracks: Track[] = [
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: "3:22",
    youtubeId: "4NRXx6pOFa0",
  },
  {
    title: "Save Your Tears",
    artist: "The Weeknd",
    duration: "3:35",
    youtubeId: "LIIDh-qI9oI",
  },
  {
    title: "Starboy",
    artist: "The Weeknd",
    duration: "3:50",
    youtubeId: "34Na4j8AVgA",
  },
  {
    title: "Can't Feel My Face",
    artist: "The Weeknd",
    duration: "3:35",
    youtubeId: "KEI4qSrkPAs",
  },
  {
    title: "The Hills",
    artist: "The Weeknd",
    duration: "3:55",
    youtubeId: "yzTuBuRdAyA",
  },
  {
    title: "After Hours",
    artist: "The Weeknd",
    duration: "6:01",
    youtubeId: "SkHBHSiCa9E",
  },
  {
    title: "Heartless",
    artist: "The Weeknd",
    duration: "3:18",
    youtubeId: "1W-mRPXTNEo",
  },
  {
    title: "Die For You",
    artist: "The Weeknd",
    duration: "4:20",
    youtubeId: "mGTe_uN8HlI",
  },
  {
    title: "Call Out My Name",
    artist: "The Weeknd",
    duration: "3:47",
    youtubeId: "P9KTLiZ2bF0",
  },
  {
    title: "Often",
    artist: "The Weeknd",
    duration: "4:08",
    youtubeId: "0G3_kG5FFfQ",
  },
  {
    title: "In Your Eyes",
    artist: "The Weeknd",
    duration: "3:57",
    youtubeId: "dqRZDebPIGs",
  },
  {
    title: "Earned It",
    artist: "The Weeknd",
    duration: "4:03",
    youtubeId: "waU75jdUnYw",
  },
];

const billieEilishTracks: Track[] = [
  {
    title: "bad guy",
    artist: "Billie Eilish",
    duration: "3:14",
    youtubeId: "DyDfgMOUjCI",
  },
  {
    title: "Happier Than Ever",
    artist: "Billie Eilish",
    duration: "4:58",
    youtubeId: "5GJWxDKyk3A",
  },
  {
    title: "lovely",
    artist: "Billie Eilish",
    duration: "3:20",
    youtubeId: "AkQzh51Aav8",
  },
  {
    title: "when the party's over",
    artist: "Billie Eilish",
    duration: "3:16",
    youtubeId: "pbMwTqkKSps",
  },
  {
    title: "ocean eyes",
    artist: "Billie Eilish",
    duration: "3:21",
    youtubeId: "viimfQi_pUw",
  },
  {
    title: "Therefore I Am",
    artist: "Billie Eilish",
    duration: "2:54",
    youtubeId: "RUCo-QBaJO0",
  },
  {
    title: "Bellyache",
    artist: "Billie Eilish",
    duration: "2:43",
    youtubeId: "TKBqnNnYV50",
  },
  {
    title: "everything i wanted",
    artist: "Billie Eilish",
    duration: "4:05",
    youtubeId: "EgBJmlPo8Xk",
  },
  {
    title: "No Time To Die",
    artist: "Billie Eilish",
    duration: "4:04",
    youtubeId: "GB_S2qFh5lU",
  },
  {
    title: "Your Power",
    artist: "Billie Eilish",
    duration: "4:03",
    youtubeId: "HQmmM_qwG8k",
  },
  {
    title: "Skinny",
    artist: "Billie Eilish",
    duration: "3:32",
    youtubeId: "dK2bSuP-lGs",
  },
  {
    title: "What Was I Made For",
    artist: "Billie Eilish",
    duration: "3:42",
    youtubeId: "xEeFrLSkMm8",
  },
];

const edSheeranTracks: Track[] = [
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    duration: "3:53",
    youtubeId: "JGwWNGJdvx8",
  },
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    duration: "4:23",
    youtubeId: "2Vv-BfVoq4g",
  },
  {
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    duration: "4:41",
    youtubeId: "lp-EO5I60KA",
  },
  {
    title: "Photograph",
    artist: "Ed Sheeran",
    duration: "4:19",
    youtubeId: "nSDgHBxUbVQ",
  },
  {
    title: "Castle on the Hill",
    artist: "Ed Sheeran",
    duration: "4:21",
    youtubeId: "K0ibBPhiaG0",
  },
  {
    title: "Shivers",
    artist: "Ed Sheeran",
    duration: "3:27",
    youtubeId: "Kt8AFKFax2k",
  },
  {
    title: "Bad Habits",
    artist: "Ed Sheeran",
    duration: "3:51",
    youtubeId: "orJSJGHjBLI",
  },
  {
    title: "Galway Girl",
    artist: "Ed Sheeran",
    duration: "2:50",
    youtubeId: "QddPDKhbC3s",
  },
  {
    title: "Happier",
    artist: "Ed Sheeran",
    duration: "3:27",
    youtubeId: "eFLFEz8i3sg",
  },
  {
    title: "Don't",
    artist: "Ed Sheeran",
    duration: "3:40",
    youtubeId: "D01NqOJ_fyY",
  },
  {
    title: "Lego House",
    artist: "Ed Sheeran",
    duration: "3:04",
    youtubeId: "c4BLVznuWnU",
  },
  {
    title: "Give Me Love",
    artist: "Ed Sheeran",
    duration: "5:06",
    youtubeId: "MgZtUxPZNyw",
  },
];

const taylorSwiftTracks: Track[] = [
  {
    title: "Anti-Hero",
    artist: "Taylor Swift",
    duration: "3:20",
    youtubeId: "b1kbLwvqugk",
  },
  {
    title: "Shake It Off",
    artist: "Taylor Swift",
    duration: "3:39",
    youtubeId: "nfWlot6h_JM",
  },
  {
    title: "Blank Space",
    artist: "Taylor Swift",
    duration: "3:51",
    youtubeId: "e-ORhEE9VVg",
  },
  {
    title: "Love Story",
    artist: "Taylor Swift",
    duration: "3:55",
    youtubeId: "8xg3vE8Ie_E",
  },
  {
    title: "You Belong With Me",
    artist: "Taylor Swift",
    duration: "3:51",
    youtubeId: "VuNIsY6JdUw",
  },
  {
    title: "Cruel Summer",
    artist: "Taylor Swift",
    duration: "2:58",
    youtubeId: "ic8j13piAhQ",
  },
  {
    title: "Style",
    artist: "Taylor Swift",
    duration: "3:51",
    youtubeId: "HFGOBsJ2Pck",
  },
  {
    title: "cardigan",
    artist: "Taylor Swift",
    duration: "3:59",
    youtubeId: "K-a8s8OLBSE",
  },
  {
    title: "All Too Well",
    artist: "Taylor Swift",
    duration: "5:28",
    youtubeId: "tollGa3S6bc",
  },
  {
    title: "22",
    artist: "Taylor Swift",
    duration: "3:52",
    youtubeId: "AgFeZr5ptV8",
  },
  {
    title: "Wildest Dreams",
    artist: "Taylor Swift",
    duration: "3:40",
    youtubeId: "IdneKLhsWOQ",
  },
  {
    title: "Delicate",
    artist: "Taylor Swift",
    duration: "3:52",
    youtubeId: "tCXGJQYZ9JA",
  },
];

const coldplayTracks: Track[] = [
  {
    title: "Yellow",
    artist: "Coldplay",
    duration: "4:29",
    youtubeId: "yKNxeF4KMsY",
  },
  {
    title: "The Scientist",
    artist: "Coldplay",
    duration: "5:09",
    youtubeId: "RB-RcX5DS5A",
  },
  {
    title: "Fix You",
    artist: "Coldplay",
    duration: "4:55",
    youtubeId: "k4V3Mo61fJM",
  },
  {
    title: "A Sky Full of Stars",
    artist: "Coldplay",
    duration: "4:27",
    youtubeId: "VPRjCeoBqrI",
  },
  {
    title: "Viva la Vida",
    artist: "Coldplay",
    duration: "4:01",
    youtubeId: "dvgZkm1xWPE",
  },
  {
    title: "Clocks",
    artist: "Coldplay",
    duration: "5:07",
    youtubeId: "d020hcWA_Ww",
  },
  {
    title: "Speed of Sound",
    artist: "Coldplay",
    duration: "4:48",
    youtubeId: "LFGLL6f6UfQ",
  },
  {
    title: "Paradise",
    artist: "Coldplay",
    duration: "4:38",
    youtubeId: "1G4isv_Fylg",
  },
  {
    title: "Sparks",
    artist: "Coldplay",
    duration: "3:47",
    youtubeId: "YvWTBhqEdBc",
  },
  {
    title: "Trouble",
    artist: "Coldplay",
    duration: "4:30",
    youtubeId: "9S1UGMEoiLc",
  },
  {
    title: "In My Place",
    artist: "Coldplay",
    duration: "3:57",
    youtubeId: "hEp7AuXxuQk",
  },
  {
    title: "My Universe",
    artist: "Coldplay",
    duration: "3:58",
    youtubeId: "nOABniHyeY0",
  },
];

const arianaGrandeTracks: Track[] = [
  {
    title: "thank u, next",
    artist: "Ariana Grande",
    duration: "3:27",
    youtubeId: "gl1aHhXnN1k",
  },
  {
    title: "7 rings",
    artist: "Ariana Grande",
    duration: "2:58",
    youtubeId: "QYh6mYIJG2Y",
  },
  {
    title: "no tears left to cry",
    artist: "Ariana Grande",
    duration: "3:26",
    youtubeId: "ffxKSjfjcuc",
  },
  {
    title: "positions",
    artist: "Ariana Grande",
    duration: "2:52",
    youtubeId: "tcYodQoapMg",
  },
  {
    title: "God is a woman",
    artist: "Ariana Grande",
    duration: "3:18",
    youtubeId: "kHLHSlExFis",
  },
  {
    title: "Problem",
    artist: "Ariana Grande",
    duration: "3:33",
    youtubeId: "iS1g8SpkdjY",
  },
  {
    title: "Side to Side",
    artist: "Ariana Grande",
    duration: "3:23",
    youtubeId: "SXiSVQZLje8",
  },
  {
    title: "Into You",
    artist: "Ariana Grande",
    duration: "4:03",
    youtubeId: "9CgCrSMGqKs",
  },
  {
    title: "One Last Time",
    artist: "Ariana Grande",
    duration: "3:21",
    youtubeId: "2FPiYH4KLHY",
  },
  {
    title: "Break Free",
    artist: "Ariana Grande",
    duration: "3:49",
    youtubeId: "fdq1OV-XelU",
  },
  {
    title: "breathin",
    artist: "Ariana Grande",
    duration: "3:32",
    youtubeId: "tFsMnWd5Kgc",
  },
  {
    title: "Dangerous Woman",
    artist: "Ariana Grande",
    duration: "3:55",
    youtubeId: "apPsJn5w6Bo",
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
  {
    name: "Sheryl Crow",
    genre: "Rock / Country",
    initials: "SC",
    listeners: "8.2M",
    latest: "Evolution",
    tags: ["Rock", "Country", "Classic"],
    trackCount: 12,
    isExternal: false,
  },
  {
    name: "The Weeknd",
    genre: "R&B / Pop",
    initials: "TW",
    listeners: "62.3M",
    latest: "After Hours",
    tags: ["R&B", "Pop", "Dark Pop"],
    trackCount: 12,
    isExternal: false,
  },
  {
    name: "Billie Eilish",
    genre: "Alt-Pop / Dark Pop",
    initials: "BE",
    listeners: "55.1M",
    latest: "Hit Me Hard and Soft",
    tags: ["Alt-Pop", "Indie", "Dark"],
    trackCount: 12,
    isExternal: false,
  },
  {
    name: "Ed Sheeran",
    genre: "Pop / Folk",
    initials: "ES",
    listeners: "68.4M",
    latest: "Subtract",
    tags: ["Pop", "Folk", "Acoustic"],
    trackCount: 12,
    isExternal: false,
  },
  {
    name: "Taylor Swift",
    genre: "Pop / Country",
    initials: "TS",
    listeners: "82.1M",
    latest: "The Tortured Poets Department",
    tags: ["Pop", "Country", "Indie"],
    trackCount: 12,
    isExternal: false,
  },
  {
    name: "Coldplay",
    genre: "Alternative Rock / Pop",
    initials: "CP",
    listeners: "43.7M",
    latest: "Moon Music",
    tags: ["Rock", "Alternative", "Pop"],
    trackCount: 12,
    isExternal: false,
  },
  {
    name: "Ariana Grande",
    genre: "Pop / R&B",
    initials: "AG",
    listeners: "71.8M",
    latest: "Eternal Sunshine",
    tags: ["Pop", "R&B", "Dance"],
    trackCount: 12,
    isExternal: false,
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const deleteMsg = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem("lunara_musician_chat", JSON.stringify(updated));
  };

  const confirmEdit = () => {
    if (!editingId || !editText.trim()) {
      setEditingId(null);
      return;
    }
    const updated = messages.map((m) =>
      m.id === editingId ? { ...m, text: editText.trim() } : m,
    );
    setMessages(updated);
    localStorage.setItem("lunara_musician_chat", JSON.stringify(updated));
    setEditingId(null);
    setEditText("");
  };
  const containerRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message change
  useEffect(() => {
    if (containerRef.current)
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
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
        ref={containerRef}
        className="max-h-96 overflow-y-auto p-4 space-y-3"
        style={{ minHeight: 0, maxHeight: "calc(100vh - 320px)" }}
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
            const isOwn = msg.username === username;
            const isEditing = editingId === msg.id;
            return (
              <div key={msg.id} className="group flex items-start gap-3">
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
                    {isOwn && !isEditing && (
                      <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(msg.id);
                            setEditText(msg.text);
                          }}
                          className="p-1 rounded-lg bg-white/10 hover:bg-accent/30 text-white/40 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteMsg(msg.id)}
                          className="p-1 rounded-lg bg-white/10 hover:bg-red-500/40 text-white/40 hover:text-red-300 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                  {isEditing ? (
                    <div className="flex items-center gap-1 mt-1">
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") confirmEdit();
                          if (e.key === "Escape") setEditingId(null);
                        }}
                        className="flex-1 bg-white/15 border border-accent/50 rounded-xl px-3 py-1.5 text-sm text-white outline-none min-w-0"
                      />
                      <button
                        type="button"
                        onClick={confirmEdit}
                        className="p-1 rounded-lg bg-accent/40 hover:bg-accent/60 text-white transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-white/80 break-words">
                      {msg.text}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
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
  { name: "Taylor Swift", seconds: 96000, initials: "TS" },
  { name: "Ed Sheeran", seconds: 88200, initials: "ES" },
  { name: "Ariana Grande", seconds: 82800, initials: "AG" },
  { name: "The Weeknd", seconds: 79200, initials: "TW" },
  { name: "Drake", seconds: 72000, initials: "DR" },
  { name: "Tame Impala", seconds: 65400, initials: "TI" },
  { name: "Coldplay", seconds: 61200, initials: "CP" },
  { name: "Billie Eilish", seconds: 57600, initials: "BE" },
  { name: "Dua Lipa", seconds: 54000, initials: "DL" },
  { name: "Pink Floyd", seconds: 50400, initials: "PF" },
  { name: "Michael Jackson", seconds: 46800, initials: "MJ" },
  { name: "Sabrina Carpenter", seconds: 43200, initials: "SC" },
  { name: "Au5", seconds: 36000, initials: "A5" },
  { name: "Tate McRae", seconds: 32400, initials: "TM" },
  { name: "Sheryl Crow", seconds: 28800, initials: "SH" },
];

function CreatePlaylistButton({
  createPlaylist,
}: { createPlaylist: (name: string) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90"
        data-ocid="soundscape.create_playlist_button"
      >
        <ListPlus className="w-4 h-4 mr-2" />
        Create Playlist
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glass-card rounded-2xl border border-white/10 p-6 w-80 shadow-2xl">
            <h3 className="text-lg font-bold text-foreground mb-4">
              New Playlist
            </h3>
            <input
              type="text"
              className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-foreground placeholder-white/40 text-sm mb-4 outline-none focus:border-accent/60"
              placeholder="Playlist name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && name.trim()) {
                  createPlaylist(name.trim());
                  setName("");
                  setOpen(false);
                }
              }}
              data-ocid="soundscape.playlist_name_input"
            />
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-accent text-accent-foreground rounded-full hover:bg-accent/90"
                disabled={!name.trim()}
                onClick={() => {
                  createPlaylist(name.trim());
                  setName("");
                  setOpen(false);
                }}
                data-ocid="soundscape.create_playlist_confirm_button"
              >
                Create
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-white/20 text-white rounded-full hover:bg-white/10"
                onClick={() => setOpen(false)}
                data-ocid="soundscape.create_playlist_cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Soundscape() {
  const {
    nowPlaying,
    setNowPlaying,
    favorites,
    toggleFavorite,
    playlists,
    createPlaylist,
  } = useAudioPlayer();
  const [betaDismissed, setBetaDismissed] = useState(
    () => localStorage.getItem("soundscape_beta_seen") === "1",
  );

  const dismissBeta = () => {
    localStorage.setItem("soundscape_beta_seen", "1");
    setBetaDismissed(true);
  };

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
    "Sheryl Crow": sherylCrowTracks,
    "The Weeknd": theWeekndTracks,
    "Billie Eilish": billieEilishTracks,
    "Ed Sheeran": edSheeranTracks,
    "Taylor Swift": taylorSwiftTracks,
    Coldplay: coldplayTracks,
    "Ariana Grande": arianaGrandeTracks,
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
    // If the track already has youtubeId or audioSrc, use it directly
    if (track.youtubeId || track.audioSrc) {
      setNowPlaying(track);
      return;
    }
    // Otherwise look up the full track object (with youtubeId) from artist track arrays
    const allTracks = Object.values(allArtistTracks).flat();
    const found = allTracks.find(
      (t) =>
        t.title.toLowerCase() === track.title.toLowerCase() &&
        t.artist.toLowerCase() === track.artist.toLowerCase(),
    );
    setNowPlaying(found ?? track);
  };

  return (
    <div className={nowPlaying ? "pb-24" : ""}>
      {/* Beta Notice Banner */}
      {!betaDismissed && (
        <div
          className="mx-4 mt-4 sm:mx-6 lg:mx-8"
          style={{ maxWidth: "48rem", margin: "1rem auto 0" }}
        >
          <div
            className="flex items-start gap-3 px-4 py-3 rounded-2xl"
            style={{
              background: "rgba(107,0,173,0.25)",
              border: "1px solid rgba(180,100,255,0.35)",
              backdropFilter: "blur(16px)",
            }}
          >
            <span className="text-lg leading-none mt-0.5">🧪</span>
            <p className="flex-1 text-sm text-white/80 leading-snug">
              <span className="font-semibold text-white">Beta feature</span> —
              Soundscape is still in beta and might not work exactly as
              expected.
            </p>
            <button
              type="button"
              onClick={dismissBeta}
              className="shrink-0 text-white/40 hover:text-white transition-colors mt-0.5"
              aria-label="Dismiss"
              data-ocid="soundscape.close_button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
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

      {/* Favorites */}
      <section id="favorites" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Favorites</h2>
              <p className="text-white/50 text-sm">
                Tracks you&apos;ve hearted
              </p>
            </div>
          </div>
          {favorites.length === 0 ? (
            <div
              className="glass-card rounded-2xl border border-white/10 p-12 text-center"
              data-ocid="soundscape.favorites_empty_state"
            >
              <Heart className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/50">
                No favorites yet. Hit the ♥ on any track to save it here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {favorites.map((track, ti) => (
                <div
                  key={`fav-${track.title}-${track.artist}`}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer transition-colors group ${
                    nowPlaying?.title === track.title &&
                    nowPlaying?.artist === track.artist
                      ? "bg-accent/20 border border-accent/30"
                      : "hover:bg-white/10 border border-transparent"
                  }`}
                  onClick={() => playTrack(track)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") playTrack(track);
                  }}
                  data-ocid={`soundscape.favorites.item.${ti + 1}`}
                >
                  <div className="w-7 h-7 rounded-full glass-section flex items-center justify-center shrink-0">
                    <Play className="w-3 h-3 text-white/50 group-hover:text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-xs font-medium truncate">
                      {track.title}
                    </p>
                    <p className="text-white/50 text-xs truncate">
                      {track.artist}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(track);
                    }}
                    className="text-red-400 hover:text-red-300 transition-colors"
                    data-ocid={`soundscape.favorites.delete_button.${ti + 1}`}
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* My Playlists */}
      <section id="my-playlists" className="py-16 glass-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <ListPlus className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  My Playlists
                </h2>
                <p className="text-white/50 text-sm">
                  Your personal collections
                </p>
              </div>
            </div>
            <CreatePlaylistButton createPlaylist={createPlaylist} />
          </div>
          {playlists.length === 0 ? (
            <div
              className="glass-card rounded-2xl border border-white/10 p-12 text-center"
              data-ocid="soundscape.playlists_empty_state"
            >
              <ListPlus className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/50">
                No playlists yet. Create one and add tracks.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {playlists.map((pl, pi) => (
                <div
                  key={pl.name}
                  className="glass-card rounded-2xl border border-white/10 p-5"
                  data-ocid={`soundscape.my_playlists.item.${pi + 1}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full gradient-soundscape flex items-center justify-center text-xl shrink-0">
                      🎵
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {pl.name}
                      </p>
                      <p className="text-white/50 text-xs">
                        {pl.tracks.length} tracks
                      </p>
                    </div>
                  </div>
                  {pl.tracks.length === 0 ? (
                    <p className="text-white/30 text-xs text-center py-3">
                      No tracks yet — add from any track&apos;s ♥ player.
                    </p>
                  ) : (
                    <div className="space-y-1">
                      {pl.tracks.map((track, ti) => (
                        <button
                          type="button"
                          key={`${pl.name}-${track.title}-${ti}`}
                          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/08 transition-colors cursor-pointer group w-full text-left"
                          onClick={() => playTrack(track)}
                          data-ocid={`soundscape.my_playlists.item.${pi + 1}`}
                        >
                          <Play className="w-3 h-3 text-white/30 group-hover:text-accent shrink-0" />
                          <span className="flex-1 text-xs text-foreground truncate">
                            {track.title}
                          </span>
                          <span className="text-xs text-white/40 shrink-0">
                            {track.artist}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
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
    </div>
  );
}

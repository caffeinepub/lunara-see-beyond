import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  BookOpen,
  Bot,
  Flame,
  MessageCircle,
  Mic,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Send,
  Sparkles,
  Timer,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiDiscord } from "react-icons/si";

const DISCORD_URL = "https://discord.gg/X7xuEdE3D6";

const vibes = [
  { icon: Flame, title: "Trending: Soft Life Thread" },
  { icon: BookOpen, title: "Book of the Month: Klara and the Sun" },
  { icon: Zap, title: "Challenge: 7-Day Digital Detox" },
  { icon: MessageCircle, title: "AMA: Abhigyan on building Lunara" },
];

type WGEvent = {
  id: string;
  title: string;
  date: string;
  type: string;
  description: string;
  joinedBy: string[];
};

function loadWGEvents(): WGEvent[] {
  try {
    const raw = localStorage.getItem("lunara_wg_events");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveWGEvents(events: WGEvent[]) {
  try {
    localStorage.setItem("lunara_wg_events", JSON.stringify(events));
  } catch {}
}

type ChatMessage = { sender: string; text: string; time: string };
type ChatRoom = {
  id: string;
  name: string;
  icon: string;
  messages: ChatMessage[];
};

const initialChatRooms: ChatRoom[] = [
  {
    id: "lunar-lounge",
    name: "Lunar Lounge",
    icon: "🌙",
    messages: [
      { sender: "Aiko", text: "Good vibes only in here 🌙✨", time: "9:02 AM" },
      {
        sender: "Marcus",
        text: "Just finished my morning run, feeling alive!",
        time: "9:10 AM",
      },
      {
        sender: "Zara",
        text: "Anyone watching the lunar eclipse tonight?",
        time: "9:15 AM",
      },
      { sender: "Aiko", text: "Yes!! Setting an alarm rn ⏰", time: "9:16 AM" },
    ],
  },
  {
    id: "game-talk",
    name: "Game Talk",
    icon: "🎮",
    messages: [
      {
        sender: "Leon",
        text: "Anyone up for Ludo in Lunar Arcadia?",
        time: "3:20 PM",
      },
      {
        sender: "Priya",
        text: "I'm in! Let me finish this match first",
        time: "3:21 PM",
      },
      {
        sender: "Dev",
        text: "The car racing game update is 🔥 tried it yet?",
        time: "3:25 PM",
      },
      {
        sender: "Leon",
        text: "It's insane, I hit 3 minutes survival time",
        time: "3:28 PM",
      },
    ],
  },
  {
    id: "creative-corner",
    name: "Creative Corner",
    icon: "🎨",
    messages: [
      {
        sender: "Mia",
        text: "Posted a new piece in Pixel Hands! Would love feedback 💜",
        time: "11:40 AM",
      },
      {
        sender: "Riya",
        text: "Just saw it — the color work is stunning!",
        time: "11:45 AM",
      },
      {
        sender: "Kai",
        text: "Anyone doing the pixel art sprint challenge?",
        time: "11:50 AM",
      },
      {
        sender: "Mia",
        text: "Yes! Theme is 'Beyond the Stars' — so much fun 🌌",
        time: "11:52 AM",
      },
    ],
  },
  {
    id: "hot-takes",
    name: "Hot Takes",
    icon: "🔥",
    messages: [
      {
        sender: "Blaze",
        text: "Unpopular opinion: dark mode is overrated for reading",
        time: "7:00 PM",
      },
      { sender: "Sam", text: "EXCUSE ME? Dark mode is life", time: "7:01 PM" },
      {
        sender: "Tia",
        text: "Hot take: Spotify's shuffle isn't actually random and you know it",
        time: "7:05 PM",
      },
      {
        sender: "Blaze",
        text: "It literally plays the same 10 songs every time 😭",
        time: "7:06 PM",
      },
    ],
  },
];

function Chatrooms() {
  const [rooms, setRooms] = useState<ChatRoom[]>(initialChatRooms);
  const [activeRoomId, setActiveRoomId] = useState("lunar-lounge");
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeRoom = rooms.find((r) => r.id === activeRoomId)!;

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setRooms((prev) =>
      prev.map((r) =>
        r.id === activeRoomId
          ? { ...r, messages: [...r.messages, { sender: "You", text, time }] }
          : r,
      ),
    );
    setInput("");
    setTimeout(
      () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
      50,
    );
  };

  return (
    <section id="chatrooms" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Chatrooms</h2>
          <p className="text-white/50 text-sm mt-1">
            Pick your vibe and join the conversation
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 glass-card rounded-3xl border border-white/10 overflow-hidden min-h-[520px]">
          {/* Sidebar */}
          <aside className="md:w-60 shrink-0 border-b md:border-b-0 md:border-r border-white/10 p-4 flex flex-col gap-2">
            {rooms.map((room) => (
              <button
                key={room.id}
                type="button"
                onClick={() => setActiveRoomId(room.id)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                  activeRoomId === room.id
                    ? "bg-accent/20 text-foreground"
                    : "text-white/60 hover:bg-white/10 hover:text-foreground"
                }`}
                data-ocid="chatrooms.tab"
              >
                <span className="text-xl">{room.icon}</span>
                <span className="font-medium text-sm flex-1 truncate">
                  {room.name}
                </span>
                <Badge className="bg-white/10 text-white/60 border-white/10 text-xs shrink-0">
                  {room.messages.length}
                </Badge>
              </button>
            ))}
            <div className="mt-auto pt-4 border-t border-white/10">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-white/40 hover:text-accent transition-colors"
              >
                <SiDiscord className="w-4 h-4" /> Join our Discord
              </a>
            </div>
          </aside>

          {/* Chat panel */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
              <span className="text-xl">{activeRoom.icon}</span>
              <span className="font-bold text-foreground">
                {activeRoom.name}
              </span>
              <div className="flex items-center gap-1 ml-auto">
                <Mic className="w-3.5 h-3.5 text-white/40" />
                <span className="text-xs text-white/40">Voice + Text</span>
                <Badge className="bg-green-900/30 text-green-400 border-green-700 text-xs ml-2">
                  Live
                </Badge>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3 max-h-80">
              {activeRoom.messages.map((msg, i) => (
                <div
                  key={`${msg.sender}-${msg.time}-${i}`}
                  className={`flex flex-col gap-0.5 ${
                    msg.sender === "You" ? "items-end" : "items-start"
                  }`}
                >
                  <span className="text-xs text-white/40">
                    {msg.sender} · {msg.time}
                  </span>
                  <div
                    className={`max-w-xs px-3 py-2 rounded-xl text-sm ${
                      msg.sender === "You"
                        ? "bg-accent/30 text-foreground"
                        : "bg-white/10 text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="px-5 py-4 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={`Message ${activeRoom.icon} ${activeRoom.name}...`}
                className="flex-1 bg-white/10 text-white placeholder-white/30 rounded-xl px-4 py-2.5 text-sm border border-white/10 outline-none focus:border-accent/50"
                data-ocid="chatrooms.input"
              />
              <Button
                onClick={sendMessage}
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl px-4"
                data-ocid="chatrooms.submit_button"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type StudyRoom = {
  id: string;
  name: string;
  duration: number; // minutes
  members: string[];
  breakCount: number;
  breakInterval: number; // minutes
};

function loadStudyRooms(): StudyRoom[] {
  try {
    const raw = localStorage.getItem("lunara_study_groups");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStudyRooms(rooms: StudyRoom[]) {
  localStorage.setItem("lunara_study_groups", JSON.stringify(rooms));
}

type RoomSession = {
  room: StudyRoom;
  secondsLeft: number;
  running: boolean;
  done: boolean;
  chatMessages: { from: string; text: string; ts: number }[];
};

function StudyRoomOverlay({
  session,
  onLeave,
}: {
  session: RoomSession;
  onLeave: () => void;
}) {
  const [sec, setSec] = useState(session.secondsLeft);
  const [running, setRunning] = useState(true);
  const [msgs, setMsgs] = useState(session.chatMessages);
  const totalSeconds = session.room.duration * 60;
  const breakIntervalSec = session.room.breakInterval * 60;
  const nextBreakRef = useRef(breakIntervalSec);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!running) return;
      setSec((prev) => {
        if (prev <= 1) {
          setRunning(false);
          setMsgs((m) => [
            ...m,
            {
              from: "🤖 LunaBot",
              text: "Session complete! Great work. 🎉",
              ts: Date.now(),
            },
          ]);
          return 0;
        }
        const next = prev - 1;
        if (breakIntervalSec > 0 && next === nextBreakRef.current) {
          nextBreakRef.current -= breakIntervalSec;
          setMsgs((m) => [
            ...m,
            {
              from: "🤖 LunaBot",
              text: `Break time! Resuming in ${session.room.breakInterval} minutes... ☕`,
              ts: Date.now(),
            },
          ]);
        }
        return next;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, breakIntervalSec, session.room.breakInterval]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on new messages
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [msgs]);

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const ss = (s % 60).toString().padStart(2, "0");
    if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${ss}`;
    return `${m.toString().padStart(2, "0")}:${ss}`;
  };

  const progress =
    totalSeconds > 0 ? ((totalSeconds - sec) / totalSeconds) * 100 : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background:
          "linear-gradient(160deg, #0D001F 0%, #24003D 55%, #4B0082 100%)",
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6 h-full max-h-screen">
        {/* Main panel */}
        <div className="flex-1 glass-card rounded-3xl border border-white/15 p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {session.room.name}
            </h2>
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 rounded-xl"
              onClick={onLeave}
              data-ocid="study.close_button"
            >
              Leave Room
            </Button>
          </div>

          {/* Timer */}
          <div className="flex flex-col items-center gap-4 py-6">
            <div
              className="w-40 h-40 rounded-full flex items-center justify-center relative"
              style={{
                background: `conic-gradient(#9B30FF ${progress}%, rgba(255,255,255,0.1) 0%)`,
              }}
            >
              <div className="w-32 h-32 rounded-full glass-card flex items-center justify-center">
                <span className="text-3xl font-bold text-white font-mono">
                  {fmt(sec)}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                size="sm"
                className="glass-button text-white rounded-xl"
                onClick={() => setRunning((r) => !r)}
                disabled={sec === 0}
                data-ocid="study.toggle"
              >
                {running ? (
                  <Pause className="w-4 h-4 mr-1" />
                ) : (
                  <Play className="w-4 h-4 mr-1" />
                )}
                {running ? "Pause" : "Resume"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 rounded-xl"
                onClick={() => {
                  setSec(totalSeconds);
                  setRunning(true);
                  nextBreakRef.current = breakIntervalSec;
                }}
                data-ocid="study.secondary_button"
              >
                <RefreshCw className="w-4 h-4 mr-1" /> Reset
              </Button>
            </div>
          </div>

          {/* Members / Voice UI */}
          <div>
            <p className="text-white/50 text-sm mb-3">
              <Mic className="w-3.5 h-3.5 inline mr-1" /> Voice Channel
            </p>
            <div className="flex flex-wrap gap-3">
              {session.room.members.map((m) => (
                <div key={m} className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-accent/30 border border-accent/50 flex items-center justify-center text-sm font-bold text-white">
                    {m.trim()[0]?.toUpperCase() ?? "?"}
                  </div>
                  <span className="text-xs text-white/60 max-w-[56px] truncate">
                    {m.trim()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chatbot panel */}
        <div className="w-full md:w-72 glass-card rounded-3xl border border-white/15 p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-1">
            <Bot className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-white">LunaBot</span>
          </div>
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto space-y-3 pr-1"
            style={{ minHeight: 0, maxHeight: "calc(100vh - 280px)" }}
          >
            {msgs.map((msg) => (
              <div key={msg.ts} className="text-sm">
                <span className="font-semibold text-accent text-xs block mb-0.5">
                  {msg.from}
                </span>
                <span className="text-white/70">{msg.text}</span>
              </div>
            ))}
            {msgs.length === 0 && (
              <p className="text-white/30 text-xs">
                LunaBot will notify you at each break.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StudyGroups() {
  const [rooms, setRooms] = useState<StudyRoom[]>(loadStudyRooms);
  const [showForm, setShowForm] = useState(false);
  const [activeRoom, setActiveRoom] = useState<StudyRoom | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(50);
  const [members, setMembers] = useState("");
  const [breakCount, setBreakCount] = useState(2);
  const [breakInterval, setBreakInterval] = useState(10);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newRoom: StudyRoom = {
      id: Date.now().toString(),
      name: name.trim(),
      duration,
      members: members
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean),
      breakCount,
      breakInterval,
    };
    const updated = [newRoom, ...rooms];
    setRooms(updated);
    saveStudyRooms(updated);
    setName("");
    setDuration(50);
    setMembers("");
    setBreakCount(2);
    setBreakInterval(10);
    setShowForm(false);
  };

  return (
    <>
      {activeRoom && (
        <StudyRoomOverlay
          session={{
            room: activeRoom,
            secondsLeft: activeRoom.duration * 60,
            running: true,
            done: false,
            chatMessages: [
              {
                from: "🤖 LunaBot",
                text: `Study session started! Focus for ${activeRoom.duration} minutes. You\'ve got this! 💪`,
                ts: Date.now(),
              },
            ],
          }}
          onLeave={() => setActiveRoom(null)}
        />
      )}

      <section id="study" className="py-16 glass-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Timer className="w-6 h-6 text-accent" />
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Study Groups
                </h2>
                <p className="text-white/50 text-sm mt-0.5">
                  Create a focused room, invite friends, and study together
                </p>
              </div>
            </div>
            {!showForm && (
              <Button
                size="sm"
                className="glass-button text-white rounded-xl gap-1"
                onClick={() => setShowForm(true)}
                data-ocid="study.open_modal_button"
              >
                <Plus className="w-4 h-4" /> Make a Study Room
              </Button>
            )}
          </div>

          {/* Create room form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl border border-white/15 p-6 mb-8"
              data-ocid="study.modal"
            >
              <h3 className="text-lg font-semibold text-foreground mb-5">
                Create Study Room
              </h3>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="study-name"
                      className="text-white/70 text-sm block"
                    >
                      Room Name
                    </label>
                    <input
                      id="study-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Bio Exam Crunch"
                      required
                      className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl px-3 py-2 text-sm border border-white/10 outline-none focus:border-accent/50"
                      data-ocid="study.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="study-duration"
                      className="text-white/70 text-sm block"
                    >
                      Duration (minutes)
                    </label>
                    <input
                      id="study-duration"
                      type="number"
                      min={5}
                      max={300}
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full bg-white/10 text-white rounded-xl px-3 py-2 text-sm border border-white/10 outline-none focus:border-accent/50"
                      data-ocid="study.input"
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label
                      htmlFor="study-members"
                      className="text-white/70 text-sm block"
                    >
                      Members (comma separated)
                    </label>
                    <input
                      id="study-members"
                      type="text"
                      value={members}
                      onChange={(e) => setMembers(e.target.value)}
                      placeholder="e.g. Aryan, Priya, Dev"
                      className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl px-3 py-2 text-sm border border-white/10 outline-none focus:border-accent/50"
                      data-ocid="study.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="study-break-count"
                      className="text-white/70 text-sm block"
                    >
                      Number of Breaks
                    </label>
                    <input
                      id="study-break-count"
                      type="number"
                      min={0}
                      max={20}
                      value={breakCount}
                      onChange={(e) => setBreakCount(Number(e.target.value))}
                      className="w-full bg-white/10 text-white rounded-xl px-3 py-2 text-sm border border-white/10 outline-none focus:border-accent/50"
                      data-ocid="study.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="study-break-interval"
                      className="text-white/70 text-sm block"
                    >
                      Break Interval (minutes)
                    </label>
                    <input
                      id="study-break-interval"
                      type="number"
                      min={1}
                      max={60}
                      value={breakInterval}
                      onChange={(e) => setBreakInterval(Number(e.target.value))}
                      className="w-full bg-white/10 text-white rounded-xl px-3 py-2 text-sm border border-white/10 outline-none focus:border-accent/50"
                      data-ocid="study.input"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    className="glass-button text-white rounded-xl"
                    data-ocid="study.submit_button"
                  >
                    Create Room
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 rounded-xl"
                    onClick={() => setShowForm(false)}
                    data-ocid="study.cancel_button"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Room cards */}
          {rooms.length === 0 ? (
            <div
              className="text-center py-16 text-white/30"
              data-ocid="study.empty_state"
            >
              <Timer className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">
                No study rooms yet. Be the first to create one!
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rooms.map((room, i) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col gap-4"
                  data-ocid={`study.item.${i + 1}`}
                >
                  <div>
                    <h3 className="font-bold text-foreground text-base">
                      {room.name}
                    </h3>
                    <p className="text-white/50 text-xs mt-1">
                      {room.duration} min · {room.breakCount} break
                      {room.breakCount !== 1 ? "s" : ""} every{" "}
                      {room.breakInterval} min
                    </p>
                  </div>
                  {room.members.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {room.members.slice(0, 5).map((m) => (
                        <div
                          key={m}
                          className="w-7 h-7 rounded-full bg-accent/30 border border-accent/40 flex items-center justify-center text-xs font-bold text-white"
                          title={m}
                        >
                          {m[0]?.toUpperCase()}
                        </div>
                      ))}
                      {room.members.length > 5 && (
                        <span className="text-xs text-white/40">
                          +{room.members.length - 5}
                        </span>
                      )}
                    </div>
                  )}
                  <Button
                    className="glass-button text-white rounded-xl w-full mt-auto"
                    onClick={() => setActiveRoom(room)}
                    data-ocid={`study.primary_button.${i + 1}`}
                  >
                    Enter Room
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function WildGang() {
  const auth = useAuth();
  const [wgEvents, setWGEvents] = useState<WGEvent[]>(loadWGEvents);
  const [showEventForm, setShowEventForm] = useState(false);
  const [evTitle, setEvTitle] = useState("");
  const [evDate, setEvDate] = useState("");
  const [evType, setEvType] = useState("Competition");
  const [evDesc, setEvDesc] = useState("");

  const submitWGEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evTitle.trim() || !evDate) return;
    const newEv: WGEvent = {
      id: Date.now().toString(),
      title: evTitle.trim(),
      date: evDate,
      type: evType,
      description: evDesc.trim(),
      joinedBy: [],
    };
    const updated = [newEv, ...wgEvents];
    setWGEvents(updated);
    saveWGEvents(updated);
    setEvTitle("");
    setEvDate("");
    setEvType("Competition");
    setEvDesc("");
    setShowEventForm(false);
  };

  const toggleJoinWGEvent = (evId: string) => {
    if (!auth.user) {
      window.dispatchEvent(new CustomEvent("lunara-open-auth"));
      return;
    }
    const updated = wgEvents.map((ev) => {
      if (ev.id !== evId) return ev;
      const already = ev.joinedBy.includes(auth.user!.name);
      return {
        ...ev,
        joinedBy: already
          ? ev.joinedBy.filter((n) => n !== auth.user!.name)
          : [...ev.joinedBy, auth.user!.name],
      };
    });
    setWGEvents(updated);
    saveWGEvents(updated);
  };

  return (
    <div>
      {/* Hero */}
      <section
        className="min-h-[60vh] flex items-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0D001F 0%, #24003D 55%, #4B0082 100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="absolute left-10 bottom-0 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm">
                <Users className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-white/20 text-white border-white/30 text-xs">
                Community Zone
              </Badge>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">Wild Gang</h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              The social heartbeat of Lunara — where friendships are forged,
              voices are heard, and the community comes alive. Chat, study,
              compete, and vibe with your people.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button
                className="bg-accent text-accent-foreground font-semibold px-6 h-11 rounded-full hover:bg-accent/90"
                onClick={() =>
                  document
                    .getElementById("chatrooms")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="wildgang.primary_button"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Enter Chatrooms
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 px-6 h-11 rounded-full"
                onClick={() =>
                  document
                    .getElementById("study")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="wildgang.secondary_button"
              >
                <Timer className="w-4 h-4 mr-2" />
                Study VCs
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 px-6 h-11 rounded-full"
                asChild
                data-ocid="wildgang.discord_button"
              >
                <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                  <SiDiscord className="w-4 h-4 mr-2" />
                  Join our Discord
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending Vibes */}
      <section className="py-12 glass-card border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {vibes.map(({ icon: Icon, title }) => (
              <div
                key={title}
                className="flex items-center gap-2 glass-section rounded-full px-5 py-2 text-sm font-medium text-foreground/70 hover:bg-accent/15 hover:text-foreground transition-colors cursor-pointer"
              >
                <Icon className="w-4 h-4 text-accent shrink-0" />
                {title}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chatrooms */}
      <Chatrooms />

      {/* Study VCs */}
      <StudyGroups />

      {/* Competitions & Events */}
      <section
        id="competitions"
        className="py-16 glass-card border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-accent" />
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Competitions & Events
                </h2>
                <p className="text-white/50 text-sm">
                  Active challenges and upcoming events
                </p>
              </div>
            </div>
            {auth.isAdmin && !showEventForm && (
              <Button
                size="sm"
                className="glass-button text-white rounded-xl gap-1"
                onClick={() => setShowEventForm(true)}
                data-ocid="wgevents.open_modal_button"
              >
                <Plus className="w-4 h-4" /> Create Event
              </Button>
            )}
          </div>

          {auth.isAdmin && showEventForm && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl border border-white/15 p-6 mb-8"
              data-ocid="wgevents.modal"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Create Event
              </h3>
              <form onSubmit={submitWGEvent} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <span className="text-sm text-white/70">Title *</span>
                    <input
                      type="text"
                      value={evTitle}
                      onChange={(e) => setEvTitle(e.target.value)}
                      placeholder="Event name"
                      required
                      className="w-full bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60"
                      data-ocid="wgevents.input_title"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-sm text-white/70">Date *</span>
                    <input
                      type="date"
                      value={evDate}
                      onChange={(e) => setEvDate(e.target.value)}
                      required
                      className="w-full bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent/60"
                      data-ocid="wgevents.input_date"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <span className="text-sm text-white/70">Type</span>
                  <select
                    value={evType}
                    onChange={(e) => setEvType(e.target.value)}
                    className="w-full bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent/60"
                    data-ocid="wgevents.select"
                  >
                    <option value="Competition" className="bg-[#1a0033]">
                      Competition
                    </option>
                    <option value="Live Event" className="bg-[#1a0033]">
                      Live Event
                    </option>
                    <option value="Workshop" className="bg-[#1a0033]">
                      Workshop
                    </option>
                    <option value="Challenge" className="bg-[#1a0033]">
                      Challenge
                    </option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <span className="text-sm text-white/70">Description</span>
                  <textarea
                    value={evDesc}
                    onChange={(e) => setEvDesc(e.target.value)}
                    placeholder="What's this event about?"
                    rows={3}
                    className="w-full bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60 resize-none"
                    data-ocid="wgevents.textarea"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="glass-button text-white"
                    data-ocid="wgevents.submit_button"
                  >
                    Create Event
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-white/50"
                    onClick={() => setShowEventForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {wgEvents.length === 0 ? (
            <div
              className="glass-card rounded-2xl border border-white/10 p-12 text-center"
              data-ocid="wgevents.empty_state"
            >
              <Trophy className="w-10 h-10 text-white/20 mx-auto mb-3" />
              <p className="text-white/40 text-sm">
                Be the first to create an event.
              </p>
              {auth.isAdmin && (
                <Button
                  size="sm"
                  className="mt-4 glass-button text-white rounded-xl gap-1"
                  onClick={() => setShowEventForm(true)}
                >
                  <Plus className="w-4 h-4" /> Create Event
                </Button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {wgEvents.map((ev, i) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background rounded-2xl p-6 shadow-card border border-white/10 hover:border-accent/30 transition-colors"
                  data-ocid={`wgevents.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <h3 className="font-bold text-foreground">{ev.title}</h3>
                    <Badge className="bg-accent/15 text-foreground border-accent/30 text-xs shrink-0">
                      {ev.type}
                    </Badge>
                  </div>
                  {ev.description && (
                    <p className="text-white/50 text-sm leading-relaxed mb-4">
                      {ev.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs text-white/50 mb-4">
                    <span>Date: {ev.date}</span>
                    <span className="text-accent font-medium">
                      {ev.joinedBy.length} joined
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className={
                      ev.joinedBy.includes(auth.user?.name || "")
                        ? "bg-white/10 text-white/60 rounded-xl w-full"
                        : "glass-button text-white rounded-xl w-full"
                    }
                    onClick={() => toggleJoinWGEvent(ev.id)}
                  >
                    {ev.joinedBy.includes(auth.user?.name || "")
                      ? "Leave Event"
                      : "Join Event"}
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16"
        style={{
          background:
            "linear-gradient(160deg, #0D001F 0%, #24003D 55%, #4B0082 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Users className="w-12 h-12 text-accent mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            The Gang&apos;s All Here
          </h2>
          <p className="text-white/60 mb-8">
            Whether you&apos;re here to vent, study, compete, share a playlist,
            or just be present — Wild Gang welcomes you exactly as you are.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Button
              className="bg-accent text-accent-foreground font-semibold px-8 py-3 h-auto rounded-full hover:bg-accent/90"
              onClick={() =>
                document
                  .getElementById("chatrooms")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid="wildgang.cta_button"
            >
              <Flame className="w-4 h-4 mr-2" />
              Join Wild Gang
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white bg-white/10 hover:bg-white/20 px-8 py-3 h-auto rounded-full"
              asChild
              data-ocid="wildgang.discord_cta_button"
            >
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                <SiDiscord className="w-4 h-4 mr-2" />
                Join our Discord
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

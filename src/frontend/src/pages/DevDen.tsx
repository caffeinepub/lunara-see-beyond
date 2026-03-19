import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  Code2,
  Cpu,
  GitBranch,
  Globe,
  Plus,
  Send,
  Terminal,
  Trash2,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

const tools = [
  { icon: Globe, label: "Web Dev" },
  { icon: Cpu, label: "AI / ML" },
  { icon: GitBranch, label: "Open Source" },
  { icon: Zap, label: "Performance" },
  { icon: Code2, label: "Low-Level" },
  { icon: Terminal, label: "CLI & DevOps" },
];

type ChatMessage = { sender: string; text: string; time: string };
type ChatRoom = {
  id: string;
  name: string;
  icon: string;
  messages: ChatMessage[];
};

const initialRooms: ChatRoom[] = [
  {
    id: "doubts",
    name: "Doubts",
    icon: "❓",
    messages: [
      {
        sender: "Arjun",
        text: "Anyone know why TypeScript is complaining about my generic constraints?",
        time: "2:14 PM",
      },
      {
        sender: "Meera",
        text: "Can you share the error message? Usually it's a missing extends clause.",
        time: "2:15 PM",
      },
      {
        sender: "DevBot",
        text: "Try adding `extends object` to your generic parameter T.",
        time: "2:16 PM",
      },
      {
        sender: "Arjun",
        text: "That fixed it! Thanks both 🙌",
        time: "2:18 PM",
      },
    ],
  },
  {
    id: "help",
    name: "Help",
    icon: "🤝",
    messages: [
      {
        sender: "Zara",
        text: "Need someone to review my pull request — it's a small refactor.",
        time: "1:05 PM",
      },
      {
        sender: "Krish",
        text: "Drop the link, I'll take a look!",
        time: "1:06 PM",
      },
      {
        sender: "Zara",
        text: "github.com/zaradev/lunara-utils/pull/12",
        time: "1:07 PM",
      },
      {
        sender: "Krish",
        text: "Left a few comments. Looks solid overall 👍",
        time: "1:22 PM",
      },
    ],
  },
  {
    id: "regular",
    name: "Regular Chat",
    icon: "💬",
    messages: [
      {
        sender: "Leo",
        text: "Anyone else feel like Rust's borrow checker is just aggressive pair programming?",
        time: "11:30 AM",
      },
      {
        sender: "Priya",
        text: "LOL yes. It's basically a code reviewer that never sleeps.",
        time: "11:32 AM",
      },
      {
        sender: "Dev",
        text: "I switched from Go to Rust last year and haven't looked back. The learning curve is real tho.",
        time: "11:35 AM",
      },
      {
        sender: "Leo",
        text: "Worth it for systems work honestly. What's everyone building rn?",
        time: "11:37 AM",
      },
    ],
  },
];

function Chatrooms() {
  const [rooms, setRooms] = useState<ChatRoom[]>(initialRooms);
  const [activeRoomId, setActiveRoomId] = useState("doubts");
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
          <h2 className="text-2xl font-bold text-foreground">
            Aloxide Chatrooms
          </h2>
          <p className="text-white/50 text-sm mt-1">
            Drop in, ask questions, share knowledge
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 glass-card rounded-3xl border border-white/10 overflow-hidden min-h-[480px]">
          {/* Sidebar */}
          <aside className="md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-white/10 p-4 flex flex-col gap-2">
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
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-sm block truncate">
                    {room.name}
                  </span>
                </div>
                <Badge className="bg-white/10 text-white/60 border-white/10 text-xs shrink-0">
                  {room.messages.length}
                </Badge>
              </button>
            ))}
          </aside>

          {/* Chat panel */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
              <span className="text-xl">{activeRoom.icon}</span>
              <span className="font-bold text-foreground">
                {activeRoom.name}
              </span>
              <Badge className="bg-green-900/30 text-green-400 border-green-700 text-xs ml-auto">
                Live
              </Badge>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3 max-h-72">
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

            {/* Input */}
            <div className="px-5 py-4 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={`Message #${activeRoom.name.toLowerCase()}...`}
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

type Project = {
  id: string;
  title: string;
  author: string;
  description: string;
  tags: string[];
  url?: string;
};

type Hackathon = {
  id: string;
  title: string;
  theme: string;
  date: string;
  prize: string;
  status: "Open" | "Upcoming";
};

function loadProjects(): Project[] {
  try {
    const raw = localStorage.getItem("lunara_devden_projects");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveProjects(projects: Project[]) {
  localStorage.setItem("lunara_devden_projects", JSON.stringify(projects));
}

function loadHackathons(): Hackathon[] {
  try {
    const raw = localStorage.getItem("lunara_devden_hackathons");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHackathons(hackathons: Hackathon[]) {
  localStorage.setItem("lunara_devden_hackathons", JSON.stringify(hackathons));
}

export default function DevDen() {
  const { user, isAdmin } = useAuth();

  // Projects state
  const [projects, setProjects] = useState<Project[]>(loadProjects);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projTitle, setProjTitle] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projTags, setProjTags] = useState("");
  const [projUrl, setProjUrl] = useState("");

  // Hackathons state
  const [hackathons, setHackathons] = useState<Hackathon[]>(loadHackathons);
  const [showHackForm, setShowHackForm] = useState(false);
  const [hackTitle, setHackTitle] = useState("");
  const [hackTheme, setHackTheme] = useState("");
  const [hackDate, setHackDate] = useState("");
  const [hackPrize, setHackPrize] = useState("");
  const [hackStatus, setHackStatus] = useState<"Open" | "Upcoming">("Upcoming");

  const submitProject = () => {
    if (!projTitle.trim() || !projDesc.trim()) return;
    const newProj: Project = {
      id: Date.now().toString(),
      title: projTitle.trim(),
      author: user?.name ?? "Anonymous",
      description: projDesc.trim(),
      tags: projTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      url: projUrl.trim() || undefined,
    };
    const updated = [newProj, ...projects];
    setProjects(updated);
    saveProjects(updated);
    setProjTitle("");
    setProjDesc("");
    setProjTags("");
    setProjUrl("");
    setShowProjectForm(false);
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    saveProjects(updated);
  };

  const submitHackathon = () => {
    if (!hackTitle.trim() || !hackTheme.trim()) return;
    const newHack: Hackathon = {
      id: Date.now().toString(),
      title: hackTitle.trim(),
      theme: hackTheme.trim(),
      date: hackDate.trim(),
      prize: hackPrize.trim(),
      status: hackStatus,
    };
    const updated = [newHack, ...hackathons];
    setHackathons(updated);
    saveHackathons(updated);
    setHackTitle("");
    setHackTheme("");
    setHackDate("");
    setHackPrize("");
    setHackStatus("Upcoming");
    setShowHackForm(false);
  };

  const deleteHackathon = (id: string) => {
    const updated = hackathons.filter((h) => h.id !== id);
    setHackathons(updated);
    saveHackathons(updated);
  };

  return (
    <div>
      {/* Hero */}
      <section className="gradient-devden min-h-[60vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute right-0 bottom-0 w-72 h-72 rounded-full bg-white/5 translate-x-1/2 translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-white/20 text-white border-white/30 text-xs">
                Tech Zone
              </Badge>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">Aloxide</h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Where coders, hackers, and builders collide. Ship open-source
              projects, compete in hackathons, and collaborate with the most
              creative tech minds in the community. Aloxide powers the
              innovation engine.
            </p>
            <div className="flex gap-4">
              <Button
                className="bg-accent text-accent-foreground font-semibold px-6 h-11 rounded-full hover:bg-accent/90"
                onClick={() =>
                  document
                    .getElementById("chatrooms")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="aloxide.primary_button"
              >
                <Code2 className="w-4 h-4 mr-2" />
                Join the Chat
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 px-6 h-11 rounded-full"
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="aloxide.secondary_button"
              >
                <GitBranch className="w-4 h-4 mr-2" />
                View Projects
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Tags */}
      <section className="py-10 glass-card border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {tools.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 glass-section rounded-full px-5 py-2 text-sm font-medium text-foreground/70 hover:bg-accent/20 hover:text-foreground transition-colors cursor-pointer"
              >
                <Icon className="w-4 h-4" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chatrooms */}
      <Chatrooms />

      {/* Projects */}
      <section id="projects" className="py-20 glass-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Projects</h2>
              <p className="text-white/50 text-sm mt-1">
                Built by our community, for everyone
              </p>
            </div>
            {user && !showProjectForm && (
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-4 h-9"
                onClick={() => setShowProjectForm(true)}
                data-ocid="projects.open_modal_button"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add Project
              </Button>
            )}
          </div>

          {/* Inline Add Project Form */}
          {showProjectForm && user && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6 border border-white/10 mb-8"
              data-ocid="projects.modal"
            >
              <h3 className="font-bold text-foreground mb-4">
                Add Your Project
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-white/50 mb-1">Project Title *</p>
                  <input
                    type="text"
                    value={projTitle}
                    onChange={(e) => setProjTitle(e.target.value)}
                    placeholder="My Awesome Project"
                    className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl px-4 py-2.5 text-sm border border-white/10 outline-none focus:border-accent/50"
                    data-ocid="projects.input"
                  />
                </div>
                <div>
                  <p className="text-xs text-white/50 mb-1">
                    Tags (comma-separated)
                  </p>
                  <input
                    type="text"
                    value={projTags}
                    onChange={(e) => setProjTags(e.target.value)}
                    placeholder="React, TypeScript, OSS"
                    className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl px-4 py-2.5 text-sm border border-white/10 outline-none focus:border-accent/50"
                    data-ocid="projects.input"
                  />
                </div>
              </div>
              <div className="mb-4">
                <p className="text-xs text-white/50 mb-1">Description *</p>
                <textarea
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  placeholder="What does your project do?"
                  rows={3}
                  className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl px-4 py-2.5 text-sm border border-white/10 outline-none focus:border-accent/50 resize-none"
                  data-ocid="projects.textarea"
                />
              </div>
              <div className="mb-5">
                <p className="text-xs text-white/50 mb-1">
                  Project URL (optional)
                </p>
                <input
                  type="url"
                  value={projUrl}
                  onChange={(e) => setProjUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl px-4 py-2.5 text-sm border border-white/10 outline-none focus:border-accent/50"
                  data-ocid="projects.input"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={submitProject}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl px-5"
                  data-ocid="projects.submit_button"
                >
                  Submit Project
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowProjectForm(false)}
                  className="text-white/60 hover:text-white"
                  data-ocid="projects.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {projects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card rounded-2xl border border-white/10 py-20 flex flex-col items-center justify-center text-center"
              data-ocid="projects.empty_state"
            >
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-accent/60" />
              </div>
              <p className="text-white/60 text-lg font-medium mb-1">
                Be the first one to upload
              </p>
              <p className="text-white/30 text-sm">
                {user
                  ? 'Click "Add Project" to share your work with the community.'
                  : "Log in to add your project."}
              </p>
            </motion.div>
          )}

          {/* Projects Grid */}
          {projects.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-5">
              {projects.map((proj, i) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 shadow-card hover:shadow-hero transition-all hover:-translate-y-0.5 border border-white/10"
                  data-ocid={`projects.item.${i + 1}`}
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="w-11 h-11 rounded-full bg-lunara-devden border border-white/10 shrink-0">
                      <AvatarFallback className="text-white font-bold bg-lunara-devden text-xs rounded-full">
                        {proj.title.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1">
                        <h3 className="font-bold text-foreground flex-1 truncate">
                          {proj.title}
                        </h3>
                        {user?.name === proj.author && (
                          <button
                            type="button"
                            onClick={() => deleteProject(proj.id)}
                            className="text-white/30 hover:text-red-400 transition-colors shrink-0"
                            data-ocid={`projects.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <p className="text-white/40 text-xs mb-2">
                        by {proj.author}
                      </p>
                      <p className="text-white/50 text-sm leading-relaxed mb-3">
                        {proj.description}
                      </p>
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex gap-1 flex-wrap">
                          {proj.tags.map((t) => (
                            <Badge
                              key={t}
                              variant="secondary"
                              className="text-xs px-2 py-0"
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>
                        {proj.url && (
                          <a
                            href={proj.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-accent hover:underline shrink-0"
                          >
                            View →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Hackathons */}
      <section id="hackathons" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold text-foreground">
                Hackathons & Challenges
              </h2>
            </div>
            {isAdmin && !showHackForm && (
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-4 h-9"
                onClick={() => setShowHackForm(true)}
                data-ocid="hackathons.open_modal_button"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Create Challenge
              </Button>
            )}
          </div>

          {/* Admin Create Hackathon Form */}
          {showHackForm && isAdmin && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6 border border-white/10 mb-8"
              data-ocid="hackathons.modal"
            >
              <h3 className="font-bold text-foreground mb-4">
                Create a Challenge
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-white/50 mb-1">Title *</p>
                  <input
                    type="text"
                    value={hackTitle}
                    onChange={(e) => setHackTitle(e.target.value)}
                    placeholder="Build Beyond 2026"
                    className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl px-4 py-2.5 text-sm border border-white/10 outline-none focus:border-accent/50"
                    data-ocid="hackathons.input"
                  />
                </div>
                <div>
                  <p className="text-xs text-white/50 mb-1">Theme *</p>
                  <input
                    type="text"
                    value={hackTheme}
                    onChange={(e) => setHackTheme(e.target.value)}
                    placeholder="AI for Creative Communities"
                    className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl px-4 py-2.5 text-sm border border-white/10 outline-none focus:border-accent/50"
                    data-ocid="hackathons.input"
                  />
                </div>
                <div>
                  <p className="text-xs text-white/50 mb-1">Date Range</p>
                  <input
                    type="text"
                    value={hackDate}
                    onChange={(e) => setHackDate(e.target.value)}
                    placeholder="Apr 18–20, 2026"
                    className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl px-4 py-2.5 text-sm border border-white/10 outline-none focus:border-accent/50"
                    data-ocid="hackathons.input"
                  />
                </div>
                <div>
                  <p className="text-xs text-white/50 mb-1">Prize</p>
                  <input
                    type="text"
                    value={hackPrize}
                    onChange={(e) => setHackPrize(e.target.value)}
                    placeholder="₹5,000"
                    className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl px-4 py-2.5 text-sm border border-white/10 outline-none focus:border-accent/50"
                    data-ocid="hackathons.input"
                  />
                </div>
              </div>
              <div className="mb-5">
                <p className="text-xs text-white/50 mb-1">Status</p>
                <div className="flex gap-3">
                  {(["Open", "Upcoming"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setHackStatus(s)}
                      className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                        hackStatus === s
                          ? "bg-accent text-accent-foreground border-accent"
                          : "border-white/20 text-white/60 hover:bg-white/10"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={submitHackathon}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl px-5"
                  data-ocid="hackathons.submit_button"
                >
                  Create Challenge
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowHackForm(false)}
                  className="text-white/60 hover:text-white"
                  data-ocid="hackathons.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {hackathons.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card rounded-2xl border border-white/10 py-20 flex flex-col items-center justify-center text-center"
              data-ocid="hackathons.empty_state"
            >
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Trophy className="w-8 h-8 text-accent/60" />
              </div>
              <p className="text-white/60 text-lg font-medium mb-1">
                No challenges yet. Check back soon!
              </p>
              {!isAdmin && (
                <p className="text-white/30 text-sm">Created by admins only.</p>
              )}
            </motion.div>
          )}

          {/* Hackathons Grid */}
          {hackathons.length > 0 && (
            <div className="grid md:grid-cols-3 gap-5">
              {hackathons.map((h, i) => (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 shadow-card border border-white/10"
                  data-ocid={`hackathons.item.${i + 1}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      className={
                        h.status === "Open"
                          ? "bg-green-900/30 text-green-400 border-green-700"
                          : "bg-muted text-white/50"
                      }
                    >
                      {h.status}
                    </Badge>
                    <div className="flex items-center gap-2">
                      {h.prize && (
                        <span className="text-accent font-bold text-sm">
                          {h.prize}
                        </span>
                      )}
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={() => deleteHackathon(h.id)}
                          className="text-white/30 hover:text-red-400 transition-colors"
                          data-ocid={`hackathons.delete_button.${i + 1}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{h.title}</h3>
                  <p className="text-white/50 text-sm mb-1">{h.theme}</p>
                  {h.date && (
                    <p className="text-white/50 text-xs mb-4">{h.date}</p>
                  )}
                  <Button
                    size="sm"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl"
                    onClick={() => {
                      const subject = encodeURIComponent(
                        `Hackathon Registration - ${h.title}`,
                      );
                      const body = encodeURIComponent(
                        `I want to register for ${h.title}.`,
                      );
                      window.open(
                        `mailto:katariavianyt45@gmail.com?subject=${subject}&body=${body}`,
                        "_blank",
                      );
                    }}
                    data-ocid={`hackathons.register_button.${i + 1}`}
                  >
                    <Users className="w-3.5 h-3.5 mr-1.5" />
                    Register Now
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-devden">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Terminal className="w-12 h-12 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Build the Future, Together
          </h2>
          <p className="text-white/60 mb-8">
            Open-source. Collaborative. Human. Join Aloxide and ship projects
            that matter.
          </p>
          <Button
            className="bg-accent text-accent-foreground font-semibold px-8 py-3 h-auto rounded-full hover:bg-accent/90"
            onClick={() =>
              document
                .getElementById("chatrooms")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="aloxide.cta_button"
          >
            <Zap className="w-4 h-4 mr-2" />
            Join Aloxide
          </Button>
        </div>
      </section>
    </div>
  );
}

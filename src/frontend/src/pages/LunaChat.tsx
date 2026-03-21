import { useAuth } from "@/hooks/useAuth";
import { getLanguageCode, translateText } from "@/utils/translate";
import {
  Check,
  CheckCheck,
  ChevronRight,
  Mic,
  MicOff,
  Paperclip,
  Pencil,
  Plus,
  Radio,
  Search,
  Send,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Message = {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
  read: boolean;
  type?: "text" | "attachment" | "voice";
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
};

type Status = {
  id: string;
  author: string;
  text?: string;
  imageUrl?: string;
  timestamp: number;
};

type DM = {
  id: string;
  participants: [string, string];
  messages: Message[];
};

type Group = {
  id: string;
  name: string;
  members: string[];
  messages: Message[];
};

type ChatData = {
  dms: DM[];
  groups: Group[];
};

// ─── Storage helpers ─────────────────────────────────────────────────────────

function loadChats(): ChatData {
  try {
    const raw = localStorage.getItem("lunara_chats");
    return raw ? JSON.parse(raw) : { dms: [], groups: [] };
  } catch {
    return { dms: [], groups: [] };
  }
}

function saveChats(data: ChatData) {
  localStorage.setItem("lunara_chats", JSON.stringify(data));
}

function loadStatuses(): Status[] {
  try {
    const raw = localStorage.getItem("lunara_statuses");
    if (!raw) return [];
    const all: Status[] = JSON.parse(raw);
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    return all.filter((s) => s.timestamp > cutoff);
  } catch {
    return [];
  }
}

function saveStatuses(data: Status[]) {
  localStorage.setItem("lunara_statuses", JSON.stringify(data));
}

function getAllUsers(): string[] {
  try {
    const stored = localStorage.getItem("lunara_users_db");
    if (!stored) return [];
    return Object.keys(JSON.parse(stored));
  } catch {
    return [];
  }
}

function getOnlineStatus(username: string): boolean {
  const h = username.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return h % 3 !== 0;
}

function getDisplayName(email: string): string {
  try {
    const stored = localStorage.getItem("lunara_users_db");
    if (!stored) return email.split("@")[0];
    const db: Record<string, { name: string }> = JSON.parse(stored);
    return db[email]?.name ?? email.split("@")[0];
  } catch {
    return email.split("@")[0];
  }
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function MessageBubble({
  msg,
  isMe,
  showSender,
  formatTime,
  onEdit,
  onDelete,
  displayText,
}: {
  msg: Message;
  isMe: boolean;
  showSender: boolean;
  displayText?: string;
  formatTime: (ts: number) => string;
  onEdit?: (id: string, text: string) => void;
  onDelete?: (id: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(msg.text);

  const confirmEdit = () => {
    if (editText.trim() && onEdit) onEdit(msg.id, editText.trim());
    setIsEditing(false);
  };

  const isImage = msg.fileType?.startsWith("image/");
  const isAudio = msg.fileType?.startsWith("audio/") || msg.type === "voice";

  return (
    <div className={`group flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] ${
          isMe ? "items-end" : "items-start"
        } flex flex-col gap-1`}
      >
        {showSender && !isMe && (
          <p className="text-purple-300 text-xs px-1">
            {getDisplayName(msg.sender)}
          </p>
        )}
        <div
          className={`flex items-end gap-1.5 ${isMe ? "flex-row-reverse" : "flex-row"}`}
        >
          {isMe && !isEditing && (
            <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity mb-1 shrink-0">
              {msg.type === "text" && onEdit && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(true);
                    setEditText(msg.text);
                  }}
                  className="p-1 rounded-lg bg-white/10 hover:bg-purple-500/40 text-white/50 hover:text-white transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-3 h-3" />
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(msg.id)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-red-500/40 text-white/50 hover:text-red-300 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          )}
          {isEditing ? (
            <div className="flex items-center gap-1 max-w-[260px]">
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") confirmEdit();
                  if (e.key === "Escape") setIsEditing(false);
                }}
                className="flex-1 bg-white/15 border border-purple-400/50 rounded-xl px-3 py-1.5 text-sm text-white outline-none min-w-0"
              />
              <button
                type="button"
                onClick={confirmEdit}
                className="p-1 rounded-lg bg-purple-600/50 hover:bg-purple-600/70 text-white transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div
              className={`px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                isMe
                  ? "bg-purple-600/80 text-white rounded-br-sm"
                  : "glass text-white rounded-bl-sm"
              }`}
            >
              {msg.type === "voice" && msg.fileUrl ? (
                <div className="flex flex-col gap-2 min-w-[160px]">
                  <div className="flex items-center gap-2 text-white/70 text-xs">
                    <Radio className="w-3.5 h-3.5 shrink-0" />
                    <span>Voice message</span>
                  </div>
                  {/* biome-ignore lint/a11y/useMediaCaption: voice note */}
                  <audio controls src={msg.fileUrl} className="w-full h-8" />
                </div>
              ) : msg.type === "attachment" && msg.fileUrl ? (
                <div>
                  {isImage ? (
                    <img
                      src={msg.fileUrl}
                      alt={msg.fileName ?? "attachment"}
                      className="rounded-xl max-w-[200px] block"
                    />
                  ) : isAudio ? (
                    <div className="flex flex-col gap-1.5 min-w-[160px]">
                      <p className="text-white/60 text-xs truncate">
                        {msg.fileName}
                      </p>
                      {/* biome-ignore lint/a11y/useMediaCaption: user upload */}
                      <audio
                        controls
                        src={msg.fileUrl}
                        className="w-full h-8"
                      />
                    </div>
                  ) : (
                    <a
                      href={msg.fileUrl}
                      download={msg.fileName}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-xl px-3 py-2"
                    >
                      <Paperclip className="w-4 h-4 shrink-0 text-purple-300" />
                      <div className="min-w-0">
                        <p className="text-white text-xs font-medium truncate max-w-[140px]">
                          {msg.fileName}
                        </p>
                        {msg.fileSize !== undefined && (
                          <p className="text-white/40 text-[10px]">
                            {formatBytes(msg.fileSize)}
                          </p>
                        )}
                      </div>
                    </a>
                  )}
                </div>
              ) : (
                (displayText ?? msg.text)
              )}
            </div>
          )}
        </div>
        <div
          className={`flex items-center gap-1 px-1 ${
            isMe ? "justify-end" : "justify-start"
          }`}
        >
          <p className="text-white/25 text-[10px]">
            {formatTime(msg.timestamp)}
          </p>
          {isMe &&
            (msg.read ? (
              <CheckCheck className="w-3 h-3 text-blue-400" />
            ) : (
              <Check className="w-3 h-3 text-white/30" />
            ))}
        </div>
      </div>
    </div>
  );
}

// ─── Status row ───────────────────────────────────────────────────────────────

function StatusRow({
  statuses,
  currentUser,
  onAddStatus,
  onViewStatus,
}: {
  statuses: Status[];
  currentUser: string;
  onAddStatus: () => void;
  onViewStatus: (s: Status) => void;
}) {
  const myStatus = statuses.find((s) => s.author === currentUser);
  const todayCutoff = Date.now() - 24 * 60 * 60 * 1000;
  const hasPostedToday = myStatus && myStatus.timestamp > todayCutoff;

  // Other users' statuses (not current user)
  const others = statuses.filter((s) => s.author !== currentUser);

  return (
    <div className="px-3 py-3 border-b border-white/10">
      <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2">
        Status
      </p>
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
        {/* My status circle */}
        <button
          type="button"
          onClick={() => {
            if (hasPostedToday && myStatus) onViewStatus(myStatus);
            else onAddStatus();
          }}
          className="flex flex-col items-center gap-1 shrink-0"
          data-ocid="lunachat.open_modal_button"
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              hasPostedToday
                ? "ring-2 ring-offset-2 ring-offset-[#0d001f] ring-purple-500"
                : "ring-2 ring-dashed ring-white/30"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-sm">
              {getDisplayName(currentUser).charAt(0).toUpperCase()}
            </div>
          </div>
          <p className="text-white/50 text-[9px] truncate w-12 text-center">
            {hasPostedToday ? "My status" : "Add"}
          </p>
        </button>

        {/* Others */}
        {others.map((s) => (
          <button
            type="button"
            key={s.id}
            onClick={() => onViewStatus(s)}
            className="flex flex-col items-center gap-1 shrink-0"
          >
            <div className="w-12 h-12 rounded-full ring-2 ring-offset-2 ring-offset-[#0d001f] ring-fuchsia-500 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-700 to-fuchsia-700 flex items-center justify-center text-white font-bold text-sm">
                {getDisplayName(s.author).charAt(0).toUpperCase()}
              </div>
            </div>
            <p className="text-white/50 text-[9px] truncate w-12 text-center">
              {getDisplayName(s.author)}
            </p>
          </button>
        ))}

        {statuses.length === 0 && !hasPostedToday && (
          <p className="text-white/20 text-xs self-center">
            No statuses yet — be the first!
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function LunaChat() {
  const { user } = useAuth();
  const [chats, setChats] = useState<ChatData>(loadChats);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [activeChatType, setActiveChatType] = useState<"dm" | "group">("dm");
  const [messageText, setMessageText] = useState("");
  const [showNewDM, setShowNewDM] = useState(false);
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [translatedMsg, setTranslatedMsg] = useState<Record<string, string>>(
    {},
  );

  // Voice recording
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Statuses
  const [statuses, setStatuses] = useState<Status[]>(loadStatuses);
  const [showAddStatus, setShowAddStatus] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [statusImageUrl, setStatusImageUrl] = useState("");
  const [viewingStatus, setViewingStatus] = useState<Status | null>(null);
  const statusImageInputRef = useRef<HTMLInputElement>(null);

  // Members tab state
  const [sidebarTab, setSidebarTab] = useState<"messages" | "members">(
    "messages",
  );
  const [memberSearch, setMemberSearch] = useState("");
  const [profileUser, setProfileUser] = useState<string | null>(null);
  const [friendRequests, setFriendRequests] = useState<Record<string, boolean>>(
    {},
  );

  const allUsers = getAllUsers().filter((u) => u !== user?.email);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on chat change
  useEffect(() => {
    if (containerRef.current)
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [activeChatId]);

  // Translate messages whenever active chat changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional deps
  useEffect(() => {
    const langCode = getLanguageCode();
    const chat =
      activeChatType === "dm"
        ? chats.dms.find((d) => d.id === activeChatId)
        : chats.groups.find((g) => g.id === activeChatId);
    if (!chat || langCode === "en") {
      setTranslatedMsg({});
      return;
    }
    const msgs = chat.messages;
    const promises = msgs.map(async (m) => {
      if (m.sender === user?.email || m.type !== "text")
        return [m.id, m.text] as [string, string];
      const translated = await translateText(m.text, langCode);
      return [m.id, translated] as [string, string];
    });
    Promise.all(promises).then((results) => {
      setTranslatedMsg(Object.fromEntries(results));
    });
  }, [activeChatId, activeChatType, chats]);

  // Cleanup recording on unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card rounded-3xl p-12 text-center max-w-md">
          <div className="text-5xl mb-4">💬</div>
          <h2 className="text-2xl font-bold text-white mb-3">LunaChat</h2>
          <p className="text-white/60 mb-6">
            Please log in to use LunaChat and connect with the community.
          </p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-button text-white font-semibold hover:brightness-110 transition-all"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  const activeChat =
    activeChatType === "dm"
      ? chats.dms.find((d) => d.id === activeChatId)
      : chats.groups.find((g) => g.id === activeChatId);

  const getOtherParticipant = (dm: DM) =>
    dm.participants.find((p) => p !== user.email) ?? "";

  const getLastMessage = (msgs: Message[]) =>
    msgs.length > 0 ? msgs[msgs.length - 1] : null;

  const getUnreadCount = (msgs: Message[]) =>
    msgs.filter((m) => m.sender !== user.email && !m.read).length;

  const pushMessage = (msg: Message) => {
    const updated = { ...chats };
    if (activeChatType === "dm") {
      const dm = updated.dms.find((d) => d.id === activeChatId);
      if (dm) dm.messages.push(msg);
    } else {
      const g = updated.groups.find((g) => g.id === activeChatId);
      if (g) g.messages.push(msg);
    }
    setChats({ ...updated });
    saveChats(updated);
    setTimeout(() => {
      if (containerRef.current)
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, 50);
  };

  const handleSend = () => {
    if (!messageText.trim() || !activeChatId) return;
    const msg: Message = {
      id: crypto.randomUUID(),
      sender: user.email,
      text: messageText.trim(),
      timestamp: Date.now(),
      read: false,
      type: "text",
    };
    pushMessage(msg);
    setMessageText("");
  };

  // ── Attachment ──
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeChatId) return;
    const fileUrl = URL.createObjectURL(file);
    const msg: Message = {
      id: crypto.randomUUID(),
      sender: user.email,
      text: "",
      timestamp: Date.now(),
      read: false,
      type: "attachment",
      fileUrl,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    };
    pushMessage(msg);
    // Reset so the same file can be re-selected
    e.target.value = "";
  };

  // ── Voice recording ──
  const handleMicClick = async () => {
    if (isRecording) {
      // Stop
      mediaRecorderRef.current?.stop();
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      setIsRecording(false);
      setRecordingSeconds(0);
    } else {
      // Start
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);
        audioChunksRef.current = [];
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };
        recorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const fileUrl = URL.createObjectURL(blob);
          if (!activeChatId) return;
          const msg: Message = {
            id: crypto.randomUUID(),
            sender: user.email,
            text: "",
            timestamp: Date.now(),
            read: false,
            type: "voice",
            fileUrl,
            fileType: "audio/webm",
          };
          pushMessage(msg);
          // Stop all tracks
          for (const track of stream.getTracks()) track.stop();
        };
        mediaRecorderRef.current = recorder;
        recorder.start();
        setIsRecording(true);
        setRecordingSeconds(0);
        recordingTimerRef.current = setInterval(() => {
          setRecordingSeconds((s) => s + 1);
        }, 1000);
      } catch {
        alert("Microphone access denied or not available.");
      }
    }
  };

  // ── Status actions ──
  const handleAddStatus = () => {
    if (!statusText.trim() && !statusImageUrl) return;
    const newStatus: Status = {
      id: crypto.randomUUID(),
      author: user.email,
      text: statusText.trim() || undefined,
      imageUrl: statusImageUrl || undefined,
      timestamp: Date.now(),
    };
    // Remove existing status by this user
    const filtered = statuses.filter((s) => s.author !== user.email);
    const updated = [...filtered, newStatus];
    setStatuses(updated);
    saveStatuses(updated);
    setShowAddStatus(false);
    setStatusText("");
    setStatusImageUrl("");
  };

  const handleStatusImageSelected = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) setStatusImageUrl(URL.createObjectURL(file));
  };

  // ── Chat create helpers ──
  const startDM = (otherUser: string) => {
    const existing = chats.dms.find(
      (d) =>
        d.participants.includes(user.email) &&
        d.participants.includes(otherUser),
    );
    if (existing) {
      setActiveChatId(existing.id);
      setActiveChatType("dm");
      setShowNewDM(false);
      return;
    }
    const newDM: DM = {
      id: crypto.randomUUID(),
      participants: [user.email, otherUser],
      messages: [],
    };
    const updated = { ...chats, dms: [...chats.dms, newDM] };
    setChats(updated);
    saveChats(updated);
    setActiveChatId(newDM.id);
    setActiveChatType("dm");
    setShowNewDM(false);
  };

  const createGroup = () => {
    if (!newGroupName.trim() || selectedMembers.length === 0) return;
    const newGroup: Group = {
      id: crypto.randomUUID(),
      name: newGroupName.trim(),
      members: [user.email, ...selectedMembers],
      messages: [],
    };
    const updated = { ...chats, groups: [...chats.groups, newGroup] };
    setChats(updated);
    saveChats(updated);
    setActiveChatId(newGroup.id);
    setActiveChatType("group");
    setShowNewGroup(false);
    setNewGroupName("");
    setSelectedMembers([]);
  };

  const filteredUsers = allUsers.filter(
    (u) =>
      u.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getDisplayName(u).toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    const now = new Date();
    if (d.toDateString() === now.toDateString()) {
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  const formatRecording = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Page Header */}
      <div className="py-8 px-4 text-center">
        <h1 className="text-3xl font-bold text-white">💬 LunaChat</h1>
        <p className="text-white/50 mt-1 text-sm">
          Real-time messaging with the Lunara community
        </p>
      </div>

      {/* Chat UI */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 pb-8">
        <div
          className="glass-card rounded-3xl overflow-hidden"
          style={{ minHeight: "70vh", display: "flex" }}
        >
          {/* ── Sidebar ─────────────────────────────────── */}
          <div
            className="w-72 shrink-0 border-r border-white/10 flex flex-col"
            style={{ background: "rgba(13,0,31,0.5)" }}
          >
            {/* Status row */}
            <StatusRow
              statuses={statuses}
              currentUser={user.email}
              onAddStatus={() => setShowAddStatus(true)}
              onViewStatus={(s) => setViewingStatus(s)}
            />

            {/* Sidebar tabs */}
            <div className="flex border-b border-white/10">
              <button
                type="button"
                onClick={() => setSidebarTab("messages")}
                className={`flex-1 py-3 text-xs font-semibold transition-all ${sidebarTab === "messages" ? "text-purple-300 border-b-2 border-purple-400" : "text-white/40 hover:text-white/70"}`}
                data-ocid="lunachat.tab"
              >
                Messages
              </button>
              <button
                type="button"
                onClick={() => setSidebarTab("members")}
                className={`flex-1 py-3 text-xs font-semibold transition-all flex items-center justify-center gap-1 ${sidebarTab === "members" ? "text-purple-300 border-b-2 border-purple-400" : "text-white/40 hover:text-white/70"}`}
                data-ocid="lunachat.tab"
              >
                <Users className="w-3 h-3" /> Members
              </button>
            </div>

            {sidebarTab === "messages" && (
              <>
                {/* Sidebar header */}
                <div className="p-4 border-b border-white/10">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewDM(true);
                        setShowNewGroup(false);
                      }}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-xl glass-button text-white text-xs font-medium hover:brightness-110 transition-all"
                      data-ocid="lunachat.open_modal_button"
                    >
                      <Plus className="w-3 h-3" /> New Chat
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewGroup(true);
                        setShowNewDM(false);
                      }}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-xl glass-outline text-white text-xs font-medium hover:bg-white/10 transition-all"
                      data-ocid="lunachat.open_modal_button"
                    >
                      <Users className="w-3 h-3" /> New Group
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* DMs + Groups list — only when messages tab active */}
            {sidebarTab === "members" ? (
              /* ── Members panel ── */
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-3 border-b border-white/10">
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    <Search className="w-3.5 h-3.5 text-white/40 shrink-0" />
                    <input
                      value={memberSearch}
                      onChange={(e) => setMemberSearch(e.target.value)}
                      placeholder="Search members..."
                      className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/30"
                      data-ocid="lunachat.search_input"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {getAllUsers()
                    .filter((u) => u !== user?.email)
                    .filter(
                      (u) =>
                        getDisplayName(u)
                          .toLowerCase()
                          .includes(memberSearch.toLowerCase()) ||
                        u.toLowerCase().includes(memberSearch.toLowerCase()),
                    )
                    .map((u, idx) => {
                      const online = getOnlineStatus(u);
                      const name = getDisplayName(u);
                      return (
                        <button
                          key={u}
                          type="button"
                          onClick={() => setProfileUser(u)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-all text-left border-b border-white/5"
                          data-ocid={`lunachat.item.${idx + 1}`}
                        >
                          <div className="relative shrink-0">
                            <div className="w-9 h-9 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-sm">
                              {name.charAt(0).toUpperCase()}
                            </div>
                            {online && (
                              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-[#0d001f]" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-white text-sm font-semibold truncate">
                              {name}
                            </p>
                            <p className="text-white/30 text-xs truncate">
                              {u}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-white/20 shrink-0" />
                        </button>
                      );
                    })}
                  {getAllUsers().filter((u) => u !== user?.email).length ===
                    0 && (
                    <div
                      className="p-6 text-center text-white/30 text-sm"
                      data-ocid="lunachat.empty_state"
                    >
                      No other members yet.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                {chats.dms.length === 0 && chats.groups.length === 0 && (
                  <div className="p-6 text-center text-white/30 text-sm">
                    No conversations yet.
                    <br />
                    Start a new chat!
                  </div>
                )}
                {chats.dms.map((dm, idx) => {
                  const other = getOtherParticipant(dm);
                  const last = getLastMessage(dm.messages);
                  const unread = getUnreadCount(dm.messages);
                  const online = getOnlineStatus(other);
                  const name = getDisplayName(other);
                  const lastText =
                    last?.type === "voice"
                      ? "🎤 Voice message"
                      : last?.type === "attachment"
                        ? `📎 ${last.fileName ?? "File"}`
                        : (last?.text ?? "No messages yet");
                  return (
                    <button
                      type="button"
                      key={dm.id}
                      onClick={() => {
                        setActiveChatId(dm.id);
                        setActiveChatType("dm");
                        const updated = { ...chats };
                        const d = updated.dms.find((x) => x.id === dm.id);
                        if (d)
                          for (const m of d.messages) {
                            m.read = true;
                          }
                        setChats({ ...updated });
                        saveChats(updated);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-all text-left border-b border-white/5 ${
                        activeChatId === dm.id ? "bg-white/10" : ""
                      }`}
                      data-ocid={`lunachat.item.${idx + 1}`}
                    >
                      <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-sm">
                          {name.charAt(0).toUpperCase()}
                        </div>
                        {online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-[#0d001f]" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-white text-sm font-semibold truncate">
                            {name}
                          </p>
                          {last && (
                            <p className="text-white/30 text-xs shrink-0 ml-2">
                              {formatTime(last.timestamp)}
                            </p>
                          )}
                        </div>
                        <p className="text-white/40 text-xs truncate">
                          {lastText}
                        </p>
                      </div>
                      {unread > 0 && (
                        <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center shrink-0">
                          <span className="text-white text-[10px] font-bold">
                            {unread}
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}

                {chats.groups.length > 0 && (
                  <div className="px-4 py-2">
                    <p className="text-white/30 text-xs uppercase tracking-widest">
                      Groups
                    </p>
                  </div>
                )}
                {chats.groups.map((g, idx) => {
                  const last = getLastMessage(g.messages);
                  const unread = getUnreadCount(g.messages);
                  const lastText =
                    last?.type === "voice"
                      ? `🎤 ${getDisplayName(last.sender)}: Voice message`
                      : last?.type === "attachment"
                        ? `📎 ${getDisplayName(last.sender)}: ${last.fileName ?? "File"}`
                        : last
                          ? `${getDisplayName(last.sender)}: ${last.text}`
                          : "No messages yet";
                  return (
                    <button
                      type="button"
                      key={g.id}
                      onClick={() => {
                        setActiveChatId(g.id);
                        setActiveChatType("group");
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-all text-left border-b border-white/5 ${
                        activeChatId === g.id ? "bg-white/10" : ""
                      }`}
                      data-ocid={`lunachat.item.${idx + 1}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white">
                        <Users className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-white text-sm font-semibold truncate">
                            {g.name}
                          </p>
                          {last && (
                            <p className="text-white/30 text-xs shrink-0 ml-2">
                              {formatTime(last.timestamp)}
                            </p>
                          )}
                        </div>
                        <p className="text-white/40 text-xs truncate">
                          {lastText}
                        </p>
                      </div>
                      {unread > 0 && (
                        <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center shrink-0">
                          <span className="text-white text-[10px] font-bold">
                            {unread}
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Main chat area ───────────────────────────── */}
          <div className="flex-1 flex flex-col min-w-0">
            {!activeChat ? (
              <div className="flex-1 flex items-center justify-center text-center px-8">
                <div>
                  <div className="text-6xl mb-4">💬</div>
                  <p className="text-white/50 text-lg font-medium">
                    Select a conversation
                  </p>
                  <p className="text-white/30 text-sm mt-2">
                    Or start a new chat with someone in Lunara
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Chat header */}
                <div
                  className="px-5 py-4 border-b border-white/10 flex items-center gap-3"
                  style={{ background: "rgba(75,0,130,0.2)" }}
                >
                  {activeChatType === "dm" ? (
                    <>
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-sm">
                          {getDisplayName(getOtherParticipant(activeChat as DM))
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                        {getOnlineStatus(
                          getOtherParticipant(activeChat as DM),
                        ) && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-[#14002a]" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">
                          {getDisplayName(
                            getOtherParticipant(activeChat as DM),
                          )}
                        </p>
                        <p className="text-xs">
                          {getOnlineStatus(
                            getOtherParticipant(activeChat as DM),
                          ) ? (
                            <span className="text-green-400">● Online</span>
                          ) : (
                            <span className="text-white/30">Offline</span>
                          )}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">
                          {(activeChat as Group).name}
                        </p>
                        <p className="text-white/40 text-xs">
                          {(activeChat as Group).members.length} members
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Messages */}
                <div
                  ref={containerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-3"
                  style={{ minHeight: 0, maxHeight: "calc(100vh - 280px)" }}
                >
                  {activeChat.messages.length === 0 && (
                    <div className="text-center text-white/30 text-sm py-8">
                      No messages yet. Say hello! 👋
                    </div>
                  )}
                  {activeChat.messages.map((msg) => (
                    <MessageBubble
                      key={msg.id}
                      msg={msg}
                      isMe={msg.sender === user.email}
                      showSender={activeChatType === "group"}
                      displayText={
                        msg.type === "text"
                          ? (translatedMsg[msg.id] ?? msg.text)
                          : undefined
                      }
                      formatTime={formatTime}
                      onEdit={(id, text) => {
                        const updated = { ...chats };
                        const list =
                          activeChatType === "dm"
                            ? updated.dms.find((d) => d.id === activeChatId)
                                ?.messages
                            : updated.groups.find((g) => g.id === activeChatId)
                                ?.messages;
                        if (list) {
                          const m = list.find((x) => x.id === id);
                          if (m) m.text = text;
                        }
                        setChats({ ...updated });
                        saveChats(updated);
                      }}
                      onDelete={(id) => {
                        const updated = { ...chats };
                        if (activeChatType === "dm") {
                          const dm = updated.dms.find(
                            (d) => d.id === activeChatId,
                          );
                          if (dm)
                            dm.messages = dm.messages.filter(
                              (m) => m.id !== id,
                            );
                        } else {
                          const g = updated.groups.find(
                            (g) => g.id === activeChatId,
                          );
                          if (g)
                            g.messages = g.messages.filter((m) => m.id !== id);
                        }
                        setChats({ ...updated });
                        saveChats(updated);
                      }}
                    />
                  ))}
                </div>

                {/* Input bar */}
                <div className="px-3 py-3 border-t border-white/10">
                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="*/*"
                    className="hidden"
                    onChange={handleFileSelected}
                    data-ocid="lunachat.upload_button"
                  />
                  <input
                    ref={statusImageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleStatusImageSelected}
                  />

                  <div className="flex items-center gap-2">
                    {/* Paperclip */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isRecording}
                      title="Attach file"
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30 shrink-0"
                      data-ocid="lunachat.upload_button"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>

                    {/* Text input OR recording indicator */}
                    {isRecording ? (
                      <div className="flex-1 flex items-center gap-2 bg-white/10 border border-red-500/50 rounded-full px-4 py-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 animate-pulse" />
                        <span className="text-red-400 text-sm font-mono">
                          {formatRecording(recordingSeconds)}
                        </span>
                        <span className="text-white/40 text-xs">
                          Recording…
                        </span>
                      </div>
                    ) : (
                      <input
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && !e.shiftKey && handleSend()
                        }
                        placeholder="Type a message…"
                        className="flex-1 bg-white/10 border border-white/15 rounded-full px-4 py-2 text-white placeholder:text-white/30 text-sm outline-none focus:border-purple-400 transition-colors min-w-0"
                        data-ocid="lunachat.input"
                      />
                    )}

                    {/* Mic button */}
                    <button
                      type="button"
                      onClick={handleMicClick}
                      title={isRecording ? "Stop recording" : "Record voice"}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shrink-0 ${
                        isRecording
                          ? "bg-red-600 hover:bg-red-500 text-white"
                          : "text-white/50 hover:text-white hover:bg-white/10"
                      }`}
                      data-ocid="lunachat.toggle"
                    >
                      {isRecording ? (
                        <MicOff className="w-4 h-4" />
                      ) : (
                        <Mic className="w-4 h-4" />
                      )}
                    </button>

                    {/* Send */}
                    {!isRecording && (
                      <button
                        type="button"
                        onClick={handleSend}
                        disabled={!messageText.trim()}
                        className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white hover:bg-purple-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                        data-ocid="lunachat.primary_button"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Member Profile Modal ─────────────────────── */}
      <AnimatePresence>
        {profileUser && (
          <motion.div
            key="profile-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              backdropFilter: "blur(12px)",
              background: "rgba(0,0,0,0.7)",
            }}
            onClick={() => setProfileUser(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative w-full max-w-sm rounded-3xl overflow-hidden"
              style={{
                background: "rgba(13,0,31,0.97)",
                border: "1px solid rgba(139,92,246,0.3)",
                boxShadow: "0 0 60px rgba(139,92,246,0.3)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="h-1 w-full"
                style={{
                  background: "linear-gradient(90deg, #6A0DAD, #a855f7)",
                }}
              />
              {/* Close */}
              <button
                type="button"
                onClick={() => setProfileUser(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-all text-white/50"
                data-ocid="lunachat.close_button"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="p-8 text-center">
                {/* Avatar */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4"
                  style={{
                    background: "linear-gradient(135deg, #6A0DAD, #a855f7)",
                  }}
                >
                  {getDisplayName(profileUser).charAt(0).toUpperCase()}
                </div>
                {/* Name */}
                <h3 className="text-white text-xl font-bold mb-1">
                  {getDisplayName(profileUser)}
                </h3>
                {/* Online status */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div
                    className={`w-2 h-2 rounded-full ${getOnlineStatus(profileUser) ? "bg-green-400" : "bg-white/30"}`}
                  />
                  <span
                    className="text-sm"
                    style={{
                      color: getOnlineStatus(profileUser)
                        ? "#4ade80"
                        : "rgba(255,255,255,0.4)",
                    }}
                  >
                    {getOnlineStatus(profileUser) ? "Online" : "Offline"}
                  </span>
                </div>
                {/* Email */}
                <p className="text-white/30 text-xs mb-6">{profileUser}</p>

                {/* Intro section */}
                {(() => {
                  const usersDb = JSON.parse(
                    localStorage.getItem("lunara_users_db") || "{}",
                  );
                  const intro = usersDb[profileUser]?.intro;
                  if (!intro)
                    return (
                      <div
                        className="rounded-2xl p-4 mb-6 text-center text-white/30 text-sm"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        No intro yet.
                      </div>
                    );
                  const rawFields = [
                    ["🙋 Name", intro.name],
                    ["✨ Fun Fact", intro.funFact],
                    ["🎮 Favourite Games", intro.favoriteGames],
                    ["📍 Location", intro.location],
                    ["🐾 Pets", intro.pets],
                    ["⚧️ Gender", intro.gender],
                    ["⭐ Likes", intro.likes],
                    ["🚫 Dislikes", intro.dislikes],
                    ["🎂 Birthday", intro.birthday],
                    ["👾 Gaming Interests", intro.gamingInterests],
                    ["❓ Why Joined", intro.whyJoined],
                    ["💬 Fun Fact", intro.randomFact],
                  ];
                  const fields: [string, string][] = rawFields.filter(
                    (f): f is [string, string] => !!f[1],
                  );
                  if (fields.length === 0)
                    return (
                      <div
                        className="rounded-2xl p-4 mb-6 text-center text-white/30 text-sm"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        No intro yet.
                      </div>
                    );
                  return (
                    <div
                      className="rounded-2xl p-4 mb-6 text-left space-y-2 max-h-40 overflow-y-auto"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {fields.map(([label, value]) => (
                        <div key={label}>
                          <span className="text-white/40 text-xs">
                            {label}:
                          </span>
                          <span className="text-white/80 text-xs ml-2">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })()}

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (friendRequests[profileUser]) return;
                      setFriendRequests((prev) => ({
                        ...prev,
                        [profileUser]: true,
                      }));
                    }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: friendRequests[profileUser]
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(139,92,246,0.2)",
                      border: "1px solid rgba(139,92,246,0.3)",
                      color: friendRequests[profileUser]
                        ? "rgba(255,255,255,0.4)"
                        : "#c084fc",
                    }}
                    data-ocid="lunachat.secondary_button"
                  >
                    {friendRequests[profileUser] ? "✓ Requested" : "Add Friend"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      startDM(profileUser);
                      setSidebarTab("messages");
                      setProfileUser(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                    style={{
                      background: "linear-gradient(135deg, #6A0DAD, #a855f7)",
                      boxShadow: "0 4px 15px rgba(139,92,246,0.4)",
                    }}
                    data-ocid="lunachat.primary_button"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── New DM Modal ─────────────────────────────── */}
      <AnimatePresence>
        {showNewDM && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
            }}
            onClick={(e) => e.target === e.currentTarget && setShowNewDM(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-modal rounded-3xl p-6 w-full max-w-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">New Chat</h3>
                <button
                  type="button"
                  onClick={() => setShowNewDM(false)}
                  className="text-white/50 hover:text-white"
                  data-ocid="lunachat.close_button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users…"
                  className="w-full bg-white/10 border border-white/15 rounded-xl pl-9 pr-4 py-2 text-white placeholder:text-white/30 text-sm outline-none focus:border-purple-400"
                  data-ocid="lunachat.search_input"
                />
              </div>
              <div className="space-y-1 max-h-60 overflow-y-auto">
                {filteredUsers.length === 0 ? (
                  <p className="text-white/40 text-sm text-center py-4">
                    No users found
                  </p>
                ) : (
                  filteredUsers.map((u) => (
                    <button
                      type="button"
                      key={u}
                      onClick={() => startDM(u)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-all text-left"
                    >
                      <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {getDisplayName(u).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">
                          {getDisplayName(u)}
                        </p>
                        <p className="text-white/30 text-xs">{u}</p>
                      </div>
                      {getOnlineStatus(u) && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-green-400 shrink-0" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── New Group Modal ──────────────────────────── */}
      <AnimatePresence>
        {showNewGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
            }}
            onClick={(e) =>
              e.target === e.currentTarget && setShowNewGroup(false)
            }
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-modal rounded-3xl p-6 w-full max-w-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">New Group</h3>
                <button
                  type="button"
                  onClick={() => setShowNewGroup(false)}
                  className="text-white/50 hover:text-white"
                  data-ocid="lunachat.close_button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <input
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Group name…"
                className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-2 text-white placeholder:text-white/30 text-sm outline-none focus:border-purple-400 mb-3"
                data-ocid="lunachat.input"
              />
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Add members…"
                  className="w-full bg-white/10 border border-white/15 rounded-xl pl-9 pr-4 py-2 text-white placeholder:text-white/30 text-sm outline-none focus:border-purple-400"
                  data-ocid="lunachat.search_input"
                />
              </div>
              {selectedMembers.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {selectedMembers.map((m) => (
                    <span
                      key={m}
                      className="flex items-center gap-1 bg-purple-700/60 text-white text-xs px-2 py-1 rounded-full"
                    >
                      {getDisplayName(m)}
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedMembers(
                            selectedMembers.filter((x) => x !== m),
                          )
                        }
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="space-y-1 max-h-48 overflow-y-auto mb-4">
                {filteredUsers
                  .filter((u) => !selectedMembers.includes(u))
                  .map((u) => (
                    <button
                      type="button"
                      key={u}
                      onClick={() =>
                        setSelectedMembers([...selectedMembers, u])
                      }
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 transition-all text-left"
                    >
                      <div className="w-7 h-7 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-xs shrink-0">
                        {getDisplayName(u).charAt(0).toUpperCase()}
                      </div>
                      <p className="text-white text-sm">{getDisplayName(u)}</p>
                    </button>
                  ))}
              </div>
              <button
                type="button"
                onClick={createGroup}
                disabled={!newGroupName.trim() || selectedMembers.length === 0}
                className="w-full py-2.5 rounded-xl glass-button text-white font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                data-ocid="lunachat.primary_button"
              >
                Create Group
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Add Status Modal ─────────────────────────── */}
      <AnimatePresence>
        {showAddStatus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(12px)",
            }}
            onClick={(e) =>
              e.target === e.currentTarget && setShowAddStatus(false)
            }
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-modal rounded-3xl p-6 w-full max-w-sm"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-bold text-lg">Add Status</h3>
                <button
                  type="button"
                  onClick={() => setShowAddStatus(false)}
                  className="text-white/50 hover:text-white"
                  data-ocid="lunachat.close_button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {statusImageUrl ? (
                <div className="relative mb-4">
                  <img
                    src={statusImageUrl}
                    alt="Status preview"
                    className="w-full rounded-2xl object-cover max-h-48"
                  />
                  <button
                    type="button"
                    onClick={() => setStatusImageUrl("")}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => statusImageInputRef.current?.click()}
                  className="w-full mb-4 py-3 rounded-2xl border border-dashed border-white/20 text-white/40 text-sm hover:border-purple-400 hover:text-white/60 transition-all flex items-center justify-center gap-2"
                  data-ocid="lunachat.upload_button"
                >
                  <Paperclip className="w-4 h-4" /> Add an image
                </button>
              )}

              <textarea
                value={statusText}
                onChange={(e) => setStatusText(e.target.value)}
                placeholder="What's on your mind? ✨"
                rows={3}
                className="w-full bg-white/10 border border-white/15 rounded-2xl px-4 py-3 text-white placeholder:text-white/30 text-sm outline-none focus:border-purple-400 resize-none mb-4"
                data-ocid="lunachat.textarea"
              />

              <button
                type="button"
                onClick={handleAddStatus}
                disabled={!statusText.trim() && !statusImageUrl}
                className="w-full py-2.5 rounded-xl glass-button text-white font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                data-ocid="lunachat.primary_button"
              >
                Share Status
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── View Status Overlay ──────────────────────── */}
      <AnimatePresence>
        {viewingStatus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              background: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(16px)",
            }}
            onClick={() => setViewingStatus(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm mx-4 flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg">
                  {getDisplayName(viewingStatus.author).charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-bold">
                    {getDisplayName(viewingStatus.author)}
                  </p>
                  <p className="text-white/40 text-xs">
                    {formatTime(viewingStatus.timestamp)}
                  </p>
                </div>
              </div>

              {viewingStatus.imageUrl && (
                <img
                  src={viewingStatus.imageUrl}
                  alt="Status"
                  className="w-full rounded-3xl object-cover max-h-80"
                />
              )}
              {viewingStatus.text && (
                <p className="text-white text-center text-lg font-medium leading-relaxed">
                  {viewingStatus.text}
                </p>
              )}

              <button
                type="button"
                onClick={() => setViewingStatus(null)}
                className="mt-2 px-8 py-2.5 rounded-full glass-button text-white text-sm font-semibold hover:brightness-110"
                data-ocid="lunachat.close_button"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useAuth } from "@/hooks/useAuth";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type UserProfile = {
  aboutMe?: string;
  favoriteGames?: string;
  location?: string;
  pets?: string;
  gender?: string;
  dislikes?: string;
  likes?: string;
  birthday?: string;
  gamingInterests?: string;
  whyJoined?: string;
  funFact?: string;
  visible?: boolean;
};

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

function getAllUsers(): string[] {
  try {
    const stored = localStorage.getItem("lunara_users_db");
    if (!stored) return [];
    return Object.keys(JSON.parse(stored));
  } catch {
    return [];
  }
}

export default function PeopleSearch({
  open,
  onClose,
  initialUser,
}: {
  open: boolean;
  onClose: () => void;
  initialUser?: string;
}) {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [blocked, setBlocked] = useState<string[]>([]);
  const [restricted, setRestricted] = useState<string[]>([]);

  useEffect(() => {
    if (!user || !open) return;
    const b = localStorage.getItem(`lunara_blocked_${user.email}`);
    setBlocked(b ? JSON.parse(b) : []);
    const r = localStorage.getItem(`lunara_restricted_${user.email}`);
    setRestricted(r ? JSON.parse(r) : []);
    setQuery("");
    setSelectedUser(initialUser ?? null);
  }, [user, open, initialUser]);

  const allUsers = getAllUsers().filter((u) => u !== user?.email);

  const filtered = query.trim()
    ? allUsers.filter(
        (u) =>
          u.toLowerCase().includes(query.toLowerCase()) ||
          getDisplayName(u).toLowerCase().includes(query.toLowerCase()),
      )
    : allUsers;

  const getProfile = (email: string): UserProfile => {
    try {
      const p = localStorage.getItem(`lunara_profile_${email}`);
      return p ? JSON.parse(p) : {};
    } catch {
      return {};
    }
  };

  const toggleBlock = (email: string) => {
    if (!user) return;
    let updated: string[];
    if (blocked.includes(email)) {
      updated = blocked.filter((e) => e !== email);
    } else {
      updated = [...blocked, email];
    }
    setBlocked(updated);
    localStorage.setItem(
      `lunara_blocked_${user.email}`,
      JSON.stringify(updated),
    );
  };

  const toggleRestrict = (email: string) => {
    if (!user) return;
    let updated: string[];
    if (restricted.includes(email)) {
      updated = restricted.filter((e) => e !== email);
    } else {
      updated = [...restricted, email];
    }
    setRestricted(updated);
    localStorage.setItem(
      `lunara_restricted_${user.email}`,
      JSON.stringify(updated),
    );
  };

  const profileFields = [
    { key: "aboutMe" as const, emoji: "✨", label: "About Me" },
    { key: "favoriteGames" as const, emoji: "🎮", label: "Favorite Games" },
    { key: "location" as const, emoji: "📍", label: "Location" },
    { key: "pets" as const, emoji: "🐾", label: "Pets" },
    { key: "gender" as const, emoji: "⚧️", label: "Gender" },
    { key: "likes" as const, emoji: "⭐", label: "Likes" },
    { key: "dislikes" as const, emoji: "🚫", label: "Dislikes" },
    { key: "gamingInterests" as const, emoji: "👾", label: "Gaming Interests" },
    { key: "whyJoined" as const, emoji: "❓", label: "Why I Joined" },
    { key: "funFact" as const, emoji: "💬", label: "Fun Fact" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6"
          style={{
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(12px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              if (selectedUser) setSelectedUser(null);
              else onClose();
            }
          }}
          data-ocid="people.modal"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass-modal rounded-3xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-white font-bold text-lg">
                {selectedUser
                  ? `👤 ${getDisplayName(selectedUser)}`
                  : "🔍 Find People"}
              </h2>
              <button
                type="button"
                onClick={() => {
                  if (selectedUser) setSelectedUser(null);
                  else onClose();
                }}
                className="text-white/50 hover:text-white transition-colors"
                data-ocid="people.close_button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!selectedUser ? (
              <>
                <div className="px-6 py-3 border-b border-white/10">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search by name or email…"
                      className="w-full bg-white/10 border border-white/15 rounded-xl pl-9 pr-4 py-2 text-white placeholder:text-white/30 text-sm outline-none focus:border-purple-400"
                      data-ocid="people.search_input"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {filtered.length === 0 ? (
                    <div
                      className="p-8 text-center text-white/40 text-sm"
                      data-ocid="people.empty_state"
                    >
                      {query
                        ? `No users found for "${query}"`
                        : "No other users yet"}
                    </div>
                  ) : (
                    filtered.map((u, i) => {
                      const name = getDisplayName(u);
                      const isBlocked = blocked.includes(u);
                      return (
                        <button
                          type="button"
                          key={u}
                          onClick={() => setSelectedUser(u)}
                          className="w-full flex items-center gap-3 px-6 py-3.5 hover:bg-white/5 transition-all text-left border-b border-white/5"
                          data-ocid={`people.item.${i + 1}`}
                        >
                          <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold shrink-0">
                            {name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-white font-semibold text-sm truncate">
                              {name}
                            </p>
                            <p className="text-white/30 text-xs truncate">
                              {u}
                            </p>
                          </div>
                          {isBlocked && (
                            <span className="ml-auto text-xs text-red-400 shrink-0">
                              Blocked
                            </span>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 pb-6">
                {/* User profile view */}
                <div className="text-center py-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
                    {getDisplayName(selectedUser).charAt(0).toUpperCase()}
                  </div>
                  <h3 className="text-white font-bold text-xl">
                    {getDisplayName(selectedUser)}
                  </h3>
                  <p className="text-white/40 text-sm">{selectedUser}</p>
                </div>

                {/* Intro */}
                {(() => {
                  const profile = getProfile(selectedUser);
                  const hasIntro =
                    profile.visible !== false &&
                    Object.entries(profile).some(
                      ([k, v]) =>
                        k !== "visible" &&
                        typeof v === "string" &&
                        v.length > 0,
                    );
                  if (!hasIntro) {
                    return (
                      <div className="glass rounded-2xl p-4 text-center text-white/40 text-sm mb-4">
                        This user hasn&apos;t shared their intro yet
                      </div>
                    );
                  }
                  return (
                    <div className="glass rounded-2xl p-4 mb-4 space-y-2">
                      {profileFields.map(({ key, emoji, label }) =>
                        profile[key] ? (
                          <div key={key} className="flex gap-2 text-sm">
                            <span>{emoji}</span>
                            <span className="text-white/50 shrink-0">
                              {label}:
                            </span>
                            <span className="text-white/80">
                              {profile[key] as string}
                            </span>
                          </div>
                        ) : null,
                      )}
                      {profile.birthday && (
                        <div className="flex gap-2 text-sm">
                          <span>🎂</span>
                          <span className="text-white/50 shrink-0">
                            Birthday:
                          </span>
                          <span className="text-white/80">
                            {profile.birthday}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => toggleRestrict(selectedUser)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      restricted.includes(selectedUser)
                        ? "bg-yellow-600/40 text-yellow-200 border border-yellow-400/30 hover:bg-yellow-600/60"
                        : "glass-outline text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                    data-ocid="people.button"
                  >
                    {restricted.includes(selectedUser)
                      ? "Unrestrict"
                      : "Restrict"}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleBlock(selectedUser)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      blocked.includes(selectedUser)
                        ? "bg-red-600/40 text-red-200 border border-red-400/30 hover:bg-red-600/60"
                        : "bg-red-900/40 text-red-300 border border-red-500/20 hover:bg-red-800/50"
                    }`}
                    data-ocid="people.delete_button"
                  >
                    {blocked.includes(selectedUser) ? "Unblock" : "Block"}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LogOut,
  Menu,
  Phone,
  ScrollText,
  Search,
  Settings,
  User,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import IntroPopup from "./IntroPopup";
import PeopleSearch from "./PeopleSearch";
import RulesPopup from "./RulesPopup";
import SettingsModal from "./SettingsModal";

const navLinks = [
  { label: "Explore", href: "/" as const },
  { label: "Soundscape", href: "/soundscape" as const },
  { label: "Pixel Hands", href: "/pixellens" as const },
  { label: "Wild Gang", href: "/wildgang" as const },
  { label: "Aloxide", href: "/aloxide" as const },
  { label: "Lunar Arcadia", href: "/lunar-arcadia" as const },
  { label: "MoonMart", href: "/marketplace" as const },
  { label: "LunaChat", href: "/lunachat" as const },
  { label: "About", href: "/about" as const },
];

const searchSections = [
  {
    name: "Home",
    description: "Lunara homepage — explore everything",
    emoji: "🌙",
    href: "/",
    keywords: ["home", "explore", "start", "lunara"],
  },
  {
    name: "Soundscape Sanctuary",
    description: "Music zone — listen, upload, and discover artists",
    emoji: "🎵",
    href: "/soundscape",
    keywords: [
      "music",
      "sound",
      "artist",
      "playlist",
      "songs",
      "beats",
      "audio",
    ],
  },
  {
    name: "Pixel Hands",
    description: "Art zone — poetry, art gallery, and community projects",
    emoji: "🎨",
    href: "/pixellens",
    keywords: ["art", "poetry", "gallery", "creative", "projects", "pixel"],
  },
  {
    name: "Wild Gang",
    description: "Community hub — chatrooms, study groups, and events",
    emoji: "💬",
    href: "/wildgang",
    keywords: [
      "chat",
      "community",
      "study",
      "groups",
      "voice",
      "events",
      "social",
    ],
  },
  {
    name: "Aloxide",
    description: "Tech zone — Doubts, Help, and Regular Chat rooms",
    emoji: "💻",
    href: "/aloxide",
    keywords: ["tech", "code", "help", "doubts", "programming", "developer"],
  },
  {
    name: "Lunar Arcadia",
    description: "Games zone — arcade games with leaderboards",
    emoji: "🎮",
    href: "/lunar-arcadia",
    keywords: [
      "games",
      "arcade",
      "play",
      "leaderboard",
      "chess",
      "ludo",
      "sudoku",
    ],
  },
  {
    name: "MoonMart",
    description: "Marketplace — second-hand listings from real users",
    emoji: "🛍",
    href: "/marketplace",
    keywords: ["buy", "sell", "market", "second-hand", "listings", "shop"],
  },
  {
    name: "LunaChat",
    description: "WhatsApp-style messaging with the community",
    emoji: "💬",
    href: "/lunachat",
    keywords: ["chat", "message", "dm", "group", "lunachat", "messaging"],
  },
  {
    name: "About",
    description: "Lunara's story, founders, and how to get help",
    emoji: "🌌",
    href: "/about",
    keywords: [
      "about",
      "founders",
      "story",
      "contact",
      "help",
      "arthur",
      "abhi",
    ],
  },
];

function SiteSearch({
  onClose,
  onOpenPeopleProfile,
  onOpenPeopleSearch,
}: {
  onClose: () => void;
  onOpenPeopleProfile: (email: string) => void;
  onOpenPeopleSearch: () => void;
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSections = query.trim()
    ? searchSections.filter((s) => {
        const q = query.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.keywords.some((k) => k.includes(q))
        );
      })
    : searchSections;

  // Search registered users
  const filteredUsers: { email: string; name: string }[] = [];
  if (query.trim()) {
    try {
      const stored = localStorage.getItem("lunara_users_db");
      if (stored) {
        const db: Record<string, { name: string }> = JSON.parse(stored);
        const q = query.toLowerCase();
        for (const [email, data] of Object.entries(db)) {
          if (
            data.name?.toLowerCase().includes(q) ||
            email.toLowerCase().includes(q)
          ) {
            filteredUsers.push({ email, name: data.name || email });
          }
        }
      }
    } catch {
      // ignore parse errors
    }
  }

  const totalItems = filteredSections.length + filteredUsers.length;

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const goTo = (href: string) => {
    navigate({ to: href as "/" });
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, totalItems - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (
        activeIndex < filteredSections.length &&
        filteredSections.length > 0
      ) {
        goTo(filteredSections[activeIndex].href);
      } else {
        const userIdx = activeIndex - filteredSections.length;
        if (filteredUsers[userIdx]) {
          onOpenPeopleProfile(filteredUsers[userIdx].email);
          onClose();
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[12vh] px-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(13,0,31,0.88) 0%, rgba(36,0,61,0.88) 60%, rgba(75,0,130,0.82) 100%)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.97 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl"
        onKeyDown={handleKeyDown}
      >
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-purple-400/30"
          style={{
            background: "rgba(75,0,130,0.35)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              "0 8px 32px rgba(168,85,247,0.2), 0 0 0 1px rgba(168,85,247,0.15)",
          }}
        >
          <Search className="w-5 h-5 text-purple-300 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Search sections, zones, people…"
            className="flex-1 bg-transparent text-white placeholder:text-white/40 text-base outline-none"
            data-ocid="search.search_input"
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-white/40 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-white/40 hover:text-white/80 transition-colors text-xs font-mono border border-white/20 px-1.5 py-0.5 rounded ml-1"
            aria-label="Close search"
            data-ocid="search.close_button"
          >
            ESC
          </button>
        </div>

        <p className="text-white/40 text-xs px-1 mt-3 mb-2">
          {query.trim()
            ? `${filteredSections.length + filteredUsers.length} result${
                filteredSections.length + filteredUsers.length !== 1 ? "s" : ""
              }`
            : "Quick Links"}
        </p>

        <div
          className="rounded-2xl border border-purple-400/20 overflow-hidden"
          style={{
            background: "rgba(36,0,61,0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          {filteredSections.length === 0 && filteredUsers.length === 0 ? (
            <div className="px-4 py-8 text-center text-white/40 text-sm">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <>
              {/* Find People quick link — shown when no query */}
              {!query.trim() && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenPeopleSearch();
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 border-b border-white/[0.06] hover:bg-white/[0.05]"
                  data-ocid="search.item.find_people"
                >
                  <span className="text-2xl shrink-0 w-8 text-center">👥</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-white/80">
                      Find People 🔍
                    </p>
                    <p className="text-white/45 text-xs truncate">
                      Search for users and view profiles
                    </p>
                  </div>
                </button>
              )}
              {/* Zones section */}
              {filteredSections.length > 0 && (
                <>
                  {query.trim() && filteredUsers.length > 0 && (
                    <div className="px-4 py-2 border-b border-white/[0.06]">
                      <p className="text-white/35 text-xs font-semibold uppercase tracking-wider">
                        Zones & Sections
                      </p>
                    </div>
                  )}
                  {filteredSections.map((section, i) => (
                    <button
                      key={section.href}
                      type="button"
                      onClick={() => goTo(section.href)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 ${
                        i < filteredSections.length - 1 ||
                        filteredUsers.length > 0
                          ? "border-b border-white/[0.06]"
                          : ""
                      } ${
                        i === activeIndex
                          ? "bg-purple-500/25"
                          : "hover:bg-white/[0.05]"
                      }`}
                      data-ocid={`search.item.${i + 1}`}
                    >
                      <span className="text-2xl shrink-0 w-8 text-center">
                        {section.emoji}
                      </span>
                      <div className="min-w-0">
                        <p
                          className={`font-semibold text-sm ${
                            i === activeIndex ? "text-white" : "text-white/80"
                          }`}
                        >
                          {section.name}
                        </p>
                        <p className="text-white/45 text-xs truncate">
                          {section.description}
                        </p>
                      </div>
                      {i === activeIndex && (
                        <span className="ml-auto text-purple-300/60 text-xs font-mono shrink-0">
                          ↵
                        </span>
                      )}
                    </button>
                  ))}
                </>
              )}

              {/* People section */}
              {filteredUsers.length > 0 && (
                <>
                  <div className="px-4 py-2 border-b border-white/[0.06]">
                    <p className="text-white/35 text-xs font-semibold uppercase tracking-wider">
                      People
                    </p>
                  </div>
                  {filteredUsers.map((u, i) => {
                    const globalIdx = filteredSections.length + i;
                    return (
                      <button
                        key={u.email}
                        type="button"
                        onClick={() => {
                          onOpenPeopleProfile(u.email);
                          onClose();
                        }}
                        onMouseEnter={() => setActiveIndex(globalIdx)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 ${
                          i < filteredUsers.length - 1
                            ? "border-b border-white/[0.06]"
                            : ""
                        } ${
                          globalIdx === activeIndex
                            ? "bg-purple-500/25"
                            : "hover:bg-white/[0.05]"
                        }`}
                        data-ocid={`search.item.${globalIdx + 1}`}
                      >
                        <span className="text-2xl shrink-0 w-8 text-center">
                          👤
                        </span>
                        <div className="min-w-0">
                          <p
                            className={`font-semibold text-sm ${
                              globalIdx === activeIndex
                                ? "text-white"
                                : "text-white/80"
                            }`}
                          >
                            {u.name}
                          </p>
                          <p className="text-white/45 text-xs truncate">
                            {u.email}
                          </p>
                        </div>
                        {globalIdx === activeIndex && (
                          <span className="ml-auto text-purple-300/60 text-xs font-mono shrink-0">
                            ↵
                          </span>
                        )}
                      </button>
                    );
                  })}
                </>
              )}
            </>
          )}
        </div>

        <p className="text-white/25 text-xs text-center mt-3">
          ↑↓ navigate · ↵ open · ESC close · Ctrl+K reopen
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Header() {
  const auth = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [peopleSearchOpen, setPeopleSearchOpen] = useState(false);
  const [peopleInitialUser, setPeopleInitialUser] = useState<
    string | undefined
  >(undefined);
  const [rulesForceOpen, setRulesForceOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const userId = auth.user?.email ?? "";

  useEffect(() => {
    if (!userId) return;
    const storedAvatar = localStorage.getItem(`lunara_avatar_${userId}`);
    if (storedAvatar) setAvatarUrl(storedAvatar);
    const storedName = localStorage.getItem(`lunara_name_${userId}`);
    setDisplayName(storedName ?? auth.user?.name ?? "");
  }, [userId, auth.user?.name]);

  // Listen for updates from SettingsModal
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (!userId) return;
      if (e.key === `lunara_avatar_${userId}` && e.newValue) {
        setAvatarUrl(e.newValue);
      }
      if (e.key === `lunara_name_${userId}` && e.newValue) {
        setDisplayName(e.newValue);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [userId]);

  // Apply saved theme on mount
  useEffect(() => {
    const theme = localStorage.getItem("lunara_theme");
    if (theme === "light") {
      document.documentElement.classList.add("light-mode");
    } else {
      document.documentElement.classList.remove("light-mode");
    }
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const initial =
    displayName?.charAt(0).toUpperCase() ??
    auth.user?.name?.charAt(0).toUpperCase() ??
    "";

  const handleOpenPeopleProfile = (email: string) => {
    setPeopleInitialUser(email);
    setPeopleSearchOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <Link
              to="/"
              className="flex items-center gap-2 shrink-0"
              data-ocid="header.link"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-accent/40 blur-md" />
                <img
                  src="/assets/lunara-logo.png"
                  alt="Lunara logo"
                  className="relative w-9 h-9 object-cover rounded-full ring-2 ring-white/20"
                />
              </div>
              <span className="text-foreground font-bold text-xl tracking-tight">
                Lunara
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-white glass-pill"
                      : "text-white/60 hover:text-white hover:glass-pill"
                  }`}
                  data-ocid="header.link"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Search icon button */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/70
                  bg-white/10 backdrop-blur-md
                  ring-2 ring-purple-400/40 shadow-[0_0_8px_1px_rgba(168,85,247,0.2)]
                  hover:text-white hover:bg-white/20 hover:ring-purple-300/60 hover:shadow-[0_0_12px_3px_rgba(168,85,247,0.35)]
                  transition-all duration-200 focus:outline-none"
                aria-label="Search (Ctrl+K)"
                title="Search — Ctrl+K"
                data-ocid="search.open_modal_button"
              >
                <Search className="w-4 h-4" />
              </button>

              {auth.user ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm
                          bg-gradient-to-br from-purple-600 to-purple-900
                          ring-2 ring-purple-400/60 shadow-[0_0_10px_2px_rgba(168,85,247,0.4)]
                          backdrop-blur-md hover:ring-purple-300/80 hover:shadow-[0_0_14px_4px_rgba(168,85,247,0.55)]
                          transition-all duration-200 cursor-pointer focus:outline-none overflow-hidden"
                        aria-label="User menu"
                        data-ocid="header.button"
                      >
                        {avatarUrl ? (
                          <img
                            src={avatarUrl}
                            alt="avatar"
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          initial
                        )}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-52 glass border border-white/10 text-white"
                    >
                      <DropdownMenuLabel className="text-white/90 font-semibold">
                        {displayName || auth.user.name}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-white/10" />

                      {/* Settings */}
                      <DropdownMenuItem
                        className="text-white/70 hover:text-white focus:text-white cursor-pointer gap-2"
                        onClick={() => setSettingsOpen(true)}
                        data-ocid="header.button"
                      >
                        <Settings className="w-4 h-4 text-purple-300" />
                        Settings ⚙️
                      </DropdownMenuItem>

                      {/* Re-read Rules */}
                      <DropdownMenuItem
                        className="text-white/70 hover:text-white focus:text-white cursor-pointer gap-2"
                        onClick={() => setRulesForceOpen(true)}
                        data-ocid="header.button"
                      >
                        <ScrollText className="w-4 h-4 text-purple-300" />
                        Re-read Rules 📜
                      </DropdownMenuItem>

                      {/* Contact Developer */}
                      <DropdownMenuItem asChild data-ocid="header.link">
                        <a
                          href="tel:+917676387443"
                          className="text-white/70 hover:text-white focus:text-white cursor-pointer gap-2 flex items-center w-full px-2 py-1.5 text-sm rounded-sm"
                        >
                          <Phone className="w-4 h-4 text-purple-300" />
                          Contact Developer
                        </a>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="bg-white/10" />

                      <DropdownMenuItem
                        className="text-white/70 hover:text-white focus:text-white cursor-pointer gap-2"
                        onClick={auth.logout}
                        data-ocid="header.button"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Link to="/login" data-ocid="header.button">
                  <button
                    type="button"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white
                      bg-white/10 backdrop-blur-md
                      ring-2 ring-purple-400/50 shadow-[0_0_10px_2px_rgba(168,85,247,0.3)]
                      hover:bg-white/20 hover:ring-purple-300/70 hover:shadow-[0_0_14px_4px_rgba(168,85,247,0.45)]
                      transition-all duration-200 focus:outline-none"
                    aria-label="Sign in"
                  >
                    <User className="w-5 h-5" />
                  </button>
                </Link>
              )}

              {/* Mobile hamburger */}
              <button
                type="button"
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-white/70 hover:text-white glass transition-all"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                data-ocid="header.toggle"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/08 glass-strong px-4 pb-4 pt-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? "text-white glass-pill"
                    : "text-white/60 hover:text-white hover:bg-white/08"
                }`}
                onClick={() => setMobileOpen(false)}
                data-ocid="header.link"
              >
                {link.label}
              </Link>
            ))}
            {auth.user && (
              <div className="pt-2 px-1 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSettingsOpen(true);
                    setMobileOpen(false);
                  }}
                  className="text-white/60 text-sm hover:text-white flex items-center gap-1"
                >
                  <Settings className="w-4 h-4" /> Settings
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRulesForceOpen(true);
                    setMobileOpen(false);
                  }}
                  className="text-white/60 text-sm hover:text-white flex items-center gap-1"
                >
                  <ScrollText className="w-4 h-4" /> Rules
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Full-screen Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <SiteSearch
            onClose={() => setSearchOpen(false)}
            onOpenPeopleProfile={handleOpenPeopleProfile}
            onOpenPeopleSearch={() => {
              setSearchOpen(false);
              setPeopleSearchOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      {/* People Search Modal */}
      <PeopleSearch
        open={peopleSearchOpen}
        onClose={() => {
          setPeopleSearchOpen(false);
          setPeopleInitialUser(undefined);
        }}
        initialUser={peopleInitialUser}
      />

      {/* First-login Intro Popup */}
      <IntroPopup onGoToSettings={() => setSettingsOpen(true)} />

      {/* Rules Popup (first login + force re-read) */}
      <RulesPopup
        forceOpen={rulesForceOpen}
        onClose={() => setRulesForceOpen(false)}
      />
    </>
  );
}

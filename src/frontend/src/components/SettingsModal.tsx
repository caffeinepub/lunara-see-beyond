import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { Camera, Eye, EyeOff, Key, Pencil, Save, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type ProfileData = {
  aboutMe: string;
  favoriteGames: string;
  location: string;
  pets: string;
  gender: string;
  dislikes: string;
  likes: string;
  birthday: string;
  gamingInterests: string;
  whyJoined: string;
  funFact: string;
  visible: boolean;
};

const emptyProfile = (): ProfileData => ({
  aboutMe: "",
  favoriteGames: "",
  location: "",
  pets: "",
  gender: "",
  dislikes: "",
  likes: "",
  birthday: "",
  gamingInterests: "",
  whyJoined: "",
  funFact: "",
  visible: true,
});

function DangerZone() {
  const { user, logout } = useAuth();
  const [disableConfirm, setDisableConfirm] = useState(false);
  const [deleteStep, setDeleteStep] = useState<
    null | "choose" | "confirm-keep" | "confirm-all"
  >(null);
  const [confirmText, setConfirmText] = useState("");

  const handleDisable = () => {
    if (!user) return;
    localStorage.setItem(`lunara_account_disabled_${user.email}`, "true");
    logout();
  };

  const handleDelete = (mode: "keep" | "all") => {
    if (!user || confirmText !== "DELETE") return;
    const usersRaw = localStorage.getItem("lunara_users_db");
    if (usersRaw) {
      try {
        const db = JSON.parse(usersRaw);
        delete db[user.email];
        localStorage.setItem("lunara_users_db", JSON.stringify(db));
      } catch {
        /* ignore */
      }
    }
    const keys = [
      `lunara_profile_${user.email}`,
      `lunara_avatar_${user.email}`,
      `lunara_name_${user.email}`,
      `lunara_blocked_${user.email}`,
      `lunara_restricted_${user.email}`,
      `lunara_marketplace_${user.email}`,
    ];
    if (mode === "all") {
      keys.push(
        `lunara_music_${user.email}`,
        `lunara_art_${user.email}`,
        `lunara_poems_${user.email}`,
      );
    }
    for (const k of keys) {
      localStorage.removeItem(k);
    }
    logout();
  };

  return (
    <div
      className="rounded-2xl border border-red-500/40 overflow-hidden"
      style={{ background: "rgba(127,0,0,0.12)" }}
      data-ocid="settings.panel"
    >
      <div className="px-4 py-3 border-b border-red-500/30 flex items-center gap-2">
        <span className="text-lg">⚠️</span>
        <h3 className="text-red-400 font-bold text-sm uppercase tracking-wider">
          Danger Zone
        </h3>
      </div>
      <div className="p-4 space-y-4">
        {/* Disable Account */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-yellow-300 font-semibold text-sm">
                Disable Account
              </p>
              <p className="text-white/50 text-xs mt-0.5">
                Hides your profile — re-enable by logging back in
              </p>
            </div>
            {!disableConfirm && (
              <button
                type="button"
                onClick={() => setDisableConfirm(true)}
                className="shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold bg-yellow-500/20 border border-yellow-400/40 text-yellow-300 hover:bg-yellow-500/30 transition-colors"
                data-ocid="settings.toggle"
              >
                Disable
              </button>
            )}
          </div>
          {disableConfirm && (
            <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-3 space-y-2">
              <p className="text-yellow-200 text-xs">
                Are you sure? Your profile will be hidden from other users. You
                can re-enable it by logging back in.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDisableConfirm(false)}
                  className="flex-1 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white/70 hover:bg-white/15 transition-colors"
                  data-ocid="settings.cancel_button"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDisable}
                  className="flex-1 py-1.5 rounded-lg text-xs font-semibold bg-yellow-500/30 text-yellow-200 hover:bg-yellow-500/40 border border-yellow-400/40 transition-colors"
                  data-ocid="settings.confirm_button"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-red-500/20" />

        {/* Delete Account */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-red-400 font-semibold text-sm">
                Delete Account
              </p>
              <p className="text-white/50 text-xs mt-0.5">
                Permanently removes your account
              </p>
            </div>
            {!deleteStep && (
              <button
                type="button"
                onClick={() => setDeleteStep("choose")}
                className="shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-500/20 border border-red-400/40 text-red-300 hover:bg-red-500/30 transition-colors"
                data-ocid="settings.delete_button"
              >
                Delete
              </button>
            )}
          </div>

          {deleteStep === "choose" && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 space-y-2">
              <p className="text-red-200 text-xs font-medium">
                Choose what happens to your content:
              </p>
              <button
                type="button"
                onClick={() => {
                  setDeleteStep("confirm-keep");
                  setConfirmText("");
                }}
                className="w-full text-left rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-2.5 transition-colors"
                data-ocid="settings.button"
              >
                <p className="text-white/90 text-xs font-semibold">
                  🎵 Keep my music, art & poems
                </p>
                <p className="text-white/45 text-xs mt-0.5">
                  Deletes account & marketplace listings — content stays for the
                  community
                </p>
              </button>
              <button
                type="button"
                onClick={() => {
                  setDeleteStep("confirm-all");
                  setConfirmText("");
                }}
                className="w-full text-left rounded-lg border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 px-3 py-2.5 transition-colors"
                data-ocid="settings.delete_button"
              >
                <p className="text-red-300 text-xs font-semibold">
                  🗑️ Delete everything
                </p>
                <p className="text-white/45 text-xs mt-0.5">
                  Removes account, all content, music, art, and marketplace
                  listings
                </p>
              </button>
              <button
                type="button"
                onClick={() => setDeleteStep(null)}
                className="w-full py-1.5 rounded-lg text-xs font-medium bg-white/5 text-white/50 hover:bg-white/10 transition-colors"
                data-ocid="settings.cancel_button"
              >
                Cancel
              </button>
            </div>
          )}

          {(deleteStep === "confirm-keep" || deleteStep === "confirm-all") && (
            <div className="rounded-xl border border-red-500/40 bg-red-500/15 p-3 space-y-2">
              <p className="text-red-200 text-xs font-medium">
                {deleteStep === "confirm-all"
                  ? "⚠️ This will delete your account AND all your content."
                  : "⚠️ This will permanently delete your account."}
              </p>
              <p className="text-white/60 text-xs">
                Type{" "}
                <span className="font-mono font-bold text-red-300">DELETE</span>{" "}
                to confirm:
              </p>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type DELETE here"
                className="w-full bg-black/30 border border-red-500/30 rounded-lg px-3 py-2 text-white text-xs placeholder:text-white/30 outline-none focus:border-red-400/60"
                data-ocid="settings.input"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setDeleteStep(null);
                    setConfirmText("");
                  }}
                  className="flex-1 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white/70 hover:bg-white/15 transition-colors"
                  data-ocid="settings.cancel_button"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleDelete(deleteStep === "confirm-all" ? "all" : "keep")
                  }
                  disabled={confirmText !== "DELETE"}
                  className="flex-1 py-1.5 rounded-lg text-xs font-semibold bg-red-600/50 text-red-100 border border-red-400/40 hover:bg-red-600/60 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  data-ocid="settings.confirm_button"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SettingsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData>(emptyProfile());
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [blocked, setBlocked] = useState<string[]>([]);
  const [restricted, setRestricted] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("English");
  const [langSearch, setLangSearch] = useState("");
  // Edit Profile Picture
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  // Edit Name
  const [editNameValue, setEditNameValue] = useState("");
  const [editNameMsg, setEditNameMsg] = useState("");
  // Change Password
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [pwMsg, setPwMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!user || !open) return;
    const p = localStorage.getItem(`lunara_profile_${user.email}`);
    setProfile(p ? JSON.parse(p) : emptyProfile());
    const b = localStorage.getItem(`lunara_blocked_${user.email}`);
    setBlocked(b ? JSON.parse(b) : []);
    const r = localStorage.getItem(`lunara_restricted_${user.email}`);
    setRestricted(r ? JSON.parse(r) : []);
    const theme = localStorage.getItem("lunara_theme");
    setDarkMode(theme !== "light");
    const savedLang = localStorage.getItem("lunara_language");
    if (savedLang) setLanguage(savedLang);
    setActiveTab("profile");
  }, [user, open]);

  const saveProfile = () => {
    if (!user) return;
    localStorage.setItem(
      `lunara_profile_${user.email}`,
      JSON.stringify(profile),
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const unblock = (email: string) => {
    if (!user) return;
    const updated = blocked.filter((e) => e !== email);
    setBlocked(updated);
    localStorage.setItem(
      `lunara_blocked_${user.email}`,
      JSON.stringify(updated),
    );
  };

  // Load avatar and display name for privacy tab
  const userId = user?.email ?? "";
  const userName = user?.name ?? "";
  useEffect(() => {
    if (!userId) return;
    const stored = localStorage.getItem(`lunara_avatar_${userId}`);
    setAvatarUrl(stored ?? null);
    const storedName = localStorage.getItem(`lunara_name_${userId}`);
    setEditNameValue(storedName ?? userName ?? "");
  }, [userId, userName]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      localStorage.setItem(`lunara_avatar_${userId}`, dataUrl);
      setAvatarUrl(dataUrl);
      // Trigger storage event for Header to pick up
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: `lunara_avatar_${userId}`,
          newValue: dataUrl,
        }),
      );
    };
    reader.readAsDataURL(file);
  };

  const handleSaveName = () => {
    if (!editNameValue.trim() || !userId) return;
    localStorage.setItem(`lunara_name_${userId}`, editNameValue.trim());
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: `lunara_name_${userId}`,
        newValue: editNameValue.trim(),
      }),
    );
    setEditNameMsg("Name updated!");
    setTimeout(() => setEditNameMsg(""), 2000);
  };

  const handleChangePassword = () => {
    setPwMsg(null);
    if (!currentPw || !newPw || !confirmPw) {
      setPwMsg({ type: "error", text: "All fields are required." });
      return;
    }
    if (newPw !== confirmPw) {
      setPwMsg({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (newPw.length < 6) {
      setPwMsg({
        type: "error",
        text: "Password must be at least 6 characters.",
      });
      return;
    }
    const db = JSON.parse(localStorage.getItem("lunara_users_db") || "{}");
    const userData = db[userId];
    if (!userData || userData.password !== currentPw) {
      setPwMsg({ type: "error", text: "Current password is incorrect." });
      return;
    }
    db[userId].password = newPw;
    localStorage.setItem("lunara_users_db", JSON.stringify(db));
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
    setPwMsg({ type: "success", text: "Password changed successfully!" });
    setTimeout(() => setPwMsg(null), 3000);
  };

  const unrestrict = (email: string) => {
    if (!user) return;
    const updated = restricted.filter((e) => e !== email);
    setRestricted(updated);
    localStorage.setItem(
      `lunara_restricted_${user.email}`,
      JSON.stringify(updated),
    );
  };

  const handleThemeToggle = (checked: boolean) => {
    setDarkMode(checked);
    const theme = checked ? "dark" : "light";
    localStorage.setItem("lunara_theme", theme);
    if (theme === "light") {
      document.documentElement.classList.add("light-mode");
    } else {
      document.documentElement.classList.remove("light-mode");
    }
  };

  const inputCls =
    "w-full bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-white placeholder:text-white/30 text-sm outline-none focus:border-purple-400 transition-colors";

  const field = (
    key: keyof ProfileData,
    label: string,
    emoji: string,
    placeholder: string,
    type = "text",
  ) => (
    <div className="space-y-1.5">
      <Label className="text-white/70 text-xs font-medium">
        {emoji} {label}
      </Label>
      <input
        type={type}
        value={profile[key] as string}
        onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
        placeholder={placeholder}
        className={inputCls}
        data-ocid="settings.input"
      />
    </div>
  );

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
          onClick={(e) => e.target === e.currentTarget && onClose()}
          data-ocid="settings.modal"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass-modal rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-white font-bold text-xl">⚙️ Settings</h2>
              <button
                type="button"
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors"
                data-ocid="settings.close_button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="mx-6 mt-4 bg-white/10 grid grid-cols-4 shrink-0 rounded-lg p-1">
                {(
                  ["profile", "privacy", "appearance", "language"] as const
                ).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 px-2 rounded-md text-xs font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-purple-600 text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                    data-ocid="settings.tab"
                  >
                    {tab === "profile"
                      ? "My Profile"
                      : tab === "privacy"
                        ? "Privacy"
                        : tab === "appearance"
                          ? "Appearance"
                          : "🌐 Language"}
                  </button>
                ))}
              </div>

              {/* My Profile Tab */}
              {activeTab === "profile" && (
                <div className="flex-1 overflow-y-auto px-6 pb-6">
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold text-sm">
                          Show intro on public profile
                        </p>
                        <p className="text-white/40 text-xs">
                          Let others see your intro when they visit your profile
                        </p>
                      </div>
                      <Switch
                        checked={profile.visible}
                        onCheckedChange={(v) =>
                          setProfile((p) => ({ ...p, visible: v }))
                        }
                        data-ocid="settings.switch"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {field(
                        "aboutMe",
                        "About Me",
                        "✨",
                        "A quick fun fact or interest",
                      )}
                      {field(
                        "favoriteGames",
                        "Favorite Games",
                        "🎮",
                        "Your go-to games",
                      )}
                      {field("location", "Location", "📍", "Where you're from")}
                      {field("pets", "Pets", "🐾", "Got any? Dream pet?")}
                      {field("gender", "Gender", "⚧️", "How you identify")}
                      {field(
                        "dislikes",
                        "Dislikes",
                        "🚫",
                        "What do you dislike?",
                      )}
                      {field("likes", "Likes", "⭐", "What do you enjoy?")}
                      {field("birthday", "Birthday", "🎂", "", "date")}
                      {field(
                        "gamingInterests",
                        "Gaming Interests",
                        "👾",
                        "Game titles you play",
                      )}
                      {field(
                        "whyJoined",
                        "Why I Joined",
                        "❓",
                        "What made you join?",
                      )}
                      {field(
                        "funFact",
                        "Random Fun Fact",
                        "💬",
                        "Something quirky about you!",
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={saveProfile}
                      className="w-full py-3 rounded-xl glass-button text-white font-semibold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2"
                      data-ocid="settings.save_button"
                    >
                      {saved ? (
                        <>✅ Saved!</>
                      ) : (
                        <>
                          <Save className="w-4 h-4" /> Save Profile
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === "privacy" && (
                <div className="flex-1 overflow-y-auto px-6 pb-6">
                  <div className="mt-4 space-y-6">
                    {/* Edit Profile Picture */}
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                        <Camera className="w-4 h-4 text-purple-300" /> 📷
                        Profile Picture
                      </h3>
                      <div className="glass rounded-2xl p-4 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-purple-800/40 ring-2 ring-purple-400/40 flex-shrink-0 flex items-center justify-center">
                          {avatarUrl ? (
                            <img
                              src={avatarUrl}
                              alt="avatar"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white/50 text-xl">
                              {userName?.charAt(0).toUpperCase() ?? "?"}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="text-white/70 text-sm mb-2">
                            Upload a new profile picture
                          </p>
                          <input
                            ref={avatarInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                            data-ocid="settings.upload_button"
                          />
                          <button
                            type="button"
                            onClick={() => avatarInputRef.current?.click()}
                            className="px-4 py-1.5 rounded-xl text-sm font-medium bg-purple-600/40 hover:bg-purple-500/50 text-white border border-purple-400/30 transition-colors flex items-center gap-2"
                            data-ocid="settings.button"
                          >
                            <Camera className="w-3.5 h-3.5" /> Choose Photo
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Edit Display Name */}
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                        <Pencil className="w-4 h-4 text-purple-300" /> ✏️ Display
                        Name
                      </h3>
                      <div className="glass rounded-2xl p-4 space-y-3">
                        <input
                          type="text"
                          value={editNameValue}
                          onChange={(e) => setEditNameValue(e.target.value)}
                          placeholder="Enter display name"
                          className="w-full bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-white placeholder:text-white/30 text-sm outline-none focus:border-purple-400 transition-colors"
                          data-ocid="settings.input"
                        />
                        {editNameMsg && (
                          <p className="text-green-400 text-xs">
                            {editNameMsg}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={handleSaveName}
                          className="px-4 py-1.5 rounded-xl text-sm font-medium bg-purple-600/40 hover:bg-purple-500/50 text-white border border-purple-400/30 transition-colors flex items-center gap-2"
                          data-ocid="settings.save_button"
                        >
                          <Save className="w-3.5 h-3.5" /> Save Name
                        </button>
                      </div>
                    </div>

                    {/* Change Password */}
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                        <Key className="w-4 h-4 text-purple-300" /> 🔑 Change
                        Password
                      </h3>
                      <div className="glass rounded-2xl p-4 space-y-3">
                        {/* Current Password */}
                        <div className="relative">
                          <input
                            type={showCurrentPw ? "text" : "password"}
                            value={currentPw}
                            onChange={(e) => setCurrentPw(e.target.value)}
                            placeholder="Current Password"
                            className="w-full bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-white placeholder:text-white/30 text-sm outline-none focus:border-purple-400 transition-colors pr-10"
                            data-ocid="settings.input"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPw((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                          >
                            {showCurrentPw ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {/* New Password */}
                        <div className="relative">
                          <input
                            type={showNewPw ? "text" : "password"}
                            value={newPw}
                            onChange={(e) => setNewPw(e.target.value)}
                            placeholder="New Password"
                            className="w-full bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-white placeholder:text-white/30 text-sm outline-none focus:border-purple-400 transition-colors pr-10"
                            data-ocid="settings.input"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPw((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                          >
                            {showNewPw ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {/* Confirm New Password */}
                        <div className="relative">
                          <input
                            type={showConfirmPw ? "text" : "password"}
                            value={confirmPw}
                            onChange={(e) => setConfirmPw(e.target.value)}
                            placeholder="Confirm New Password"
                            className="w-full bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-white placeholder:text-white/30 text-sm outline-none focus:border-purple-400 transition-colors pr-10"
                            data-ocid="settings.input"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPw((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                          >
                            {showConfirmPw ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {pwMsg && (
                          <p
                            className={`text-xs font-medium ${pwMsg.type === "success" ? "text-green-400" : "text-red-400"}`}
                            data-ocid={`settings.${pwMsg.type}_state`}
                          >
                            {pwMsg.text}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={handleChangePassword}
                          className="px-4 py-1.5 rounded-xl text-sm font-medium bg-purple-600/40 hover:bg-purple-500/50 text-white border border-purple-400/30 transition-colors flex items-center gap-2"
                          data-ocid="settings.save_button"
                        >
                          <Key className="w-3.5 h-3.5" /> Update Password
                        </button>
                      </div>
                    </div>

                    {/* Restricted */}
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-3">
                        🔒 Restricted Users
                      </h3>
                      {restricted.length === 0 ? (
                        <div
                          className="glass rounded-2xl p-4 text-center text-white/40 text-sm"
                          data-ocid="settings.empty_state"
                        >
                          No restricted users
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {restricted.map((email) => (
                            <div
                              key={email}
                              className="glass rounded-xl px-4 py-3 flex items-center justify-between"
                            >
                              <p className="text-white text-sm">{email}</p>
                              <button
                                type="button"
                                onClick={() => unrestrict(email)}
                                className="text-purple-300 hover:text-white text-xs font-medium transition-colors"
                                data-ocid="settings.button"
                              >
                                Unrestrict
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Blocked */}
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-3">
                        🚫 Blocked Users
                      </h3>
                      {blocked.length === 0 ? (
                        <div
                          className="glass rounded-2xl p-4 text-center text-white/40 text-sm"
                          data-ocid="settings.empty_state"
                        >
                          No blocked users
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {blocked.map((email) => (
                            <div
                              key={email}
                              className="glass rounded-xl px-4 py-3 flex items-center justify-between"
                            >
                              <p className="text-white text-sm">{email}</p>
                              <button
                                type="button"
                                onClick={() => unblock(email)}
                                className="text-purple-300 hover:text-white text-xs font-medium transition-colors"
                                data-ocid="settings.button"
                              >
                                Unblock
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Danger Zone */}
                    <DangerZone />
                  </div>
                </div>
              )}

              {/* Language Tab */}
              {activeTab === "language" && (
                <div className="flex-1 overflow-y-auto px-6 pb-6">
                  <div className="mt-6 space-y-4">
                    <div className="glass-card rounded-2xl p-6">
                      <p className="text-white font-semibold mb-1">
                        🌐 Display Language
                      </p>
                      <p className="text-white/50 text-sm mb-4">
                        Chatbots will auto-translate responses to your selected
                        language.
                      </p>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Search languages..."
                          value={langSearch}
                          onChange={(e) => setLangSearch(e.target.value)}
                          className="w-full bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-white placeholder:text-white/30 text-sm outline-none focus:border-purple-400 transition-colors"
                          data-ocid="settings.search_input"
                        />
                        <select
                          value={language}
                          onChange={(e) => {
                            const name = e.target.value;
                            const codeMap: Record<string, string> = {
                              English: "en",
                              Spanish: "es",
                              French: "fr",
                              German: "de",
                              Portuguese: "pt",
                              Italian: "it",
                              Dutch: "nl",
                              Russian: "ru",
                              "Chinese (Simplified)": "zh",
                              "Chinese (Traditional)": "zh",
                              Japanese: "ja",
                              Korean: "ko",
                              Arabic: "ar",
                              Hindi: "hi",
                              Bengali: "bn",
                              Urdu: "ur",
                              Turkish: "tr",
                              Polish: "pl",
                              Swedish: "sv",
                              Norwegian: "no",
                              Danish: "da",
                              Finnish: "fi",
                              Greek: "el",
                              Czech: "cs",
                              Slovak: "sk",
                              Hungarian: "hu",
                              Romanian: "ro",
                              Bulgarian: "bg",
                              Croatian: "hr",
                              Serbian: "sr",
                              Ukrainian: "uk",
                              Hebrew: "he",
                              Thai: "th",
                              Vietnamese: "vi",
                              Indonesian: "id",
                              Malay: "ms",
                              Filipino: "tl",
                              Swahili: "sw",
                              "Persian (Farsi)": "fa",
                              Tamil: "ta",
                              Telugu: "te",
                              Kannada: "kn",
                              Malayalam: "ml",
                              Gujarati: "gu",
                              Marathi: "mr",
                              Nepali: "ne",
                              Sinhala: "si",
                              Burmese: "my",
                              Khmer: "km",
                              Georgian: "ka",
                              Armenian: "hy",
                              Azerbaijani: "az",
                              Kazakh: "kk",
                              Albanian: "sq",
                              Bosnian: "bs",
                              Slovenian: "sl",
                              Estonian: "et",
                              Latvian: "lv",
                              Lithuanian: "lt",
                              Icelandic: "is",
                              Irish: "ga",
                              Welsh: "cy",
                              Catalan: "ca",
                              Amharic: "am",
                              Hausa: "ha",
                              Yoruba: "yo",
                              Zulu: "zu",
                              Afrikaans: "af",
                              Punjabi: "pa",
                              Mongolian: "mn",
                            };
                            const code = codeMap[name] || "en";
                            setLanguage(name);
                            localStorage.setItem("lunara_language", name);
                            localStorage.setItem("lunara_language_code", code);
                          }}
                          className="w-full bg-white/10 border border-white/15 rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-purple-400 transition-colors"
                          data-ocid="settings.select"
                          size={8}
                        >
                          {[
                            "English",
                            "Spanish",
                            "French",
                            "German",
                            "Portuguese",
                            "Italian",
                            "Dutch",
                            "Russian",
                            "Chinese (Simplified)",
                            "Chinese (Traditional)",
                            "Japanese",
                            "Korean",
                            "Arabic",
                            "Hindi",
                            "Bengali",
                            "Urdu",
                            "Turkish",
                            "Polish",
                            "Swedish",
                            "Norwegian",
                            "Danish",
                            "Finnish",
                            "Greek",
                            "Czech",
                            "Slovak",
                            "Hungarian",
                            "Romanian",
                            "Bulgarian",
                            "Croatian",
                            "Serbian",
                            "Ukrainian",
                            "Hebrew",
                            "Thai",
                            "Vietnamese",
                            "Indonesian",
                            "Malay",
                            "Filipino",
                            "Swahili",
                            "Amharic",
                            "Hausa",
                            "Yoruba",
                            "Zulu",
                            "Afrikaans",
                            "Persian (Farsi)",
                            "Punjabi",
                            "Tamil",
                            "Telugu",
                            "Kannada",
                            "Malayalam",
                            "Gujarati",
                            "Marathi",
                            "Nepali",
                            "Sinhala",
                            "Burmese",
                            "Khmer",
                            "Lao",
                            "Mongolian",
                            "Tibetan",
                            "Georgian",
                            "Armenian",
                            "Azerbaijani",
                            "Kazakh",
                            "Uzbek",
                            "Turkmen",
                            "Albanian",
                            "Bosnian",
                            "Macedonian",
                            "Slovenian",
                            "Estonian",
                            "Latvian",
                            "Lithuanian",
                            "Icelandic",
                            "Irish",
                            "Welsh",
                            "Catalan",
                            "Basque",
                          ]
                            .filter((l) =>
                              l
                                .toLowerCase()
                                .includes(langSearch.toLowerCase()),
                            )
                            .map((l) => (
                              <option
                                key={l}
                                value={l}
                                style={{
                                  background: "#1a003580",
                                  color: "white",
                                }}
                              >
                                {l}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-white/50 text-sm">Current:</span>
                        <span className="px-3 py-1 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-300 text-sm font-medium">
                          {language}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === "appearance" && (
                <div className="flex-1 overflow-y-auto px-6 pb-6">
                  <div className="mt-6 space-y-6">
                    <div className="glass-card rounded-2xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-semibold">Dark Mode</p>
                          <p className="text-white/50 text-sm mt-1">
                            {darkMode
                              ? "Using dark purple theme"
                              : "Using light lavender theme"}
                          </p>
                        </div>
                        <Switch
                          checked={darkMode}
                          onCheckedChange={handleThemeToggle}
                          data-ocid="settings.switch"
                        />
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          className={`rounded-xl p-4 cursor-pointer transition-all border-2 text-left ${
                            darkMode ? "border-purple-500" : "border-white/20"
                          }`}
                          style={{
                            background:
                              "linear-gradient(135deg, #0d001f, #24003d)",
                          }}
                          onClick={() => handleThemeToggle(true)}
                        >
                          <p className="text-white text-xs font-medium">
                            🌙 Dark
                          </p>
                          <p className="text-white/40 text-xs">
                            Deep purple night
                          </p>
                        </button>
                        <button
                          type="button"
                          className={`rounded-xl p-4 cursor-pointer transition-all border-2 text-left ${
                            !darkMode
                              ? "border-purple-500"
                              : "border-transparent"
                          }`}
                          style={{
                            background:
                              "linear-gradient(135deg, #f5f0ff, #ede8ff)",
                          }}
                          onClick={() => handleThemeToggle(false)}
                        >
                          <p className="text-purple-900 text-xs font-medium">
                            ☀️ Light
                          </p>
                          <p className="text-purple-600/60 text-xs">
                            Soft lavender day
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

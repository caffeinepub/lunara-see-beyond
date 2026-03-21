import { useAuth } from "@/hooks/useAuth";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const RULES = [
  "No NSFW or age-restricted content.",
  "Be respectful — harassment isn't cool.",
  "Use common sense.",
  "No swearing.",
  "This is a community so understand your privacy.",
  "This isn't an exhaustive list — mods can take action if something isn't okay, even if it's not listed here.",
  "If something's broken or you have any issues, hit up an admin!",
  "Anyone who breaks the rules will receive a timeout or punishment based on the severity of the misuse of the server.",
  "If anything happens within the site, it will not be handled by Lunara. Everything you do is on your own — except hacking the site, which will lead to serious repercussions.",
];

const DISCORD_URL = "https://discord.gg/UDC4TPd33h";
const INSTAGRAM_URL =
  "https://www.instagram.com/lunaratoday/?utm_source=ig_web_button_share_sheet";

interface RulesPopupProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export default function RulesPopup({ forceOpen, onClose }: RulesPopupProps) {
  const { user } = useAuth();
  const accepted = localStorage.getItem("lunara_rules_accepted");
  const [step, setStep] = useState<"rules" | "discord">("rules");
  const [agreed, setAgreed] = useState(false);
  const [visible, setVisible] = useState(true);

  // Reset state when forceOpen triggers
  useEffect(() => {
    if (forceOpen) {
      setStep("rules");
      setAgreed(false);
      setVisible(true);
    }
  }, [forceOpen]);

  // Normal first-login gate
  if (!user) return null;
  if (!forceOpen && (accepted || !visible)) return null;
  if (forceOpen && !visible) return null;

  function dismiss() {
    if (!forceOpen) {
      localStorage.setItem("lunara_rules_accepted", "true");
    }
    setVisible(false);
    onClose?.();
  }

  function handleJoinDiscord() {
    window.open(DISCORD_URL, "_blank", "noopener,noreferrer");
    dismiss();
  }

  function handleFollowInstagram() {
    window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer");
    dismiss();
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="rules-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{
            backdropFilter: "blur(16px)",
            background: "rgba(0,0,0,0.7)",
          }}
        >
          <motion.div
            key={step}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative w-full max-w-lg rounded-3xl overflow-hidden"
            style={{
              background: "rgba(13,0,31,0.95)",
              border: "1px solid rgba(139,92,246,0.3)",
              boxShadow:
                "0 0 60px rgba(139,92,246,0.3), 0 0 120px rgba(88,28,135,0.2)",
            }}
          >
            {/* Gradient top bar */}
            <div
              className="h-1 w-full"
              style={{
                background: "linear-gradient(90deg, #6A0DAD, #a855f7, #6A0DAD)",
              }}
            />

            <div className="p-8">
              {step === "rules" ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl"
                      style={{
                        background: "rgba(139,92,246,0.2)",
                        border: "1px solid rgba(139,92,246,0.3)",
                      }}
                    >
                      🛡️
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      Community Rules
                    </h2>
                    <p className="text-purple-400 text-sm font-medium">
                      Rules by @CEO_ARTHUR
                    </p>
                  </div>

                  {/* Rules list */}
                  <ul className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-1">
                    {RULES.map((rule, i) => (
                      <li
                        key={rule.slice(0, 20)}
                        className="flex items-start gap-3"
                      >
                        <span
                          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                          style={{
                            background: "rgba(139,92,246,0.3)",
                            color: "#c084fc",
                          }}
                        >
                          {i + 1}
                        </span>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {rule}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {/* Agree checkbox */}
                  <button
                    type="button"
                    onClick={() => setAgreed(!agreed)}
                    className="w-full flex items-center gap-3 cursor-pointer mb-6 p-3 rounded-xl transition-all text-left"
                    style={{
                      background: agreed
                        ? "rgba(139,92,246,0.15)"
                        : "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(139,92,246,0.2)",
                    }}
                    data-ocid="rules.checkbox"
                  >
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all"
                      style={{
                        background: agreed
                          ? "#7c3aed"
                          : "rgba(255,255,255,0.1)",
                        border: agreed
                          ? "none"
                          : "1px solid rgba(255,255,255,0.3)",
                      }}
                    >
                      {agreed && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className="text-white/70 text-sm">
                      I agree to the community rules
                    </span>
                  </button>

                  {/* Continue button */}
                  <button
                    type="button"
                    onClick={() => (forceOpen ? dismiss() : setStep("discord"))}
                    disabled={!agreed}
                    data-ocid="rules.submit_button"
                    className="w-full py-3 rounded-xl font-semibold text-white transition-all"
                    style={{
                      background: agreed
                        ? "linear-gradient(135deg, #6A0DAD, #a855f7)"
                        : "rgba(255,255,255,0.1)",
                      opacity: agreed ? 1 : 0.5,
                      cursor: agreed ? "pointer" : "not-allowed",
                      boxShadow: agreed
                        ? "0 4px 20px rgba(139,92,246,0.4)"
                        : "none",
                    }}
                  >
                    {forceOpen ? "Close" : "Continue →"}
                  </button>
                </>
              ) : (
                <>
                  {/* Discord + Instagram step */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-3 mx-auto mb-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                        style={{
                          background: "rgba(88,101,242,0.2)",
                          border: "1px solid rgba(88,101,242,0.4)",
                        }}
                      >
                        💬
                      </div>
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                        style={{
                          background: "rgba(225,48,108,0.15)",
                          border: "1px solid rgba(225,48,108,0.35)",
                        }}
                      >
                        📸
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Stay Connected!
                    </h2>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Join our Discord community and follow us on Instagram for
                      updates, announcements, and exclusive content.
                    </p>
                  </div>

                  {/* Platform cards */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div
                      className="rounded-2xl p-4 text-center"
                      style={{
                        background: "rgba(88,101,242,0.1)",
                        border: "1px solid rgba(88,101,242,0.3)",
                      }}
                    >
                      <p className="text-white/50 text-xs mb-1">Discord</p>
                      <p className="text-indigo-300 text-xs font-mono break-all">
                        discord.gg/UDC4TPd33h
                      </p>
                    </div>
                    <div
                      className="rounded-2xl p-4 text-center"
                      style={{
                        background: "rgba(225,48,108,0.08)",
                        border: "1px solid rgba(225,48,108,0.3)",
                      }}
                    >
                      <p className="text-white/50 text-xs mb-1">Instagram</p>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "#f472b6" }}
                      >
                        @lunaratoday
                      </p>
                    </div>
                  </div>

                  {/* Social buttons */}
                  <div className="flex gap-3 mb-3">
                    <button
                      type="button"
                      onClick={handleJoinDiscord}
                      data-ocid="rules.primary_button"
                      className="flex-1 py-3 rounded-xl font-semibold text-white transition-all"
                      style={{
                        background: "linear-gradient(135deg, #5865f2, #7983f5)",
                        boxShadow: "0 4px 20px rgba(88,101,242,0.4)",
                      }}
                    >
                      Join Discord 🚀
                    </button>
                    <button
                      type="button"
                      onClick={handleFollowInstagram}
                      data-ocid="rules.secondary_button"
                      className="flex-1 py-3 rounded-xl font-semibold text-white transition-all"
                      style={{
                        background:
                          "linear-gradient(135deg, #E1306C, #fd5949, #d6249f)",
                        boxShadow: "0 4px 20px rgba(225,48,108,0.35)",
                      }}
                    >
                      Follow 📸
                    </button>
                  </div>

                  {/* Skip button */}
                  <button
                    type="button"
                    onClick={dismiss}
                    data-ocid="rules.cancel_button"
                    className="w-full py-2.5 rounded-xl font-medium text-white/50 transition-all hover:text-white/80 hover:bg-white/5"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    Skip for now
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

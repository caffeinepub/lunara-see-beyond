import { useAuth } from "@/hooks/useAuth";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function IntroPopup({
  onGoToSettings,
}: { onGoToSettings: () => void }) {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!user) return;
    const key = `lunara_intro_seen_${user.email}`;
    if (!localStorage.getItem(key)) {
      // Small delay so it doesn't pop immediately on login
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const dismiss = () => {
    if (user) localStorage.setItem(`lunara_intro_seen_${user.email}`, "true");
    setVisible(false);
  };

  const goSettings = () => {
    dismiss();
    onGoToSettings();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-modal rounded-3xl p-8 max-w-md w-full relative"
            data-ocid="intro.modal"
          >
            <button
              type="button"
              onClick={dismiss}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              aria-label="Close"
              data-ocid="intro.close_button"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🌙</div>
              <h2 className="text-2xl font-bold text-white">
                Welcome to Lunara!
              </h2>
              <p className="text-white/60 mt-3 text-sm leading-relaxed">
                Want to introduce yourself to the community? You can fill in
                your profile intro anytime from{" "}
                <span className="text-purple-300 font-semibold">Settings</span>{" "}
                in your profile menu. It&apos;s totally optional!
              </p>
            </div>

            <div
              className="glass rounded-2xl p-4 mb-6 text-sm text-white/60 space-y-1"
              style={{ fontSize: "0.8rem" }}
            >
              <p>✨ Share your interests &amp; personality</p>
              <p>🎮 List your favorite games</p>
              <p>💬 Tell us why you joined</p>
              <p>👁️ Control who sees your intro</p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={dismiss}
                className="flex-1 py-3 rounded-xl glass-outline text-white/70 hover:text-white text-sm font-medium hover:bg-white/10 transition-all"
                data-ocid="intro.cancel_button"
              >
                Set Up Later
              </button>
              <button
                type="button"
                onClick={goSettings}
                className="flex-1 py-3 rounded-xl glass-button text-white text-sm font-semibold hover:brightness-110 transition-all"
                data-ocid="intro.primary_button"
              >
                Go to Settings ⚙️
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

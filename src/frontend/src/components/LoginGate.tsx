import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";

interface LoginGateProps {
  message?: string;
  subtext?: string;
}

export function LoginGate({
  message = "Log in to continue",
  subtext = "You need to be signed in to use this feature.",
}: LoginGateProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div
        className="inline-flex flex-col items-center gap-5 glass-card rounded-3xl px-10 py-10 max-w-sm w-full"
        style={{
          background: "rgba(107,0,173,0.15)",
          border: "1px solid rgba(180,100,255,0.25)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
          <Lock className="w-7 h-7 text-accent" />
        </div>
        <div className="space-y-1.5">
          <p className="text-white font-bold text-xl">{message}</p>
          <p className="text-white/50 text-sm leading-relaxed">{subtext}</p>
        </div>
        <Button
          className="glass-button text-white font-semibold px-8 py-2.5 h-auto rounded-full hover:brightness-125 transition-all w-full"
          onClick={() => navigate({ to: "/login" })}
          data-ocid="login_gate.button"
        >
          Log In / Sign Up
        </Button>
      </div>
    </div>
  );
}

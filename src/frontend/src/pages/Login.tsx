import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Inline style applied to every input so typed text is always visible
const INPUT_STYLE: React.CSSProperties = {
  background: "#ffffff",
  color: "#111111",
  caretColor: "#6A0DAD",
};

const INPUT_CLS =
  "h-11 rounded-full px-5 border-white/30 placeholder:text-gray-400 focus:border-violet-400 focus:ring-violet-400/30";

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  type Step =
    | "profile"
    | "login"
    | "register"
    | "forgot-email"
    | "forgot-otp"
    | "forgot-newpass";

  const [step, setStep] = useState<Step>("profile");

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Register form
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regError, setRegError] = useState("");

  // Forgot password flow
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotEmailError, setForgotEmailError] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassError, setNewPassError] = useState("");
  const [newPassSuccess, setNewPassSuccess] = useState(false);
  const [otpTimer, setOtpTimer] = useState(120);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (auth.user) navigate({ to: "/" });
  }, [auth.user, navigate]);

  // OTP countdown
  useEffect(() => {
    if (step === "forgot-otp") {
      setOtpTimer(120);
      timerRef.current = setInterval(() => {
        setOtpTimer((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const ok = auth.login(loginEmail, loginPassword);
    if (!ok) {
      setLoginError("Invalid email or password.");
    } else {
      navigate({ to: "/" });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");
    const ok = auth.register(regName, regEmail, regPassword);
    if (!ok) {
      setRegError("Email already registered. Try logging in.");
    } else {
      navigate({ to: "/" });
    }
  };

  const handleForgotEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotEmailError("");
    if (!auth.emailExists(forgotEmail)) {
      setForgotEmailError("No account found with this email.");
      return;
    }
    const otp = generateOtp();
    setGeneratedOtp(otp);
    setEnteredOtp("");
    setOtpError("");
    setStep("forgot-otp");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");
    if (otpTimer === 0) {
      setOtpError("OTP expired. Please request a new one.");
      return;
    }
    if (enteredOtp !== generatedOtp) {
      setOtpError("Incorrect OTP. Please try again.");
      return;
    }
    setNewPassword("");
    setConfirmPassword("");
    setNewPassError("");
    setNewPassSuccess(false);
    setStep("forgot-newpass");
  };

  const handleNewPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewPassError("");
    if (newPassword.length < 6) {
      setNewPassError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setNewPassError("Passwords do not match.");
      return;
    }
    const ok = auth.resetPassword(forgotEmail, newPassword);
    if (!ok) {
      setNewPassError("Failed to reset password. Please try again.");
      return;
    }
    setNewPassSuccess(true);
    setTimeout(() => setStep("login"), 2000);
  };

  const resendOtp = () => {
    const otp = generateOtp();
    setGeneratedOtp(otp);
    setEnteredOtp("");
    setOtpError("");
    setStep("forgot-otp");
  };

  const backBtn = (target: Step) => (
    <button
      type="button"
      onClick={() => setStep(target)}
      className="text-white/30 hover:text-white/60 text-sm transition-colors"
    >
      ← Back
    </button>
  );

  const logoCircle = (size: "lg" | "sm") => (
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-violet-500/40 blur-2xl scale-125" />
      <div
        className={`relative ${size === "lg" ? "w-28 h-28" : "w-20 h-20"} rounded-full ring-2 ring-white/20 overflow-hidden shadow-2xl`}
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
        }}
      >
        <img
          src="/assets/uploads/Untitled-design-2--1.png"
          alt="Lunara"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );

  const purpleBtn =
    "w-full h-11 rounded-full font-semibold text-white hover:brightness-125 transition-all";
  const purpleBtnStyle = {
    background: "linear-gradient(135deg, #6A0DAD, #9B30FF)",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(160deg, #0D001F 0%, #24003D 50%, #4B0082 100%)",
      }}
    >
      <div className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-700/20 blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {/* ── Profile picker ── */}
        {step === "profile" && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-8 w-full max-w-xs text-center"
          >
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Lunara</h1>
              <p className="text-white/40 text-sm">See Beyond the Ordinary</p>
            </div>
            <button
              type="button"
              onClick={() => setStep("login")}
              className="group flex flex-col items-center gap-3 focus:outline-none"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-violet-500/40 blur-2xl scale-125 group-hover:bg-violet-400/50 transition-all" />
                <div
                  className="relative w-28 h-28 rounded-full ring-2 ring-white/20 group-hover:ring-white/50 transition-all overflow-hidden shadow-2xl"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <img
                    src="/assets/uploads/Untitled-design-2--1.png"
                    alt="Lunara"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                Sign in to Lunara
              </span>
            </button>
            <div className="flex flex-col gap-3 w-full">
              <Button
                onClick={() => setStep("login")}
                className={purpleBtn}
                style={purpleBtnStyle}
                data-ocid="login.submit_button"
              >
                Sign In
              </Button>
              <Button
                onClick={() => setStep("register")}
                variant="outline"
                className="w-full h-11 rounded-full font-semibold border-white/20 text-white/70 hover:text-white hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all"
              >
                Create Account
              </Button>
            </div>
            <Link
              to="/"
              className="text-white/30 hover:text-white/60 text-sm transition-colors"
            >
              ← Back to home
            </Link>
          </motion.div>
        )}

        {/* ── Sign In ── */}
        {step === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-6 w-full max-w-xs"
          >
            {logoCircle("sm")}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Welcome back</h2>
              <p className="text-white/40 text-sm mt-1">
                Sign in to your Lunara account
              </p>
            </div>
            <form onSubmit={handleLogin} className="w-full space-y-3">
              <Input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Email"
                required
                className={INPUT_CLS}
                style={INPUT_STYLE}
                data-ocid="login.input"
              />
              <Input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Password"
                required
                className={INPUT_CLS}
                style={INPUT_STYLE}
                data-ocid="login.input"
              />
              {loginError && (
                <p
                  className="text-red-400 text-sm text-center"
                  data-ocid="login.error_state"
                >
                  {loginError}
                </p>
              )}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(loginEmail);
                    setForgotEmailError("");
                    setStep("forgot-email");
                  }}
                  className="text-violet-300 hover:text-violet-200 text-xs transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <Button
                type="submit"
                className={purpleBtn}
                style={purpleBtnStyle}
                data-ocid="login.submit_button"
              >
                Sign In
              </Button>
            </form>
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/30 text-xs">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <button
              type="button"
              onClick={() => setStep("register")}
              className="text-violet-400 hover:text-violet-300 text-sm transition-colors"
            >
              Create a new account
            </button>
            {backBtn("profile")}
          </motion.div>
        )}

        {/* ── Register ── */}
        {step === "register" && (
          <motion.div
            key="register"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-6 w-full max-w-xs"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-violet-500/40 blur-2xl scale-125" />
              <div
                className="relative w-20 h-20 rounded-full ring-2 ring-white/20 overflow-hidden shadow-2xl flex items-center justify-center"
                style={{
                  background: "rgba(107,33,168,0.3)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <span className="text-3xl">🌙</span>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Join Lunara</h2>
              <p className="text-white/40 text-sm mt-1">
                Create your free account
              </p>
            </div>
            <form onSubmit={handleRegister} className="w-full space-y-3">
              <Input
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Your name"
                required
                className={INPUT_CLS}
                style={INPUT_STYLE}
                data-ocid="login.input"
              />
              <Input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="Email"
                required
                className={INPUT_CLS}
                style={INPUT_STYLE}
                data-ocid="login.input"
              />
              <Input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Password"
                required
                className={INPUT_CLS}
                style={INPUT_STYLE}
                data-ocid="login.input"
              />
              {regError && (
                <p
                  className="text-red-400 text-sm text-center"
                  data-ocid="login.error_state"
                >
                  {regError}
                </p>
              )}
              <Button
                type="submit"
                className={purpleBtn}
                style={purpleBtnStyle}
                data-ocid="login.submit_button"
              >
                Create Account
              </Button>
            </form>
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/30 text-xs">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <button
              type="button"
              onClick={() => setStep("login")}
              className="text-violet-400 hover:text-violet-300 text-sm transition-colors"
            >
              Already have an account? Sign in
            </button>
            {backBtn("profile")}
          </motion.div>
        )}

        {/* ── Forgot: enter email ── */}
        {step === "forgot-email" && (
          <motion.div
            key="forgot-email"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-6 w-full max-w-xs"
          >
            {logoCircle("sm")}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Reset Password</h2>
              <p className="text-white/40 text-sm mt-1">
                Enter your account email to get an OTP
              </p>
            </div>
            <form
              onSubmit={handleForgotEmailSubmit}
              className="w-full space-y-3"
            >
              <Input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="Your email"
                required
                className={INPUT_CLS}
                style={INPUT_STYLE}
                data-ocid="login.input"
              />
              {forgotEmailError && (
                <p className="text-red-400 text-sm text-center">
                  {forgotEmailError}
                </p>
              )}
              <Button
                type="submit"
                className={purpleBtn}
                style={purpleBtnStyle}
              >
                Send OTP
              </Button>
            </form>
            {backBtn("login")}
          </motion.div>
        )}

        {/* ── Forgot: enter OTP ── */}
        {step === "forgot-otp" && (
          <motion.div
            key="forgot-otp"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-6 w-full max-w-xs"
          >
            {logoCircle("sm")}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Enter OTP</h2>
              <p className="text-white/40 text-sm mt-1">
                Use the code shown below to continue
              </p>
            </div>
            {/* OTP display chip */}
            <div
              className="w-full rounded-2xl px-5 py-4 text-center"
              style={{
                background: "rgba(106,13,173,0.25)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <p className="text-white/50 text-xs mb-1">Your one-time code</p>
              <p className="text-3xl font-bold tracking-[0.3em] text-violet-300">
                {generatedOtp}
              </p>
              <p className="text-white/30 text-xs mt-2">
                {otpTimer > 0
                  ? `Expires in ${Math.floor(otpTimer / 60)}:${String(otpTimer % 60).padStart(2, "0")}`
                  : "OTP expired"}
              </p>
            </div>
            <form onSubmit={handleOtpSubmit} className="w-full space-y-3">
              <Input
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                required
                className={INPUT_CLS}
                style={INPUT_STYLE}
                data-ocid="login.input"
              />
              {otpError && (
                <p className="text-red-400 text-sm text-center">{otpError}</p>
              )}
              <Button
                type="submit"
                disabled={otpTimer === 0}
                className={`${purpleBtn} disabled:opacity-50`}
                style={purpleBtnStyle}
              >
                Verify OTP
              </Button>
            </form>
            {otpTimer === 0 && (
              <button
                type="button"
                onClick={resendOtp}
                className="text-violet-400 hover:text-violet-300 text-sm transition-colors"
              >
                Resend OTP
              </button>
            )}
            {backBtn("forgot-email")}
          </motion.div>
        )}

        {/* ── Forgot: new password ── */}
        {step === "forgot-newpass" && (
          <motion.div
            key="forgot-newpass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center gap-6 w-full max-w-xs"
          >
            {logoCircle("sm")}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">New Password</h2>
              <p className="text-white/40 text-sm mt-1">
                Set a new password for your account
              </p>
            </div>
            {newPassSuccess ? (
              <div className="text-center space-y-2">
                <p className="text-3xl">✅</p>
                <p className="text-white font-semibold">Password updated!</p>
                <p className="text-white/40 text-sm">
                  Redirecting to sign in...
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleNewPasswordSubmit}
                className="w-full space-y-3"
              >
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  required
                  className={INPUT_CLS}
                  style={INPUT_STYLE}
                  data-ocid="login.input"
                />
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                  className={INPUT_CLS}
                  style={INPUT_STYLE}
                  data-ocid="login.input"
                />
                {newPassError && (
                  <p className="text-red-400 text-sm text-center">
                    {newPassError}
                  </p>
                )}
                <Button
                  type="submit"
                  className={purpleBtn}
                  style={purpleBtnStyle}
                >
                  Update Password
                </Button>
              </form>
            )}
            {!newPassSuccess && backBtn("forgot-otp")}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Gamepad2,
  Globe,
  Headphones,
  Mail,
  MessageSquare,
  Music,
  Palette,
  Rocket,
  ShoppingBag,
  Sparkles,
  Terminal,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const zones = [
  {
    id: "soundscape",
    title: "Soundscape Sanctuary",
    tagline: "Music Zone",
    description:
      "Lose yourself in a world of beats, melodies, and sonic exploration. Discover emerging artists, share playlists, and build your musical identity.",
    cta: "Enter Sanctuary",
    href: "/soundscape" as const,
    icon: Headphones,
    gradientClass: "gradient-soundscape",
  },
  {
    id: "pixellens",
    title: "Pixel Hands",
    tagline: "Artist Zone",
    description:
      "Poetry, prose, visual art, and digital creation — a sanctuary for those who paint with language and sculpt ideas into beauty.",
    cta: "Discover Art",
    href: "/pixellens" as const,
    icon: BookOpen,
    gradientClass: "gradient-artistic",
  },
  {
    id: "wildgang",
    title: "Wild Gang",
    tagline: "Community Zone",
    description:
      "The social heartbeat of Lunara — where friendships are forged, voices are heard, and the community comes alive through chat, forums, and study sessions.",
    cta: "Join the Gang",
    href: "/wildgang" as const,
    icon: Users,
    gradientClass: "gradient-hero",
  },
  {
    id: "aloxide",
    title: "Aloxide",
    tagline: "Tech Zone",
    description:
      "A vibrant hub for coders, hackers, and tech visionaries. Share projects, join hackathons, and collaborate with developers who see code as art.",
    cta: "Join the Build",
    href: "/aloxide" as const,
    icon: Terminal,
    gradientClass: "gradient-devden",
  },
  {
    id: "lunar-arcadia",
    title: "Lunar Arcadia",
    tagline: "Arcade Zone",
    description:
      "Five legendary games, infinite fun. Truth or Dare, Tic-Tac-Toe, Hand Cricket, Ludo, and more — all playable right in your browser.",
    cta: "Play Now",
    href: "/lunar-arcadia" as const,
    icon: Gamepad2,
    gradientClass: "gradient-devden",
  },
];

const stats = [
  { icon: Sparkles, label: "7 Zones", sub: "Every creative space you need" },
  {
    icon: Rocket,
    label: "Launch Year 2024",
    sub: "Born from a spark of ambition",
  },
  {
    icon: Globe,
    label: "One Platform",
    sub: "Music, games, art, community & more",
  },
];

const features = [
  {
    icon: Music,
    title: "Music & Discovery",
    description:
      "Stream music, follow artists, and build playlists all in one place.",
  },
  {
    icon: Gamepad2,
    title: "Games & Leaderboards",
    description:
      "Play casual games, climb leaderboards, and challenge the community.",
  },
  {
    icon: Palette,
    title: "Art & Creativity",
    description:
      "Share your work in Pixel Hands and get real feedback from real people.",
  },
  {
    icon: MessageSquare,
    title: "Community Chat",
    description:
      "Text and voice chatrooms across every zone. No friction, just connection.",
  },
  {
    icon: ShoppingBag,
    title: "MoonMart Marketplace",
    description:
      "Buy and sell second-hand items directly within the community.",
  },
  {
    icon: Brain,
    title: "Focus & Study",
    description:
      "Collaborative study sessions with custom timers in Wild Gang.",
  },
];

const tickerItems = [
  { emoji: "🎵", label: "Music", href: "/soundscape" as const },
  { emoji: "🎨", label: "Art", href: "/pixellens" as const },
  { emoji: "💬", label: "Chatrooms", href: "/wildgang" as const },
  { emoji: "🎮", label: "Games", href: "/lunar-arcadia" as const },
  { emoji: "🛒", label: "Marketplace", href: "/marketplace" as const },
  { emoji: "🧠", label: "Study VCs", href: "/wildgang" as const },
  { emoji: "💻", label: "Tech", href: "/aloxide" as const },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="min-h-[90vh] flex items-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0D001F 0%, #24003D 55%, #4B0082 100%)",
        }}
      >
        {/* Ambient glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-accent/15 blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-1/3 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto"
          >
            {/* Logo centered in hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-accent/30 blur-2xl scale-150" />
              <div className="relative p-1 rounded-full glass-pill">
                <img
                  src="/assets/uploads/Untitled-design-2--1.png"
                  alt="Lunara"
                  className="w-28 h-28 rounded-full object-cover"
                />
              </div>
            </motion.div>

            <div className="inline-flex items-center gap-2 glass-pill rounded-full px-4 py-1.5 text-white/70 text-sm">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              See Beyond the Ordinary
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-gold">Welcome to Lunara.</span>
              <br />
              <span className="text-white">Where every mind</span>
              <br />
              <span className="text-white/80">finds its home.</span>
            </h1>

            <p className="text-white/60 text-lg leading-relaxed max-w-xl">
              A vibrant community platform where music creators, visual artists,
              and free spirits converge to inspire, collaborate, and grow.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 justify-center">
              {!user && (
                <Button
                  className="glass-button text-white font-semibold px-7 py-3 h-auto rounded-full hover:brightness-110 shadow-hero transition-transform hover:scale-[1.03] active:scale-[0.98]"
                  onClick={() =>
                    document
                      .getElementById("zones")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  data-ocid="hero.primary_button"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Join the Community
                </Button>
              )}
              <Button
                variant="outline"
                className="glass-outline text-white border-white/20 hover:bg-white/12 px-7 py-3 h-auto rounded-full hover:border-white/40 transition-all"
                onClick={() =>
                  document
                    .getElementById("zones")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="hero.secondary_button"
              >
                Explore Zones
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <a
                href="mailto:katariavianyt45@gmail.com?subject=Inquiry%20from%20Lunara%20visitor"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-white glass-outline hover:bg-white/12 transition-all hover:scale-[1.03] active:scale-[0.98]"
                data-ocid="hero.secondary_button"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Zone Ticker ──────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-4"
        style={{
          background:
            "linear-gradient(90deg, #0D001F 0%, #24003D 50%, #0D001F 100%)",
        }}
      >
        {/* Edge fades */}
        <div
          className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #0D001F, transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #0D001F, transparent)",
          }}
        />

        <div className="ticker-track group flex gap-4 w-max">
          {/* Render two copies for seamless loop */}
          {[
            ...tickerItems.map((x) => ({ ...x, _key: `a-${x.label}` })),
            ...tickerItems.map((x) => ({ ...x, _key: `b-${x.label}` })),
          ].map((item) => (
            <Link
              key={item._key}
              to={item.href}
              className="ticker-pill flex-shrink-0 flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white/80 select-none transition-all duration-200"
              style={{
                background: "rgba(107,0,173,0.18)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(180,100,255,0.25)",
                boxShadow: "0 2px 12px rgba(107,0,173,0.15)",
              }}
              data-ocid="ticker.link"
            >
              <span className="text-base leading-none">{item.emoji}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <style>{`
          .ticker-track {
            animation: ticker-scroll 28s linear infinite;
          }
          .ticker-track:hover {
            animation-play-state: paused;
          }
          @keyframes ticker-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-pill:hover {
            background: rgba(140,0,220,0.45) !important;
            border-color: rgba(200,130,255,0.6) !important;
            color: #fff !important;
            transform: scale(1.07);
            box-shadow: 0 4px 24px rgba(140,0,220,0.35) !important;
          }
        `}</style>
      </section>

      {/* ── Platform Intro ───────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl px-8 py-10 flex flex-col items-center gap-5"
            data-ocid="intro.card"
          >
            <span className="inline-flex items-center gap-2 glass-pill rounded-full px-4 py-1.5 text-accent text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              What is Lunara?
            </span>
            <p className="text-white text-2xl sm:text-3xl font-bold leading-snug">
              Lunara is an all-in-one creative community platform.
            </p>
            <p className="text-white/60 text-lg leading-relaxed">
              Music, art, games, tech, marketplace — everything under one roof.
              Built for people who create, connect, and go beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Zone Cards ───────────────────────────────────────── */}
      <section id="zones" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white">Choose Your Zone</h2>
            <p className="text-white/50 mt-2 text-base">
              Five distinct spaces crafted for every kind of creative mind.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zones.map((zone, i) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.12), 0 8px 32px rgba(0,0,0,0.5)",
                }}
                data-ocid={`zones.item.${i + 1}`}
              >
                <div
                  className={`${zone.gradientClass} h-52 flex items-end p-6 relative`}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-5 right-5 w-12 h-12 rounded-full glass flex items-center justify-center">
                    <zone.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="relative">
                    <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-1">
                      {zone.tagline}
                    </p>
                    <h3 className="text-white font-bold text-xl">
                      {zone.title}
                    </h3>
                  </div>
                </div>
                <div className="glass-card rounded-b-3xl p-6 space-y-4">
                  <p className="text-white/60 text-sm leading-relaxed">
                    {zone.description}
                  </p>
                  <Button
                    asChild
                    className="w-full glass-button text-white hover:brightness-110 rounded-xl transition-all"
                    data-ocid={`zones.item.${i + 1}`}
                  >
                    <Link to={zone.href}>
                      {zone.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform Numbers ─────────────────────────────────── */}
      <section className="py-14 glass-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="glass-card rounded-2xl p-7 flex flex-col items-center text-center gap-3"
                data-ocid={`stats.item.${i + 1}`}
              >
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-1">
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
                <p className="text-white font-bold text-2xl">{stat.label}</p>
                <p className="text-white/50 text-sm">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Makes Lunara Different ───────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white">
              What Makes Lunara Different
            </h2>
            <p className="text-white/50 mt-2 text-base">
              Everything you need — music, games, art, community — in one place.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6 flex flex-col gap-3 hover:border-accent/30 transition-all"
                data-ocid={`features.item.${i + 1}`}
              >
                <div className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-bold text-white text-lg">
                  {feature.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section
        className="py-16"
        style={{
          background:
            "linear-gradient(160deg, #0D001F 0%, #24003D 55%, #4B0082 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 rounded-full bg-accent/30 blur-xl scale-150" />
              <div className="relative p-1 rounded-full glass-pill">
                <img
                  src="/assets/uploads/Untitled-design-2--1.png"
                  alt="Lunara"
                  className="w-16 h-16 rounded-full"
                />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to See Beyond?
            </h2>
            <p className="text-white/60 mb-8 text-lg">
              Be among the first to explore Lunara — your all-in-one space for
              creativity, community, and connection.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                className="glass-button text-white font-semibold px-10 py-4 h-auto rounded-full text-lg hover:brightness-110 shadow-hero transition-transform hover:scale-[1.03]"
                onClick={() =>
                  document
                    .getElementById("zones")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="cta.primary_button"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Your Journey
              </Button>
              <a
                href="mailto:katariavianyt45@gmail.com?subject=Hello%20from%20Lunara"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-white glass-outline hover:bg-white/12 transition-all text-lg"
                data-ocid="cta.secondary_button"
              >
                <Mail className="w-5 h-5" />
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

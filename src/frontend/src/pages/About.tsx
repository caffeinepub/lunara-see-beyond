import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Code2,
  ExternalLink,
  Gamepad2,
  Globe,
  Heart,
  Lightbulb,
  MessageSquare,
  Moon,
  Music,
  Palette,
  ShoppingBag,
  Sparkles,
  Star,
  Users,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";

const founders = [
  {
    name: "Arthur",
    role: "CEO",
    initials: "A",
    tagline: "The one who lit the spark.",
    icon: Music,
    zoneColor: "bg-lunara-soundscape",
    instagram: "https://www.instagram.com/syntaxnova90hz/",
    supporter: null,
  },
  {
    name: "HJ",
    role: "President",
    initials: "HJ",
    tagline: "The one who made it run.",
    icon: Code2,
    zoneColor: "bg-lunara-devden",
    instagram: null,
    supporter: null,
  },
  {
    name: "Norma",
    role: "COO",
    initials: "N",
    tagline: "The one who keeps the vision clear.",
    icon: Users,
    zoneColor: "bg-lunara-artistic",
    instagram: null,
    supporter: null,
  },
  {
    name: "Luther",
    role: "COO",
    initials: "L",
    tagline: "The one who keeps it all together.",
    icon: Wrench,
    zoneColor: "bg-lunara-soundscape",
    instagram: null,
    supporter: "Supporter",
  },
];

const milestones = [
  {
    year: "Day One",
    title: "The Spark",
    desc: "Arthur had an idea — build something creative, something alive. He reached out to HJ and they started small: just a minigame, no big team, no fancy setup. Just two people, ambition, and late-night energy.",
  },
  {
    year: "The Name",
    title: "Lunara Is Born",
    desc: 'Arthur chose Lunara because of the moon — its quiet rhythm, its mystery, its power. That feeling became the identity. The tagline that stuck: "See Beyond. Build Forward."',
  },
  {
    year: "The Pivot",
    title: "Beyond Games",
    desc: "One of those corridor thoughts — the kind that arrives mid-stride, unprompted, and suddenly everything clicks. Why stop at games? Lunara became a space where anyone could create: code, design, write, edit, build, share, grow.",
  },
  {
    year: "Now",
    title: "Still Building",
    desc: "No perfect plan, just persistence. Slowly, Lunara became more than a name — a place where creativity breathes, where people try, fail, learn, and build together. We're still growing. And we're moving.",
  },
];

const values = [
  {
    icon: Sparkles,
    title: "See Beyond",
    desc: "We challenge the ordinary. Every zone is a portal to what's possible when creative minds collide.",
  },
  {
    icon: Heart,
    title: "Radical Welcome",
    desc: "Every voice matters here. No gatekeeping, no elitism — just humans creating together.",
  },
  {
    icon: Globe,
    title: "Open Collaboration",
    desc: "Ideas grow stronger when shared. Lunara is built on open exchange, across disciplines and borders.",
  },
  {
    icon: Lightbulb,
    title: "Curiosity First",
    desc: "We celebrate the beginner's mind. The best work comes from asking 'what if?' without fear.",
  },
];

const pricingPlans = [
  {
    tier: "Free",
    price: "Free",
    desc: "Get started and be part of the Lunara community.",
    features: [
      "Member tag on your profile",
      "Access all public zones",
      "Public chatrooms",
      "Browse gallery & playlists",
      "Join public events",
    ],
    highlight: false,
  },
  {
    tier: "VIP",
    price: "\u20B9199/mo",
    desc: "Unlock premium access and exclusive Lunara perks.",
    features: [
      "Everything in Free",
      "VIP badge on your profile",
      "Exclusive VIP chatrooms",
      "Early event registration",
      "Priority support",
    ],
    highlight: true,
  },
  {
    tier: "Dev",
    price: "\u20B9399/mo",
    desc: "For builders, creators, and the people who make Lunara run.",
    features: [
      "Everything in VIP",
      "Dev badge on your profile",
      "Featured artist/creator slot",
      "Access to beta features",
      "Direct line to the team",
      "Priority in hackathons",
    ],
    highlight: false,
  },
];

const zones = [
  {
    icon: Music,
    label: "Soundscape Sanctuary",
    sub: "Your music, your vibe. Artists, playlists, and in-site listening.",
    href: "/soundscape" as const,
    bg: "gradient-soundscape",
  },
  {
    icon: Palette,
    label: "Pixel Hands",
    sub: "Art gallery, commissions, and creative showcases.",
    href: "/pixellens" as const,
    bg: "gradient-artistic",
  },
  {
    icon: Users,
    label: "Wild Gang",
    sub: "Live chatrooms, study VCs, and community events.",
    href: "/wildgang" as const,
    bg: "gradient-hero",
  },
  {
    icon: Code2,
    label: "Aloxide",
    sub: "Tech hub for builders — chatrooms, projects, hackathons.",
    href: "/aloxide" as const,
    bg: "gradient-devden",
  },
  {
    icon: Gamepad2,
    label: "Lunar Arcadia",
    sub: "In-browser games, leaderboards, and roast battles.",
    href: "/lunar-arcadia" as const,
    bg: "gradient-devden",
  },
  {
    icon: ShoppingBag,
    label: "MoonMart",
    sub: "Peer-to-peer second-hand marketplace. No middlemen.",
    href: "/marketplace" as const,
    bg: "gradient-hero",
  },
  {
    icon: MessageSquare,
    label: "LunaChat",
    sub: "WhatsApp-style DMs, group chats, and status updates.",
    href: "/lunachat" as const,
    bg: "gradient-hero",
  },
];

export default function About() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="min-h-[70vh] flex items-center justify-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0D001F 0%, #24003D 55%, #4B0082 100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute right-10 bottom-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="absolute left-0 top-10 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-accent/30 blur-2xl scale-150" />
              <img
                src="/assets/lunara-logo.png"
                alt="Lunara"
                className="relative w-24 h-24 rounded-full object-cover ring-4 ring-white/20 shadow-2xl"
              />
            </div>
            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-accent" />
              <span className="text-white/60 text-sm">Our Story</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white">
              <span className="text-gold">One App.</span>
              <br />
              Every Vibe.
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
              Music. Art. Tech. Games. Community. Marketplace. Lunara is the
              all-in-one platform built for creators, dreamers, and builders —
              every zone, every vibe, one universe.
            </p>
            <Button
              asChild
              className="bg-accent text-accent-foreground font-semibold px-8 py-3 h-auto rounded-full hover:bg-accent/90 mt-2"
              data-ocid="about.primary_button"
            >
              <a href="#story">
                <ArrowRight className="w-4 h-4 mr-2" />
                Read Our Story
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── All-in-One Banner ── */}
      <section className="py-10 glass-card border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-white/70 text-lg font-medium">
            🎵 Music &nbsp;·&nbsp; 🎨 Art &nbsp;·&nbsp; 💬 Chatrooms
            &nbsp;·&nbsp; 🎮 Games &nbsp;·&nbsp; 🛒 Marketplace &nbsp;·&nbsp; 🧠
            Study VCs &nbsp;·&nbsp; 💻 Tech
          </p>
          <p className="text-accent font-bold text-2xl mt-3">
            One app. Every vibe.
          </p>
        </div>
      </section>

      {/* ── Origin Story ── */}
      <section id="story" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 md:p-12 shadow-card border border-white/10"
          >
            <Badge className="bg-accent/15 text-foreground border-accent/30 mb-6">
              How It Really Started
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              A Spark, Two People, One Relentless Vision.
            </h2>
            <div className="space-y-5 text-white/60 text-base leading-relaxed">
              <p>
                It started the way most things worth building do — not with a
                plan, but with a feeling. Arthur had an idea. Something
                creative, something alive. He reached out to HJ.
              </p>
              <p>
                They started small. Just a minigame. No big team, no fancy
                setup, no investor meetings. Just the two of them, a shared
                drive, and that particular kind of late-night energy that makes
                impossible things feel doable.
              </p>
              <p>
                Then Arthur went looking for a name. He kept coming back to the
                moon — its quiet pull, the way it lights up the dark without
                making any noise about it. <em>Lunara.</em> That was it. And
                with the name came the words that still hang over everything:{" "}
                <strong className="text-foreground">
                  &ldquo;See Beyond. Build Forward.&rdquo;
                </strong>
              </p>
              <p>
                For a while, it was just about games. But then came one of those
                corridor thoughts — the kind that arrives mid-stride,
                unprompted, and suddenly <em>everything</em> clicks. Why stop at
                games? What if this became a place where anyone could create?
                Code, design, write, edit, build, share, grow — all of it, under
                one roof.
              </p>
              <p>
                So they kept going. No guarantees. No perfect roadmap. Just the
                stubborn belief that something real was being built here. And
                slowly — track by track, post by post, late night by late night
                — Lunara became more than a name. It became a place where
                creativity could actually breathe.
              </p>
              <p className="text-foreground/80 font-medium">
                We&apos;re still figuring it out. Still growing. But we&apos;re
                here, we&apos;re moving, and we&apos;re not stopping.
              </p>
              <p className="text-white/50 italic">
                Thanks for being part of the vision.
              </p>
              <div className="mt-6 p-4 rounded-2xl bg-accent/10 border border-accent/20">
                <p className="text-accent font-semibold text-base">
                  🌌 Lunara&apos;s goal: to be the all-in-one app for creative
                  community, music, games, tech, marketplace, and more. One app.
                  Every vibe.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-16 glass-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 shadow-card border border-white/10"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Our Mission
              </h3>
              <p className="text-white/50 leading-relaxed">
                To build the world&apos;s most complete creative ecosystem — an
                all-in-one platform where musicians listen and share, artists
                showcase, coders build, gamers compete, communities chat, and
                everyone finds their vibe. Music. Art. Code. Games. Marketplace.
                Study. All in one place.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 shadow-card border border-white/10"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Our Vision
              </h3>
              <p className="text-white/50 leading-relaxed">
                A future where you never need to leave Lunara — your music
                player, art portfolio, dev community, game arcade, study buddy,
                and second-hand market all live under one roof. One app. Every
                vibe.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What We're Building ── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge className="bg-accent/15 text-foreground border-accent/30 mb-4">
              The Platform
            </Badge>
            <h2 className="text-3xl font-bold text-foreground">
              What We&apos;re Building
            </h2>
            <p className="text-white/50 mt-2 text-lg">
              Seven zones. One universe.{" "}
              <span className="text-accent font-semibold">
                One app. Every vibe.
              </span>
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {zones.map(({ icon: Icon, label, sub, href, bg }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-ocid={`about.zones.item.${i + 1}`}
              >
                <Link
                  to={href}
                  className={`flex items-start gap-4 ${bg} rounded-2xl p-5 text-white hover:opacity-90 transition-opacity shadow-card block`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold block">{label}</span>
                    <span className="text-white/60 text-xs leading-relaxed">
                      {sub}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 shrink-0 mt-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founders ── */}
      <section className="py-20 glass-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="glass-card/80 text-foreground border-white/10 mb-4">
              The Founders
            </Badge>
            <h2 className="text-3xl font-bold text-foreground">
              The Minds Behind the Moon
            </h2>
            <p className="text-white/50 mt-2">
              Four different gifts. One shared vision.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {founders.map((founder, i) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="glass-card rounded-3xl p-8 shadow-card text-center"
                data-ocid={`founders.item.${i + 1}`}
              >
                <Avatar
                  className={`w-20 h-20 rounded-full ${founder.zoneColor} border-4 border-white shadow-card mx-auto mb-4`}
                >
                  <AvatarFallback className="text-white font-bold text-2xl bg-transparent rounded-full">
                    {founder.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-2xl font-bold text-foreground">
                  {founder.name}
                </h3>
                <p className="text-accent font-semibold text-sm mt-1">
                  {founder.role}
                </p>
                {founder.supporter && (
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-white/10 text-white/50 text-xs border border-white/10">
                    {founder.supporter}
                  </span>
                )}
                <p className="text-white/60 text-base mt-3 italic">
                  &ldquo;{founder.tagline}&rdquo;
                </p>
                {founder.instagram && (
                  <a
                    href={founder.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent text-xs flex items-center gap-1 mt-3 justify-center hover:underline"
                    data-ocid="founders.item.link"
                  >
                    <svg
                      aria-label="Instagram"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Instagram
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-accent/30" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-start gap-6 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  data-ocid={`timeline.item.${i + 1}`}
                >
                  <div
                    className={`flex-1 glass-card rounded-2xl p-5 shadow-card ${
                      i % 2 === 0 ? "text-right" : "text-left"
                    }`}
                  >
                    <span className="text-accent font-bold text-sm">
                      {m.year}
                    </span>
                    <h3 className="font-bold text-foreground text-lg mb-1">
                      {m.title}
                    </h3>
                    <p className="text-white/50 text-sm">{m.desc}</p>
                  </div>
                  <div className="relative z-10 w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-xs shrink-0">
                    <Star className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 glass-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            What We Stand For
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 shadow-card text-center"
                data-ocid={`values.item.${i + 1}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-accent/15 text-foreground border-accent/30 mb-4">
              Membership
            </Badge>
            <h2 className="text-3xl font-bold text-foreground">
              Simple, Honest Pricing
            </h2>
            <p className="text-white/50 mt-2">
              All plans billed in Indian Rupees (&#8377;). No surprises.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-3xl p-8 border ${
                  plan.highlight
                    ? "border-accent bg-accent/10 shadow-hero"
                    : "border-white/10 glass-card shadow-card"
                }`}
                data-ocid={`pricing.item.${i + 1}`}
              >
                {plan.highlight && (
                  <Badge className="bg-accent text-accent-foreground mb-4 text-xs">
                    Most Popular
                  </Badge>
                )}
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {plan.tier}
                </h3>
                <p className="text-3xl font-bold text-accent mb-3">
                  {plan.price}
                </p>
                <p className="text-white/50 text-sm mb-6">{plan.desc}</p>
                <ul className="space-y-2 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-foreground/80"
                    >
                      <span className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="w-full rounded-xl text-center py-2.5 text-sm font-semibold text-white/40 border border-white/10 bg-white/05">
                  Coming Soon
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(160deg, #0D001F 0%, #24003D 55%, #4B0082 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <img
            src="/assets/lunara-logo.png"
            alt="Lunara"
            className="w-16 h-16 rounded-full mx-auto mb-4 ring-2 ring-white/20"
          />
          <h2 className="text-3xl font-bold text-white mb-2">
            Join the Lunara Universe
          </h2>
          <p className="text-accent font-bold text-xl mb-4">
            One app. Every vibe.
          </p>
          <p className="text-white/60 text-base mb-8 leading-relaxed">
            Music, art, code, games, community, marketplace — all under one
            roof. Lunara is more than a platform. It&apos;s where every creative
            finds their home.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {!user && (
              <Button
                className="bg-accent text-accent-foreground font-semibold px-8 py-3 h-auto rounded-full hover:bg-accent/90"
                onClick={() => navigate({ to: "/login" })}
                data-ocid="about.primary_button"
              >
                <Users className="w-4 h-4 mr-2" />
                Become a Member
              </Button>
            )}
            <Button
              asChild
              variant="outline"
              className="border-white/30 text-white bg-white/10 hover:bg-white/20 px-8 py-3 h-auto rounded-full transition-colors"
              data-ocid="about.secondary_button"
            >
              <Link to="/">
                <MessageSquare className="w-4 h-4 mr-2" />
                Explore Lunara
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

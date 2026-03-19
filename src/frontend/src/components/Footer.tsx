import { Link } from "@tanstack/react-router";
import { SiDiscord, SiGithub, SiInstagram, SiX } from "react-icons/si";

const footerLinks = [
  { label: "Home", href: "/" as const },
  { label: "Soundscape", href: "/soundscape" as const },
  { label: "Pixel Hands", href: "/pixellens" as const },
  { label: "Wild Gang", href: "/wildgang" as const },
  { label: "Lunar Arcadia", href: "/lunar-arcadia" as const },
  { label: "About", href: "/about" as const },
];

const socialLinks = [
  {
    icon: SiInstagram,
    href: "https://www.instagram.com/lunaratoday?igsh=aTQxcnEwd3U0dzR0",
    label: "Instagram",
  },
  { icon: SiX, href: "#", label: "X (Twitter)" },
  { icon: SiDiscord, href: "https://discord.gg/X7xuEdE3D6", label: "Discord" },
  { icon: SiGithub, href: "#", label: "GitHub" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="text-foreground/80"
      style={{
        background: "rgba(13, 0, 31, 0.6)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="space-y-4">
            <nav className="flex flex-wrap gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-white/40 hover:text-accent transition-colors"
                  data-ocid="footer.link"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href !== "#" ? "_blank" : undefined}
                  rel={href !== "#" ? "noopener noreferrer" : undefined}
                  className="w-8 h-8 flex items-center justify-center rounded-full glass hover:bg-accent/30 hover:border-accent/40 transition-all text-white/50 hover:text-white"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-accent/30 blur-md" />
                <img
                  src="/assets/uploads/Untitled-design-2--1.png"
                  alt="Lunara"
                  className="relative w-9 h-9 object-cover rounded-full ring-2 ring-white/15"
                />
              </div>
              <span className="text-white font-bold text-2xl tracking-tight">
                Lunara
              </span>
            </div>
            <p className="text-white/30 text-xs text-center">
              See Beyond the Ordinary
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-3">
            <p className="text-white/30 text-xs">
              Creativity. Collaboration. Community.
            </p>
            <div className="flex gap-3 flex-wrap md:justify-end">
              <a
                href="https://discord.gg/X7xuEdE3D6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors"
              >
                <SiDiscord className="w-3.5 h-3.5 text-[#5865F2]" />
                Join our Discord
              </a>
              <a
                href="https://www.instagram.com/lunaratoday?igsh=aTQxcnEwd3U0dzR0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors"
              >
                <SiInstagram className="w-3.5 h-3.5 text-pink-400" />
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex items-center justify-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/30 text-xs">
            &copy; {year} Lunara. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

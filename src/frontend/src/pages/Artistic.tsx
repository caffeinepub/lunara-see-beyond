import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowRight,
  Eye,
  Feather,
  Heart,
  ImageIcon,
  Palette,
  PenTool,
  Plus,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

type Poem = {
  id: string;
  title: string;
  body: string;
  author: string;
  likes: number;
  tags: string[];
  timestamp: number;
};

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  url: string;
  author: string;
  timestamp: number;
};

type LitEvent = {
  id: string;
  title: string;
  date: string;
  type: string;
  description: string;
  joinedBy: string[];
};

type ArtUpload = {
  id: string;
  title: string;
  description: string;
  author: string;
  imageDataUrl: string;
  timestamp: number;
};

function loadPoems(): Poem[] {
  try {
    const raw = localStorage.getItem("lunara_poems");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function savePoems(poems: Poem[]) {
  try {
    localStorage.setItem("lunara_poems", JSON.stringify(poems));
  } catch {}
}

function loadProjects(): Project[] {
  try {
    const raw = localStorage.getItem("lunara_projects");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveProjects(projects: Project[]) {
  try {
    localStorage.setItem("lunara_projects", JSON.stringify(projects));
  } catch {}
}

function loadEvents(): LitEvent[] {
  try {
    const raw = localStorage.getItem("lunara_events");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEvents(events: LitEvent[]) {
  try {
    localStorage.setItem("lunara_events", JSON.stringify(events));
  } catch {}
}

function loadArtUploads(): ArtUpload[] {
  try {
    const raw = localStorage.getItem("lunara_art_gallery");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveArtUploads(uploads: ArtUpload[]) {
  try {
    localStorage.setItem("lunara_art_gallery", JSON.stringify(uploads));
  } catch {}
}

function getPoemLiked(id: string): boolean {
  try {
    return localStorage.getItem(`lunara_poem_likes_${id}`) === "1";
  } catch {
    return false;
  }
}

function setPoemLiked(id: string, liked: boolean) {
  try {
    if (liked) localStorage.setItem(`lunara_poem_likes_${id}`, "1");
    else localStorage.removeItem(`lunara_poem_likes_${id}`);
  } catch {}
}

export default function Artistic() {
  const auth = useAuth();

  // Poems
  const [poems, setPoems] = useState<Poem[]>(loadPoems);
  const [showPoemForm, setShowPoemForm] = useState(false);
  const [poemTitle, setPoemTitle] = useState("");
  const [poemBody, setPoemBody] = useState("");

  // Projects
  const [projects, setProjects] = useState<Project[]>(loadProjects);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projTitle, setProjTitle] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projTags, setProjTags] = useState("");
  const [projUrl, setProjUrl] = useState("");

  // Events
  const [events, setEvents] = useState<LitEvent[]>(loadEvents);
  const [showEventForm, setShowEventForm] = useState(false);
  const [evTitle, setEvTitle] = useState("");
  const [evDate, setEvDate] = useState("");
  const [evType, setEvType] = useState("Live Event");
  const [evDesc, setEvDesc] = useState("");

  // Art Gallery
  const [artUploads, setArtUploads] = useState<ArtUpload[]>(loadArtUploads);
  const [showArtForm, setShowArtForm] = useState(false);
  const [artTitle, setArtTitle] = useState("");
  const [artDesc, setArtDesc] = useState("");
  const [artImageDataUrl, setArtImageDataUrl] = useState("");
  const [artImageError, setArtImageError] = useState("");
  const artFileRef = useRef<HTMLInputElement>(null);

  const displayPoems = poems;

  const submitPoem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!poemTitle.trim() || !poemBody.trim()) return;
    const newPoem: Poem = {
      id: Date.now().toString(),
      title: poemTitle.trim(),
      body: poemBody.trim(),
      author: auth.user!.name,
      likes: 0,
      tags: [],
      timestamp: Date.now(),
    };
    const updated = [newPoem, ...poems];
    setPoems(updated);
    savePoems(updated);
    setPoemTitle("");
    setPoemBody("");
    setShowPoemForm(false);
  };

  const deletePoem = (id: string) => {
    const updated = poems.filter((p) => p.id !== id);
    setPoems(updated);
    savePoems(updated);
  };

  const toggleLike = (poem: Poem) => {
    const liked = getPoemLiked(poem.id);
    setPoemLiked(poem.id, !liked);
    const updated = poems.map((p) =>
      p.id === poem.id ? { ...p, likes: p.likes + (liked ? -1 : 1) } : p,
    );
    setPoems(updated);
    savePoems(updated);
  };

  const submitProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim() || !projDesc.trim()) return;
    const newProj: Project = {
      id: Date.now().toString(),
      title: projTitle.trim(),
      description: projDesc.trim(),
      tags: projTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      url: projUrl.trim(),
      author: auth.user!.name,
      timestamp: Date.now(),
    };
    const updated = [newProj, ...projects];
    setProjects(updated);
    saveProjects(updated);
    setProjTitle("");
    setProjDesc("");
    setProjTags("");
    setProjUrl("");
    setShowProjectForm(false);
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    saveProjects(updated);
  };

  const submitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evTitle.trim() || !evDate) return;
    const newEv: LitEvent = {
      id: Date.now().toString(),
      title: evTitle.trim(),
      date: evDate,
      type: evType,
      description: evDesc.trim(),
      joinedBy: [],
    };
    const updated = [newEv, ...events];
    setEvents(updated);
    saveEvents(updated);
    setEvTitle("");
    setEvDate("");
    setEvType("Live Event");
    setEvDesc("");
    setShowEventForm(false);
  };

  const toggleJoinEvent = (evId: string) => {
    if (!auth.user) {
      window.dispatchEvent(new CustomEvent("lunara-open-auth"));
      return;
    }
    const updated = events.map((ev) => {
      if (ev.id !== evId) return ev;
      const already = ev.joinedBy.includes(auth.user!.name);
      return {
        ...ev,
        joinedBy: already
          ? ev.joinedBy.filter((n) => n !== auth.user!.name)
          : [...ev.joinedBy, auth.user!.name],
      };
    });
    setEvents(updated);
    saveEvents(updated);
  };

  const handleArtFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setArtImageError("Please select an image file.");
      return;
    }
    setArtImageError("");
    const reader = new FileReader();
    reader.onload = () => {
      setArtImageDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const submitArt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle.trim() || !artImageDataUrl) return;
    const newArt: ArtUpload = {
      id: Date.now().toString(),
      title: artTitle.trim(),
      description: artDesc.trim(),
      author: auth.user!.name,
      imageDataUrl: artImageDataUrl,
      timestamp: Date.now(),
    };
    const updated = [newArt, ...artUploads];
    setArtUploads(updated);
    saveArtUploads(updated);
    setArtTitle("");
    setArtDesc("");
    setArtImageDataUrl("");
    if (artFileRef.current) artFileRef.current.value = "";
    setShowArtForm(false);
  };

  const deleteArt = (id: string) => {
    const updated = artUploads.filter((a) => a.id !== id);
    setArtUploads(updated);
    saveArtUploads(updated);
  };

  return (
    <div>
      {/* Hero */}
      <section className="gradient-artistic min-h-[60vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute left-0 top-0 w-80 h-80 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-white/20 text-white border-white/30 text-xs">
                Artist Zone
              </Badge>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">Pixel Hands</h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Where words become worlds and visuals tell a thousand stories. A
              sanctuary for poets, painters, digital artists, and storytellers
              who dare to see differently — through the pixel and the pen.
            </p>
            <div className="flex gap-4">
              <Button
                className="bg-accent text-accent-foreground font-semibold px-6 h-11 rounded-full hover:bg-accent/90"
                onClick={() =>
                  document
                    .getElementById("gallery")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="pixellens.primary_button"
              >
                <Feather className="w-4 h-4 mr-2" />
                Submit Your Work
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white bg-white/10 hover:bg-white/20 px-6 h-11 rounded-full"
                onClick={() =>
                  document
                    .getElementById("gallery")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="pixellens.secondary_button"
              >
                <Eye className="w-4 h-4 mr-2" />
                Explore Gallery
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Poetry ── */}
      <section id="submit" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {poems.length > 0 ? "Community Poetry" : "Featured Poetry"}
              </h2>
              <p className="text-white/50 text-sm mt-1">
                Words that move through the Pixel Hands
              </p>
            </div>
            {auth.user && !showPoemForm && (
              <Button
                size="sm"
                className="glass-button text-white rounded-xl gap-1"
                onClick={() => setShowPoemForm(true)}
                data-ocid="poems.open_modal_button"
              >
                <Plus className="w-4 h-4" /> Submit a Poem
              </Button>
            )}
            {!auth.user && (
              <Button
                variant="ghost"
                className="text-accent hover:text-accent/80"
              >
                All Poems <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>

          {/* Submit poem form */}
          {auth.user && showPoemForm && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl border border-white/15 p-6 mb-8"
              data-ocid="poems.modal"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Share a Poem
              </h3>
              <form onSubmit={submitPoem} className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-sm text-white/70">Title</span>
                  <input
                    type="text"
                    value={poemTitle}
                    onChange={(e) => setPoemTitle(e.target.value)}
                    placeholder="Your poem title"
                    required
                    className="w-full bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60"
                    data-ocid="poems.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-sm text-white/70">Poem</span>
                  <textarea
                    value={poemBody}
                    onChange={(e) => setPoemBody(e.target.value)}
                    placeholder="Write your poem here..."
                    rows={5}
                    required
                    className="w-full bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60 resize-none"
                    data-ocid="poems.textarea"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="glass-button text-white"
                    data-ocid="poems.submit_button"
                  >
                    Publish Poem
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-white/50"
                    onClick={() => setShowPoemForm(false)}
                    data-ocid="poems.cancel_button"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Poems list */}
          {displayPoems.length === 0 ? (
            <div
              className="glass-card rounded-2xl border border-white/10 p-12 text-center"
              data-ocid="poems.empty_state"
            >
              <Feather className="w-12 h-12 text-accent/30 mx-auto mb-3" />
              <p className="text-white/40">Be the first to share a poem.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {displayPoems.map((poem, i) => (
                <motion.div
                  key={poem.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 shadow-card border border-white/10 hover:border-accent/30 transition-all"
                  data-ocid={`poems.item.${i + 1}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-foreground">
                        {poem.title}
                      </h3>
                      <p className="text-white/50 text-xs mt-0.5">
                        by {poem.author}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {auth.user?.name === poem.author &&
                        poem.timestamp !== 0 && (
                          <button
                            type="button"
                            onClick={() => deletePoem(poem.id)}
                            className="p-1 rounded text-white/30 hover:text-red-400 transition-colors"
                            data-ocid={`poems.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      <PenTool className="w-4 h-4 text-accent shrink-0" />
                    </div>
                  </div>
                  <p className="text-foreground/70 text-sm leading-relaxed font-serif italic whitespace-pre-line mb-4 line-clamp-4">
                    {poem.body}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {poem.tags.map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="text-xs px-2 py-0"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        auth.user && poem.timestamp !== 0
                          ? toggleLike(poem)
                          : undefined
                      }
                      className="flex items-center gap-1 text-xs text-white/50 hover:text-accent transition-colors"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          getPoemLiked(poem.id)
                            ? "text-accent fill-accent"
                            : "text-accent"
                        }`}
                      />
                      {poem.likes}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Community Projects ── */}
      <section id="projects" className="py-16 glass-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Community Projects
              </h2>
              <p className="text-white/50 text-sm mt-1">
                Build together. Show your work.
              </p>
            </div>
            {auth.user && !showProjectForm && (
              <Button
                size="sm"
                className="glass-button text-white rounded-xl gap-1"
                onClick={() => setShowProjectForm(true)}
                data-ocid="projects.open_modal_button"
              >
                <Plus className="w-4 h-4" /> Add Project
              </Button>
            )}
          </div>

          {auth.user && showProjectForm && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl border border-white/15 p-6 mb-8"
              data-ocid="projects.modal"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Add a Project
              </h3>
              <form onSubmit={submitProject} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <span className="text-sm text-white/70">Title *</span>
                    <input
                      type="text"
                      value={projTitle}
                      onChange={(e) => setProjTitle(e.target.value)}
                      placeholder="Project name"
                      required
                      className="w-full bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60"
                      data-ocid="projects.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-sm text-white/70">
                      Tags (comma-separated)
                    </span>
                    <input
                      type="text"
                      value={projTags}
                      onChange={(e) => setProjTags(e.target.value)}
                      placeholder="React, TypeScript, AI"
                      className="w-full bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60"
                      data-ocid="projects.input"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <span className="text-sm text-white/70">Description *</span>
                  <textarea
                    value={projDesc}
                    onChange={(e) => setProjDesc(e.target.value)}
                    placeholder="What's your project about?"
                    rows={3}
                    required
                    className="w-full bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60 resize-none"
                    data-ocid="projects.textarea"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-sm text-white/70">URL (optional)</span>
                  <input
                    type="url"
                    value={projUrl}
                    onChange={(e) => setProjUrl(e.target.value)}
                    placeholder="https://github.com/you/project"
                    className="w-full bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60"
                    data-ocid="projects.input"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="glass-button text-white"
                    data-ocid="projects.submit_button"
                  >
                    Publish Project
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-white/50"
                    onClick={() => setShowProjectForm(false)}
                    data-ocid="projects.cancel_button"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {!auth.user && projects.length === 0 && (
            <p className="text-white/40 text-sm mb-6">
              <button
                type="button"
                className="text-accent underline hover:no-underline"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("lunara-open-auth"))
                }
              >
                Login
              </button>{" "}
              to add your project.
            </p>
          )}

          {projects.length === 0 ? (
            <div
              className="glass-card rounded-2xl border border-white/10 p-12 text-center"
              data-ocid="projects.empty_state"
            >
              <Plus className="w-12 h-12 text-accent/30 mx-auto mb-3" />
              <p className="text-white/40">No projects yet. Add yours!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((proj, i) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card rounded-2xl p-5 border border-white/10 hover:border-accent/30 transition-all flex flex-col gap-3"
                  data-ocid={`projects.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-foreground">
                        {proj.title}
                      </h3>
                      <p className="text-white/40 text-xs">by {proj.author}</p>
                    </div>
                    {auth.user?.name === proj.author && (
                      <button
                        type="button"
                        onClick={() => deleteProject(proj.id)}
                        className="p-1 rounded text-white/30 hover:text-red-400 transition-colors shrink-0"
                        data-ocid={`projects.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed flex-1">
                    {proj.description}
                  </p>
                  {proj.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {proj.tags.map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="text-xs px-2 py-0"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent text-xs hover:underline truncate"
                    >
                      {proj.url}
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Art Gallery ── */}
      <section id="gallery" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <ImageIcon className="w-6 h-6 text-accent" />
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Art Gallery
                </h2>
                <p className="text-white/50 text-sm mt-0.5">
                  Art uploaded by our community
                </p>
              </div>
            </div>
            {auth.user && !showArtForm && (
              <Button
                size="sm"
                className="glass-button text-white rounded-xl gap-1"
                onClick={() => setShowArtForm(true)}
                data-ocid="gallery.upload_button"
              >
                <Upload className="w-4 h-4" /> Upload Art
              </Button>
            )}
            {!auth.user && (
              <button
                type="button"
                className="text-accent text-sm hover:underline"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("lunara-open-auth"))
                }
              >
                Login to upload
              </button>
            )}
          </div>

          {/* Upload art form */}
          {auth.user && showArtForm && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl border border-white/15 p-6 mb-8"
              data-ocid="gallery.modal"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Upload Your Art
              </h3>
              <form onSubmit={submitArt} className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-sm text-white/70">Title *</span>
                  <input
                    type="text"
                    value={artTitle}
                    onChange={(e) => setArtTitle(e.target.value)}
                    placeholder="Name your artwork"
                    required
                    className="w-full bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60"
                    data-ocid="gallery.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-sm text-white/70">
                    Description (optional)
                  </span>
                  <textarea
                    value={artDesc}
                    onChange={(e) => setArtDesc(e.target.value)}
                    placeholder="Tell us about your artwork..."
                    rows={2}
                    className="w-full bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60 resize-none"
                    data-ocid="gallery.textarea"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-sm text-white/70">Image *</span>
                  <label
                    className="flex items-center gap-3 w-full bg-white/08 border border-dashed border-white/25 rounded-xl px-4 py-3 cursor-pointer hover:border-accent/50 transition-colors"
                    data-ocid="gallery.dropzone"
                  >
                    <Upload className="w-5 h-5 text-accent/60 shrink-0" />
                    <span className="text-sm text-white/50">
                      {artImageDataUrl
                        ? "Image selected ✓"
                        : "Click to choose an image"}
                    </span>
                    <input
                      ref={artFileRef}
                      type="file"
                      accept="image/*"
                      onChange={handleArtFileChange}
                      className="hidden"
                    />
                  </label>
                  {artImageError && (
                    <p
                      className="text-red-400 text-xs"
                      data-ocid="gallery.error_state"
                    >
                      {artImageError}
                    </p>
                  )}
                  {artImageDataUrl && (
                    <img
                      src={artImageDataUrl}
                      alt="Preview"
                      className="mt-2 h-32 w-full object-cover rounded-xl border border-white/10"
                    />
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={!artTitle.trim() || !artImageDataUrl}
                    className="glass-button text-white disabled:opacity-40"
                    data-ocid="gallery.submit_button"
                  >
                    Publish Art
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-white/50"
                    onClick={() => {
                      setShowArtForm(false);
                      setArtTitle("");
                      setArtDesc("");
                      setArtImageDataUrl("");
                      setArtImageError("");
                      if (artFileRef.current) artFileRef.current.value = "";
                    }}
                    data-ocid="gallery.cancel_button"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Gallery grid */}
          {artUploads.length === 0 ? (
            <div
              className="glass-card rounded-2xl border border-white/10 p-16 text-center"
              data-ocid="gallery.empty_state"
            >
              <ImageIcon className="w-14 h-14 text-accent/25 mx-auto mb-4" />
              <p className="text-white/50 text-base font-medium">
                Be the first to upload your art.
              </p>
              <p className="text-white/30 text-sm mt-1">
                Share your paintings, illustrations, photography, and more.
              </p>
              {!auth.user && (
                <button
                  type="button"
                  className="mt-4 text-accent text-sm hover:underline"
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("lunara-open-auth"))
                  }
                >
                  Login to upload →
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {artUploads.map((art, i) => (
                <motion.div
                  key={art.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group relative rounded-2xl overflow-hidden shadow-card hover:-translate-y-1 transition-transform border border-white/10 hover:border-accent/30"
                  data-ocid={`gallery.item.${i + 1}`}
                >
                  <div className="relative h-48 bg-white/05">
                    <img
                      src={art.imageDataUrl}
                      alt={art.title}
                      className="w-full h-full object-cover"
                    />
                    {auth.user?.name === art.author && (
                      <button
                        type="button"
                        onClick={() => deleteArt(art.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 text-white/60 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                        data-ocid={`gallery.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="glass-card p-3">
                    <p className="font-semibold text-foreground text-sm truncate">
                      {art.title}
                    </p>
                    <p className="text-white/50 text-xs mt-0.5">
                      by {art.author}
                    </p>
                    {art.description && (
                      <p className="text-white/40 text-xs mt-1 line-clamp-2">
                        {art.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Literary Events ── */}
      <section className="py-16 glass-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-bold text-foreground">
                Upcoming Events
              </h2>
            </div>
            {auth.isAdmin && !showEventForm && (
              <Button
                size="sm"
                className="glass-button text-white rounded-xl gap-1"
                onClick={() => setShowEventForm(true)}
                data-ocid="events.open_modal_button"
              >
                <Plus className="w-4 h-4" /> Create Event
              </Button>
            )}
          </div>

          {auth.isAdmin && showEventForm && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl border border-white/15 p-6 mb-8"
              data-ocid="events.modal"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Create Event
              </h3>
              <form onSubmit={submitEvent} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <span className="text-sm text-white/70">Title *</span>
                    <input
                      type="text"
                      value={evTitle}
                      onChange={(e) => setEvTitle(e.target.value)}
                      placeholder="Event name"
                      required
                      className="w-full bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60"
                      data-ocid="events.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-sm text-white/70">Date *</span>
                    <input
                      type="date"
                      value={evDate}
                      onChange={(e) => setEvDate(e.target.value)}
                      required
                      className="w-full bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent/60"
                      data-ocid="events.input"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <span className="text-sm text-white/70">Type</span>
                  <select
                    value={evType}
                    onChange={(e) => setEvType(e.target.value)}
                    className="w-full bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent/60"
                    data-ocid="events.select"
                  >
                    <option value="Live Event" className="bg-[#1a0033]">
                      Live Event
                    </option>
                    <option value="Writing Challenge" className="bg-[#1a0033]">
                      Writing Challenge
                    </option>
                    <option value="Workshop" className="bg-[#1a0033]">
                      Workshop
                    </option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <span className="text-sm text-white/70">Description</span>
                  <textarea
                    value={evDesc}
                    onChange={(e) => setEvDesc(e.target.value)}
                    placeholder="What's this event about?"
                    rows={3}
                    className="w-full bg-white/08 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent/60 resize-none"
                    data-ocid="events.textarea"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="glass-button text-white"
                    data-ocid="events.submit_button"
                  >
                    Create Event
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-white/50"
                    onClick={() => setShowEventForm(false)}
                    data-ocid="events.cancel_button"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {events.length === 0 ? (
            <div
              className="glass-card rounded-2xl border border-white/10 p-12 text-center"
              data-ocid="events.empty_state"
            >
              <Sparkles className="w-12 h-12 text-accent/30 mx-auto mb-3" />
              <p className="text-white/40">No events yet. Check back soon!</p>
              {!auth.isAdmin && (
                <p className="text-white/30 text-xs mt-2">
                  Events are created by admins.
                </p>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-5">
              {events.map((event, i) => {
                const joined = auth.user
                  ? event.joinedBy.includes(auth.user.name)
                  : false;
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card rounded-2xl p-6 shadow-card border border-white/10"
                    data-ocid={`events.item.${i + 1}`}
                  >
                    <Badge className="bg-accent/15 text-foreground border-accent/30 mb-3">
                      {event.type}
                    </Badge>
                    <h3 className="font-bold text-foreground mb-1">
                      {event.title}
                    </h3>
                    <p className="text-white/50 text-sm mb-2">{event.date}</p>
                    {event.description && (
                      <p className="text-white/60 text-sm mb-3 leading-relaxed">
                        {event.description}
                      </p>
                    )}
                    {event.joinedBy.length > 0 && (
                      <p className="text-xs text-accent mb-3">
                        <span className="font-bold">
                          {event.joinedBy.length}
                        </span>{" "}
                        joined
                      </p>
                    )}
                    <Button
                      size="sm"
                      className={`w-full mt-1 rounded-xl ${
                        joined
                          ? "bg-white/10 text-white hover:bg-red-900/30"
                          : "bg-accent text-accent-foreground hover:bg-accent/90"
                      }`}
                      onClick={() => toggleJoinEvent(event.id)}
                      data-ocid={`events.item.${i + 1}`}
                    >
                      {!auth.user
                        ? "Login to Join"
                        : joined
                          ? "Leave"
                          : "Join Event"}
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-artistic">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Palette className="w-12 h-12 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Your Vision, Amplified
          </h2>
          <p className="text-white/60 mb-8">
            Share your poetry, exhibit your art, and connect with creators who
            see the world through a different lens — the Pixel Hands.
          </p>
          {!auth.user && (
            <Button
              className="bg-accent text-accent-foreground font-semibold px-8 py-3 h-auto rounded-full hover:bg-accent/90"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("lunara-open-auth"))
              }
              data-ocid="pixellens.cta_button"
            >
              <Feather className="w-4 h-4 mr-2" />
              Start Creating
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}

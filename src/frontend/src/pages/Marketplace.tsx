import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Plus, ShoppingBag, Tag } from "lucide-react";
import { useState } from "react";

type Category =
  | "All"
  | "Electronics"
  | "Books"
  | "Clothing"
  | "Furniture"
  | "Other";

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  category: Exclude<Category, "All">;
  sellerName: string;
  contact: string;
  emoji: string;
  gradient: string;
}

const CATEGORIES: Category[] = [
  "All",
  "Electronics",
  "Books",
  "Clothing",
  "Furniture",
  "Other",
];

const CATEGORY_COLORS: Record<Exclude<Category, "All">, string> = {
  Electronics: "bg-violet-500/30 text-violet-200 border-violet-400/30",
  Books: "bg-blue-500/30 text-blue-200 border-blue-400/30",
  Clothing: "bg-pink-500/30 text-pink-200 border-pink-400/30",
  Furniture: "bg-amber-500/30 text-amber-200 border-amber-400/30",
  Other: "bg-emerald-500/30 text-emerald-200 border-emerald-400/30",
};

function contactAction(contact: string) {
  const isEmail = contact.includes("@");
  if (isEmail) {
    window.open(`mailto:${contact}`, "_blank");
  } else {
    const digits = contact.replace(/\D/g, "");
    window.open(`https://wa.me/${digits}`, "_blank");
  }
}

let nextId = 1;

const EMOJIS_BY_CATEGORY: Record<Exclude<Category, "All">, string> = {
  Electronics: "💻",
  Books: "📖",
  Clothing: "👕",
  Furniture: "🛋️",
  Other: "📦",
};

export default function Marketplace() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [dialogOpen, setDialogOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "Electronics" as Exclude<Category, "All">,
    sellerName: "",
    contact: "",
  });

  const filtered =
    activeCategory === "All"
      ? listings
      : listings.filter((l) => l.category === activeCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing: Listing = {
      id: nextId++,
      title: form.title,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      sellerName: form.sellerName,
      contact: form.contact,
      emoji: EMOJIS_BY_CATEGORY[form.category],
      gradient: "from-violet-900/60 to-purple-800/40",
    };
    setListings((prev) => [newListing, ...prev]);
    setDialogOpen(false);
    setForm({
      title: "",
      description: "",
      price: "",
      category: "Electronics",
      sellerName: "",
      contact: "",
    });
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #0D001F 0%, #24003D 50%, #4B0082 100%)",
      }}
    >
      {/* Hero */}
      <section className="relative pt-20 pb-12 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-purple-700/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-48 rounded-full bg-violet-600/15 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 rounded-full text-white/70 text-sm mb-6">
            <ShoppingBag className="w-4 h-4" />
            Community Marketplace
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-300">
              MoonMart
            </span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl mb-6">
            Buy. Sell. Trade. — within the community.
          </p>

          {/* Disclaimer banner */}
          <div className="bg-amber-900/20 border border-amber-400/30 rounded-xl px-4 py-3 text-sm text-amber-300/80 max-w-lg mx-auto mb-6">
            ⚠️ Lunara is not responsible for any issues, disputes, or
            transactions that occur through MoonMart. All trades are at your own
            risk.
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="glass-button text-white rounded-full px-8 py-3 text-base font-semibold hover:brightness-125 transition-all"
                data-ocid="marketplace.open_modal_button"
              >
                <Plus className="w-5 h-5 mr-2" />
                List an Item
              </Button>
            </DialogTrigger>
            <DialogContent
              className="glass-card border-white/15 text-foreground max-w-md"
              data-ocid="marketplace.dialog"
            >
              <DialogHeader>
                <DialogTitle className="text-foreground text-xl">
                  List Your Item
                </DialogTitle>
                <DialogDescription className="text-white/50">
                  Fill in the details. Buyers will contact you directly.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <div className="space-y-1.5">
                  <Label htmlFor="m-title" className="text-white/70">
                    Title
                  </Label>
                  <Input
                    id="m-title"
                    value={form.title}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, title: e.target.value }))
                    }
                    placeholder="e.g. Sony headphones"
                    required
                    className="glass border-white/20 text-foreground placeholder:text-white/30"
                    data-ocid="marketplace.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="m-desc" className="text-white/70">
                    Description
                  </Label>
                  <Textarea
                    id="m-desc"
                    value={form.description}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, description: e.target.value }))
                    }
                    placeholder="Condition, usage, what's included…"
                    required
                    rows={3}
                    className="glass border-white/20 text-foreground placeholder:text-white/30 resize-none"
                    data-ocid="marketplace.textarea"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="m-price" className="text-white/70">
                      Price (₹)
                    </Label>
                    <Input
                      id="m-price"
                      type="number"
                      min="0"
                      value={form.price}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, price: e.target.value }))
                      }
                      placeholder="0"
                      required
                      className="glass border-white/20 text-foreground placeholder:text-white/30"
                      data-ocid="marketplace.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-white/70">Category</Label>
                    <Select
                      value={form.category}
                      onValueChange={(v) =>
                        setForm((p) => ({
                          ...p,
                          category: v as Exclude<Category, "All">,
                        }))
                      }
                    >
                      <SelectTrigger
                        className="glass border-white/20 text-foreground"
                        data-ocid="marketplace.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-card border-white/20 text-foreground">
                        {CATEGORIES.filter((c) => c !== "All").map((c) => (
                          <SelectItem
                            key={c}
                            value={c}
                            className="text-white hover:bg-white/10 focus:bg-white/10"
                          >
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="m-name" className="text-white/70">
                    Your Name
                  </Label>
                  <Input
                    id="m-name"
                    value={form.sellerName}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, sellerName: e.target.value }))
                    }
                    placeholder="e.g. Arjun K."
                    required
                    className="glass border-white/20 text-foreground placeholder:text-white/30"
                    data-ocid="marketplace.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="m-contact" className="text-white/70">
                    Contact (Email or WhatsApp number)
                  </Label>
                  <Input
                    id="m-contact"
                    value={form.contact}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, contact: e.target.value }))
                    }
                    placeholder="your@email.com or 9876543210"
                    required
                    className="glass border-white/20 text-foreground placeholder:text-white/30"
                    data-ocid="marketplace.input"
                  />
                </div>
                <div className="flex gap-3 pt-1">
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex-1 text-white/60 hover:text-white hover:bg-white/10"
                    onClick={() => setDialogOpen(false)}
                    data-ocid="marketplace.cancel_button"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 glass-button text-white hover:brightness-125 transition-all"
                    data-ocid="marketplace.submit_button"
                  >
                    Post Listing
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Category Filters */}
      <section className="px-4 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat
                    ? "glass-pill text-white border-white/30 shadow-lg shadow-purple-900/40"
                    : "border-white/15 text-white/50 hover:text-white hover:border-white/30 hover:bg-white/08"
                }`}
                data-ocid="marketplace.tab"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div
              className="text-center py-24"
              data-ocid="marketplace.empty_state"
            >
              <div className="text-6xl mb-4">🛸</div>
              <p className="text-white/40 text-lg">
                No listings yet — be the first to post one!
              </p>
              <p className="text-white/25 text-sm mt-1">
                Click "List an Item" above to get started.
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="marketplace.list"
            >
              {filtered.map((item, idx) => (
                <article
                  key={item.id}
                  className="glass-card rounded-2xl overflow-hidden flex flex-col group hover:scale-[1.02] transition-transform duration-200"
                  data-ocid={`marketplace.item.${idx + 1}`}
                >
                  {/* Image placeholder */}
                  <div
                    className={`h-40 bg-gradient-to-br ${item.gradient} flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="text-5xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                      {item.emoji}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1 gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-white font-semibold text-base leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                      <span className="shrink-0 text-white font-bold text-lg text-violet-200">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${CATEGORY_COLORS[item.category]}`}
                      >
                        <Tag className="w-3 h-3" />
                        {item.category}
                      </span>
                    </div>

                    <p className="text-white/50 text-sm line-clamp-2 leading-relaxed flex-1">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
                      <span className="text-white/40 text-xs">
                        by {item.sellerName}
                      </span>
                      <Button
                        size="sm"
                        className="glass-button text-white text-xs rounded-full px-3 h-7 hover:brightness-125 transition-all"
                        onClick={() => contactAction(item.contact)}
                        data-ocid="marketplace.button"
                      >
                        {item.contact.includes("@") ? (
                          <>
                            <Mail className="w-3 h-3 mr-1" />
                            Email
                          </>
                        ) : (
                          <>
                            <MessageCircle className="w-3 h-3 mr-1" />
                            WhatsApp
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

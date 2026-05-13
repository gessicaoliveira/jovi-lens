import { useState } from "react";
import { Search, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface GalleryScreenProps {
  onPhotoClick: (gradient: string) => void;
  newPhotoGradient?: string | null;
}

const STATS = [
  { label: "47📸", sub: "Fotos hoje" },
  { label: "3 álbuns", sub: "Auto-criados" },
  { label: "340MB", sub: "Economizados" },
  { label: "0.3s", sub: "Tempo abertura" },
];

const ALBUMS = [
  { id: "todos", label: "Todos", color: "bg-primary" },
  { id: "natureza", label: "Natureza", color: "bg-green-500" },
  { id: "pessoas", label: "Pessoas", color: "bg-[#FF3CAC]" },
  { id: "comida", label: "Comida", color: "bg-[#FFD166]" },
  { id: "noite", label: "Noite", color: "bg-blue-500" },
  { id: "viagem", label: "Viagem", color: "bg-orange-500" },
];

const BASE_GRADIENTS = [
  "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)",
  "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  "linear-gradient(135deg, #360033, #0b8793)",
  "linear-gradient(135deg, #373b44, #4286f4)",
  "linear-gradient(135deg, #1f4037, #99f2c8)",
  "linear-gradient(135deg, #c94b4b, #4b134f)",
  "linear-gradient(135deg, #12c2e9, #f64f59, #c471ed)",
  "linear-gradient(135deg, #2c3e50, #fd746c)",
  "linear-gradient(135deg, #2196F3, #0D47A1)",
  "linear-gradient(135deg, #000428, #004e92)",
];

// Replicate to get 18 tiles
const TILES = [...BASE_GRADIENTS, ...BASE_GRADIENTS.slice(0, 8)];

const AI_BADGES: Record<number, string> = {
  0: "Paisagem",
  3: "Retrato",
  5: "Noite",
  8: "Comida",
  12: "Viagem",
  15: "Urbano"
};

export function GalleryScreen({ onPhotoClick, newPhotoGradient }: GalleryScreenProps) {
  const { toast } = useToast();
  const [activeAlbum, setActiveAlbum] = useState("todos");

  // If a new photo was captured, put it at the start
  const allTiles = newPhotoGradient ? [newPhotoGradient, ...TILES] : TILES;

  return (
    <div className="absolute inset-0 flex flex-col bg-background text-foreground z-10 overflow-hidden pb-16">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-6 bg-background/90 backdrop-blur-md z-20">
        <h1 className="font-serif text-[22px] font-extrabold">Galeria</h1>
        <div className="flex items-center gap-3">
          <div className="px-2 py-1 rounded-md bg-accent/20 border border-accent/30 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider">IA Ativa</span>
          </div>
          <button className="w-8 h-8 flex items-center justify-center bg-card rounded-full active:scale-95 transition-transform">
            <Search size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
        {/* Stats Strip */}
        <div className="flex overflow-x-auto no-scrollbar gap-3 px-4 pb-4 snap-x">
          {STATS.map((stat, i) => (
            <div key={i} className="snap-start shrink-0 w-[140px] bg-card border border-card-border rounded-xl p-3">
              <div className="font-serif font-bold text-lg mb-1">{stat.label}</div>
              <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Smart Albums */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 px-4 pb-4">
          {ALBUMS.map(album => (
            <button
              key={album.id}
              onClick={() => {
                setActiveAlbum(album.id);
                toast({ title: `Álbum: ${album.label}` });
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0 ${
                activeAlbum === album.id ? "bg-primary text-white" : "bg-card text-muted-foreground border border-card-border"
              }`}
            >
              {activeAlbum !== album.id && <div className={`w-2 h-2 rounded-full ${album.color}`} />}
              {album.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-3 gap-[3px] px-1">
          {allTiles.map((grad, i) => {
            const isFeatured = i === 0;
            const badge = AI_BADGES[i];
            
            return (
              <motion.div
                key={i}
                whileTap={{ scale: 0.96 }}
                onClick={() => onPhotoClick(grad)}
                className={`relative rounded-md overflow-hidden ${isFeatured ? 'col-span-2 row-span-2' : 'aspect-square'}`}
                style={{ background: grad }}
              >
                {badge && (
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] text-white">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>{badge}</span>
                  </div>
                )}
                {isFeatured && newPhotoGradient && i === 0 && (
                  <div className="absolute top-2 right-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded">NOVO</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Search, Info, Image as ImageIcon, Zap, Clock, ShieldCheck, Instagram, MessageCircle, Video, HardDrive, Mail, Twitter, Bluetooth, Link2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { LoadingOverlay } from "../shared/LoadingOverlay";

interface ShareScreenProps {
  gradient: string;
  onBack: () => void;
}

const DESTINATIONS = [
  { id: "instagram", name: "Instagram", icon: Instagram, color: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500" },
  { id: "whatsapp", name: "WhatsApp", icon: MessageCircle, color: "bg-green-500" },
  { id: "tiktok", name: "TikTok", icon: Video, color: "bg-black" },
  { id: "drive", name: "Drive", icon: HardDrive, color: "bg-blue-500" },
  { id: "email", name: "E-mail", icon: Mail, color: "bg-red-500" },
  { id: "x", name: "X", icon: Twitter, color: "bg-black" },
  { id: "bluetooth", name: "Bluetooth", icon: Bluetooth, color: "bg-blue-600" },
  { id: "link", name: "Link", icon: Link2, color: "bg-primary" },
];

export function ShareScreen({ gradient, onBack }: ShareScreenProps) {
  const { toast } = useToast();
  const [compression, setCompression] = useState("Smart");
  const [isSharing, setIsSharing] = useState<string | null>(null);

  const handleShare = (dest: typeof DESTINATIONS[0]) => {
    setIsSharing(`📤 Enviando para ${dest.name}...`);
    setTimeout(() => {
      setIsSharing(null);
      toast({
        title: `✅ Enviado para ${dest.name}!`,
        duration: 2500
      });
    }, 1200);
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-background text-foreground z-10 overflow-y-auto pb-safe">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 pt-6 sticky top-0 bg-background/90 backdrop-blur-md z-20">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-card active:scale-95 transition-transform"
        >
          <span className="text-xl">&larr;</span>
        </button>
        <div 
          className="w-12 h-12 rounded-xl shadow-lg border border-white/10"
          style={{ background: gradient }}
        />
        <div>
          <h1 className="font-serif font-bold text-lg">Compartilhar</h1>
          <p className="text-xs text-muted-foreground">200MP &middot; Smart Compress ativo</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Smart Compression Card */}
        <div className="bg-card rounded-2xl p-4 border border-card-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold flex items-center gap-2">
              <Zap size={16} className="text-accent" /> Compressão Inteligente
            </h2>
            <span className="text-xs text-[#FFD166] font-medium px-2 py-1 bg-[#FFD166]/10 rounded-md">
              {compression}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "Original", size: "24.5 MB" },
              { id: "Smart", size: "4.8 MB" },
              { id: "Web", size: "1.2 MB" }
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => {
                  setCompression(opt.id);
                  toast({ title: `Qualidade: ${opt.id}` });
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                  compression === opt.id 
                    ? "bg-primary/20 border-primary text-white" 
                    : "bg-background border-white/5 text-muted-foreground"
                }`}
              >
                <span className="font-medium text-sm mb-1">{opt.id}</span>
                <span className="text-[10px] opacity-70">{opt.size}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <Clock size={14} className="text-green-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Envio Rápido</p>
              <p className="text-[10px] text-muted-foreground">Compressão sem perda visual</p>
            </div>
            <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">0.3s</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <ImageIcon size={14} className="text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">IA de Qualidade</p>
              <p className="text-[10px] text-muted-foreground">Melhor versão para cada app</p>
            </div>
            <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-1 rounded">IA</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <ShieldCheck size={14} className="text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">EXIF Removido</p>
              <p className="text-[10px] text-muted-foreground">Privacidade protegida</p>
            </div>
            <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded">Seguro</span>
          </div>
        </div>

        {/* Share Grid */}
        <div>
          <h3 className="font-semibold text-sm mb-4 text-white/80">Destinos</h3>
          <div className="grid grid-cols-4 gap-y-6 gap-x-2">
            {DESTINATIONS.map(dest => (
              <button
                key={dest.id}
                onClick={() => handleShare(dest)}
                className="flex flex-col items-center gap-2 active:scale-90 transition-transform"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${dest.color}`}>
                  <dest.icon size={24} />
                </div>
                <span className="text-[10px] font-medium">{dest.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {isSharing && <LoadingOverlay text={isSharing} />}
    </div>
  );
}

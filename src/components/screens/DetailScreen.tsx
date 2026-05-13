import { useState } from "react";
import { Heart, Share, Wand2, Sparkles, Crop, Type, Palette, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface DetailScreenProps {
  gradient: string;
  onBack: () => void;
  onShare: () => void;
}

const TOOLS = [
  { id: "filtros", label: "Filtros", icon: Wand2 },
  { id: "realce", label: "Realce", icon: Sparkles },
  { id: "cortar", label: "Cortar", icon: Crop },
  { id: "texto", label: "Texto", icon: Type },
  { id: "cor", label: "Cor", icon: Palette },
];

export function DetailScreen({ gradient, onBack, onShare }: DetailScreenProps) {
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);

  return (
    <div className="absolute inset-0 flex flex-col bg-background text-foreground z-10">
      {/* Top Photo Area (55%) */}
      <div 
        className="relative h-[55%] w-full rounded-b-[2rem] shadow-2xl overflow-hidden shrink-0"
        style={{ background: gradient }}
      >
        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent" />
        
        {/* Top Bar Overlaid */}
        <div className="absolute top-0 w-full flex justify-between items-center p-4 pt-6">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white active:scale-95 transition-transform"
          >
            <span className="text-xl">&larr;</span>
          </button>
          
          <div className="flex gap-2">
            <button 
              onClick={() => {
                setLiked(!liked);
                toast({ title: liked ? "Removido dos favoritos" : "Adicionado aos favoritos" });
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white active:scale-95 transition-transform"
            >
              <Heart size={20} fill={liked ? "#FF3CAC" : "none"} color={liked ? "#FF3CAC" : "white"} />
            </button>
            <button 
              onClick={onShare}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white active:scale-95 transition-transform"
            >
              <Share size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Info Panel (scrollable 45%) */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-6">
        
        {/* AI Insights Card */}
        <div className="bg-card border border-card-border rounded-2xl p-4 shadow-lg">
          <h3 className="text-accent text-[11px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Análise IA
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-xs text-muted-foreground">Cena detectada</span>
              <span className="text-sm font-medium">Paisagem urbana</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-xs text-muted-foreground">Qualidade</span>
              <span className="text-sm font-medium text-green-400">Excelente &middot; 94pts</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-xs text-muted-foreground">Otimização</span>
              <span className="text-sm font-medium text-green-400">Aplicada</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-xs text-muted-foreground">Compressão</span>
              <span className="text-sm font-medium">Smart &middot; 78% menor</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Melhor filtro sugerido</span>
              <span className="text-sm font-medium text-primary">Vivid Night</span>
            </div>
          </div>
        </div>

        {/* Edit Toolbar */}
        <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2">
          {TOOLS.map(tool => (
            <button
              key={tool.id}
              onClick={() => toast({ title: `Ferramenta: ${tool.label}` })}
              className="flex flex-col items-center gap-1.5 min-w-[64px] active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center border border-card-border">
                <tool.icon size={18} className="text-white/80" />
              </div>
              <span className="text-[10px] font-medium">{tool.label}</span>
            </button>
          ))}
        </div>

        {/* Share Button */}
        <button 
          onClick={onShare}
          className="w-full bg-primary text-primary-foreground font-serif font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-[0_0_15px_rgba(38,67,255,0.3)]"
        >
          Compartilhar <ArrowRight size={20} />
        </button>

        {/* Action Row */}
        <div className="flex gap-3">
          <button 
            onClick={() => toast({ title: "Salvo no dispositivo" })}
            className="flex-1 py-3 bg-card border border-card-border rounded-xl text-sm font-semibold active:scale-[0.98] transition-transform"
          >
            Salvar
          </button>
          <button 
            onClick={() => {
              toast({ title: "Movido para a lixeira", variant: "destructive" });
              onBack();
            }}
            className="flex-1 py-3 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl text-sm font-semibold active:scale-[0.98] transition-transform"
          >
            Excluir
          </button>
        </div>
        
        <div className="h-20" /> {/* Bottom padding */}
      </div>
    </div>
  );
}

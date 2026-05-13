import { useState, useEffect } from "react";
import { Settings, Zap, Repeat, Heart, LayoutGrid } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingOverlay } from "../shared/LoadingOverlay";

interface CameraScreenProps {
  onCapture: (gradient: string) => void;
  onGalleryClick: () => void;
}

const AI_SCENES = [
  "Paisagem · Noite",
  "Retrato · Indoor",
  "Comida · Mesa",
  "Urbano · Dia",
  "Natureza · Verde",
  "Pôr do Sol · HDR"
];

const MODES = ["Vídeo", "Foto", "IA Auto", "Retrato", "Noite", "Pro"];
const ZOOM_LEVELS = ["0.6×", "1×", "2×", "5×", "10×"];

export function CameraScreen({ onCapture, onGalleryClick }: CameraScreenProps) {
  const { toast } = useToast();
  const [flash, setFlash] = useState<"AUTO" | "LIGADO">("AUTO");
  const [activeMode, setActiveMode] = useState("IA Auto");
  const [activeZoom, setActiveZoom] = useState("1×");
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [focusPos, setFocusPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const interval = setInterval(() => {
      setSceneIndex((prev) => (prev + 1) % AI_SCENES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCapture = () => {
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 200);
    setIsCapturing(true);

    setTimeout(() => {
      setIsCapturing(false);
      toast({
        title: "📸 Foto capturada! IA analisando...",
        duration: 2500,
      });
      // Generate a random gradient for the captured photo
      const r1 = Math.floor(Math.random() * 255);
      const g1 = Math.floor(Math.random() * 255);
      const b1 = Math.floor(Math.random() * 255);
      const grad = `linear-gradient(135deg, rgb(${r1},${g1},${b1}), #2c3e50)`;
      onCapture(grad);
    }, 900);
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-background text-foreground z-10">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 py-4 z-20 absolute top-0 w-full bg-gradient-to-b from-black/50 to-transparent">
        <div className="font-serif font-bold text-lg">
          JO<span className="text-[#5B78FF]">VI</span> <span className="text-xs font-sans font-normal opacity-70">Lens</span>
        </div>
        <button
          onClick={() => {
            const next = flash === "AUTO" ? "LIGADO" : "AUTO";
            setFlash(next);
            toast({ title: `Flash ${next.toLowerCase()}` });
          }}
          className="text-[#FFD166] text-sm font-semibold flex items-center gap-1 active:scale-95 transition-transform"
        >
          <Zap size={16} fill="currentColor" /> {flash}
        </button>
        <button
          onClick={() => toast({ title: "Configurações" })}
          className="active:scale-95 transition-transform"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Viewfinder */}
      <div 
        className="relative flex-1 bg-[radial-gradient(ellipse_at_top,#1a1b3a,#08091a)] overflow-hidden"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setFocusPos({ x, y });
        }}
      >
        {/* Flash overlay */}
        <div 
          className="absolute inset-0 bg-white z-50 pointer-events-none transition-opacity duration-150"
          style={{ opacity: showFlash ? 0.9 : 0 }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20">
          <div className="border-r border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-r border-b border-white" />
          <div className="border-b border-white" />
          <div className="border-r border-white" />
          <div className="border-r border-white" />
          <div />
        </div>

        {/* Corner brackets */}
        <div className="absolute top-8 left-4 w-6 h-6 border-t-2 border-l-2 border-accent opacity-50 pointer-events-none" />
        <div className="absolute top-8 right-4 w-6 h-6 border-t-2 border-r-2 border-accent opacity-50 pointer-events-none" />
        <div className="absolute bottom-8 left-4 w-6 h-6 border-b-2 border-l-2 border-accent opacity-50 pointer-events-none" />
        <div className="absolute bottom-8 right-4 w-6 h-6 border-b-2 border-r-2 border-accent opacity-50 pointer-events-none" />

        {/* Focus Ring */}
        <motion.div
          animate={{ x: "-50%", y: "-50%" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ left: `${focusPos.x}%`, top: `${focusPos.y}%` }}
          className="absolute w-16 h-16 border border-[#FFD166] rounded-sm pointer-events-none"
        >
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
            className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-4 border-r border-[#FFD166]"
          />
        </motion.div>

        {/* AI HUD */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2 border border-white/10 pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-semibold text-accent">IA</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={sceneIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-xs font-medium text-white/90"
            >
              {AI_SCENES[sceneIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Top right stats */}
        <div className="absolute top-16 right-4 flex flex-col gap-1 items-end pointer-events-none">
          <span className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded text-white/80">ISO 800</span>
          <span className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded text-white/80">f/1.8</span>
          <span className="text-[10px] bg-accent/20 px-1.5 py-0.5 rounded text-accent border border-accent/30">200MP</span>
        </div>

        {/* Zoom bar */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/40 backdrop-blur-md rounded-full p-1">
          {ZOOM_LEVELS.map((z) => (
            <button
              key={z}
              onClick={() => {
                setActiveZoom(z);
                toast({ title: `Zoom ${z}` });
              }}
              className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                activeZoom === z ? "bg-white/20 text-[#FFD166]" : "text-white/70"
              }`}
            >
              {z}
            </button>
          ))}
        </div>

        {/* Performance bar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[80%] flex items-center gap-2 pointer-events-none">
          <span className="text-[10px] font-semibold text-white/70">IA Otim.</span>
          <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              animate={{ width: ["85%", "96%", "90%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="h-full bg-accent"
            />
          </div>
          <span className="text-[10px] font-semibold text-accent">92%</span>
        </div>
      </div>

      {/* Mode bar */}
      <div className="h-12 flex items-center overflow-x-auto no-scrollbar px-4 gap-2 bg-background shrink-0">
        {MODES.map((m) => (
          <button
            key={m}
            onClick={() => {
              setActiveMode(m);
              toast({ title: `Modo ${m}` });
            }}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
              activeMode === m ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="h-32 flex items-center justify-between px-8 bg-background pb-4 shrink-0">
        <button 
          onClick={() => toast({ title: "🔄 Câmera virada" })}
          className="w-12 h-12 rounded-full bg-card flex items-center justify-center border border-card-border active:scale-95 transition-transform"
        >
          <Repeat size={20} className="text-white/80" />
        </button>

        <button 
          onClick={handleCapture}
          data-testid="button-shutter"
          className="w-[72px] h-[72px] rounded-full border-4 border-white/20 flex items-center justify-center active:scale-90 transition-transform"
        >
          <div className="w-14 h-14 bg-white rounded-full" />
        </button>

        <button 
          onClick={onGalleryClick}
          className="w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-primary to-[#FF3CAC] p-0.5 active:scale-95 transition-transform overflow-hidden"
        >
          <div className="w-full h-full bg-black/40 rounded-[12px] flex items-center justify-center">
            <LayoutGrid size={20} className="text-white/90" />
          </div>
        </button>
      </div>

      {isCapturing && <LoadingOverlay text="⚡ Capturando com IA..." />}
    </div>
  );
}

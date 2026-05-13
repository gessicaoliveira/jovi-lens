import { motion } from "framer-motion";
import { Camera } from "lucide-react";

interface SplashScreenProps {
  onStart: () => void;
}

export function SplashScreen({ onStart }: SplashScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-background text-foreground z-50 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,120,255,0.15),transparent_60%)] pointer-events-none" />
      
      <div className="relative w-48 h-48 mb-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(0,212,255,0.3),rgba(38,67,255,0.8),transparent_60%)] p-[3px]"
        >
          <div className="w-full h-full bg-background rounded-full" />
        </motion.div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Camera className="w-16 h-16 text-white mb-2" strokeWidth={1} />
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-2 h-2 rounded-full bg-accent" />
          </div>
        </div>
      </div>

      <div className="text-center z-10">
        <h1 className="font-serif text-[52px] font-extrabold tracking-tight mb-2">
          JO<span className="text-[#5B78FF]">VI</span>
        </h1>
        <p className="uppercase tracking-[0.2em] text-muted-foreground text-sm font-semibold mb-6">
          Lens &middot; Smart Camera
        </p>
        <p className="text-muted-foreground text-sm max-w-[280px] mx-auto leading-relaxed mb-12">
          A câmera inteligente que entende <span className="text-white font-medium">você</span> &mdash; captura, organiza e compartilha.
        </p>

        <button
          onClick={onStart}
          data-testid="button-open-camera"
          className="bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-full active:scale-95 transition-transform w-[200px] shadow-[0_0_20px_rgba(38,67,255,0.4)]"
        >
          Abrir Câmera
        </button>
      </div>
    </motion.div>
  );
}

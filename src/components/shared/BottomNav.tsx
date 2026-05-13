import { useState } from "react";
import { Camera, LayoutGrid, Sparkles } from "lucide-react";

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const [showStudioTooltip, setShowStudioTooltip] = useState(false);

  const items = [
    { id: "gallery", label: "Galeria", icon: LayoutGrid },
    { id: "camera", label: "Câmera", icon: Camera },
    { id: "studio", label: "IA Studio", icon: Sparkles },
  ];

  const handleItemClick = (id: string) => {
    if (id === "studio") {
      setShowStudioTooltip(true);
      setTimeout(() => setShowStudioTooltip(false), 2500);
      return;
    }
    onNavigate(id);
  };

  return (
    <div className="absolute bottom-0 w-full h-16 bg-background/90 backdrop-blur-lg border-t border-white/5 flex items-center justify-around px-6 z-50">
      {items.map((item) => {
        const isActive = activeScreen === item.id || (activeScreen === "detail" && item.id === "gallery");
        const isStudio = item.id === "studio";
        return (
          <div key={item.id} className="relative flex flex-col items-center">
            {isStudio && showStudioTooltip && (
              <div className="absolute bottom-full mb-3 right-0 px-3 py-2 rounded-xl bg-[#1A1B3A] border border-[#5B78FF]/40 text-xs font-medium text-white whitespace-nowrap shadow-lg z-50">
                <span className="text-[#5B78FF]">✦</span> JOVI IA Studio{" "}
                <span className="text-[#00D4FF]">em breve</span>
                <div className="absolute bottom-[-5px] right-5 w-2.5 h-2.5 bg-[#1A1B3A] border-r border-b border-[#5B78FF]/40 rotate-45" />
              </div>
            )}
            <button
              data-testid={`nav-${item.id}`}
              onClick={() => handleItemClick(item.id)}
              className="flex flex-col items-center gap-1 w-16 active:scale-95 transition-transform relative"
            >
              <item.icon
                size={20}
                className={isActive ? "text-[#5B78FF]" : "text-muted-foreground"}
              />
              <span className={`text-[10px] font-medium ${isActive ? "text-[#5B78FF]" : "text-muted-foreground"}`}>
                {item.label}
              </span>
              {isStudio && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FF3CAC]" />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}

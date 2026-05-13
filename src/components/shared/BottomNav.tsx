import { Camera, LayoutGrid, Sparkles } from "lucide-react";

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const items = [
    { id: "gallery", label: "Galeria", icon: LayoutGrid },
    { id: "camera", label: "Câmera", icon: Camera },
    { id: "studio", label: "IA Studio", icon: Sparkles },
  ];

  return (
    <div className="absolute bottom-0 w-full h-16 bg-background/90 backdrop-blur-lg border-t border-white/5 flex items-center justify-around px-6 z-50 pb-safe">
      {items.map((item) => {
        const isActive = activeScreen === item.id || (activeScreen === "detail" && item.id === "gallery");
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="flex flex-col items-center gap-1 w-16 active:scale-95 transition-transform"
          >
            <item.icon 
              size={20} 
              className={isActive ? "text-[#5B78FF]" : "text-muted-foreground"} 
            />
            <span className={`text-[10px] font-medium ${isActive ? "text-[#5B78FF]" : "text-muted-foreground"}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

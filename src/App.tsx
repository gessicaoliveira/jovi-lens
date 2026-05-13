import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";

import { SplashScreen } from "./components/screens/SplashScreen";
import { CameraScreen } from "./components/screens/CameraScreen";
import { GalleryScreen } from "./components/screens/GalleryScreen";
import { DetailScreen } from "./components/screens/DetailScreen";
import { ShareScreen } from "./components/screens/ShareScreen";
import { BottomNav } from "./components/shared/BottomNav";

const queryClient = new QueryClient();

type ScreenType = "splash" | "camera" | "gallery" | "detail" | "share";

// Framer motion variants for sliding screens
const screenVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("splash");
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");
  const [newPhotoGradient, setNewPhotoGradient] = useState<string | null>(null);

  const showBottomNav = ["camera", "gallery", "detail"].includes(currentScreen);

  return (
    <div className="w-full h-[100dvh] bg-black relative overflow-hidden font-sans text-foreground flex justify-center">
      {/* Mobile constraint wrapper */}
      <div className="w-full max-w-[430px] h-full relative bg-background overflow-hidden shadow-2xl">
        
        <AnimatePresence mode="wait">
          {currentScreen === "splash" && (
            <SplashScreen 
              key="splash"
              onStart={() => setCurrentScreen("camera")} 
            />
          )}

          {currentScreen === "camera" && (
            <motion.div
              key="camera"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <CameraScreen 
                onCapture={(grad) => setNewPhotoGradient(grad)}
                onGalleryClick={() => setCurrentScreen("gallery")}
              />
            </motion.div>
          )}

          {currentScreen === "gallery" && (
            <motion.div
              key="gallery"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <GalleryScreen 
                newPhotoGradient={newPhotoGradient}
                onPhotoClick={(grad) => {
                  setSelectedPhoto(grad);
                  setCurrentScreen("detail");
                }}
              />
            </motion.div>
          )}

          {currentScreen === "detail" && (
            <motion.div
              key="detail"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <DetailScreen 
                gradient={selectedPhoto}
                onBack={() => setCurrentScreen("gallery")}
                onShare={() => setCurrentScreen("share")}
              />
            </motion.div>
          )}

          {currentScreen === "share" && (
            <motion.div
              key="share"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <ShareScreen 
                gradient={selectedPhoto}
                onBack={() => setCurrentScreen("detail")}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {showBottomNav && (
          <BottomNav 
            activeScreen={currentScreen} 
            onNavigate={(screen) => setCurrentScreen(screen as ScreenType)}
          />
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

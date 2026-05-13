import { motion } from "framer-motion";

interface SplashScreenProps {
  onStart: () => void;
}

export function SplashScreen({ onStart }: SplashScreenProps) {
  const OUTER = 160;
  const RING = 18;
  const INNER = OUTER - RING * 2;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#08091A] text-white z-50 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full blur-[80px]"
          style={{ top: "12%", width: 260, height: 260, background: "rgba(38,67,255,0.2)" }}
        />
      </div>

      {/* Lens component */}
      <div className="relative mb-10" style={{ width: OUTER, height: OUTER }}>

        {/* Thick gradient ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(
              from 230deg,
              #4F8EF7 0%,
              #22D3EE 20%,
              #818CF8 42%,
              #EC4899 62%,
              #BE3AED 78%,
              #4F8EF7 100%
            )`,
          }}
        />

        {/* Inner dark circle */}
        <div
          className="absolute rounded-full bg-[#08091A]"
          style={{
            top: RING,
            left: RING,
            width: INNER,
            height: INNER,
          }}
        >
          {/* Compact camera lens icon — small and centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Outer ring — 42px */}
            <div
              className="absolute rounded-full border"
              style={{
                width: 42,
                height: 42,
                borderWidth: 2.5,
                borderColor: "rgba(91,120,255,0.50)",
              }}
            />
            {/* Inner ring — 26px */}
            <div
              className="absolute rounded-full border"
              style={{
                width: 26,
                height: 26,
                borderWidth: 2.5,
                borderColor: "rgba(0,212,255,0.50)",
              }}
            />
            {/* Center dot — static glow, no pulse */}
            <div
              className="absolute rounded-full"
              style={{
                width: 10,
                height: 10,
                background: "radial-gradient(circle, #00D4FF 0%, #2643FF 100%)",
                boxShadow: "0 0 10px 3px rgba(0,212,255,0.8)",
              }}
            />
          </div>
        </div>

        {/* Orbiting light dot — orbits at inner ring radius (13px from center) */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
          style={{ transformOrigin: "center center" }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: 4,
              height: 4,
              top: OUTER / 2 - 13 - 2,
              left: "50%",
              marginLeft: -2,
              background: "white",
              boxShadow: "0 0 6px 3px rgba(255,255,255,0.95), 0 0 14px 6px rgba(100,180,255,0.6)",
            }}
          />
        </motion.div>
      </div>

      {/* Brand */}
      <div className="text-center z-10 px-6">
        <h1
          className="font-serif font-extrabold tracking-tight mb-3"
          style={{ fontSize: 56, lineHeight: 1, letterSpacing: -2 }}
        >
          JO<span style={{ color: "#5B78FF" }}>VI</span>
        </h1>
        <p
          className="font-sans font-semibold text-white/50 mb-5"
          style={{ fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase" }}
        >
          Lens &middot; Smart Camera
        </p>
        <p className="font-sans text-white/55 text-sm leading-relaxed mb-12 max-w-[260px] mx-auto">
          A câmera inteligente que entende{" "}
          <strong className="text-white font-semibold">você</strong>{" "}
          &mdash; captura, organiza e compartilha.
        </p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          data-testid="button-open-camera"
          className="font-serif font-bold text-white rounded-full text-base"
          style={{
            background: "#2643FF",
            boxShadow: "0 8px 32px rgba(38,67,255,0.5)",
            letterSpacing: "0.02em",
            minWidth: 200,
            padding: "14px 48px",
          }}
        >
          Abrir Câmera
        </motion.button>
      </div>
    </motion.div>
  );
}

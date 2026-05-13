import { motion } from "framer-motion";

interface LoadingOverlayProps {
  text: string;
}

export function LoadingOverlay({ text }: LoadingOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md z-[100]"
    >
      <div className="relative w-16 h-16 mb-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-4 border-accent/20 border-t-accent"
        />
      </div>
      <p className="text-sm font-semibold text-white tracking-wide">{text}</p>
    </motion.div>
  );
}

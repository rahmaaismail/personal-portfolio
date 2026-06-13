"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EasterEggProps {
  onTrigger?: () => void;
}

export default function EasterEgg({ onTrigger }: EasterEggProps) {
  const [sequence, setSequence] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const targetSequence = "build";

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      const newSequence = (sequence + e.key.toLowerCase()).slice(-targetSequence.length);
      setSequence(newSequence);

      if (newSequence === targetSequence) {
        setShowMessage(true);
        onTrigger?.();
        setTimeout(() => {
          setShowMessage(false);
          setSequence("");
        }, 3000);
      }
    },
    [sequence, onTrigger]
  );

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [handleKeyPress]);

  return (
    <AnimatePresence>
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="glass-card px-6 py-4 rounded-xl neural-glow">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                }}
                className="w-3 h-3 rounded-full bg-primary"
              />
              <div>
                <p className="text-primary font-mono text-sm font-bold">Systems Online.</p>
                <p className="text-xs text-muted-foreground">Neural pathways activated</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onComplete: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  driftY: number;
  duration: number;
  delay: number;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<"init" | "loading" | "neural" | "complete">("init");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, (_, id) => ({
        id,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        driftY: Math.random() * -200 - 100,
        duration: 2 + Math.random() * 2,
        delay: Math.random() * 2,
      }))
    );

    // Start animation sequence
    const timer1 = setTimeout(() => setPhase("loading"), 500);
    const timer2 = setTimeout(() => setPhase("neural"), 2000);
    const timer3 = setTimeout(() => setPhase("complete"), 3500);
    const timer4 = setTimeout(() => onComplete(), 4000);

    // Progress animation
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "complete" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background neural grid */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="neural-grid"
                  width="50"
                  height="50"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="25" cy="25" r="1" fill="currentColor" className="text-primary" />
                  <line
                    x1="0"
                    y1="25"
                    x2="50"
                    y2="25"
                    stroke="currentColor"
                    strokeWidth="0.3"
                    className="text-primary/30"
                  />
                  <line
                    x1="25"
                    y1="0"
                    x2="25"
                    y2="50"
                    stroke="currentColor"
                    strokeWidth="0.3"
                    className="text-primary/30"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#neural-grid)" />
            </svg>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1 h-1 rounded-full bg-primary"
                initial={{
                  x: particle.x,
                  y: particle.y,
                  opacity: 0,
                }}
                animate={{
                  y: [particle.y, particle.driftY],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10 text-center"
          >
            {/* Brain icon */}
            <motion.div
              animate={{
                scale: phase === "neural" ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: phase === "neural" ? Infinity : 0,
              }}
              className="mb-8"
            >
              <div className="relative w-24 h-24 mx-auto">
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/20"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <div className="absolute inset-0 rounded-full border border-primary/50 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div className="space-y-4">
              <motion.h1
                className="text-2xl md:text-3xl font-light text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {phase === "init" && "Connecting..."}
                {phase === "loading" && "Initializing Rahma's Mind..."}
                {phase === "neural" && "Mapping Neural Pathways..."}
              </motion.h1>

              {/* Progress bar */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "200px" }}
                transition={{ delay: 0.7 }}
                className="mx-auto"
              >
                <div className="h-0.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    style={{ width: `${Math.min(loadingProgress, 100)}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </motion.div>

              {/* Status text */}
              <motion.p
                className="text-xs text-muted-foreground font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {Math.min(Math.round(loadingProgress), 100)}% complete
              </motion.p>
            </motion.div>

            {/* Neural connection lines */}
            {phase === "neural" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 pointer-events-none"
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2 w-px bg-gradient-to-b from-primary to-transparent"
                    style={{
                      height: "100px",
                      transformOrigin: "top",
                      rotate: `${i * 60}deg`,
                    }}
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1,
                      delay: i * 0.1,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
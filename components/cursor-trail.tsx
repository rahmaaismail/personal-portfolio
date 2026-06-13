"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Trail {
  id: number;
  x: number;
  y: number;
}

export default function CursorTrail() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure client-side only rendering to avoid hydration mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    if (!isMounted) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsEnabled(!mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsEnabled(!e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [isMounted]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isEnabled) return;

      const newTrail: Trail = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setTrails((prev) => [...prev.slice(-8), newTrail]);
    },
    [isEnabled]
  );

  useEffect(() => {
    if (!isEnabled) return;

    let lastTime = 0;
    const throttledHandler = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime >= 50) {
        lastTime = now;
        handleMouseMove(e);
      }
    };

    window.addEventListener("mousemove", throttledHandler);
    return () => window.removeEventListener("mousemove", throttledHandler);
  }, [handleMouseMove, isEnabled]);

  // Clean up old trails
  useEffect(() => {
    if (trails.length === 0) return;

    const timer = setTimeout(() => {
      setTrails((prev) => prev.slice(1));
    }, 100);

    return () => clearTimeout(timer);
  }, [trails]);

  if (!isMounted || !isEnabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <AnimatePresence>
        {trails.map((trail, index) => (
          <motion.div
            key={trail.id}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute rounded-full bg-primary/40"
            style={{
              left: trail.x - 4,
              top: trail.y - 4,
              width: 8 - index * 0.5,
              height: 8 - index * 0.5,
              filter: "blur(1px)",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
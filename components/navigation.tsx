"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Volume2, VolumeX, Command } from "lucide-react";
import { type BrainRegion, brainRegions } from "@/lib/portfolio-data";

interface NavigationProps {
  onRegionSelect: (region: BrainRegion) => void;
  activeRegion: BrainRegion | null;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function Navigation({
  onRegionSelect,
  activeRegion,
  soundEnabled,
  onToggleSound,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Keyboard shortcut for command menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsCommandOpen(false);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const regions = Object.entries(brainRegions) as [
    BrainRegion,
    (typeof brainRegions)[BrainRegion]
  ][];

  return (
    <>
      {/* Top Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 p-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-end">

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {/* Neural Map Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCommandOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg glass hover:bg-muted/50 transition-colors text-sm"
            >
              <Command className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Neural Map</span>
              <kbd className="ml-2 px-1.5 py-0.5 text-[10px] rounded bg-muted text-muted-foreground font-mono">
                ⌘K
              </kbd>
            </motion.button>

            {/* Sound Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleSound}
              className="p-2 rounded-lg glass hover:bg-muted/50 transition-colors"
              aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-primary" />
              ) : (
                <VolumeX className="w-5 h-5 text-muted-foreground" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleSound}
              className="p-2 rounded-lg glass"
              aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-primary" />
              ) : (
                <VolumeX className="w-5 h-5 text-muted-foreground" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg glass"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 glass-card p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-semibold text-foreground">Neural Map</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-2">
                {regions.map(([region, data]) => (
                  <motion.button
                    key={region}
                    whileHover={{ x: 4 }}
                    onClick={() => {
                      onRegionSelect(region);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                      activeRegion === region
                        ? "bg-primary/20 border border-primary/50 text-primary"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activeRegion === region ? "bg-primary" : "bg-muted-foreground"
                      }`}
                    />
                    <div className="text-left">
                      <p className="text-sm font-medium">{data.label}</p>
                      <p className="text-xs opacity-70">{data.description}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Menu (Desktop) */}
      <AnimatePresence>
        {isCommandOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsCommandOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg mx-4 glass-card rounded-2xl overflow-hidden"
            >
              {/* Search input */}
              <div className="p-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <Command className="w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Navigate to section..."
                    className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                    autoFocus
                  />
                  <kbd className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground font-mono">
                    ESC
                  </kbd>
                </div>
              </div>

              {/* Sections list */}
              <div className="p-2 max-h-80 overflow-y-auto">
                <p className="px-3 py-2 text-xs text-muted-foreground font-mono">
                  BRAIN REGIONS
                </p>
                {regions.map(([region, data]) => (
                  <motion.button
                    key={region}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                    onClick={() => {
                      onRegionSelect(region);
                      setIsCommandOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      activeRegion === region ? "bg-primary/10" : ""
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activeRegion === region ? "bg-primary neural-pulse" : "bg-muted-foreground"
                      }`}
                    />
                    <div className="flex-1 text-left">
                      <p
                        className={`text-sm ${
                          activeRegion === region ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {data.description}
                      </p>
                      <p className="text-xs text-muted-foreground">{data.label}</p>
                    </div>
                    {activeRegion === region && (
                      <span className="text-xs text-primary">Active</span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
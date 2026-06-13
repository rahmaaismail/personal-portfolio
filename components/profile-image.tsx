"use client";

import { motion } from "framer-motion";
import { Pause, Play, Volume2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const MUSIC_CONFIG = {
  songName: "Jazz Vibes",
  artist: "Atlas Audio",
};

interface ProfileImageProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function ProfileImage({ soundEnabled, onToggleSound }: ProfileImageProps) {
  const [imageError, setImageError] = useState(false);
  const [coverError] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed top-6 left-6 z-30 flex flex-col items-start gap-4"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative group"
      >
        {/* Outer glow ring */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-75 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-300 animate-pulse" />
        
        {/* Inner border */}
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-accent opacity-50 group-hover:opacity-80 transition-opacity" />
        
        {/* Image container */}
        <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-background bg-background md:h-28 md:w-28">
          {!imageError ? (
            <Image
              src="/profile/profile.jpg"
              alt="Rahma Ismail"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              onError={() => setImageError(true)}
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
              <span className="text-2xl font-bold text-primary">RI</span>
            </div>
          )}
        </div>

        {/* Status indicator */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full border-2 border-background bg-primary"
        />
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.03, x: 2 }}
        whileTap={{ scale: 0.97 }}
        onClick={onToggleSound}
        className="group flex items-center gap-3 rounded-2xl border border-primary/30 bg-background/80 p-2 pr-3 shadow-lg shadow-primary/10 backdrop-blur-md transition-colors hover:border-primary/60 hover:bg-primary/10"
        aria-label={soundEnabled ? `Pause ${MUSIC_CONFIG.songName}` : `Play ${MUSIC_CONFIG.songName}`}
      >
        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-primary/25 bg-primary/10">
          {!coverError ? (
            <Image
              src={coverSrc}
              alt={`${MUSIC_CONFIG.songName} cover`}
              fill
              className="object-cover"
              onError={() => {
                if (coverSrc.endsWith(".jpg")) {
                  setCoverSrc(MUSIC_CONFIG.coverFallback);
                  return;
                }
                setCoverError(true);
              }}
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/30 via-accent/20 to-background">
              <Volume2 className="h-5 w-5 text-primary" />
            </span>
          )}
        </span>
        <span className="min-w-0 text-left">
          <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase text-primary">
            <Volume2 className="h-3 w-3" />
            Now Playing
          </span>
          <span className="block max-w-36 truncate text-xs font-semibold text-foreground">
            {MUSIC_CONFIG.songName} — {MUSIC_CONFIG.artist}
          </span>
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
          {soundEnabled ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
        </span>
      </motion.button>
    </motion.div>
  );
}
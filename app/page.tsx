"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import { type BrainRegion } from "@/lib/portfolio-data";
import IntroAnimation from "@/components/intro-animation";
import HeroSection from "@/components/hero-section";
import Navigation from "@/components/navigation";
import SectionPanel from "@/components/sections/section-panel";
import CursorTrail from "@/components/cursor-trail";
import EasterEgg from "@/components/easter-egg";
import SoundPrompt from "@/components/sound-prompt";
import ProfileImage from "@/components/profile-image";

const Brain3D = dynamic(() => import("@/components/brain/brain-3d"), {
  ssr: false,
  loading: () => <BrainLoading />,
});

function BrainLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        <p className="text-sm text-muted-foreground font-mono">Loading neural network...</p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeRegion, setActiveRegion] = useState<BrainRegion | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showSoundPrompt, setShowSoundPrompt] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!showIntro) {
      const timer = setTimeout(() => setShowSoundPrompt(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/audio/background.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = useCallback(() => {
    if (audioRef.current) {
      if (soundEnabled) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setSoundEnabled(!soundEnabled);
      setShowSoundPrompt(false);
    }
  }, [soundEnabled]);

  const handleEnableSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      setSoundEnabled(true);
    }
    setShowSoundPrompt(false);
  }, []);

  const handleRegionClick = useCallback((region: BrainRegion) => {
    setActiveRegion((prev) => (prev === region ? null : region));
  }, []);

  const handleExplore = useCallback(() => {
    setActiveRegion("frontal");
  }, []);

  const handleEasterEgg = useCallback(() => {}, []);

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Intro Animation */}
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}

      {/* Background effects */}
      <div className="fixed inset-0 animated-gradient opacity-50" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      {/* Cursor trail */}
      {!isReducedMotion && <CursorTrail />}

      {/* Easter egg handler */}
      <EasterEgg onTrigger={handleEasterEgg} />

      {/* Profile image — hidden on mobile to avoid overlap */}
      {!showIntro && (
        <div className="hidden md:block">
          <ProfileImage soundEnabled={soundEnabled} onToggleSound={toggleSound} />
        </div>
      )}

      {/* Navigation */}
      <Navigation
        onRegionSelect={handleRegionClick}
        activeRegion={activeRegion}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Brain visualization */}
        <div
          className={`relative transition-all duration-500 ${
            activeRegion
              ? "h-[40vh] lg:h-auto lg:w-1/2 flex-shrink-0"
              : "flex-1 w-full"
          }`}
          style={{ minHeight: activeRegion ? "40vh" : "60vh" }}
        >
          <Suspense fallback={<BrainLoading />}>
            <Brain3D
              activeRegion={activeRegion}
              onRegionClick={handleRegionClick}
              isReducedMotion={isReducedMotion}
            />
          </Suspense>
        </div>

        {/* Section panel */}
        {activeRegion && (
          <div className="relative flex-1 p-4 lg:p-8 flex items-start lg:items-center justify-center overflow-y-auto pb-20">
            <SectionPanel activeRegion={activeRegion} onClose={() => setActiveRegion(null)} />
          </div>
        )}
      </div>

      {/* Hero section */}
      {!activeRegion && <HeroSection onExplore={handleExplore} />}

      {/* Sound prompt */}
      <SoundPrompt
        isVisible={showSoundPrompt}
        onEnable={handleEnableSound}
        onDismiss={() => setShowSoundPrompt(false)}
      />
    </main>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { type BrainRegion, brainRegions } from "@/lib/portfolio-data";
import ExperienceSection from "./experience-section";
import ProjectsSection from "./projects-section";
import SkillsSection from "./skills-section";
import AwardsSection from "./awards-section";
import OrganizationsSection from "./organizations-section";
import ContactSection from "./contact-section";
import ConferencesSection from "./conferences-section";
import CertificationsSection from "./certifications-section";
import EducationSection from "./education-section";

interface SectionPanelProps {
  activeRegion: BrainRegion | null;
  onClose: () => void;
}

export default function SectionPanel({ activeRegion, onClose }: SectionPanelProps) {
  const getSectionContent = () => {
    switch (activeRegion) {
      case "frontal":
        return <ExperienceSection />;
      case "temporal":
        return <ProjectsSection />;
      case "parietal":
        return <SkillsSection />;
      case "occipital":
        return (
          <>
            <AwardsSection />
            <div className="mt-8 border-t border-border/40 pt-8">
              <ConferencesSection />
            </div>
            <div className="mt-8 border-t border-border/40 pt-8">
              <CertificationsSection />
            </div>
          </>
        );
      case "cerebellum":
        return <OrganizationsSection />;
      case "brainstem":
        return <ContactSection />;
        case "education":
          return <EducationSection />;
      default:
        return null;
    }
  };

  const regionData = activeRegion ? brainRegions[activeRegion] : null;

  return (
    <AnimatePresence mode="wait">
      {activeRegion && regionData && (
        <motion.div
          key={activeRegion}
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="glass-card rounded-2xl overflow-hidden w-full max-w-2xl max-h-[80vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-border/50">
            <div>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xs font-mono text-primary uppercase tracking-wider"
              >
                {regionData.label}
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-xl md:text-2xl font-semibold text-foreground"
              >
                {regionData.description}
              </motion.h2>
            </div>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Close panel"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar"
          >
            {getSectionContent()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
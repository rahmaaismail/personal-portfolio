"use client";

import { motion } from "framer-motion";
import { Code, Wrench, Cpu } from "lucide-react";
import { skills } from "@/lib/portfolio-data";

export default function SkillsSection() {
  return (
    <div className="space-y-8">
      {/* Languages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Code className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">Languages</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {skills.languages.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-3 rounded-lg bg-card/50 border border-border/50 group-hover:border-primary/50 transition-all text-center">
                <span className="font-medium text-sm text-foreground">{skill}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Spoken Languages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>
          <h3 className="font-semibold text-foreground">Spoken Languages</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.languages_spoken.map((item) => (
            <span key={item.lang} className="px-3 py-1.5 text-sm rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400">
              {item.lang} <span className="opacity-60 text-xs">· {item.level}</span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* Frameworks & Tools */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-accent/10">
            <Wrench className="w-4 h-4 text-accent" />
          </div>
          <h3 className="font-semibold text-foreground">Frameworks & Tools</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.frameworks.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + index * 0.03 }}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1.5 text-sm rounded-full bg-secondary border border-border/50 text-secondary-foreground hover:border-accent/50 hover:text-accent transition-all cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Hardware & Embedded */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Cpu className="w-4 h-4 text-green-500" />
          </div>
          <h3 className="font-semibold text-foreground">Embedded & Hardware</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.hardware.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.03 }}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1.5 text-sm rounded-full bg-secondary border border-border/50 text-secondary-foreground hover:border-green-500/50 hover:text-green-500 transition-all cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Neural visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative pt-6"
      >
        <div className="text-center">
          <p className="text-xs text-muted-foreground font-mono">
            // Skills form neural connections with experiences
          </p>
          <div className="mt-4 flex justify-center">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
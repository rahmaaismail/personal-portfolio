"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Star } from "lucide-react";
import { awards } from "@/lib/portfolio-data";

const icons = [Trophy, Award, Star];

export default function AwardsSection() {
  return (
    <div className="space-y-4">
      {awards.map((award, index) => {
        const Icon = icons[index % icons.length];
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="group relative p-4 rounded-xl bg-gradient-to-r from-card/50 to-transparent border border-border/50 hover:border-primary/30 transition-all overflow-hidden"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="relative flex items-start gap-4">
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30"
              >
                <Icon className="w-5 h-5 text-primary" />
              </motion.div>

              <div className="flex-1">
                {(award as { url?: string }).url ? (
                  <a
                    href={(award as { url?: string }).url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground text-lg hover:text-primary hover:underline transition-colors"
                  >
                    {award.title}
                  </a>
                ) : (
                  <h3 className="font-semibold text-foreground text-lg">{award.title}</h3>
                )}
                <p className="text-sm text-muted-foreground">{award.event}</p>
                {award.highlight && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="mt-1 text-xs text-primary font-medium"
                  >
                    {award.highlight}
                  </motion.p>
                )}
                {(award as { description?: string }).description && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="mt-2 text-xs text-muted-foreground leading-relaxed"
                  >
                    {(award as { description?: string }).description}
                  </motion.p>
                )}
              </div>

              {/* Rank indicator */}
              <div className="text-right">
                <span className="text-2xl font-bold text-primary/50">
                  #{index + 1}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Stats summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-3 gap-4 pt-4"
      >
        {[
          { value: "3+", label: "Hackathons Won" },
          { value: "0.33%", label: "Top Percentile" },
          { value: "400+", label: "Competitors Beat" },
        ].map((stat, i) => (
          <div
            key={i}
            className="text-center p-3 rounded-lg bg-secondary/30 border border-border/30"
          >
            <p className="text-xl font-bold text-primary">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
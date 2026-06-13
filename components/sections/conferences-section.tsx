"use client";

import { motion } from "framer-motion";
import { conferences } from "@/lib/portfolio-data";
import { Mic, MapPin, Calendar } from "lucide-react";

export default function ConferencesSection() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-1">Conferences & Presentations</h3>
      <p className="text-muted-foreground mb-6 text-xs">Talks, panels, and industry events.</p>

      <div className="space-y-4">
        {conferences.map((conf, i) => (
          <motion.div
            key={conf.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="glass-card rounded-xl p-4 border border-border/40"
          >
            <div className="flex items-center gap-2 mb-2">
              {conf.presented ? (
                <span className="flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  <Mic className="w-3 h-3" />
                  Speaker
                </span>
              ) : (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/40">
                  Attendee
                </span>
              )}
            </div>
            <h4 className="text-sm font-semibold text-foreground">{conf.name}</h4>
            <div className="flex flex-wrap gap-3 mt-1 mb-2">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" /> {conf.location}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" /> {conf.date}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{conf.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
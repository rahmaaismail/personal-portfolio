"use client";

import { motion } from "framer-motion";
import { certifications } from "@/lib/portfolio-data";
import { BadgeCheck } from "lucide-react";

export default function CertificationsSection() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-1">Certifications</h3>
      <p className="text-muted-foreground mb-6 text-xs">Courses and credentials from industry and academia.</p>

      <div className="grid grid-cols-1 gap-3">
        {certifications.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="glass-card rounded-xl p-4 border border-border/40 flex items-start gap-3"
          >
            <BadgeCheck className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground leading-snug">{cert.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer} · {cert.year}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
"use client";

import { motion } from "framer-motion";
import { Users, Calendar, Globe, Bot, GraduationCap } from "lucide-react";
import { organizations } from "@/lib/portfolio-data";

const iconMap: Record<string, React.ReactNode> = {
  frc: <Users className="w-6 h-6 text-primary" />,
  riipen: <Bot className="w-6 h-6 text-primary" />,
  "ultimate-coders": <GraduationCap className="w-6 h-6 text-primary" />,
};

export default function OrganizationsSection() {
  return (
    <div className="space-y-6">
      {organizations.map((org, index) => (
        <motion.div
          key={org.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + index * 0.1 }}
          className="relative p-6 rounded-xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 overflow-hidden hover:border-primary/30 transition-all"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300a8ff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>

          <div className="relative">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/30 neural-glow">
                {iconMap[org.id]}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">{org.name}</h3>
                <p className="text-primary font-medium">{org.role}</p>
              </div>
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{org.period}</span>
              </div>
              {org.id === "frc" && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="w-4 h-4" />
                  <span>FRC World Championships</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {org.description}
            </p>

            {/* Highlights */}
            {org.highlights && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="mt-4 flex flex-wrap gap-2"
              >
                {org.highlights.map((highlight, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs rounded-full bg-secondary/50 border border-border/30 text-muted-foreground"
                  >
                    {highlight}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center p-4 rounded-lg bg-secondary/20 border border-border/30"
      >
        <p className="text-xs text-muted-foreground font-mono">
          Leadership, Teaching & Innovation
        </p>
        <p className="text-sm text-foreground mt-1">
          Building teams, mentoring students, and driving growth through AI
        </p>
      </motion.div>
    </div>
  );
}
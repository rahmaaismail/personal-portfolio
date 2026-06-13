"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

const educationData = [
  {
    id: "uvic",
    institution: "University of Victoria",
    degree: "Bachelor of Engineering — Software Engineering",
    period: "Sep 2022 – Present",
    location: "Victoria, BC",
    details: "Co-op program. Courses range from algorithms, operating systems, database systems, software development, HCI, communication networks, and electrical engineering.",
  },
  {
    id: "aise",
    institution: "American International School in Egypt",
    degree: "American High School Diploma · IB Diploma · Egyptian General Secondary Certificate",
    period: "Sep 2014 – Jun 2022",
    location: "Cairo, Egypt",
    details: "IB HL: Physics, Chemistry, Global Politics. SL: English, Spanish B, Math AA.",
    activities: "High School Student Council Vice President, IB Spanish AB Tutor, National Junior Honor Society (NJHS), Swim Team, World Scholar's Cup (Cairo Round 2018), School Newspaper, Middle School Student Council",
  },
  {
    id: "webber",
    institution: "Webber Academy",
    degree: "Junior School",
    period: "Jan 2012 – Jun 2014",
    location: "Calgary, AB",
    details: "Rigorous private school education focused on academic excellence, critical thinking, and leadership.",
  },
  {
    id: "bsb",
    institution: "British School of Beijing, Shunyi",
    degree: "British Curriculum",
    period: "Sep 2010 – Jan 2012",
    location: "Beijing, China",
    details: "British-style curriculum combining academic rigor with creativity and global citizenship.",
  },
  {
    id: "bisoh",
    institution: "British International School of Houston",
    degree: "British Curriculum",
    period: "Feb 2008 – Jun 2010",
    location: "Houston, TX",
    details: "British-style education with strong extracurricular programs and small class sizes.",
  },
];

export default function EducationSection() {
  return (
    <div className="space-y-4">
      {educationData.map((edu, index) => (
        <motion.div
          key={edu.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
          className="p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors"
        >
          <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
            <div>
              <h4 className="font-semibold text-foreground text-sm">{edu.institution}</h4>
              <p className="text-xs text-primary/80 mt-0.5">{edu.degree}</p>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{edu.period}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" />
                <span>{edu.location}</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{edu.details}</p>
          {edu.activities && (
            <p className="text-xs text-muted-foreground/70 mt-1 italic">{edu.activities}</p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
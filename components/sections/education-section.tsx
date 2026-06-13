"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";

const courses = [
  { code: "CSC 225", name: "Algorithms and Data Structures I" },
  { code: "CSC 226", name: "Algorithms and Data Structures II" },
  { code: "CSC 320", name: "Foundations of Computer Science" },
  { code: "CSC 360", name: "Operating Systems" },
  { code: "CSC 370", name: "Database Systems" },
  { code: "CSC 115", name: "Fundamentals of Programming II" },
  { code: "SENG 265", name: "Software Development Methods" },
  { code: "SENG 275", name: "Software Testing" },
  { code: "SENG 310", name: "Human Computer Interaction" },
  { code: "ECE 255", name: "Introduction to Computer Architecture" },
  { code: "ECE 260", name: "Continuous-Time Signals and Systems" },
  { code: "ECE 310", name: "Digital Signal Processing I" },
  { code: "ECE 360", name: "Control Theory and Systems I" },
  { code: "ECE 363", name: "Communication Networks" },
  { code: "STAT 260", name: "Introduction to Probability and Statistics" },
  { code: "MATH 122", name: "Logic and Foundations" },
  { code: "MATH 211", name: "Matrix Algebra I"},
  { code: "ENGR 130", name: "Introduction to Professional Practice" },
];

const educationData = [
  {
    id: "uvic",
    institution: "University of Victoria",
    url: "https://www.uvic.ca/",
    degree: "Bachelor of Engineering — Software Engineering",
    level: "Post-Secondary",
    period: "Sep 2022 – Present",
    location: "Victoria, BC, Canada",
    details: "Co-op program. Courses range from algorithms, operating systems, database systems, software development, HCI, communication networks, and electrical engineering.",
    showCourses: true,
  },
  {
    id: "aise",
    institution: "American International School in Egypt",
    url: "https://www.aisegypt.com/",
    degree: "American High School Diploma · IB Diploma · Egyptian General Secondary Certificate",
    level: "Middle School & High School",
    period: "Sep 2014 – Jun 2022",
    location: "Cairo, Egypt",
    details: "IB HL: Physics, Chemistry, Global Politics. SL: English, Spanish B, Math AA.",
    activities: "High School Student Council VP, IB Spanish AB Tutor, NJHS, Swim Team, World Scholar's Cup (Cairo Round 2018), School Newspaper, Middle School Student Council",
  },
  {
    id: "webber",
    institution: "Webber Academy",
    url: "https://www.webberacademy.ca/",
    degree: "Canadian Curriculum",
    level: "Elementary School",
    period: "Jan 2012 – Jun 2014",
    location: "Calgary, AB, Canada",
    details: "Rigorous private school education focused on academic excellence, critical thinking, and leadership.",
  },
  {
    id: "bsb",
    institution: "British School of Beijing, Shunyi",
    url: "https://www.nordangliaeducation.com/bsb-shunyi",
    degree: "British Curriculum",
    level: "Elementary School",
    period: "Sep 2010 – Jan 2012",
    location: "Beijing, China",
    details: "British-style curriculum combining academic rigor with creativity and global citizenship.",
  },
  {
    id: "bisoh",
    institution: "British International School of Houston",
    url: "https://www.nordangliaeducation.com/bis-houston",
    degree: "British Curriculum",
    level: "Kindergarten & Elementary School",
    period: "Feb 2008 – Jun 2010",
    location: "Houston, TX, United States",
    details: "British-style education with strong extracurricular programs and small class sizes.",
  },
];

export default function EducationSection() {
  const [coursesOpen, setCoursesOpen] = useState(false);

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
            <div className="flex-1">
              <h4 className="font-semibold text-foreground text-sm">
                <a href={edu.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary underline decoration-dotted underline-offset-2 transition-colors">{edu.institution}</a>
              </h4>
              <p className="text-xs text-primary/80 mt-0.5">{edu.degree}</p>
              {edu.level && (
                <p className="text-xs text-muted-foreground/70 mt-0.5 italic">{edu.level}</p>
              )}
            </div>
            <div className="text-right text-xs text-muted-foreground shrink-0">
              <div className="flex items-center justify-end gap-1">
                <Calendar className="w-3 h-3" />
                <span>{edu.period}</span>
              </div>
              <div className="flex items-center justify-end gap-1 mt-1">
                <MapPin className="w-3 h-3" />
                <span>{edu.location}</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{edu.details}</p>
          {edu.activities && (
            <p className="text-xs text-muted-foreground/70 mt-1 italic">{edu.activities}</p>
          )}

          {/* Courses collapsible — UVic only */}
          {edu.showCourses && (
            <div className="mt-3">
              <button
                onClick={() => setCoursesOpen(!coursesOpen)}
                className="flex items-center gap-1.5 text-xs text-primary/70 hover:text-primary transition-colors"
              >
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${coursesOpen ? "rotate-180" : ""}`}
                />
                {coursesOpen ? "Hide" : "View"} Relevant Coursework
              </button>

              <AnimatePresence>
                {coursesOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 grid grid-cols-1 gap-1.5">
                      {courses.map((course) => (
                        <div
                          key={course.code}
                          className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-primary/5 border border-primary/10"
                        >
                          <span className="text-[10px] font-mono text-primary shrink-0">{course.code}</span>
                          <span className="text-xs text-muted-foreground">{course.name}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
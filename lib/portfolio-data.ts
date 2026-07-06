export const personalInfo = {
  name: "Rahma Ismail",
  title:
    "Software Engineering Student @ UVic | Prev Security Analyst Co-op @ Gov of BC | Embedded Systems + AI",
  tagline:
    "I build from firmware to full-stack — low-level systems, AI pipelines, and production-grade software.",
  email: "rahma3a.ismail@gmail.com",
  github: "https://github.com/rahmaaismail",
  linkedin: "http://www.linkedin.com/in/rahmaismail16/",
};

export const education = {
  institution: "University of Victoria",
  degree: "Bachelor of Software Engineering",
  startDate: "09/2022",
};

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  skills: string[];
}

export const experiences: Experience[] = [
  {
    id: "govbc",
    company: "Government of British Columbia – Ministry of Citizens' Services",
    role: "Security Analyst Co-op",
    period: "May 2025 – Dec 2025",
    location: "Victoria, BC",
    description:
      "Designed cloud-native microservices in Go for Risk-Based Authentication (RBA). Built scalable data pipelines in Python and SQL for analytics and anomaly detection. Developed and maintained SSO web application using Node.js and React. Deployed distributed systems on AWS (EC2, S3, IAM) using Docker. Monitored production systems with Splunk and Grafana; collaborated with cross-functional teams across 200+ stakeholder consultations.",
    skills: ["Go", "Python", "SQL", "Node.js", "React", "AWS", "Docker", "Splunk", "Grafana"],
  },
];

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  visualConcept: string;
  githubUrl?: string;
  date: string;
}

export const projects: Project[] = [
  {
    id: "ai-code-reviewer",
    name: "AI Code Reviewer",
    date: "May 2026",
    description:
      "LLM-powered code review engine in TypeScript that statically analyzes pull requests for bugs, security vulnerabilities, and style violations across polyglot codebases. Fault-tolerant prompt chaining pipeline with structured output parsing. Integrates directly with CI/CD pipelines to enforce automated quality gates on every PR.",
    tech: ["TypeScript", "LLM", "CI/CD", "Static Analysis"],
    visualConcept: "Neural code-analysis node",
    githubUrl: "https://github.com/rahmaaismail",
  },
  {
    id: "python-api",
    name: "Production REST API",
    date: "May 2026",
    description:
      "Production-grade REST API in Python with JWT authentication, schema validation, and centralized error handling. Engineered a real-time sync layer with Airtable, designed for horizontal scalability with stateless request handling and zero-downtime deployments.",
    tech: ["Python", "REST API", "JWT", "Airtable", "Docker"],
    visualConcept: "API gateway node with data flow",
    githubUrl: "https://github.com/rahmaaismail",
  },
  {
    id: "rust-shell",
    name: "Shell Build in Rust",
    date: "May 2026",
    description:
      "Fully functional Unix shell in Rust from scratch — command parsing, process forking, piping, I/O redirection, and POSIX signal handling with zero unsafe code. Exploits Rust's ownership model to eliminate use-after-free and data race bugs. Sub-millisecond command dispatch latency benchmarked against Bash.",
    tech: ["Rust", "Systems Programming", "POSIX", "Unix"],
    visualConcept: "Low-level systems node with memory safety glow",
    githubUrl: "https://github.com/rahmaaismail",
  },
  {
    id: "jpacman",
    name: "JPacman Testing Project",
    date: "Apr 2026",
    description:
      "Designed and executed unit, integration, system, manual, and regression tests using JUnit 5 in IntelliJ IDEA. Applied specification, coverage, mutation (PiTest), and Mockito-based testing to improve coverage and correctness.",
    tech: ["Java", "JUnit 5", "PiTest", "Mockito", "Testing"],
    visualConcept: "Test coverage node",
  },
  {
    id: "fat12",
    name: "Simple File System (FAT12)",
    date: "Apr 2026",
    description:
      "C-based utilities for FAT12 disk image operations and structured data storage. Implemented validation, debugging, and memory-safe data handling for system reliability.",
    tech: ["C", "FAT12", "Systems", "Memory Management"],
    visualConcept: "File system tree node",
    githubUrl: "https://github.com/rahmaaismail",
  },
  {
    id: "pathpicker",
    name: "PathPicker — Meta OSS Contribution",
    date: "Mar 2026",
    description:
      "Enhanced Meta's open-source Python CLI tool with regex-based parsing and automation features. Improved developer workflows through efficient file handling and command execution.",
    tech: ["Python", "CLI", "Open Source", "Regex"],
    visualConcept: "Open source contribution node",
    githubUrl: "https://github.com/rahmaaismail",
  },
  {
    id: "concurrent-acs",
    name: "Concurrent Airline Check-in System",
    date: "Mar 2026",
    description:
      "Multi-threaded real-time system in C with mutexes, condition variables, and scheduling. Conducted validation, performance analysis, and system testing for correctness under concurrency.",
    tech: ["C", "Multithreading", "Mutexes", "POSIX"],
    visualConcept: "Concurrent threads neural map",
    githubUrl: "https://github.com/rahmaaismail",
  },
  {
    id: "linux-process-manager",
    name: "Linux Process Manager",
    date: "Feb 2026",
    description:
      "C-based process management tool using system calls and the /proc interface. Implemented process monitoring, lifecycle tracking, and system-level debugging tools.",
    tech: ["C", "Linux", "System Calls", "/proc"],
    visualConcept: "Process tree node",
    githubUrl: "https://github.com/rahmaaismail",
  },
  {
    id: "phishing-detection",
    name: "AI Phishing Detection",
    date: "Oct 2025",
    description:
      "End-to-end AI/ML pipeline in Python (scikit-learn) with preprocessing, evaluation, and testing. Built a RESTful Flask API for real-time URL phishing detection with a JavaScript web interface. Deployed on Replit with Kaggle API dataset ingestion and model versioning.",
    tech: ["Python", "scikit-learn", "Flask", "REST API", "ML Pipeline"],
    visualConcept: "Security shield neural node",
    githubUrl: "https://github.com/rahmaaismail",
  },
  {
    id: "macropad",
    name: "RP2040 Macropad",
    date: "May–Jul 2025",
    description:
      "End-to-end embedded build at Schneider Electric workshop — circuit schematic and PCB in KiCad, mechanical casing in Autodesk Fusion 360, firmware in QMK (C). Assembled and soldered all components, mounted key switches, and completed final device assembly with testing.",
    tech: ["C", "QMK", "RP2040", "KiCad", "Autodesk Fusion", "GPIO"],
    visualConcept: "Hardware circuit node",
    githubUrl: "https://github.com/rahmaaismail",
  },
  {
    id: "healing-together",
    name: "Healing Together",
    date: "Jan 2025",
    description:
      "Caregiver-focused app and website prototype built in Figma for the Western Canada Engineering Competition. Integrated intuitive navigation, accessibility, mental health guidance, care tips, resources directory, and community forum. Secured 3rd place in Innovative Design.",
    tech: ["Figma", "UI/UX", "Accessibility", "Prototyping"],
    visualConcept: "UX design node",
    githubUrl: "https://github.com/rahmaaismail",
  },
  {
    id: "medical-clinic",
    name: "Medical Clinic System",
    date: "Oct–Dec 2024",
    description:
      "Full-stack Python application with PyQt6 GUI using MVC principles, patient and note management, file-based persistence (JSON, binary), and integration tests. Collaborative development via Git.",
    tech: ["Python", "PyQt6", "MVC", "Full-Stack"],
    visualConcept: "Full-stack app node",
    githubUrl: "https://github.com/rahmaaismail",
  },
  {
    id: "deepracer",
    name: "AWS DeepRacer",
    date: "Nov 2024",
    description:
      "Trained reinforcement learning models on AWS, cutting lap times from 12.9s to 9s through reward function engineering. Top 10 Finalist (6th/31 teams) at UVic hackathon.",
    tech: ["AWS", "Reinforcement Learning", "Python", "Robotics"],
    visualConcept: "RL training loop node",
    githubUrl: "https://github.com/rahmaaismail",
  },
  {
    id: "underwater-robot",
    name: "Autonomous Underwater Robot",
    date: "Jan–Apr 2023",
    description:
      "Designed and built an underwater target detection robot using a VEX Kit. Programmed in C (RobotC) with IR sensor integration, PID control logic, and real-time robotic control meeting Ocean Networks Canada requirements.",
    tech: ["C", "RobotC", "Embedded", "PID Control", "VEX"],
    visualConcept: "Robotics sensor node",
  },
];

export interface Organization {
  id: string;
  name: string;
  role: string;
  period: string;
  description: string;
  highlights?: string[];
}

export const organizations: Organization[] = [
  {
    id: "west",
    name: "UVic Women in Engineering, Science & Technology",
    role: "Co-Director",
    period: "Jan 2026 – Present",
    description:
      "Oversee all club operations and co-lead strategy and industry partnerships to deliver real-world design projects and workshops empowering women in engineering, science, and technology.",
    highlights: ["Club Operations", "Industry Partnerships", "Design Projects", "Leadership"],
  },
  {
    id: "west-business",
    name: "UVic Women in Engineering, Science & Technology",
    role: "Director of Business",
    period: "Aug 2024 – Jan 2026",
    description:
      "Led and managed Social Media, Recruitment, and Events teams. Set weekly goals, conducted progress check-ins, contributed to strategic decisions, and mentored team members.",
    highlights: ["Team Management", "Recruitment", "Events", "Mentorship"],
  },
  {
    id: "nasa",
    name: "NASA International Space Apps Challenge",
    role: "Local Director of Sponsorship",
    period: "Aug 2025 – Oct 2025",
    description:
      "Planned and launched the first Victoria NASA Space Apps Challenge hackathon, securing sponsorship and organizing the event from the ground up.",
    highlights: ["Event Launch", "Sponsorship", "Hackathon Organizing", "Community Building"],
  },
  {
    id: "uvic-global",
    name: "UVic Global Community, International Centre for Students",
    role: "Student Volunteer",
    period: "Aug 2025",
    description:
      "Guided six international students through campus orientation, BC Transit, and Downtown Victoria. Led icebreakers and the Victoria Photo Scavenger Hunt, fostering an inclusive and welcoming atmosphere.",
    highlights: ["Mentorship", "International Community", "Orientation", "Inclusion"],
  },
  {
    id: "bcps",
    name: "BC Public Service",
    role: "Co-op Advisory Board Member",
    period: "May 2025 – Aug 2025",
    description:
      "Supported co-op student engagement, outreach, and career development initiatives across the BC Public Service.",
    highlights: ["Student Engagement", "Outreach", "Career Development", "Advisory"],
  },
  {
    id: "west-events",
    name: "UVic Women in Engineering, Science & Technology",
    role: "Event Coordinator",
    period: "Jan 2024 – Aug 2024",
    description:
    "Planned and coordinated Women in STEM panels, workshops, and networking events. Handled venue booking, agendas, catering, and budgets. Designed digital marketing materials using Canva.",
    highlights: ["Event Planning", "Marketing", "Workshops", "Networking"],
  },
  {
    id: "student-council",
    name: "High School Student Council",
    role: "Vice President",
    period: "Sep 2021 – Jun 2022",
    description:
      "Collaborated with the President on student life initiatives. Represented the student body in meetings with administration and organized events for 400+ students including fundraisers, spirit weeks, and March Madness.",
    highlights: ["Leadership", "Event Planning", "Student Advocacy", "400+ Students"],
  },
];

export const awards = [
  {
    title: "2026 UVic Co-op Changemaker Award",
    event: "University of Victoria Co-op and Career Services",
    highlight: "June 2026",
    description:
      "Awarded to co-op students who have made a meaningful contribution to the outcomes and goals of the organization or to their own personal or professional development while on a co-op work term.",
    url: "https://www.uvic.ca/coop/student-spotlight/coop-stories-ecs/rahma-ismail-software-engineering.php",
  },

  {
    title: "Fall 2025 Student Employee Award Nomination",
    event: "BC Public Service — Excellence in Professional Development",
    highlight: "December 2025",
    description: "This nomination recognizes co-op employees in the BC Public Service who have demonstrated significant engagement with their work experience and have gone above and beyond to improve themselves personally and professionally.",
  },

  {
    title: "3rd Place — Innovative Design",
    event: "Western Canada Engineering Competition — Healing Together",
    highlight: "Saskatoon, SK · Jan 2025",
    description:
      "Designed a caregiver-focused app prototype in Figma with accessibility-first UX. Presented to judges at the regional engineering competition.",
  },
  {
    title: "Top 10 Finalist (6th / 31 teams)",
    event: "AWS DeepRacer Hackathon",
    highlight: "Victoria, BC · Nov 2024",
    description:
      "Trained RL models on AWS, cutting lap times from 12.9s to 9s through reward function engineering and iterative optimization.",
  },
  {
    title: "Honors Award",
    event: "American International School in Egypt",
    highlight: "2020",
  },
  {
    title: "Perfect Attendance Award",
    event: "American International School in Egypt",
    highlight: "2019",
  }, 
];

export interface Conference {
  id: string;
  name: string;
  role: string;
  date: string;
  location: string;
  description: string;
  presented: boolean;
}

export const conferences: Conference[] = [
  {
    id: "ccwestt",
    name: "CCWESTT Biennial Conference",
    role: "Speaker",
    date: "2026",
    location: "Calgary, AB",
    description:
      "Presented at the Canadian Coalition of Women in Engineering, Science, Trades and Technology (CCWESTT) Biennial Conference, hosted in collaboration with Engineers Canada. Co-presented 'The WEST Effect: How Female-Only Clubs Benefit Women in STEM' — exploring how student-driven initiatives like UVic WEST build community, engage allies of all genders, and drive cultural change in STEM environments.",
    presented: true,
  },
  {
    id: "govinnovation",
    name: "Government Innovation Showcase - Public Sector Network",
    role: "Attendee",
    date: "2025",
    location: "Victoria, BC",
    description:
      "Attended the Government Innovation Showcase, exploring emerging technology initiatives and digital transformation projects across British Columbia.",
    presented: false,
  },
  {
    id: "bsides",
    name: "BSides Vancouver Island",
    role: "Attendee",
    date: "2025",
    location: "Victoria, BC",
    description:
      "Attended BSides Vancouver Island, a community-driven cybersecurity conference covering offensive/defensive security, threat research, and industry talks.",
    presented: false,
  },
];

export const certifications = [
  { name: "ISC2 Certified in Cybersecurity (CC)", issuer: "ISC2", year: "2025" },
  { name: "Harvard CS50 Web Programming with Python & JavaScript", issuer: "Harvard / edX", year: "2025" },
  { name: "NVIDIA DLI Generative AI Explained", issuer: "NVIDIA", year: "2025" },
  { name: "IBM SkillsBuild Cloud Computing Fundamentals", issuer: "IBM", year: "2025" },
  { name: "Microsoft Elevate AI Literacy", issuer: "Microsoft", year: "2025" },
  { name: "Coursera Business Analysis & Process Management", issuer: "Coursera", year: "2025" },
  { name: "Effective Prompt Engineering for Public Servants", issuer: "Apolitical", year: "2025" },
  { name: "AI Fundamentals for Public Servants", issuer: "Apolitical", year: "2025" },
];

export const skills = {
  languages: ["C", "C++", "Python", "Go", "Rust", "JavaScript", "TypeScript", "Java", "SQL", "Shell/Bash", "R", "MATLAB"],
  frameworks: [
    "React", "Next.js", "Node.js", "Django", "Flask", "Streamlit", "Bootstrap", "Sass",
    "NumPy", "Pandas", "Matplotlib", "scikit-learn",
    "Docker", "AWS", "Git", "Linux", "Vercel", "Railway",
    "Splunk", "Grafana", "Power BI", "Wireshark",
    "Figma", "Canva", "Jira", "Miro",
  ],
  hardware: [
    "Raspberry Pi Pico / RP2040", "Arduino", "KiCad", "Autodesk Fusion 360",
    "QMK Firmware", "GPIO / Interrupts", "Soldering", "PCB Design",
    "Firmware Development", "RTOS Concepts", "Low-level Debugging",
  ],
  languages_spoken: [
    { lang: "English", level: "Fluent" },
    { lang: "Arabic", level: "Fluent" },
    { lang: "Spanish", level: "Professional Proficiency" },
    { lang: "Mandarin", level: "Beginner" },
  ],
};

export type BrainRegion =
  | "frontal"
  | "temporal"
  | "parietal"
  | "occipital"
  | "cerebellum"
  | "brainstem"
  | "hippocampus";

export const brainRegions: Record<BrainRegion, { label: string; section: string; description: string }> = {
  frontal: { label: "Frontal Cortex", section: "experience", description: "Professional Experience" },
  temporal: { label: "Temporal Lobe", section: "projects", description: "Projects" },
  parietal: { label: "Parietal Lobe", section: "skills", description: "Technical Skills" },
  occipital: { label: "Occipital Lobe", section: "awards", description: "Awards, Conferences & Certifications" },
  cerebellum: { label: "Cerebellum", section: "organizations", description: "Organizations & Leadership" },
  brainstem: { label: "Brain Stem", section: "contact", description: "Contact & Social" },
  hippocampus: { label: "Hippocampus", section: "education", description: "Education" },
};
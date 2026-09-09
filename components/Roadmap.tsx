"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, Briefcase, GraduationCap } from "lucide-react";

interface TimelineItem {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  details?: string[];
  type: "work" | "education";
}

const roadmapData: TimelineItem[] = [
  {
    date: "2016 - 2022",
    title: "My beginnings with programming",
    subtitle: "Giganci Programowania",
    description:
      "The beginning of my adventure in which I learned to code in Python, create games and websites.",
    details: [
      "Learned Python fundamentals and game development",
      "Created first websites with HTML, CSS, and JavaScript",
      "Developed small games and interactive projects",
      "Built strong foundation in programming logic"
    ],
    type: "education",
  },
  {
    date: "2022 - Present",
    title: "High School",
    subtitle: "Niepubliczne Technikum Programistyczne Techni Schools",
    description:
      "Place where I spread my wings and absorbed a lot of knowledge and practice.",
    details: [
      "Advanced programming courses in multiple languages",
      "Team projects and collaborative development",
      "Participation in tech competitions and hackathons",
      "Hands-on experience with modern frameworks"
    ],
    type: "education",
  },
  {
    date: "April 2024",
    title: "Hackathon Technischools 2024",
    subtitle: "2nd Place - Techni Schools Code Camp, Warsaw",
    description:
      "Our team 'cyk.pl' won 2nd place at the Code Camp! Under the theme 'Mental Support', we developed an AI-powered virtual psychologist built on the Bielik model.",
    details: [
      "🏆 Achieved 2nd place out of numerous competing teams",
      "Built AI-powered mental support system using Bielik model",
      "Implemented smart initial diagnosis algorithms",
      "Created empathetic AI conversation flows",
      "Integrated real-time human supervision features",
      "24-hour intensive development sprint"
    ],
    type: "education",
  },
  {
    date: "2024 - 2026 June",
    title: "Student Projects",
    subtitle: "Niepubliczne Technikum Programistyczne Techni Schools",
    description:
      "Worked as a student on practical projects at Techni Schools, applying and expanding the skills learned in class.",
    details: [
      "Collaborated on team-based programming projects",
      "Applied theoretical knowledge to real, hands-on work",
      "Continued developing skills across the full stack",
      "Built a portfolio of practical project experience"
    ],
    type: "education",
  },
  {
    date: "2025 March - 2025 december",
    title: "Full Stack Developer",
    subtitle: "RedSteel Company",
    description:
      "Working on exciting projects using Payload CMS, Next.js, and Node.js.",
    details: [
      "Developing full-stack applications with Next.js",
      "Implementing Payload CMS for content management",
      "Building RESTful APIs with Node.js and Express",
      "Collaborating with cross-functional teams",
      "Ensuring code quality and best practices"
    ],
    type: "work",
  },
  {
    date: "2026 July - 2026 September",
    title: "Software Engineering Intern",
    subtitle: "LSP Group",
    description:
      "Completed a full stack software engineering internship at LSP Group.",
    details: [
      "Worked as part of a full stack development team",
      "Contributed to real production features and codebases",
      "Gained professional experience in a company environment",
      "Applied best practices in a fullstack development workflow"
    ],
    type: "work",
  },
];

const Roadmap: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="roadmap" className="py-12 sm:py-16 bg-muted/30 text-foreground">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12"
        >
          My Journey
        </motion.h2>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative wrap overflow-hidden p-4 sm:p-6 md:p-10 h-full"
        >
          <div className="hidden md:block border-2-2 absolute left-1/2 border-opacity-20 border-primary h-full border"></div>

          {[...roadmapData].reverse().map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`mb-6 sm:mb-8 flex flex-col md:flex-row justify-between items-center w-full ${
                index % 2 === 0
                  ? "md:flex-row-reverse left-timeline"
                  : "md:right-timeline"
              }`}
            >
              <div className="hidden md:block order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 md:order-1 bg-primary shadow-xl w-10 h-10 rounded-full mb-4 md:mb-0">
                {item.type === "work" ? (
                  <Briefcase className="mx-auto h-5 w-5 text-primary-foreground" />
                ) : (
                  <GraduationCap className="mx-auto h-5 w-5 text-primary-foreground" />
                )}
              </div>
              <motion.div
                onClick={() => toggleExpand(index)}
                className={`order-1 w-full md:w-5/12 px-4 sm:px-6 py-4 bg-background rounded-lg shadow-xl text-card-foreground cursor-pointer hover:shadow-2xl transition-all duration-300 ${
                  expandedIndex === index ? 'ring-2 ring-primary' : ''
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <time className="mb-1 text-xs sm:text-sm font-normal leading-none text-muted-foreground">
                  {item.date}
                </time>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="mb-1 text-base sm:text-lg font-semibold flex-1">{item.title}</h3>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </motion.div>
                </div>
                <h4 className="mb-2 text-sm sm:text-md font-medium text-primary">{item.subtitle}</h4>
                <p className="text-xs sm:text-sm font-normal text-muted-foreground mb-2">
                  {item.description}
                </p>

                <AnimatePresence>
                  {expandedIndex === index && item.details && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-border"
                    >
                      <ul className="space-y-1.5 sm:space-y-2">
                        {item.details.map((detail, detailIndex) => (
                          <motion.li
                            key={detailIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: detailIndex * 0.05 }}
                            className="flex items-start gap-2 text-xs sm:text-sm"
                          >
                            <span className="text-primary mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                            <span>{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Roadmap;

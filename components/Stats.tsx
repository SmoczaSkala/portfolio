"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Award, GitBranch, Users } from "lucide-react";

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: React.ReactNode;
  color: string;
}

function AnimatedNumber({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

        const easeProgress = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.floor(easeProgress * value));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stats: StatItem[] = [
    {
      label: "GitHub Repositories",
      value: 10,
      suffix: "",
      icon: <Code2 className="h-8 w-8" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "GitHub Contributions",
      value: 500,
      suffix: "+",
      icon: <GitBranch className="h-8 w-8" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Years Experience",
      value: 6,
      suffix: "+",
      icon: <Award className="h-8 w-8" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Commercial Projects",
      value: 3,
      suffix: "+",
      icon: <Users className="h-8 w-8" />,
      color: "from-orange-500 to-red-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <section className="py-12 sm:py-16 px-4 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12"
        >
          Achievements & Milestones
        </motion.h2>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <div className="relative p-4 sm:p-6 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <div className="relative z-10 flex flex-col items-center text-center space-y-3 sm:space-y-4">
                  <motion.div
                    className={`p-3 sm:p-4 rounded-full bg-gradient-to-br ${stat.color} text-white shadow-lg`}
                    animate={
                      isInView
                        ? {
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + index * 0.1,
                    }}
                  >
                    {stat.icon}
                  </motion.div>

                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {stat.prefix}
                    <AnimatedNumber value={stat.value} duration={2} />
                    {stat.suffix}
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>

                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 sm:mt-12 flex justify-center px-4"
        >
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-background border border-border shadow-md">
            <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-center">
              🏆 2nd Place Winner - Hackathon Techni Schools Code Camp 2024
            </span>
          </div>
                    <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-background border border-border shadow-md">
            <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-center">
              🚀 Participant - Hackathon organized by Civil42
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


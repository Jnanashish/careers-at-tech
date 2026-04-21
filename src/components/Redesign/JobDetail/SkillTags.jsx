import React from "react";
import { motion } from "framer-motion";
import { isValid } from "./badgeUtils";

const shouldAnimate =
  typeof window !== "undefined"
    ? !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : true;

const parseSkills = (html) => {
  if (!html) return [];
  const text = html
    .replace(/<li[^>]*>/gi, "|")
    .replace(/<br\s*\/?>/gi, "|")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");

  return text
    .split(/[|,\n]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && s !== "N");
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03 },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const SkillTags = ({ title, icon, html }) => {
  if (!isValid(html)) return null;

  const skills = parseSkills(html);
  if (skills.length === 0) return null;

  return (
    <motion.section
      initial={shouldAnimate ? { opacity: 0, y: 16 } : {}}
      whileInView={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-card p-6 md:p-7 shadow-card border border-border"
    >
      <h2 className="text-card-title font-semibold text-text-primary flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {title}
      </h2>
      <hr className="border-border mt-3 mb-5" />

      <motion.div
        className="flex flex-wrap gap-2"
        variants={shouldAnimate ? containerVariants : {}}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skills.map((skill, i) => (
          <motion.span
            key={i}
            variants={shouldAnimate ? tagVariants : {}}
            className="bg-gray-100 text-text-secondary rounded-full px-3 py-1.5 text-sm font-medium hover:bg-primary-light hover:text-primary transition-colors cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default SkillTags;

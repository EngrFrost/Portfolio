"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SKILLS } from "@/lib/skills";
import { fadeUp, stagger } from "@/lib/motion.config";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-content px-4 py-32 md:px-8">
      <span className="section-number">02 — Skills</span>
      <h2 className="mt-8 text-4xl md:text-6xl">What I Can Do</h2>

      <motion.div
        className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {SKILLS.map((skill) => (
          <motion.div
            key={skill.name}
            variants={fadeUp}
            whileHover={{ y: -6, rotate: -1 }}
            className="group flex items-center gap-4 rounded-2xl border border-surface-2 bg-surface p-6 transition-colors hover:border-accent"
            data-cursor="interactive"
          >
            <Image src={skill.img} alt={skill.name} width={44} height={44} />
            <h3 className="text-lg group-hover:text-accent">{skill.name}</h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

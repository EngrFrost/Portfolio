"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/projects";
import ProjectCard from "@/components/sections/ProjectCard";
import { fadeUp, stagger } from "@/lib/motion.config";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-content px-4 py-32 md:px-8">
      <span className="section-number">03 — Projects</span>
      <h2 className="mt-8 text-4xl md:text-6xl">What I&apos;ve Built</h2>

      <motion.div
        className="mt-12 grid gap-6 sm:grid-cols-2"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {PROJECTS.map((p, i) => (
          <motion.div key={p.slug} variants={fadeUp}>
            <ProjectCard project={p} index={i} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectCard({ project, index }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block h-[340px] w-full overflow-hidden rounded-2xl md:h-[440px]"
      data-cursor="interactive"
    >
      <motion.div className="h-full w-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}>
        <Image
          src={project.thumb}
          alt={project.title}
          className="h-full w-full object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 md:p-8">
        <span className="section-number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-2 font-display text-3xl md:text-5xl">{project.title}</h3>
        <p className="mt-1 text-text-muted">{project.subtitle}</p>
      </div>
    </Link>
  );
}

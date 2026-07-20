"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "@/lib/projects";
import ProjectCard from "@/components/sections/ProjectCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (reduce || !isDesktop) return; // vertical scroll fallback

      const track = trackRef.current;
      // Function-based values so they recompute on ScrollTrigger.refresh()
      // (e.g. window resize) via invalidateOnRefresh — a captured constant
      // would leave the rail under/over-shooting the last card after a resize.
      const getDistance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="projects" ref={sectionRef} className="overflow-hidden py-32">
      <div className="mx-auto max-w-content px-4 md:px-8">
        <span className="section-number">03 — Projects</span>
        <h2 className="mt-8 text-4xl md:text-6xl">What I&apos;ve Built</h2>
      </div>
      <div
        ref={trackRef}
        className="mt-12 flex gap-6 px-4 md:mt-16 md:px-8 md:will-change-transform"
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

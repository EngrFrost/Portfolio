"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import MagneticButton from "@/components/motion/MagneticButton";
import { EASE } from "@/lib/motion.config";

const HeroBlob = dynamic(() => import("@/components/three/HeroBlob"), { ssr: false });

const ROLES = ["Full-Stack Developer", "UI Engineer", "React Specialist"];
const NAME = "IAN";

const socials = [
  { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/ian-john-samson-60942a238", external: true },
  { icon: <FaGithub />, href: "https://github.com/EngrFrost", external: true },
  { icon: <AiOutlineMail />, href: "/#contact", external: false },
  { icon: <BsFillPersonLinesFill />, href: "/resume.pdf", external: false },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    setShow3D(!reduce && fine && wide);
  }, []);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]"
      />
      {show3D && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-1/2 md:block"
        >
          <HeroBlob />
        </div>
      )}
      <div className="relative z-10 mx-auto w-full max-w-content px-4 md:px-8">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE.expo }}
        >
          Let&apos;s build something together
        </motion.p>

        <h1 className="mt-4 font-display text-[18vw] leading-[0.85] md:text-[12rem]">
          {NAME.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.9, ease: EASE.expo }}
            >
              {ch}
            </motion.span>
          ))}
          <span className="text-accent">.</span>
        </h1>

        <div className="mt-4 h-[1.4em] overflow-hidden font-display text-2xl text-text-muted md:text-4xl">
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              className="block"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: EASE.expo }}
            >
              {ROLES[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex gap-4">
          {socials.map((s, i) => (
            <MagneticButton key={i}>
              {s.external ? (
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-14 w-14 place-items-center rounded-full border border-surface-2 text-xl transition-colors hover:border-accent hover:text-accent"
                >
                  {s.icon}
                </a>
              ) : (
                <Link
                  href={s.href}
                  className="grid h-14 w-14 place-items-center rounded-full border border-surface-2 text-xl transition-colors hover:border-accent hover:text-accent"
                >
                  {s.icon}
                </Link>
              )}
            </MagneticButton>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-text-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Scroll
      </motion.div>
    </section>
  );
}

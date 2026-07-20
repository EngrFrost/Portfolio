"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GSAP_EASE, STAGGER } from "@/lib/motion.config";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function RevealText({
  children,
  as: Tag = "p",
  className = "",
  stagger = STAGGER / 3,
}) {
  const ref = useRef(null);
  const words = String(children).split(" ");

  useGSAP(
    () => {
      const targets = ref.current.querySelectorAll("[data-word]");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(targets, { yPercent: 0, opacity: 1 });
        return;
      }
      gsap.from(targets, {
        yPercent: 120,
        opacity: 0,
        duration: 0.8,
        ease: GSAP_EASE,
        stagger,
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="reveal-word">
          <span data-word>{w}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

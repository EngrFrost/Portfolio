"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GSAP_EASE } from "@/lib/motion.config";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function RevealImage({ src, alt, className = "", priority = false }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const img = ref.current.querySelector("img");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(ref.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.1,
        ease: GSAP_EASE,
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
      gsap.from(img, {
        scale: 1.25,
        duration: 1.1,
        ease: GSAP_EASE,
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-2xl ${className}`}
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <Image src={src} alt={alt} priority={priority} className="h-full w-full object-cover" />
    </div>
  );
}

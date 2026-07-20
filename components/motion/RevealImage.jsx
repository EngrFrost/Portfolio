"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GSAP_EASE } from "@/lib/motion.config";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function RevealImage({
  src,
  alt,
  className = "",
  priority = false,
  fill = false,
  sizes,
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const img = ref.current.querySelector("img");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
      tl.from(ref.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.1,
        ease: GSAP_EASE,
      }).from(img, { scale: 1.25, duration: 1.1, ease: GSAP_EASE }, 0);
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <Image
        src={src}
        alt={alt}
        priority={priority}
        fill={fill}
        sizes={sizes}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

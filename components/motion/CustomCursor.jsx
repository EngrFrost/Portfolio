"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { isInteractive } from "@/lib/cursor";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;

    setEnabled(true);
    document.documentElement.dataset.cursor = "custom";

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setActive(isInteractive(e.target));
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      delete document.documentElement.dataset.cursor;
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-ring"
      style={{ x: sx, y: sy }}
      animate={{ scale: active ? 2.2 : 1 }}
      transition={{ duration: 0.2 }}
    />
  );
}

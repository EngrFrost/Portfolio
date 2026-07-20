"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion.config";

export default function Template({ children }) {
  return (
    <>
      {children}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[120] bg-accent"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.6, ease: EASE.quart }}
        style={{ transformOrigin: "top" }}
      />
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion.config";
import { shouldShowLoader, markLoaderSeen } from "@/lib/loader";

export default function Loader() {
  // Rendered true on server + first client paint (hydration-safe).
  const [show, setShow] = useState(true);
  // Default false on server/first paint; corrected in an effect (hydration-safe).
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!shouldShowLoader(window.sessionStorage)) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => {
      markLoaderSeen(window.sessionStorage);
      setShow(false);
    }, reduce ? 200 : 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: reduce ? 0 : 0.8, ease: EASE.expo }}
        >
          <motion.span
            className="font-display text-6xl md:text-8xl text-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, ease: EASE.expo }}
          >
            IAN
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

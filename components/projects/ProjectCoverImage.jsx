"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

export default function ProjectCoverImage({ src, alt, title, subtitle }) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close, isOpen]);

  return (
    <>
      <div className="relative h-[60vh] w-full">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group absolute inset-0 block w-full cursor-zoom-in"
          aria-label={`View full image for ${title}`}
          data-cursor="interactive"
        >
          <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" priority />
          <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-bg/60 px-3 py-1 text-xs font-medium text-text opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 md:right-8 md:top-8">
            View full image
          </span>
        </button>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/20" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-full">
          <div className="mx-auto max-w-content px-4 pb-10 md:px-8">
            <h1 className="font-display text-5xl md:text-7xl">{title}</h1>
            <p className="mt-2 text-text-muted">{subtitle}</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-bg/95 p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} full image preview`}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 rounded-full border border-surface-2 bg-surface p-2 text-text transition-colors hover:border-accent hover:text-accent md:right-8 md:top-8"
              aria-label="Close image preview"
              data-cursor="interactive"
            >
              <IoClose size={24} />
            </button>

            <motion.div
              className="relative h-full w-full max-h-[90vh] max-w-6xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Easing curves (cubic-bezier arrays for Framer; also used by GSAP as CustomEase-free tuples).
export const EASE = {
  expo: [0.16, 1, 0.3, 1],
  quart: [0.76, 0, 0.24, 1],
};

export const DUR = {
  fast: 0.3,
  base: 0.6,
  slow: 1.0,
  intro: 1.4,
};

export const STAGGER = 0.06;

// Reusable Framer Motion variants.
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE.expo },
  },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER } },
};

// GSAP uses string easings; map the expo tuple to its named equivalent.
export const GSAP_EASE = "expo.out";

# Editorial Kinetic Portfolio Revamp — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing static Next.js 12 portfolio as a dark, editorial, heavily-animated ("Editorial Kinetic") single-page experience on the modern Next.js App Router, keeping all existing content.

**Architecture:** Modern Next.js App Router (React 19, JavaScript). A root layout mounts three global client providers — smooth scroll (Lenis + GSAP), a custom cursor, and a session-gated intro loader. Reusable motion *primitives* (`RevealText`, `RevealImage`, `MagneticButton`, `PageTransition`) are content-agnostic and consumed by section components (`Hero`, `About`, `Skills`, `Projects`, `Contact`, `Nav`, `Footer`). All project data is centralized in `lib/projects.js` and rendered through one dynamic `projects/[slug]` route. Motion tokens live in one `lib/motion.config.js`. Everything respects `prefers-reduced-motion`.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS 3.4, Framer Motion, GSAP + ScrollTrigger + `@gsap/react`, Lenis, react-icons, `next/font`. Tests: Vitest + Testing Library + jsdom.

---

## Before You Start

- [ ] **Create a working branch** (do not work on `main`):

```bash
git checkout -b feat/editorial-kinetic-revamp
```

- [ ] Confirm Node ≥ 18.18 (`node -v`). Next.js 15 requires it.
- Reference the approved spec at `specs.md` while implementing.
- Conventions used throughout: import alias `@/` → project root (configured in Task 1). All interactive/animated components start with `"use client"`. Motion values are imported from `@/lib/motion.config` — never hard-coded in components.

---

## File Structure (target)

```
app/
  layout.jsx                 # fonts, metadata, global providers, Nav
  page.jsx                   # home: composes sections
  template.jsx               # page-transition enter overlay
  globals.css                # tailwind + tokens + base dark theme + primitives CSS
  not-found.jsx              # dark 404
  projects/[slug]/page.jsx   # dynamic project detail (data-driven)

components/
  layout/
    Nav.jsx
    Footer.jsx
  motion/
    SmoothScrollProvider.jsx
    CustomCursor.jsx
    Loader.jsx
    RevealText.jsx
    RevealImage.jsx
    MagneticButton.jsx
  sections/
    Hero.jsx
    About.jsx
    Skills.jsx
    Projects.jsx
    ProjectCard.jsx
    Contact.jsx

lib/
  motion.config.js           # durations, easings, variants
  cursor.js                  # isInteractive() — pure, tested
  loader.js                  # shouldShowLoader()/markLoaderSeen() — pure, tested
  projects.js                # all 6 projects' data + images
  skills.js                  # 9 skills + images

test setup: vitest.config.js, vitest.setup.js
```

**Files removed** (old pages-router): `pages/` directory entirely (`_app.js`, `_documents.js`, `index.js`, `netflix.jsx`, `crypto.jsx`, `twitch.jsx`, `property.jsx`, `pnp.jsx`, `manda.jsx`, `resume.jsx`), old `components/Main.jsx`, `components/Navbar.jsx`, `components/Projects.jsx`, `components/ProjectItem.jsx`, `components/About.jsx`, `components/Skills.jsx`, `components/Contact.jsx`, `styles/` directory. Assets under `public/` are kept.

---

# PHASE 0 — Modernize Scaffold

### Task 1: Upgrade dependencies & App Router scaffold

**Files:**
- Modify: `package.json`
- Create: `jsconfig.json`, `next.config.mjs`, `postcss.config.js`, `tailwind.config.js`
- Delete: `pages/` (all), `styles/` (all), `components/*.jsx` (the six old components + `ProjectItem.jsx`)

- [ ] **Step 1: Replace `package.json` dependencies**

```json
{
  "name": "my-porfolio",
  "version": "0.2.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run"
  },
  "dependencies": {
    "@gsap/react": "^2.1.2",
    "framer-motion": "^11.11.0",
    "gsap": "^3.13.0",
    "lenis": "^1.1.14",
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-icons": "^5.3.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.1",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.13.0",
    "eslint-config-next": "^15.1.0",
    "jsdom": "^25.0.1",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "vitest": "^2.1.3"
  }
}
```

- [ ] **Step 2: Delete legacy files**

```bash
rm -rf pages styles
rm components/Main.jsx components/Navbar.jsx components/Projects.jsx components/ProjectItem.jsx components/About.jsx components/Skills.jsx components/Contact.jsx
```

- [ ] **Step 3: Install**

Run: `npm install`
Expected: completes with no peer-dependency errors (React 19 + Next 15 are compatible).

- [ ] **Step 4: Create `jsconfig.json`**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  }
}
```

- [ ] **Step 5: Create `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

- [ ] **Step 6: Create `postcss.config.js`**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 7: Create `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#08080B",
        surface: "#111117",
        "surface-2": "#1A1A22",
        text: "#F5F4F2",
        "text-muted": "#8A8A96",
        accent: "#7C5CFF",
        "accent-bright": "#9E86FF",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: { content: "1240px" },
    },
  },
  plugins: [],
};
```

- [ ] **Step 8: Verify the app scaffolds** — this will fail until Task 2 creates `app/`. Proceed to Task 2, then run `npm run dev` at the end of Task 2.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: modernize to Next 15 App Router, swap deps, remove legacy pages"
```

---

### Task 2: Global styles, tokens & fonts (root layout shell)

**Files:**
- Create: `app/globals.css`, `app/layout.jsx`, `app/page.jsx` (temporary placeholder)

- [ ] **Step 1: Create `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: auto; }
  body {
    @apply bg-bg text-text font-body tracking-wide antialiased;
    overflow-x: hidden;
  }
  h1, h2, h3, h4 { @apply font-display font-bold leading-[0.95]; }
  ::selection { background: #7C5CFF; color: #08080B; }
}

@layer components {
  .section-label {
    @apply font-body text-sm uppercase tracking-[0.3em] text-accent;
  }
  .section-number {
    @apply font-body text-sm uppercase tracking-[0.3em] text-text-muted;
  }
}

/* --- Custom cursor --- */
[data-cursor="custom"],
[data-cursor="custom"] * { cursor: none !important; }
.cursor-ring {
  position: fixed;
  top: 0; left: 0;
  width: 28px; height: 28px;
  margin: -14px 0 0 -14px;
  border: 1.5px solid #7C5CFF;
  border-radius: 9999px;
  pointer-events: none;
  z-index: 9998;
  mix-blend-mode: difference;
}

/* --- RevealText masking --- */
.reveal-word { display: inline-block; overflow: hidden; vertical-align: top; }
.reveal-word > [data-word] { display: inline-block; will-change: transform; }

/* --- Loader --- */
.loader {
  position: fixed; inset: 0;
  z-index: 9999;
  display: flex; align-items: center; justify-content: center;
  background: #08080B;
}

/* --- Reduced motion: neutralize transforms --- */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .cursor-ring { display: none !important; }
}
```

- [ ] **Step 2: Create `app/layout.jsx`**

```jsx
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/motion/SmoothScrollProvider";
import CustomCursor from "@/components/motion/CustomCursor";
import Loader from "@/components/motion/Loader";
import Nav from "@/components/layout/Nav";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
  display: "swap",
});

export const metadata = {
  title: "Ian John Samson — Front-End Developer",
  description:
    "Front-end developer building responsive, motion-rich web experiences.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body>
        <Loader />
        <CustomCursor />
        <Nav />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Create temporary `app/page.jsx`** (replaced in Task 12)

```jsx
export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center">
      <h1 className="text-5xl">Editorial Kinetic — scaffold OK</h1>
    </main>
  );
}
```

> NOTE: `layout.jsx` imports components that don't exist yet (`SmoothScrollProvider`, `CustomCursor`, `Loader`, `Nav`). It will not build until Tasks 3–6 and Task 10 create them. Do the build verification in Step 4 only after those tasks, or temporarily comment the imports/usages to smoke-test now.

- [ ] **Step 4: Verify (after Tasks 3–6, 10)** — Run: `npm run dev`; open http://localhost:3000; expect a dark page with the placeholder heading and no console errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: dark theme tokens, fonts, root layout shell"
```

---

### Task 3: Motion config (single source of truth)

**Files:**
- Create: `lib/motion.config.js`

- [ ] **Step 1: Create `lib/motion.config.js`**

```js
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
```

- [ ] **Step 2: Commit**

```bash
git add lib/motion.config.js
git commit -m "feat: central motion config (easings, durations, variants)"
```

---

### Task 4: Smooth scroll provider (Lenis + GSAP)

**Files:**
- Create: `components/motion/SmoothScrollProvider.jsx`

- [ ] **Step 1: Create `components/motion/SmoothScrollProvider.jsx`**

```jsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return; // native scrolling, no hijack

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return children;
}
```

- [ ] **Step 2: Verify** — imported by layout; full verification happens in Task 2 Step 4 once all providers exist.

- [ ] **Step 3: Commit**

```bash
git add components/motion/SmoothScrollProvider.jsx
git commit -m "feat: Lenis smooth scroll synced with GSAP ScrollTrigger"
```

---

### Task 5: Cursor logic + CustomCursor component (TDD on logic)

**Files:**
- Create: `lib/cursor.js`, `vitest.config.js`, `vitest.setup.js`, `lib/cursor.test.js`, `components/motion/CustomCursor.jsx`

- [ ] **Step 1: Create Vitest config `vitest.config.js`**

```js
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.js"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

- [ ] **Step 2: Create `vitest.setup.js`**

```js
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 3: Write the failing test `lib/cursor.test.js`**

```js
import { describe, it, expect } from "vitest";
import { isInteractive } from "@/lib/cursor";

describe("isInteractive", () => {
  it("returns false for null", () => {
    expect(isInteractive(null)).toBe(false);
  });

  it("returns true for a button element", () => {
    const btn = document.createElement("button");
    expect(isInteractive(btn)).toBe(true);
  });

  it("returns true for a child of an anchor", () => {
    const a = document.createElement("a");
    const span = document.createElement("span");
    a.appendChild(span);
    expect(isInteractive(span)).toBe(true);
  });

  it("returns false for a plain div", () => {
    const div = document.createElement("div");
    expect(isInteractive(div)).toBe(false);
  });

  it("returns true for an element flagged data-cursor='interactive'", () => {
    const div = document.createElement("div");
    div.setAttribute("data-cursor", "interactive");
    expect(isInteractive(div)).toBe(true);
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npx vitest run lib/cursor.test.js`
Expected: FAIL — `isInteractive` is not exported / module not found.

- [ ] **Step 5: Create `lib/cursor.js`**

```js
const SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor="interactive"]';

export function isInteractive(el) {
  if (!el || typeof el.closest !== "function") return false;
  return Boolean(el.closest(SELECTOR));
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run lib/cursor.test.js`
Expected: PASS (5 tests).

- [ ] **Step 7: Create `components/motion/CustomCursor.jsx`**

```jsx
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
```

- [ ] **Step 8: Commit**

```bash
git add lib/cursor.js lib/cursor.test.js components/motion/CustomCursor.jsx vitest.config.js vitest.setup.js
git commit -m "feat: custom cursor with tested interactive detection"
```

---

### Task 6: Loader logic + Loader component (TDD on logic)

**Files:**
- Create: `lib/loader.js`, `lib/loader.test.js`, `components/motion/Loader.jsx`

- [ ] **Step 1: Write the failing test `lib/loader.test.js`**

```js
import { describe, it, expect } from "vitest";
import { shouldShowLoader, markLoaderSeen } from "@/lib/loader";

function makeStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
  };
}

describe("loader gating", () => {
  it("shows on a fresh storage", () => {
    expect(shouldShowLoader(makeStorage())).toBe(true);
  });

  it("does not show after being marked seen", () => {
    const s = makeStorage();
    markLoaderSeen(s);
    expect(shouldShowLoader(s)).toBe(false);
  });

  it("defaults to showing if storage throws", () => {
    const broken = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {},
    };
    expect(shouldShowLoader(broken)).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run lib/loader.test.js`
Expected: FAIL — module not found.

- [ ] **Step 3: Create `lib/loader.js`**

```js
const KEY = "ijs_loader_seen";

export function shouldShowLoader(storage) {
  try {
    return storage.getItem(KEY) !== "1";
  } catch {
    return true;
  }
}

export function markLoaderSeen(storage) {
  try {
    storage.setItem(KEY, "1");
  } catch {
    /* ignore */
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run lib/loader.test.js`
Expected: PASS (3 tests).

- [ ] **Step 5: Create `components/motion/Loader.jsx`**

```jsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion.config";
import { shouldShowLoader, markLoaderSeen } from "@/lib/loader";

export default function Loader() {
  // Rendered true on server + first client paint (hydration-safe).
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!shouldShowLoader(window.sessionStorage)) {
      setShow(false);
      return;
    }
    markLoaderSeen(window.sessionStorage);
    const t = setTimeout(() => setShow(false), reduce ? 200 : 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: EASE.expo }}
        >
          <motion.span
            className="font-display text-6xl md:text-8xl text-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE.expo }}
          >
            IAN
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 6: Verify full scaffold now builds** — Run: `npm run dev`. Expect: intro loader covers screen, lifts after ~1.8s, dark placeholder page visible, custom cursor ring follows pointer on desktop, no console errors. (Nav will error until Task 10 — if so, temporarily comment `<Nav />` in layout, verify, then restore after Task 10.)

- [ ] **Step 7: Commit**

```bash
git add lib/loader.js lib/loader.test.js components/motion/Loader.jsx
git commit -m "feat: session-gated intro loader with tested gating logic"
```

---

# PHASE 1 — Motion Primitives, Nav & Hero

### Task 7: RevealText primitive

**Files:**
- Create: `components/motion/RevealText.jsx`

- [ ] **Step 1: Create `components/motion/RevealText.jsx`**

```jsx
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
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/motion/RevealText.jsx
git commit -m "feat: RevealText scroll-reveal primitive"
```

---

### Task 8: RevealImage primitive

**Files:**
- Create: `components/motion/RevealImage.jsx`

- [ ] **Step 1: Create `components/motion/RevealImage.jsx`**

```jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/motion/RevealImage.jsx
git commit -m "feat: RevealImage clip + scale reveal primitive"
```

---

### Task 9: MagneticButton primitive

**Files:**
- Create: `components/motion/MagneticButton.jsx`

- [ ] **Step 1: Create `components/motion/MagneticButton.jsx`**

```jsx
"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticButton({ children, className = "", strength = 0.4 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-flex ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      data-cursor="interactive"
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/motion/MagneticButton.jsx
git commit -m "feat: MagneticButton primitive"
```

---

### Task 10: Nav

**Files:**
- Create: `components/layout/Nav.jsx`

- [ ] **Step 1: Create `components/layout/Nav.jsx`**

```jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { EASE } from "@/lib/motion.config";

const LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/resume.pdf", label: "Resume" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-[100] w-full transition-colors duration-300 ${
        scrolled ? "bg-bg/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-content items-center justify-between px-4 md:px-8">
        <Link href="/#home" className="font-display text-xl font-bold" data-cursor="interactive">
          IJS<span className="text-accent">.</span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex gap-8">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm uppercase tracking-widest text-text-muted transition-colors hover:text-text"
                  data-cursor="interactive"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="text-text md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          data-cursor="interactive"
        >
          <AiOutlineMenu size={26} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[110] flex flex-col bg-bg p-8 md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: EASE.quart }}
          >
            <div className="flex justify-end">
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-text">
                <AiOutlineClose size={26} />
              </button>
            </div>
            <ul className="mt-12 flex flex-col gap-6">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Step 2: Verify** — Run `npm run dev`; the nav bar is visible over the dark page, turns to blurred background on scroll, mobile menu opens/closes.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Nav.jsx
git commit -m "feat: animated dark Nav with mobile drawer"
```

---

### Task 11: Hero (kinetic)

**Files:**
- Create: `components/sections/Hero.jsx`

- [ ] **Step 1: Create `components/sections/Hero.jsx`**

```jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import MagneticButton from "@/components/motion/MagneticButton";
import { EASE } from "@/lib/motion.config";

const ROLES = ["Front-End Developer", "UI Engineer", "React Specialist"];
const NAME = "IAN";

const socials = [
  { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/ian-john-samson-60942a238", external: true },
  { icon: <FaGithub />, href: "https://github.com/EngrFrost", external: true },
  { icon: <AiOutlineMail />, href: "/#contact", external: false },
  { icon: <BsFillPersonLinesFill />, href: "/resume.pdf", external: false },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]"
      />
      <div className="mx-auto w-full max-w-content px-4 md:px-8">
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Hero.jsx
git commit -m "feat: kinetic hero (letter reveal, role swap, magnetic socials)"
```

---

### Task 12: Home page composition (Hero wired)

**Files:**
- Modify: `app/page.jsx`

- [ ] **Step 1: Replace `app/page.jsx`**

```jsx
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 2: Verify** — Run `npm run dev`; loader → hero with animated name, cycling role, magnetic buttons, accent glow. No layout shift, no console errors.

- [ ] **Step 3: Commit**

```bash
git add app/page.jsx
git commit -m "feat: compose home page with hero"
```

---

# PHASE 2 — About & Skills

### Task 13: About section

**Files:**
- Create: `components/sections/About.jsx`
- Modify: `app/page.jsx`

- [ ] **Step 1: Create `components/sections/About.jsx`**

```jsx
import Link from "next/link";
import RevealText from "@/components/motion/RevealText";
import RevealImage from "@/components/motion/RevealImage";
import AboutImg from "@/public/assets/about.jpg";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-content px-4 py-32 md:px-8">
      <span className="section-number">01 — About</span>
      <div className="mt-8 grid gap-12 md:grid-cols-3">
        <div className="md:col-span-2">
          <RevealText as="h2" className="text-4xl md:text-6xl">
            Who I Am
          </RevealText>
          <RevealText className="mt-8 max-w-2xl text-lg text-text-muted">
            Hello, I&apos;m Ian — a dedicated software developer with three years of
            experience. My journey has been a fusion of innovation and collaboration:
            crafting intuitive interfaces, integrating robust back-end systems, and driving
            impactful projects. I thrive in dynamic teams, embrace constant learning, and
            channel my creativity both in and out of coding. Let&apos;s connect and create
            exceptional software solutions together.
          </RevealText>
          <Link
            href="/#projects"
            className="mt-8 inline-block text-accent underline underline-offset-4"
            data-cursor="interactive"
          >
            Check out some of my latest projects.
          </Link>
        </div>
        <RevealImage src={AboutImg} alt="Ian John Samson" className="aspect-[3/4]" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add `<About />` to `app/page.jsx`**

```jsx
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
    </main>
  );
}
```

- [ ] **Step 3: Verify** — Scroll past hero; heading and paragraph reveal word-by-word, image clip-reveals with a subtle zoom.

- [ ] **Step 4: Commit**

```bash
git add components/sections/About.jsx app/page.jsx
git commit -m "feat: About section with text + image reveals"
```

---

### Task 14: Skills data + bento grid

**Files:**
- Create: `lib/skills.js`, `components/sections/Skills.jsx`
- Modify: `app/page.jsx`

- [ ] **Step 1: Create `lib/skills.js`**

```js
import Html from "@/public/assets/skills/html.png";
import Css from "@/public/assets/skills/css.png";
import Javascript from "@/public/assets/skills/javascript.png";
import ReactImg from "@/public/assets/skills/react.png";
import Tailwind from "@/public/assets/skills/tailwind.png";
import Github from "@/public/assets/skills/github1.png";
import Firebase from "@/public/assets/skills/firebase.png";
import NextJS from "@/public/assets/skills/nextjs.png";
import Nodejs from "@/public/assets/skills/node.png";

export const SKILLS = [
  { name: "HTML", img: Html },
  { name: "CSS", img: Css },
  { name: "JavaScript", img: Javascript },
  { name: "React", img: ReactImg },
  { name: "Tailwind", img: Tailwind },
  { name: "Firebase", img: Firebase },
  { name: "Github", img: Github },
  { name: "Next.js", img: NextJS },
  { name: "Node.js", img: Nodejs },
];
```

- [ ] **Step 2: Create `components/sections/Skills.jsx`**

```jsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SKILLS } from "@/lib/skills";
import { fadeUp, stagger } from "@/lib/motion.config";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-content px-4 py-32 md:px-8">
      <span className="section-number">02 — Skills</span>
      <h2 className="mt-8 text-4xl md:text-6xl">What I Can Do</h2>

      <motion.div
        className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {SKILLS.map((skill) => (
          <motion.div
            key={skill.name}
            variants={fadeUp}
            whileHover={{ y: -6, rotate: -1 }}
            className="group flex items-center gap-4 rounded-2xl border border-surface-2 bg-surface p-6 transition-colors hover:border-accent"
            data-cursor="interactive"
          >
            <Image src={skill.img} alt={skill.name} width={44} height={44} />
            <h3 className="text-lg group-hover:text-accent">{skill.name}</h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 3: Add `<Skills />` to `app/page.jsx`** (after `<About />`)

```jsx
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
    </main>
  );
}
```

- [ ] **Step 4: Verify** — Skills tiles stagger in on scroll, lift/tilt + accent border on hover.

- [ ] **Step 5: Commit**

```bash
git add lib/skills.js components/sections/Skills.jsx app/page.jsx
git commit -m "feat: Skills bento grid with staggered reveal"
```

---

# PHASE 3 — Projects, Detail Pages & Transitions

### Task 15: Centralized project data

**Files:**
- Create: `lib/projects.js`

- [ ] **Step 1: Create `lib/projects.js`** (all content ported verbatim from the old pages)

```js
import traverseThumb from "@/public/assets/projects/traverse.png";
import traverseCover from "@/public/assets/projects/traverse2.png";
import capricornThumb from "@/public/assets/projects/capricorn.png";
import capricornCover from "@/public/assets/projects/capricorn2.png";
import hydroilThumb from "@/public/assets/projects/hydroil.png";
import hydroilCover from "@/public/assets/projects/hydroil2.png";
import yellowImg from "@/public/assets/projects/yellow.png";
import pnpImg from "@/public/assets/projects/pnp.png";
import mandaImg from "@/public/assets/projects/manda.png";

export const PROJECTS = [
  {
    slug: "traverse-ph",
    title: "Traverse PH",
    tag: "React JS",
    subtitle: "React JS / Laravel",
    thumb: traverseThumb,
    cover: traverseCover,
    overview:
      "I developed this application utilizing React JS for the front end and Laravel for the back end from my previous work. The app enables users to conveniently search for hotels in the Philippines based on their preferred location. Users can explore hotel names, check-in times, and check-out times, and even filter results based on their desired area. The app also provides a comprehensive list of recommended hotels in the selected area, along with real-time availability information for the specified dates. This project showcases my proficiency in creating a user-friendly interface for hotel search and booking, seamlessly integrating React JS and Laravel.",
    tech: ["React", "Bootstrap 5", "JavaScript", "Laravel"],
    live: "https://traverse.ph/",
    code: null,
  },
  {
    slug: "capricorn",
    title: "Capricorn App",
    tag: "React JS",
    subtitle: "React JS / Node.js",
    thumb: capricornThumb,
    cover: capricornCover,
    overview:
      "I developed this application using React JS for the frontend and Node.js for the backend. The application encompasses three user roles: super admin, admin, and users. Its primary focus is on facilitating bet calculations for users across specific time frames. Following the PCSO outcome, the app determines bet winners if applicable. Additionally, it computes daily income, total losses, and maintains a comprehensive record of user finances. The application boasts a hierarchical structure where the super admin can oversee admin and user accounts across various locations, providing real-time insights into income.",
    tech: ["React", "ANT Design", "JavaScript", "Node.js", "Web Socket", "Hosting"],
    live: "http://159.65.0.151/",
    code: "https://github.com/nerdyCoderr/capricorn",
  },
  {
    slug: "hydroil",
    title: "Hydroil Solutions",
    tag: "HTML/CSS",
    subtitle: "HTML / CSS / Umbraco",
    thumb: hydroilThumb,
    cover: hydroilCover,
    overview:
      "I designed and developed this website utilizing HTML and CSS, while the backend was implemented using the Umbraco CMS. The website serves as a clear and concise platform, effectively showcasing the company profile, services, and capabilities. It offers visitors the opportunity to engage with the company through contact forms. Additionally, the site features a dedicated section highlighting current job openings, seamlessly integrating front-end design with Umbraco CMS for efficient content management.",
    tech: ["HTML", "CSS", "JavaScript", "Umbraco"],
    live: "http://www.hydroil-solutions.com/",
    code: "https://github.com/EngrFrost/Hydroil-Home",
  },
  {
    slug: "yellow-sun",
    title: "Yellow Sun Tech",
    tag: "HTML/CSS",
    subtitle: "HTML / CSS / Umbraco",
    thumb: yellowImg,
    cover: yellowImg,
    overview:
      "I developed this website using HTML and CSS, with the backend powered by the Umbraco CMS. The website serves as a direct and uncomplicated platform, effectively presenting the company identity, services, and capabilities. It offers a seamless means for visitors to connect with the company, enabling easy contact. This project exemplifies my proficiency in crafting a straightforward and user-friendly website, integrating front-end design with the Umbraco CMS.",
    tech: ["HTML", "CSS", "JavaScript", "Umbraco"],
    live: "http://yellowsuntech.com/",
    code: null,
  },
  {
    slug: "pnp-edpcr",
    title: "PNP eDPCR",
    tag: "React JS",
    subtitle: "React JS / Laravel",
    thumb: pnpImg,
    cover: pnpImg,
    overview:
      "I played a key role as the front-end developer in a collaborative team that constructed this application using ReactJS for the front end and Laravel for the backend. The project's central objective revolves around generating and managing reports, catering to a hierarchical structure spanning from lowest-ranking personnel to administrators and super administrators. A noteworthy feature is the ability to sort and filter files and diverse records across an array of report categories. My contribution showcases my adeptness in front-end development, contributing to a robust and dynamic report-management system.",
    tech: ["React JS", "ANT Design", "JavaScript", "Laravel"],
    live: null,
    code: null,
  },
  {
    slug: "manda",
    title: "MANDA",
    tag: "React JS",
    subtitle: "React JS / Laravel",
    thumb: mandaImg,
    cover: mandaImg,
    overview:
      "I actively contributed as a front-end developer within a collaborative team that crafted this application for Mandaluyong Hospital, harnessing ReactJS for the front end and Laravel for the backend. The project is designed with a multifaceted approach, incorporating essential functionalities such as inpatient tracking, outpatient tracking, inventory management, and employee status monitoring. My role exemplifies my prowess in front-end development, helping to create a robust and comprehensive system that seamlessly integrates diverse functionalities to optimize tracking and management processes.",
    tech: ["React JS", "Bootstrap 5", "JavaScript", "Laravel"],
    live: null,
    code: null,
  },
];

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug) || null;
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/projects.js
git commit -m "feat: centralize all project data + images"
```

---

### Task 16: ProjectCard

**Files:**
- Create: `components/sections/ProjectCard.jsx`

- [ ] **Step 1: Create `components/sections/ProjectCard.jsx`**

```jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectCard({ project, index }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block h-[60vh] w-[80vw] shrink-0 overflow-hidden rounded-2xl md:w-[42vw]"
      data-cursor="interactive"
    >
      <motion.div className="h-full w-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}>
        <Image
          src={project.thumb}
          alt={project.title}
          className="h-full w-full object-cover"
          sizes="(max-width: 768px) 80vw, 42vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 md:p-8">
        <span className="section-number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-2 font-display text-3xl md:text-5xl">{project.title}</h3>
        <p className="mt-1 text-text-muted">{project.subtitle}</p>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/ProjectCard.jsx
git commit -m "feat: ProjectCard with hover zoom"
```

---

### Task 17: Projects horizontal rail (pinned)

**Files:**
- Create: `components/sections/Projects.jsx`
- Modify: `app/page.jsx`

- [ ] **Step 1: Create `components/sections/Projects.jsx`**

```jsx
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
      const distance = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance}`,
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
```

> NOTE: On mobile / reduced-motion the track is a normal horizontally-scrollable flex row (no pin). On desktop it pins and scrubs horizontally.

- [ ] **Step 2: Add `<Projects />` to `app/page.jsx`** (after `<Skills />`)

```jsx
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
    </main>
  );
}
```

- [ ] **Step 3: Verify** — On desktop, scrolling through the Projects section pins it and moves cards horizontally; cards zoom on hover. On mobile it scrolls horizontally by swipe. Verify subsequent sections still align after unpin (no leftover scroll offset).

- [ ] **Step 4: Commit**

```bash
git add components/sections/Projects.jsx app/page.jsx
git commit -m "feat: pinned horizontal project rail"
```

---

### Task 18: Dynamic project detail route

**Files:**
- Create: `app/projects/[slug]/page.jsx`, `app/not-found.jsx`

- [ ] **Step 1: Create `app/projects/[slug]/page.jsx`**

```jsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RiRadioButtonFill } from "react-icons/ri";
import { PROJECTS, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const project = getProject(params.slug);
  if (!project) return {};
  return { title: `${project.title} — Ian John Samson` };
}

export default function ProjectPage({ params }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <main className="w-full">
      <div className="relative h-[60vh] w-full">
        <Image src={project.cover} alt={project.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/20" />
        <div className="absolute bottom-0 left-0 w-full">
          <div className="mx-auto max-w-content px-4 pb-10 md:px-8">
            <h1 className="font-display text-5xl md:text-7xl">{project.title}</h1>
            <p className="mt-2 text-text-muted">{project.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-content gap-12 px-4 py-16 md:grid-cols-5 md:px-8">
        <div className="md:col-span-3">
          <span className="section-number">Project</span>
          <h2 className="mt-2 text-3xl">Overview</h2>
          <p className="mt-6 leading-relaxed text-text-muted">{project.overview}</p>
          <div className="mt-8 flex gap-4">
            {project.code && (
              <a
                href={project.code}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-accent px-6 py-3 font-medium text-bg transition-transform hover:scale-105"
                data-cursor="interactive"
              >
                Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-surface-2 px-6 py-3 font-medium transition-colors hover:border-accent hover:text-accent"
                data-cursor="interactive"
              >
                Live Site
              </a>
            )}
          </div>
        </div>

        <aside className="rounded-2xl border border-surface-2 bg-surface p-6 md:col-span-2">
          <p className="font-bold">Technologies</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-1">
            {project.tech.map((t) => (
              <li key={t} className="flex items-center gap-2 text-text-muted">
                <RiRadioButtonFill className="text-accent" /> {t}
              </li>
            ))}
          </ul>
        </aside>

        <Link
          href="/#projects"
          className="text-accent underline underline-offset-4 md:col-span-5"
          data-cursor="interactive"
        >
          ← Back to projects
        </Link>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Create `app/not-found.jsx`**

```jsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <h1 className="font-display text-7xl">404</h1>
        <p className="mt-4 text-text-muted">This page wandered off.</p>
        <Link href="/" className="mt-8 inline-block text-accent underline underline-offset-4">
          Back home
        </Link>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify** — Click a project card → detail page with cover, overview, tech, and Code/Live buttons (only where a URL exists). Visit `/projects/does-not-exist` → dark 404.

- [ ] **Step 4: Commit**

```bash
git add app/projects/[slug]/page.jsx app/not-found.jsx
git commit -m "feat: data-driven project detail route + 404"
```

---

### Task 19: Page-transition enter overlay

**Files:**
- Create: `app/template.jsx`

- [ ] **Step 1: Create `app/template.jsx`**

```jsx
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
```

> NOTE: `template.jsx` re-mounts on every navigation, so this accent panel wipes away (top → bottom) revealing each new route. This is an enter-only transition — robust in the App Router without extra libraries. A full exit-choreography is a possible future enhancement (see spec §11 spirit).

- [ ] **Step 2: Verify** — Navigating home ↔ project pages plays an accent wipe on arrival; no white flash.

- [ ] **Step 3: Commit**

```bash
git add app/template.jsx
git commit -m "feat: accent page-transition enter overlay"
```

---

# PHASE 4 — Contact & Footer

### Task 20: Contact section

**Files:**
- Create: `components/sections/Contact.jsx`
- Modify: `app/page.jsx`

- [ ] **Step 1: Create `components/sections/Contact.jsx`**

```jsx
"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/motion/MagneticButton";
import { fadeUp, stagger } from "@/lib/motion.config";

const inputClass =
  "w-full rounded-lg border border-surface-2 bg-surface px-4 py-3 outline-none transition-colors focus:border-accent";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-content px-4 py-32 md:px-8">
      <span className="section-number">04 — Contact</span>
      <h2 className="mt-8 text-4xl md:text-6xl">Get In Touch</h2>
      <p className="mt-4 max-w-xl text-text-muted">
        I am available for freelance or full-time positions. Contact me and let&apos;s talk.
        <br />
        <span className="text-text">jsamson257@gmail.com</span>
      </p>

      <motion.form
        action="https://getform.io/f/08ebcd37-f5b5-45be-8c13-714f011ce060"
        method="POST"
        encType="multipart/form-data"
        className="mt-12 max-w-2xl"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <label className="text-sm uppercase tracking-widest text-text-muted">Name</label>
            <input className={inputClass} type="text" name="name" />
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <label className="text-sm uppercase tracking-widest text-text-muted">Phone</label>
            <input className={inputClass} type="text" name="phone" />
          </motion.div>
        </div>
        <motion.div variants={fadeUp} className="mt-4 flex flex-col gap-2">
          <label className="text-sm uppercase tracking-widest text-text-muted">Email</label>
          <input className={inputClass} type="email" name="email" />
        </motion.div>
        <motion.div variants={fadeUp} className="mt-4 flex flex-col gap-2">
          <label className="text-sm uppercase tracking-widest text-text-muted">Subject</label>
          <input className={inputClass} type="text" name="subject" />
        </motion.div>
        <motion.div variants={fadeUp} className="mt-4 flex flex-col gap-2">
          <label className="text-sm uppercase tracking-widest text-text-muted">Message</label>
          <textarea className={inputClass} rows={6} name="message" />
        </motion.div>
        <motion.div variants={fadeUp} className="mt-8">
          <MagneticButton>
            <button
              type="submit"
              className="rounded-full bg-accent px-8 py-4 font-medium text-bg transition-transform hover:scale-105"
            >
              Send Message
            </button>
          </MagneticButton>
        </motion.div>
      </motion.form>
    </section>
  );
}
```

- [ ] **Step 2: Add `<Contact />` to `app/page.jsx`** (after `<Projects />`)

```jsx
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 3: Verify** — Fields stagger in on scroll, focus turns border to accent, submit button is magnetic. (Optionally test a real submit to getform.)

- [ ] **Step 4: Commit**

```bash
git add components/sections/Contact.jsx app/page.jsx
git commit -m "feat: animated Contact section wired to getform"
```

---

### Task 21: Footer

**Files:**
- Create: `components/layout/Footer.jsx`
- Modify: `app/layout.jsx`

- [ ] **Step 1: Create `components/layout/Footer.jsx`**

```jsx
import { AiOutlineMail } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";

const links = [
  { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/ian-john-samson-60942a238" },
  { icon: <FaGithub />, href: "https://github.com/EngrFrost" },
  { icon: <AiOutlineMail />, href: "mailto:jsamson257@gmail.com" },
  { icon: <BsFillPersonLinesFill />, href: "/resume.pdf" },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-2">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-6 px-4 py-10 md:flex-row md:px-8">
        <p className="font-display text-xl">
          Ian John Samson<span className="text-accent">.</span>
        </p>
        <div className="flex gap-4">
          {links.map((l, i) => (
            <a
              key={i}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="grid h-11 w-11 place-items-center rounded-full border border-surface-2 transition-colors hover:border-accent hover:text-accent"
              data-cursor="interactive"
            >
              {l.icon}
            </a>
          ))}
        </div>
        <p className="text-sm text-text-muted">© 2026 — Built with Next.js</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Add `<Footer />` to `app/layout.jsx`** (inside `<body>`, after `SmoothScrollProvider`)

```jsx
import Footer from "@/components/layout/Footer";
// ...inside <body>, after </SmoothScrollProvider>'s closing:
//   <SmoothScrollProvider>{children}</SmoothScrollProvider>
//   <Footer />
```

Full body region should read:

```jsx
      <body>
        <Loader />
        <CustomCursor />
        <Nav />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Footer />
      </body>
```

- [ ] **Step 3: Verify** — Footer appears on all routes with working social links.

- [ ] **Step 4: Commit**

```bash
git add components/layout/Footer.jsx app/layout.jsx
git commit -m "feat: global footer"
```

---

# PHASE 5 — Accessibility, Performance & Final Verification

### Task 22: Reduced-motion & keyboard audit

**Files:** none (verification + targeted fixes)

- [ ] **Step 1: Reduced-motion pass** — In Chrome DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce". Reload and verify:
  - Loader disappears near-instantly (≤200ms).
  - No Lenis hijack (native scroll), no custom cursor (native cursor visible).
  - RevealText shows fully (no hidden text), RevealImage shows without clip, Projects rail scrolls vertically/natively (no pin).
  - Hero name/role are visible and static (role does not auto-cycle).
  Fix any element that stays hidden or janks by adding a reduced-motion short-circuit mirroring the pattern already in `SmoothScrollProvider`/`RevealText`.

- [ ] **Step 2: Keyboard pass** — Tab through the whole home page: every link/button reaches focus with a visible ring, mobile menu is operable, project cards are focusable and activate on Enter. If focus rings are missing, add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent` to interactive classes. Add a skip link in `app/layout.jsx` just inside `<body>`:

```jsx
<a
  href="#home"
  className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
>
  Skip to content
</a>
```

Add the `.sr-only` utility to `app/globals.css` if Tailwind's default is insufficient (Tailwind provides `sr-only`/`not-sr-only` by default, so no extra CSS needed).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "fix: reduced-motion + keyboard accessibility pass"
```

---

### Task 23: Performance & build verification

**Files:** none (verification)

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: build succeeds; `/` and all six `/projects/[slug]` routes are statically generated (SSG via `generateStaticParams`).

- [ ] **Step 2: Run production server & Lighthouse**

Run: `npm run start` then open http://localhost:3000 and run Lighthouse (Chrome DevTools) for mobile + desktop.
Expected targets (spec §8): Performance ≥ 90 desktop / ≥ 80 mobile, Accessibility ≥ 95, CLS ≈ 0.
If Performance is low: confirm all `next/image` uses have correct `sizes`, the accent glow blur isn't animated, and no layout shift from the loader (it's `position: fixed`, so it should not shift).

- [ ] **Step 3: Run the full test suite**

Run: `npm run test`
Expected: all tests pass (cursor + loader logic).

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "perf: image sizes + build verification fixes"
```

---

### Task 24: Cross-browser + final acceptance checklist

**Files:** none (verification)

- [ ] **Step 1: Cross-browser** — Verify in latest Chrome, Firefox, Safari (desktop) + iOS Safari + Android Chrome:
  - Smooth scroll works; no stuck pin on the projects rail after resizing (ScrollTrigger `invalidateOnRefresh` handles this).
  - Custom cursor only on fine-pointer/non-touch; touch devices show native behavior and horizontal swipe on the rail.
  - Page transitions play with no flash.

- [ ] **Step 2: Acceptance checklist against spec §9** — Confirm every box:
  - [ ] `next build` passes, all routes generated.
  - [ ] Lighthouse budget met (desktop + mobile).
  - [ ] Every section reveals on scroll; CLS ≈ 0.
  - [ ] `prefers-reduced-motion` produces a fully functional calm experience.
  - [ ] Full keyboard nav + visible focus + skip link.
  - [ ] Page transitions between home and project pages, no flash.
  - [ ] Works across the browser matrix above.
  - [ ] Cursor/magnetic effects disabled cleanly on touch.
  - [ ] `npm run test` passes.

- [ ] **Step 3: Final commit & push**

```bash
git add -A
git commit -m "chore: final verification for editorial-kinetic revamp"
git push -u origin feat/editorial-kinetic-revamp
```

- [ ] **Step 4:** Open a PR (or use `superpowers:finishing-a-development-branch`) to merge into `main`.

---

## Self-Review (author's check against the spec)

**Spec coverage:**
- Dark editorial theme + violet accent → Task 2 (tokens), used everywhere. ✅
- Kinetic typography (letter-by-letter, word-swap, line reveals) → Hero (Task 11), RevealText (Task 7). ✅
- Lenis + GSAP + Framer split → Tasks 4, 7, 8, 17 (GSAP), 5, 9, 11, 14, 19, 20 (Framer). ✅
- Intro loader, custom cursor, magnetic buttons → Tasks 6, 5, 9. ✅
- Bento skills → Task 14. ✅
- Horizontal pinned projects rail → Task 17; hover zoom → Task 16. ✅
- Keep & restyle detail pages via animated transition → Tasks 15, 18, 19. ✅
- Contact wired to existing getform endpoint → Task 20. ✅
- Footer + Nav → Tasks 21, 10. ✅
- Reduced-motion, performance, a11y, verification → Tasks 22–24. ✅
- Fonts via next/font (Space Grotesk display / Inter body — resolves spec §12 open question toward the zero-self-hosting fallback; swap to Clash Display later by replacing the `Space_Grotesk` import in `app/layout.jsx` with a `next/font/local` Clash Display face). ✅
- Content preserved verbatim → Tasks 13 (about/skills), 15 (projects). ✅
- 3D/WebGL deferred → not in plan (spec §11). ✅

**Placeholder scan:** No TBD/TODO; all code blocks complete; project prose ported in full.

**Type/name consistency:** `isInteractive`, `shouldShowLoader`/`markLoaderSeen`, `getProject`/`PROJECTS`, `SKILLS`, `EASE`/`DUR`/`STAGGER`/`GSAP_EASE`/`fadeUp`/`stagger` used consistently across tasks. Import alias `@/` configured in Task 1 and used throughout.

**Note on scope:** This is one cohesive revamp delivered in 5 phases; each phase leaves the site in a working, buildable state, so it is appropriate as a single plan.

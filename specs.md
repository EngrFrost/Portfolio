# Portfolio Revamp — "Editorial Kinetic" Design Spec

**Date:** 2026-07-20
**Status:** Approved for planning
**Owner:** Ian (Kitsuu42)
**Topic:** Revamp the existing static Next.js portfolio into a heavy-animation, eye-catching, award-site-caliber experience for a creative/agency audience — executed tastefully and performantly.

---

## 1. Goal & Vision

Transform the current tutorial-grade, static, light-theme portfolio into a **dark, editorial, kinetic** portfolio with award-site energy — the kind of motion-rich site that impresses creative and agency viewers — while staying fast, accessible, and readable.

**One-line art direction:** *Big kinetic typography on near-black, one electric accent, choreographed scroll — every motion carries meaning, nothing janks.*

The existing **content stays the same** (name "Ian", role, about copy, the current 9 skills, and the current projects: Netflix, Crypto, Twitch, Property, PnP, Manda). This is a **visual + motion + stack revamp**, not a content rewrite.

---

## 2. Audience & Success Criteria

- **Primary audience:** Creative / agency clients. They expect bold, memorable, motion-forward work — this site is itself a portfolio piece proving front-end craft.
- **Success looks like:**
  1. Immediate "wow" in the first 3 seconds (hero + intro).
  2. Smooth, choreographed motion throughout that feels intentional, not decorative.
  3. Loads fast and runs at ~60fps on mid-range devices.
  4. Fully usable with reduced-motion enabled and via keyboard.
  5. Content remains clear and readable despite the heavy motion.

---

## 3. Locked Decisions

| Decision | Choice | Rationale |
|---|---|---|
| **Direction** | A — Editorial Kinetic | Best fit for creative/agency audience + "rich but tasteful" motion. |
| **Stack** | Modernize: latest Next.js (App Router) + React 19 | Cleanest base for heavy animation; future-proof. |
| **Language** | Stay JavaScript (`.jsx`) | Keep churn low; content unchanged. TS is out of scope. |
| **Content** | Keep current content, restyle only | Focus effort on visual/motion revamp. |
| **Motion intensity** | Rich but tasteful | Scroll reveals, transitions, magnetic buttons, parallax, kinetic type — fast + reduced-motion-aware. |
| **Accent color** | Refined electric-violet system (brand-continuous) | Keeps brand DNA (#5651e5) while glowing on near-black. |
| **3D / WebGL** | Deferred to optional later phase | Ship high-impact 2D kinetic first; lower risk. |
| **Project detail pages** | Keep & restyle, animated page transition | Preserve routing; reach via overlay-wipe transition from the project rail. |

---

## 4. Design Language

### 4.1 Color palette (dark editorial)

| Token | Value | Use |
|---|---|---|
| `bg` | `#08080B` | Page background (near-black). |
| `surface` | `#111117` | Cards, elevated panels. |
| `surface-2` | `#1A1A22` | Hover/nested surfaces, borders. |
| `text` | `#F5F4F2` | Primary text (off-white, not pure white). |
| `text-muted` | `#8A8A96` | Secondary/meta text, section numbers. |
| `accent` | `#7C5CFF` | Electric violet — primary accent (brand-continuous). |
| `accent-bright` | `#9E86FF` | Hover/glow highlight. |
| `accent-dim` | `rgba(124,92,255,0.14)` | Glow washes, focus rings, subtle fills. |

Discipline: **one accent family only.** Violet carries all emphasis; no competing hues. Glow effects use `accent-dim` behind kinetic text and interactive elements.

### 4.2 Typography

- **Display (kinetic headlines):** a bold geometric/grotesque variable font. **Default:** `Clash Display` (self-hosted via `next/font/local`, from Fontshare — free) with `Space Grotesk` (Google) as the swappable fallback if we prefer zero self-hosting. Used oversized (clamp-scaled) for hero + section titles.
- **Body:** `Inter` (variable, via `next/font/google`) for paragraphs, nav, labels.
- **Scale:** fluid `clamp()` type scale; hero headline is intentionally huge (viewport-relative). Editorial section numbering (`01 — About`) in `text-muted`.

### 4.3 Motion tokens (single source of truth)

Defined once in `lib/motion.config.js` and consumed everywhere so the site feels choreographed:

- **Durations:** `fast 0.3s`, `base 0.6s`, `slow 1.0s`, `intro 1.4s`.
- **Easing:** primary `easeOutExpo` = `cubic-bezier(0.16, 1, 0.3, 1)`; secondary `easeInOutQuart` for transitions.
- **Stagger:** `0.05–0.08s` per item for text lines / grids.
- **Reveal defaults:** translateY `24px` + opacity `0→1` + optional clip-path for text lines.

### 4.4 Layout principles

- Generous whitespace, oversized type, strong left-alignment for editorial feel.
- Max content width ~1240px (matches current), but hero/rail can break full-bleed.
- Bento grid for Skills; horizontal rail for Projects.

---

## 5. Tech Stack & Dependencies

- **Next.js** (latest, App Router) + **React 19**.
- **Tailwind CSS** with a token layer mapping the palette/motion values above.
- **Motion libraries:**
  - **Lenis** — smooth scroll, synced to GSAP's ticker.
  - **GSAP + ScrollTrigger** — scroll choreography: reveals, pinning, parallax, horizontal project rail.
  - **Framer Motion ("Motion")** — component/layout transitions, page (route) transitions, magnetic buttons, custom cursor state.
- **react-icons** — keep (already used for socials/UI icons).
- **next/font** — font loading (local for Clash Display, google for Inter).

**Deferred (out of scope this revamp):** React Three Fiber / Three.js (optional 3D hero accent phase).

---

## 6. Architecture & Component Structure

Small, focused, reusable units. Motion primitives are decoupled from content sections.

```
app/
  layout.jsx            # fonts, <SmoothScrollProvider>, <CustomCursor>, <Loader>, metadata
  page.jsx              # home: composes sections in order
  projects/[slug]/...   # restyled project detail pages (from current netflix/crypto/etc.)
  globals.css           # tailwind + tokens + reduced-motion base

components/
  layout/
    Nav.jsx             # sticky/animated nav + menu
    Footer.jsx
  motion/               # MOTION PRIMITIVES (reusable, content-agnostic)
    SmoothScrollProvider.jsx  # Lenis + GSAP sync
    CustomCursor.jsx          # dot + ring, grows over interactive els
    Loader.jsx                # branded intro, session-gated
    RevealText.jsx            # line/letter clip+stagger reveal (ScrollTrigger)
    RevealImage.jsx           # scale/clip + parallax image reveal
    MagneticButton.jsx        # magnetic hover wrapper
    PageTransition.jsx        # route overlay-wipe
  sections/
    Hero.jsx            # (replaces Main.jsx)
    About.jsx
    Skills.jsx          # bento grid
    Projects.jsx        # horizontal rail + ProjectCard
    ProjectCard.jsx
    Contact.jsx

lib/
  motion.config.js      # durations, easings, stagger, variants (single source of truth)
  projects.js           # existing project data (title, img, slug, links) centralized
```

**Isolation checks:** each motion primitive answers "what does it do / how do you use it / what it depends on" independently. Section components consume primitives + data; they don't reimplement motion. Motion values never hard-coded in sections — always from `motion.config`.

---

## 7. Motion System (the core)

### 7.1 Global
- **Smooth scroll:** Lenis drives scroll; GSAP ScrollTrigger reads Lenis position. One provider at the root.
- **Custom cursor:** dot + trailing ring; ring scales up and accent-tints over interactive elements (links, buttons, cards). Hidden on touch devices; disabled under reduced-motion (native cursor shown).
- **Intro loader:** first-load branded sequence (name/percentage reveal → curtain lift). **Session-gated** (e.g. `sessionStorage`) so it doesn't replay on internal navigation. Skippable/short under reduced-motion (instant).

### 7.2 Per section
- **Hero:** headline builds **letter-by-letter** (stagger); role text **word-swaps** through alternatives on a timeline; subtle parallax on scroll; the 4 social/resume buttons are **magnetic**. Scroll cue at bottom.
- **About:** text reveals **line-by-line** (clip + translateY) on scroll; portrait image does a **scale/clip reveal** + slow parallax.
- **Skills:** **bento grid** of the 9 skills; **staggered** entrance; each tile has hover **tilt + accent glow**.
- **Projects:** **horizontal scroll rail**, pinned while scrolling (ScrollTrigger). Each `ProjectCard`: image **parallax/zoom** on hover, title reveal; click triggers **page transition** (overlay wipe) into the restyled detail page.
- **Project detail pages:** restyled to the dark theme; hero image reveal; back-transition to home.
- **Contact:** form fields animate in; inputs have focus motion; **magnetic** submit button.
- **Footer:** social links (LinkedIn, GitHub, Email, Resume) with hover motion.

### 7.3 Page transitions
- Route changes (home ↔ project pages) play an **accent overlay wipe** via Framer Motion (App Router transition), timed with `easeInOutQuart`. No white flash.

---

## 8. Accessibility & Performance (non-negotiable)

- **`prefers-reduced-motion`:** a global switch. When on — disable Lenis scroll-hijack, custom cursor, letter-by-letter builds, parallax, pinning; replace with simple opacity fades or instant states. Content and navigation fully functional.
- **Performance budget:** ~60fps on mid-range devices. Transform/opacity animations only (GPU-friendly); disciplined `will-change`; kill ScrollTriggers on unmount. Lazy-load below-the-fold; `next/image` for all imagery; `next/font` with `display: swap`.
- **Semantics & keyboard:** semantic landmarks, logical heading order, visible focus states (accent ring), all interactive elements keyboard-operable, `alt` text on images, skip-to-content link.
- **Targets:** Lighthouse Performance ≥ 90 desktop / ≥ 80 mobile; Accessibility ≥ 95.

---

## 9. Verification / Acceptance Criteria

This work is largely visual; verification is a mix of automated checks and manual passes:

- [ ] `next build` passes with no errors.
- [ ] Lighthouse meets the budget in §8 (desktop + mobile).
- [ ] Every section reveals/animates on scroll as specified; no layout shift (CLS).
- [ ] `prefers-reduced-motion: reduce` produces a fully functional, calm experience (verified in devtools emulation).
- [ ] Full keyboard navigation works; focus visible everywhere; skip link works.
- [ ] Page transitions between home and project pages play without flash.
- [ ] Works on latest Chrome, Firefox, Safari (desktop) + iOS Safari + Android Chrome.
- [ ] Custom cursor/magnetic effects disabled cleanly on touch devices.
- [ ] Light unit tests pass for logic-bearing primitives: Loader session-gating, CustomCursor interactive-state toggling.

---

## 10. Phased Roadmap (for the implementation plan)

- **Phase 0 — Modernize scaffold:** upgrade to Next App Router + React 19; add Tailwind token layer, fonts, deps (Lenis, GSAP, Framer Motion); set up `motion.config`, `SmoothScrollProvider`, `CustomCursor`, `Loader` shell; dark theme baseline.
- **Phase 1 — Hero + Nav + motion primitives:** `RevealText`, `RevealImage`, `MagneticButton`; kinetic hero; animated nav.
- **Phase 2 — About + Skills:** line reveals; image reveal; bento grid with staggered/tilt.
- **Phase 3 — Projects rail + detail pages + page transitions:** horizontal pinned rail, `ProjectCard`, restyle detail pages, overlay-wipe transitions; centralize project data in `lib/projects.js`.
- **Phase 4 — Contact + Footer.**
- **Phase 5 — Accessibility + performance pass + polish:** reduced-motion, Lighthouse, cross-browser, focus states, tests.
- **Phase 6 (optional, future) — 3D hero accent:** React Three Fiber element in the hero.

---

## 11. Out of Scope (this revamp)

- Content rewrite (projects, copy, skills stay as-is).
- TypeScript migration.
- Light-mode theme (dark-first; light toggle is a possible future add).
- 3D/WebGL (Phase 6, optional/future).
- CMS or backend for projects (data stays in a local `projects.js`).

---

## 12. Open Questions

- **Display font:** default is `Clash Display` (self-hosted). Confirm acceptable, or switch to `Space Grotesk` (Google, zero self-hosting) during Phase 0. *(Non-blocking — easily swapped.)*

# VELARYON — Product Requirements Document

## Original Problem Statement
Build a complete, production-quality, ultra-modern website for VELARYON, an early-stage maritime autonomy startup. Creative direction: CINEMATIC MARITIME × ADVANCED ROBOTICS × EDITORIAL MINIMALISM × PRECISION ENGINEERING. Quality bar: Saronic / Blue Water Autonomy / Sea Machines, but newer and more cinematic. Signature logo loader that becomes the navbar, cinematic hero, scroll-driven storytelling, multi-page architecture (Home, Mission, Platform, Technology, How It Works, Company, Contact), strict no-fabrication content policy (early-stage honesty), heavy/controlled/precise motion, accessibility (prefers-reduced-motion), performance-first (poster-first hero, lazy loading, no decorative WebGL).

## Architecture
- Frontend: React 19 + TypeScript + Vite + Tailwind CSS v4 + motion (framer-motion) + Lenis smooth scroll
- Backend: FastAPI + MongoDB (motor) — contact enquiry endpoints only
- Assets: user-provided logo (processed to transparent mark + wordmark) and 3 vessel renders (converted to WebP) in /app/frontend/public/assets

## User Personas
- Investors evaluating the founding team and vision
- Strategic partners (maritime/defense industry)
- Technology collaborators and future hires

## Core Requirements (static)
- One connected story: ship arrives → why autonomy → platform → how it works → missions → why Velaryon → roadmap → team → partner CTA → ship departs
- Alternate dark cinematic and bright editorial sections
- Chapter labels (01 / MISSION etc.), huge editorial headlines, restrained body copy
- No invented specs, customers, deployments, or achievements — "designed to / concept / being developed for" language
- data-testid on all interactive elements

## Implemented
### V1 (2026-09-17)
- Signature Velaryon loader → navbar transition, Lenis smooth scrolling, cinematic hero, mission scale section, platform reveal, autonomy teaser, technology pillars, missions, philosophy, roadmap, company teaser, final CTA, footer; pages: /mission /platform /technology /how-it-works /company /contact /privacy /terms; backend POST/GET /api/contact.

### V2 Transformation (2026-09-18)
- Logo visibility system: processed exact logo geometry into high-contrast off-white variants (logo-mark-light / logo-wordmark-light) for dark surfaces; original dark version retained for light surfaces
- Loader rework: horizon + haze, perspective approach with pitch/focus/bob, center-out bow wake (inner/outer/ripple with turbulence displacement), wordmark tracking reveal, physical handoff into navbar
- Hero: living ocean (26s camera push, drifting mist, pointer-based depth separation between image and typography), video-ready architecture (HERO_VIDEO constant, poster-first crossfade), VELARYON / AUSTRALIA + STATUS / DEVELOPMENT labels
- Mission: extended ocean pullback, conceptual nodes, faint Australian coastline outline, new captions (THE OCEAN IS VAST / AUTONOMY CHANGES THE SCALE)
- Platform family: central registry src/lib/platforms.ts (V/01 VIPER, V/02 HAVOC, V/03 HUNTER — working names). VIPER = silhouette + sweeping light line + clip reveal + technical edge band; HAVOC = 5-strip mechanical layered assembly with architectural labels; HUNTER = perception field overlay (field lines, sensing cone, track boxes, OBSERVE/INTERPRET/CONNECT); finale strip of all three + CTA
- Autonomy loop (home): one scene transforming through PERCEIVE → UNDERSTAND → DECIDE → ACT → CONNECT
- Human + Machine typography moment with remote-operations link visual
- Technology lab (light): scroll-driven photographic → edge → silhouette → system-relationships morph + hover/tap system highlights
- Missions: 5 conceptual categories with environment-changing imagery
- Philosophy: vessel silhouette passes behind typography → outline → three platform silhouettes → AUTONOMOUS × SOFTWARE-DEFINED × MISSION-ADAPTABLE
- Development: maritime route visualization, waypoints from path measurement, vessel marker travels with scroll, CONCEPT marked current
- Final CTA: vessel recedes toward horizon on scroll
- Footer: final scene — massive submerged mark (~64vw) with hover water-refraction (feTurbulence displacement, desktop), floating minimal nav, one-shot wake easter egg at absolute bottom
- Custom cursor (dot + ring, context labels via data-cursor, touch-disabled), route-style scroll progress indicator (home only)
- Navbar: PLATFORMS/AUTONOMY links, active chapter dot indicator
- Platform page: family intro + three vessel experiences reused + layers viz + honest empty spec area

## Verified
- Backend: POST/GET /api/contact via curl (V1)
- Screenshots: loader, hero, viper/havoc/hunter mid-sequences, autonomy ACT scene, technology lab, development route + marker, footer mark + wake, mobile hero/viper/footer
- Known limits: hero video not wired (no asset); team profiles placeholder

## Backlog / Next Tasks
- P0: Replace placeholder team profiles/photos with real founders (user to supply)
- P0: Swap in final company copy, real email address, LinkedIn URL, privacy/terms text
- P1: Optional cinematic hero video (poster-first crossfade architecture ready; needs a 6-10s loop asset)
- P1: Newsroom / Careers pages when real content exists
- P2: Admin view for contact enquiries
- P2: Custom cursor / magnetic links refinement, mobile swipe diagrams

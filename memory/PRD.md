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

## Implemented (2026-09-17)
- Signature Velaryon loader: bow mark approaches from horizon, wake ripples propagate, wordmark clip-reveal, then the lockup physically scales/translates into the top-left navbar position while the hero reveals (reduced-motion fallback included)
- Lenis smooth momentum scrolling + framer-motion scroll choreography throughout
- Home: cinematic hero (masked line reveal, scroll parallax/darkening), 01 Mission ocean scale-zoom sticky section, editorial marquee, 02 Platform bright reveal with technical annotations, 03 Autonomy teaser (PERCEIVE/UNDERSTAND/DECIDE/ACT sticky sequence), 04 Technology asymmetric pillars with animated SVGs, 05 Missions interactive tabs with crossfading imagery, typographic engineering philosophy sequence, 06 Forward roadmap with animated progress line (CONCEPT marked current), 07 company teaser, cinematic final CTA, minimal footer
- Pages: /mission, /platform (annotated profile, philosophy, scroll-driven conceptual layer visualization, honest empty spec area), /technology (4 pillars detail), /how-it-works (7-scene sticky scrollytelling: MISSION→DEPLOY→PERCEIVE→UNDERSTAND→DECIDE→ACT→CONNECT→MISSION COMPLETE), /company (editorial blocks + 3 placeholder team profiles), /contact (form → MongoDB), /privacy, /terms (placeholders)
- Backend: POST/GET /api/contact (enquiries stored in MongoDB)

## Verified
- POST /api/contact + GET list via curl; contact form e2e submit shows success panel
- Screenshots: loader, hero, mission scale, platform annotations, autonomy teaser, how-it-works scenes 1/3/end, company team, final CTA, platform layers

## Backlog / Next Tasks
- P0: Replace placeholder team profiles/photos with real founders (user to supply)
- P0: Swap in final company copy, real email address, LinkedIn URL, privacy/terms text
- P1: Optional cinematic hero video (poster-first crossfade architecture ready; needs a 6-10s loop asset)
- P1: Newsroom / Careers pages when real content exists
- P2: Admin view for contact enquiries
- P2: Custom cursor / magnetic links refinement, mobile swipe diagrams

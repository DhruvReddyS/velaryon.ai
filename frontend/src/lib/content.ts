/**
 * Single source of truth for all public copy.
 * Platform names, features, team and market data are placeholders — swap them
 * here and every page, slide, deck and HUD label updates with it.
 *
 * Rule: never add a figure here that you can't cite. Empty arrays hide their
 * sections rather than showing filler.
 */
import { velaryonMedia as media } from "@/lib/velaryonMedia";

export const BRAND = {
  name: "Velaryon",
  tagline: "Intelligence at sea.",
  category: "Autonomous maritime systems",
  pillars: ["Platform", "Software", "Autonomy"],
  email: "hello@velaryon.com",
  status: "In development",
  year: 2026,
};

/** Home deck chapter index — drives the HUD, rail, keyboard stops and slide numbers. */
export const CHAPTERS = [
  { id: "cover", label: "Cover" },
  { id: "ocean", label: "Problem" },
  { id: "thesis", label: "Insight" },
  { id: "fleet", label: "Product" },
  { id: "loop", label: "System" },
  { id: "coverage", label: "Proof" },
  { id: "whynow", label: "Why now" },
  { id: "roadmap", label: "Roadmap" },
  { id: "ask", label: "Join" },
  { id: "horizon", label: "Horizon" },
] as const;

export type ChapterId = (typeof CHAPTERS)[number]["id"];
export const chapterNo = (id: ChapterId) => String(CHAPTERS.findIndex((c) => c.id === id) + 1).padStart(2, "0");

export const OCEAN_BEATS = [
  { img: media.ocean.establishing, line: ["The ocean", "is vast."], note: "Open water, in every direction." },
  { img: media.deck.oceanAerial, line: ["No crew can be", "everywhere."], note: "Presence at sea is still measured in hulls and hands." },
  { img: media.ocean.distantWake, line: ["One wake", "is not a watch."], note: "Coverage ends where the vessel's horizon ends." },
  { img: media.ocean.distantVessel, line: ["Autonomy", "changes the scale."], note: "Software that stays on station." },
];

/** Widely cited public figures only — each carries its source. */
export const OCEAN_FACTS = [
  { value: 71, suffix: "%", label: "of Earth's surface is ocean", source: "NOAA" },
  { value: 80, suffix: "%", label: "of global trade by volume moves by sea", source: "UNCTAD" },
];

export const THESIS = "Presence at sea shouldn't be limited by the number of people you can put on it.";

export const WHY_NOW = [
  { n: "01", title: "Autonomy has matured", copy: "Perception, planning and behaviour software proven in adjacent domains can now be engineered for the sea." },
  { n: "02", title: "Compute got small", copy: "Sensors and on-board compute are now efficient enough to live on compact, uncrewed surface platforms." },
  { n: "03", title: "Presence must scale", copy: "The demand for persistent maritime awareness keeps growing. Crewed presence can't grow with it." },
];

/**
 * Market sizing — intentionally empty until sourced figures are approved.
 * Shape: { value: "$X.XB", label: "…", source: "…" }. Section hides while empty.
 */
export const MARKET: { value: string; label: string; source: string }[] = [];

export interface Vessel {
  id: string;
  index: string;
  name: string;
  role: string;
  tagline: string;
  summary: string;
  detail: string;
  img: string;
  position: string;
  traits: string[];
  video?: { desktop: string; mobile: string; poster: string };
}

/** Names are working placeholders — replace when final designations are approved. */
export const FLEET: Vessel[] = [
  {
    id: "force",
    index: "V/01",
    name: "Platform One",
    role: "Mission adaptable",
    tagline: "Shaped around the mission.",
    summary: "A platform study where power, autonomy and mission integration are designed as one architecture from day one.",
    detail: "This study places the mission area at the centre of the design. Platform, power and autonomy are considered together as one architecture rather than as separate additions.",
    img: media.platformVision.concept01.hero,
    position: "50% 55%",
    traits: ["Common architecture", "Adaptable integration", "Autonomous surface"],
    video: { desktop: media.platformVision.concept01.film, mobile: media.platformVision.concept01.filmMobile, poster: media.platformVision.concept01.poster },
  },
  {
    id: "form",
    index: "V/02",
    name: "Platform Two",
    role: "Form & integration",
    tagline: "Geometry in service of the system.",
    summary: "A low, angular study exploring how external form and onboard systems can be considered as a single coherent whole.",
    detail: "The low, angular form explores how platform architecture and onboard systems can be considered as a coherent whole. It is a direction for engineering investigation, not a published product specification.",
    img: media.platformVision.concept02.hero,
    position: "50% 60%",
    traits: ["Integrated geometry", "Compact compute", "Low profile"],
  },
  {
    id: "awareness",
    index: "V/03",
    name: "Platform Three",
    role: "Awareness & connection",
    tagline: "The environment becomes information.",
    summary: "A systems-led study where perception, compute and connection belong to one integrated platform.",
    detail: "This study leads with situational understanding. Its visible architecture expresses a platform direction in which perception, compute and connection belong to one integrated system.",
    img: media.platformVision.concept03.hero,
    position: "50% 55%",
    traits: ["Integrated perception", "On-platform intelligence", "Human-directed"],
  },
];

export const vesselById = (id?: string) => FLEET.find((v) => v.id === id);

export const RENDER_NOTE = "Design visualisation. Not a photograph of a built vessel.";

/**
 * Zones visible on the engineering visualisation (percent of a 16:9 frame).
 * Labels describe design intent for each zone, not verified internals.
 */
export const ANATOMY = [
  { id: "hull", x: 13, y: 57, side: "right", dir: "up", label: "Bow & hull form", copy: "Hull geometry is treated as part of the system and shaped around what it carries." },
  { id: "super", x: 52, y: 45, side: "left", dir: "down", label: "Superstructure", copy: "Design intent: a protected volume for power, compute and integration." },
  { id: "mast", x: 60.8, y: 21, side: "left", dir: "up", label: "Mast", copy: "Design intent: an elevated zone for sensing with a clear view of the horizon." },
  { id: "antennas", x: 65, y: 13, side: "right", dir: "up", label: "Antenna array", copy: "Design intent: links that keep mission state visible to people ashore." },
  { id: "aft", x: 79, y: 51, side: "right", dir: "down", label: "Aft deck", copy: "Design intent: adaptable space for future mission integration." },
];

export const LOOP = [
  { n: "01", t: "Perceive", h: "Read the environment.", c: "Information from the platform becomes a coherent view of water, weather and traffic." },
  { n: "02", t: "Understand", h: "Make sense of change.", c: "Observations are fused into a working model of the surrounding maritime world." },
  { n: "03", t: "Decide", h: "Stay inside the mission.", c: "Mission logic selects an action within the objectives, rules and limits an operator defines." },
  { n: "04", t: "Act", h: "Execute. Observe. Repeat.", c: "The platform carries out the action, watches the result and begins the loop again." },
  { n: "05", t: "Connect", h: "Return understanding.", c: "Mission state stays available to the people directing the wider operation." },
];

export const MISSIONS = [
  { n: "01", t: "Maritime awareness", c: "Contributing observations from the water to a wider operating picture.", img: media.deck.aerialRun, position: "60% 50%" },
  { n: "02", t: "Patrol & presence", c: "Sustained, human-directed activity across coastlines, approaches and remote waters.", img: media.deck.rearCoast, position: "55% 55%" },
  { n: "03", t: "Survey & monitoring", c: "Repeatable behaviour for environmental, hydrographic and infrastructure observation.", img: media.deck.aerialCoast, position: "50% 50%" },
  { n: "04", t: "Maritime support", c: "Adaptable architecture for future operational and logistics configurations.", img: media.hero.dusk, position: "60% 50%" },
];

/** `current` marks the active stage; everything after it reads as upcoming. */
export const ROADMAP_CURRENT = 0;
export const ROADMAP = [
  { n: "01", t: "Concept", c: "System architecture and platform directions defined." },
  { n: "02", t: "Engineering", c: "Turning the selected architecture into testable systems." },
  { n: "03", t: "Prototype", c: "Physical and software systems built for the water." },
  { n: "04", t: "Sea trials", c: "Behaviour evaluated across rising mission complexity." },
  { n: "05", t: "Validation", c: "Evidence gathered against real mission profiles." },
  { n: "06", t: "Scale", c: "A fleet built on one common autonomy core." },
];
export const roadmapStatus = (i: number) => (i < ROADMAP_CURRENT ? "Complete" : i === ROADMAP_CURRENT ? "Now" : i === ROADMAP_CURRENT + 1 ? "Next" : "Planned");

export const AUDIENCES = [
  { k: "Investors", t: "Back the build.", c: "An early seat in autonomous maritime infrastructure.", to: "/contact" },
  { k: "Partners", t: "Shape the missions.", c: "Operators and industry defining what the platform must do.", to: "/contact" },
  { k: "Engineers", t: "Build the core.", c: "Autonomy, perception and naval systems, built from first principles.", to: "/company" },
];

/**
 * Founding team — add approved profiles here. While empty, team sections show
 * a single "details on request" line instead of placeholder cards.
 * Shape: { name: "…", role: "…", focus: "…", img?: "/path.webp" }
 */
export const CREW: { name: string; role: string; focus: string; img?: string }[] = [];

export const DISCIPLINES = [
  { t: "Autonomy", c: "Planning, behaviour arbitration and mission logic." },
  { t: "Perception", c: "Sensor fusion and world modelling at sea." },
  { t: "Naval architecture", c: "Hull form and platform integration." },
  { t: "Embedded systems", c: "Power, compute and on-board reliability." },
];

export const NAV = [
  { label: "Mission", to: "/mission" },
  { label: "Fleet", to: "/platforms" },
  { label: "Autonomy", to: "/how-it-works" },
  { label: "Technology", to: "/technology" },
  { label: "Company", to: "/company" },
];

export const TECH = [
  { n: "01", t: "Perception", c: "Multi-sensor perception fused into a single, consistent picture of the environment around the platform." },
  { n: "02", t: "Autonomy software", c: "Mission logic, navigation rules and behaviour arbitration running on-platform, with defined limits and explainable outputs." },
  { n: "03", t: "Systems integration", c: "A common electrical, data and mechanical architecture so sensing, compute and mission systems integrate rather than bolt on." },
  { n: "04", t: "Remote operations", c: "Shore-side supervision that shows operators what the platform sees and lets them redirect at any time." },
  { n: "05", t: "Platform architecture", c: "Hull forms and superstructures shaped around the systems they carry, with every variant sharing one approach." },
];

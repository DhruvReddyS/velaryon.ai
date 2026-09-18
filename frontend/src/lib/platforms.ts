// Central platform registry. Working names pending company approval — change here only.
export interface Platform {
  id: string;
  code: string;
  name: string;
  role: string;
  tagline: string;
  summary: string;
  detail: string;
  descriptors: { k: string; v: string }[];
  exploring: string[];
  img: string;
  imgPosition: string;
  alt: string;
  video?: { desktop: string; mobile: string; poster: string };
}

export const PLATFORMS: Platform[] = [
  {
    id: "viper",
    code: "V / 01",
    name: "VIPER",
    role: "Low-profile autonomous surface platform",
    tagline: "Low profile. High intent.",
    summary:
      "A compact autonomous surface platform concept with a faceted, low-signature form. Designed around integrated architecture and mission adaptability.",
    detail:
      "VIPER is the most compact concept in the family. Its faceted hull form and enclosed superstructure are shaped around a single design idea: a small platform that carries integrated systems rather than bolted-on additions. The concept explores how much autonomy and sensing can live inside a low-profile form.",
    descriptors: [
      { k: "FORM", v: "Low-profile, faceted hull" },
      { k: "ARCHITECTURE", v: "Integrated systems" },
      { k: "OPERATION", v: "Autonomous surface" },
      { k: "CONFIGURATION", v: "Mission adaptable" },
    ],
    exploring: [
      "Enclosed superstructure with integrated sensing mast",
      "Compact autonomy and compute architecture",
      "Adaptable internal volume for mission systems",
    ],
    img: "/assets/viper.webp",
    imgPosition: "50% 60%",
    alt: "Velaryon VIPER concept — low-profile faceted autonomous surface vessel",
  },
  {
    id: "havoc",
    code: "V / 02",
    name: "HAVOC",
    role: "Mission-configurable autonomous maritime platform",
    tagline: "Built around the mission.",
    summary:
      "A mission-configurable autonomous maritime platform concept, exploring adaptable systems integration across demanding maritime environments.",
    detail:
      "HAVOC is organised around its deck. The concept treats the mission area as the centre of the design, with hull, power and autonomy arranged to support whatever systems a given mission requires. It is the family's exploration of configurability: one platform, many fits.",
    descriptors: [
      { k: "FORM", v: "Extended mission deck" },
      { k: "ARCHITECTURE", v: "Modular systems integration" },
      { k: "OPERATION", v: "Autonomous maritime" },
      { k: "CONFIGURATION", v: "Mission configurable" },
    ],
    exploring: [
      "Open mission deck with standardised integration points",
      "Modular power and data architecture",
      "Operation in demanding sea states",
    ],
    img: "/assets/havoc.webp",
    imgPosition: "50% 55%",
    alt: "Velaryon HAVOC concept — mission-configurable autonomous maritime vessel",
    video: {
      desktop: "/assets/video/havoc-loop-desktop.mp4",
      mobile: "/assets/video/havoc-loop-mobile.mp4",
      poster: "/assets/video/havoc-loop-poster.webp",
    },
  },
  {
    id: "hunter",
    code: "V / 03",
    name: "HUNTER",
    role: "Systems-focused autonomous maritime platform",
    tagline: "See first. Understand faster.",
    summary:
      "A systems-focused autonomous maritime platform concept presented around integrated perception, connectivity and autonomous operation.",
    detail:
      "HUNTER leads with perception. Its prominent mast architecture carries the concept's sensing and communications systems high above the waterline, and the rest of the platform is arranged to feed, power and protect them. It is the family's exploration of awareness: seeing widely and staying connected.",
    descriptors: [
      { k: "FORM", v: "Elevated sensing mast" },
      { k: "ARCHITECTURE", v: "Perception-led systems" },
      { k: "OPERATION", v: "Autonomous maritime" },
      { k: "CONFIGURATION", v: "Connected systems" },
    ],
    exploring: [
      "Elevated mast for sensing and communications",
      "Multi-sensor perception architecture",
      "Resilient connectivity for remote operations",
    ],
    img: "/assets/hunter.webp",
    imgPosition: "50% 55%",
    alt: "Velaryon HUNTER concept — systems-focused autonomous maritime vessel with prominent sensor mast",
  },
];

export const platformById = (id?: string) => PLATFORMS.find((p) => p.id === id);

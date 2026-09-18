// Central platform registry. Working names pending company approval — change here only.
export interface Platform {
  id: string;
  code: string;
  name: string;
  tagline: string[];
  copy: string;
  descriptors: string[];
  img: string;
  alt: string;
}

export const PLATFORMS: Platform[] = [
  {
    id: "viper",
    code: "V / 01",
    name: "VIPER",
    tagline: ["LOW PROFILE.", "HIGH INTENT."],
    copy: "A compact autonomous surface platform concept shaped around integrated architecture and mission adaptability.",
    descriptors: ["LOW-PROFILE FORM", "INTEGRATED ARCHITECTURE", "AUTONOMOUS SURFACE PLATFORM", "MISSION ADAPTABLE"],
    img: "/assets/viper.webp",
    alt: "Velaryon Viper — low-profile faceted autonomous surface vessel concept",
  },
  {
    id: "havoc",
    code: "V / 02",
    name: "HAVOC",
    tagline: ["BUILT AROUND", "THE MISSION."],
    copy: "A mission-configurable autonomous maritime platform concept exploring adaptable systems integration across demanding maritime environments.",
    descriptors: ["MISSION CONFIGURATION", "SYSTEMS INTEGRATION", "MODULAR ARCHITECTURE", "AUTONOMOUS OPERATIONS"],
    img: "/assets/havoc.webp",
    alt: "Velaryon Havoc — mission-configurable autonomous maritime vessel concept",
  },
  {
    id: "hunter",
    code: "V / 03",
    name: "HUNTER",
    tagline: ["SEE FIRST.", "UNDERSTAND FASTER."],
    copy: "A systems-focused autonomous maritime platform concept presented around integrated perception, connectivity and autonomous operation.",
    descriptors: ["PERCEPTION", "CONNECTED SYSTEMS", "SYSTEMS INTEGRATION", "AUTONOMOUS OPERATIONS"],
    img: "/assets/hunter.webp",
    alt: "Velaryon Hunter — systems-focused autonomous maritime vessel concept with prominent sensor mast",
  },
];

// Central platform registry. Working names pending company approval — change here only.
export interface CinemaAnnotation {
  label: string;
  x: string;
  y: string;
}

export interface Platform {
  id: string;
  code: string;
  name: string;
  tagline: string[];
  copy: string;
  descriptors: string[];
  img: string;
  alt: string;
  cinema: {
    video?: { desktop: string; mobile: string };
    poster: string;
    objectPosition?: string;
    midCopy: string[];
    annotations: CinemaAnnotation[];
  };
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
    cinema: {
      poster: "/assets/viper.webp",
      midCopy: ["LOW-PROFILE", "AUTONOMOUS SURFACE PLATFORM"],
      annotations: [
        { label: "LOW-PROFILE FORM", x: "28%", y: "60%" },
        { label: "INTEGRATED ARCHITECTURE", x: "58%", y: "30%" },
        { label: "MISSION ADAPTABLE", x: "44%", y: "50%" },
      ],
    },
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
    cinema: {
      video: { desktop: "/assets/video/havoc-desktop.mp4", mobile: "/assets/video/havoc-mobile.mp4" },
      poster: "/assets/video/havoc-poster.webp",
      midCopy: ["MISSION-CONFIGURABLE", "AUTONOMOUS MARITIME PLATFORM"],
      annotations: [
        { label: "HULL ARCHITECTURE", x: "34%", y: "62%" },
        { label: "MISSION AREA", x: "52%", y: "52%" },
        { label: "SYSTEMS INTEGRATION", x: "64%", y: "40%" },
        { label: "AUTONOMY", x: "45%", y: "30%" },
      ],
    },
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
    cinema: {
      poster: "/assets/hunter.webp",
      midCopy: ["SYSTEMS-FOCUSED", "AUTONOMOUS MARITIME PLATFORM"],
      annotations: [
        { label: "PERCEPTION", x: "29%", y: "14%" },
        { label: "CONNECTED SYSTEMS", x: "36%", y: "32%" },
        { label: "AUTONOMOUS OPERATIONS", x: "56%", y: "56%" },
      ],
    },
  },
];

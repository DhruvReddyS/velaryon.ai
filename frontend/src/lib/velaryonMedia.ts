/** Central media registry. Public copy must never expose legacy vessel names. */
export const velaryonMedia = {
  brand: {
    mark: "/assets/logo-mark-light.png",
    wordmark: "/assets/logo-wordmark-light.png",
    bow: "/assets/logo-bow-light.png",
    waves: "/assets/logo-waves-light.png",
  },
  ocean: {
    establishing: "/media/velaryon/ocean/establishing/ocean-empty-overcast.webp",
    vast: "/media/velaryon/ocean/vast/ocean-vast-aerial.webp",
    aerialScale: "/media/velaryon/ocean/ocean-scale-aerial.webp",
    aerialScaleMobile: "/media/velaryon/ocean/ocean-scale-aerial-960.webp",
    distantWake: "/media/velaryon/transitions/wake/ocean-distant-wake.webp",
    distantVessel: "/media/velaryon/ocean/haze/ocean-distant-vessel-haze.webp",
  },
  platformVision: {
    concept01: {
      hero: "/media/velaryon/platform/platform-force.webp",
      film: "/media/velaryon/platform/platform-force-loop-desktop.mp4",
      filmMobile: "/media/velaryon/platform/platform-force-loop-mobile.mp4",
      poster: "/media/velaryon/platform/platform-force-loop-poster.webp",
    },
    concept02: { hero: "/media/velaryon/platform/platform-form.webp" },
    concept03: { hero: "/media/velaryon/platform/platform-awareness.webp" },
  },
  engineering: {
    profile: "/media/velaryon/engineering/platform-engineering-profile.webp",
    profileMobile: "/media/velaryon/engineering/platform-engineering-profile-960.webp",
  },
  domain: {
    blueHour: "/assets/vessel-dusk.webp",
    openOcean: "/assets/vessel-sunset.webp",
  },
  deck: {
    aerialRun: "/media/velaryon/deck/aerial-run.webp",
    aerialCoast: "/media/velaryon/deck/aerial-coast.webp",
    rearCoast: "/media/velaryon/deck/rear-coast.webp",
    departureSun: "/media/velaryon/deck/departure-sun.webp",
    departureSunMobile: "/media/velaryon/deck/departure-sun-960.webp",
    oceanAerial: "/media/velaryon/deck/ocean-aerial.webp",
  },
  hero: {
    cover: "/assets/vessel-hero.webp",
    dusk: "/assets/vessel-dusk.webp",
    sunset: "/assets/vessel-sunset.webp",
  },
  final: {
    departure: "/media/velaryon/final/final-vessel-departure.webp",
    departureMobile: "/media/velaryon/final/final-vessel-departure-960.webp",
    tinyHorizon: "/media/velaryon/final/rear/departure-tiny-horizon.webp",
  },
} as const;

export type VelaryonMedia = typeof velaryonMedia;

/** Responsive srcset for any local .webp that has a generated -960 sibling. */
export const srcSet = (src: string) =>
  src.endsWith(".webp") ? `${src.replace(/\.webp$/, "-960.webp")} 960w, ${src} 1672w` : undefined;

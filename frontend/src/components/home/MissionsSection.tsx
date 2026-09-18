import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ChapterLabel from "@/components/ChapterLabel";
import { Reveal } from "@/components/Reveal";

const MISSIONS = [
  {
    id: "awareness",
    title: "MARITIME AWARENESS",
    copy: "Concept mission — a persistent autonomous presence intended to observe and report across wide ocean areas.",
    img: "/assets/hunter.webp",
    position: "center",
  },
  {
    id: "presence",
    title: "PERSISTENT PRESENCE",
    copy: "Concept mission — being designed to hold station and remain on task far longer than crewed patrol cycles allow.",
    img: "/assets/vessel-dusk.webp",
    position: "center",
  },
  {
    id: "infrastructure",
    title: "INFRASTRUCTURE OPERATIONS",
    copy: "Concept mission — intended to inspect and watch over offshore assets without continuous crewed support.",
    img: "/assets/havoc.webp",
    position: "center",
  },
  {
    id: "ocean",
    title: "OCEAN INTELLIGENCE",
    copy: "Concept mission — a platform intended to gather environmental and surface data where persistent coverage is rare.",
    img: "/assets/vessel-sunset.webp",
    position: "center 40%",
  },
  {
    id: "security",
    title: "MARITIME SECURITY",
    copy: "Concept mission — envisioned to extend awareness and response options for partners operating at sea.",
    img: "/assets/viper.webp",
    position: "center",
  },
];

export default function MissionsSection() {
  const [active, setActive] = useState(0);
  const current = MISSIONS[active];

  return (
    <section id="missions" data-testid="missions-section" className="bg-navy py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <ChapterLabel index="05" title="Missions" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-10 font-display text-4xl font-medium leading-[1.0] tracking-tight text-white sm:text-6xl">
            BUILT FOR
            <br />
            THE MARITIME DOMAIN.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div role="tablist" aria-label="Mission profiles" className="flex flex-col">
            {MISSIONS.map((m, i) => (
              <button
                key={m.id}
                role="tab"
                aria-selected={active === i}
                data-testid={`mission-tab-${m.id}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`group border-b border-white/[0.08] py-6 text-left transition-colors duration-500 ${
                  active === i ? "text-white" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <span className="flex items-baseline gap-5">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-mist/60">
                    0{i + 1}
                  </span>
                  <span className="font-display text-xl font-medium tracking-tight sm:text-2xl lg:text-3xl">
                    {m.title}
                  </span>
                </span>
                <AnimatePresence initial={false}>
                  {active === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden pl-10 text-sm leading-relaxed text-mist"
                    >
                      <span className="block pt-4">{m.copy}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            ))}
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-mist/50">
              Mission profiles are concepts under development
            </p>
          </div>

          <div
            className="relative aspect-[4/3] overflow-hidden bg-abyss lg:aspect-auto lg:min-h-[520px]"
            data-cursor="VIEW"
          >
            <AnimatePresence mode="popLayout">
              <motion.img
                key={current.id}
                src={current.img}
                alt={`${current.title.toLowerCase()} concept — Velaryon vessel`}
                loading="lazy"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: current.position }}
              />
            </AnimatePresence>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            <p className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-300">
              {current.title} / CONCEPT
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

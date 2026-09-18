import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Btn, EASE, Eyebrow, Frame, Reveal } from "@/components/Primitives";

export const TECH = [
  {
    n: "01",
    t: "Perception",
    c: "Multi-sensor perception — radar, electro-optical and navigation data — fused into a single, consistent picture of the environment around the platform.",
  },
  {
    n: "02",
    t: "Autonomy software",
    c: "Mission logic, navigation rules and behaviour arbitration running on-platform, with defined limits and predictable, explainable outputs.",
  },
  {
    n: "03",
    t: "Systems integration",
    c: "A common electrical, data and mechanical architecture so that sensing, compute and mission systems can be integrated rather than bolted on.",
  },
  {
    n: "04",
    t: "Remote operations",
    c: "Shore-side supervision that shows operators what the platform sees and lets them redirect or take over at any time.",
  },
  {
    n: "05",
    t: "Platform architecture",
    c: "Hull forms and superstructures shaped around the systems they carry — low-profile, mission-deck and perception-led variants sharing one approach.",
  },
];

export default function Technology() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section data-testid="technology" className="border-t border-line-soft bg-ink py-24 md:py-36">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow index="04" title="Technology" />
            <h2 data-testid="technology-heading" className="display-2 mt-10 text-chalk">
              Software first. Steel around it.
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-fog">
              Velaryon is building an autonomy and systems stack that is common across the platform
              family. The vessels differ; the architecture beneath them does not.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Frame className="mt-12 aspect-[4/3] overflow-hidden bg-carbon">
              <img
                src="/assets/hunter.webp"
                alt="Velaryon HUNTER concept — sensing mast detail"
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ objectPosition: "38% 30%" }}
              />
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent" />
              <p className="label-xs pointer-events-none absolute bottom-4 left-4 text-chalk/80">V / 03 · Sensing architecture</p>
            </Frame>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <ul className="border-t border-line">
              {TECH.map((t, i) => {
                const open = i === active;
                return (
                  <li key={t.n} className="border-b border-line">
                    <button
                      data-testid={`tech-row-${t.n}`}
                      aria-expanded={open}
                      onClick={() => setActive(i)}
                      className={`flex w-full items-center gap-6 py-6 text-left transition-colors duration-300 ${
                        open ? "text-chalk" : "text-fog hover:text-chalk"
                      }`}
                    >
                      <span className="label-xs w-8">{t.n}</span>
                      <span className="flex-1 text-xl font-medium tracking-tight md:text-2xl">{t.t}</span>
                      <span aria-hidden className={`h-1.5 w-1.5 transition-colors duration-300 ${open ? "bg-signal" : "bg-line"}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          key="body"
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p data-testid={`tech-body-${t.n}`} className="max-w-lg pb-8 pl-14 text-sm leading-relaxed text-fog">
                            {t.c}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10">
              <Btn to="/technology" variant="ghost" testId="technology-link">
                Technology in depth
              </Btn>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

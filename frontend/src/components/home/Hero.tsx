import { motion, useReducedMotion } from "motion/react";
import { EASE, Meta } from "@/components/Primitives";
import { Btn } from "@/components/Primitives";
import { useLoaded } from "@/lib/loader";

export default function Hero() {
  const ready = useLoaded();
  const reduce = useReducedMotion();
  const show = ready && !reduce;

  return (
    <section data-testid="hero" className="relative isolate min-h-[100svh] overflow-hidden bg-ink">
      <motion.img
        src="/assets/vessel-hero.webp"
        alt="Velaryon autonomous surface vessel concept at sea"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "62% 45%" }}
        initial={reduce ? false : { scale: 1.06, opacity: 0.6 }}
        animate={ready ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 2.4, ease: EASE }}
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/20" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 to-transparent" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

      <div className="wrap relative flex min-h-[100svh] flex-col justify-end pb-14 pt-32 md:pb-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.p
              data-testid="hero-kicker"
              className="label flex items-center gap-3 text-fog"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={show ? { opacity: 1, y: 0 } : reduce ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            >
              <span aria-hidden className="signal-dot h-1.5 w-1.5 bg-signal" />
              Autonomous maritime systems
            </motion.p>
            <h1 data-testid="hero-heading" className="display-1 mt-6 text-chalk">
              {["Intelligence", "at sea."].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={reduce ? false : { y: "110%" }}
                    animate={show ? { y: 0 } : reduce ? { y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              data-testid="hero-lead"
              className="mt-8 max-w-lg text-base leading-relaxed text-chalk/80 md:text-lg"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={show ? { opacity: 1, y: 0 } : reduce ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            >
              Velaryon is an Australian maritime technology company developing autonomous surface
              platform concepts and the software that operates them.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={show ? { opacity: 1, y: 0 } : reduce ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.62, ease: EASE }}
            >
              <Btn to="/platforms" testId="hero-platforms-cta">
                Explore platforms
              </Btn>
              <Btn to="/mission" variant="ghost" testId="hero-mission-cta">
                Our mission
              </Btn>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-4 lg:justify-self-end"
            initial={reduce ? false : { opacity: 0 }}
            animate={show ? { opacity: 1 } : reduce ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="border-t border-chalk/15 pt-6">
              <Meta
                className="grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 lg:gap-y-6"
                items={[
                  { k: "Status", v: "Concept development", signal: true },
                  { k: "Origin", v: "Australia" },
                  { k: "Domain", v: "Surface autonomy" },
                ]}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

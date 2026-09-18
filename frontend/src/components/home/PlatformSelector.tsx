import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Btn, EASE, Eyebrow, Frame, Reveal } from "@/components/Primitives";
import { PLATFORMS, type Platform } from "@/lib/platforms";

export function PlatformMedia({ p, priority = false, className = "" }: { p: Platform; priority?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  if (p.video && !reduce) {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    return (
      <video
        data-testid={`platform-video-${p.id}`}
        className={`h-full w-full object-cover ${className}`}
        style={{ objectPosition: p.imgPosition }}
        src={mobile ? p.video.mobile : p.video.desktop}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={p.video.poster}
        aria-label={p.alt}
      />
    );
  }
  return (
    <img
      data-testid={`platform-image-${p.id}`}
      src={p.video?.poster ?? p.img}
      alt={p.alt}
      loading={priority ? "eager" : "lazy"}
      className={`h-full w-full object-cover ${className}`}
      style={{ objectPosition: p.imgPosition }}
    />
  );
}

export default function PlatformSelector() {
  const [idx, setIdx] = useState(0);
  const reduce = useReducedMotion();
  const p = PLATFORMS[idx];

  return (
    <section data-testid="platforms" className="border-t border-line-soft bg-graphite py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow index="02" title="Platforms" />
            <h2 data-testid="platforms-heading" className="display-2 mt-10 text-chalk">
              Three concepts.
              <br />
              One architecture.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-end lg:col-span-5 lg:col-start-8">
            <p className="text-base leading-relaxed text-fog">
              A family of autonomous surface platform concepts sharing a common autonomy and systems
              architecture. Each explores a different question about form, configuration and awareness.
            </p>
            <p className="label-xs mt-6 text-fog/70">Working designations — concept platforms in development</p>
          </Reveal>
        </div>

        <div role="tablist" aria-label="Platforms" className="mt-16 grid grid-cols-3 border-y border-line">
          {PLATFORMS.map((pl, i) => {
            const active = i === idx;
            return (
              <button
                key={pl.id}
                role="tab"
                aria-selected={active}
                aria-controls={`platform-panel-${pl.id}`}
                id={`platform-tab-${pl.id}`}
                data-testid={`platform-tab-${pl.id}`}
                onClick={() => setIdx(i)}
                className={`group relative flex flex-col gap-3 py-6 text-left transition-colors duration-300 md:flex-row md:items-baseline md:gap-5 md:px-6 ${
                  i > 0 ? "border-l border-line pl-4 md:pl-6" : ""
                } ${active ? "text-chalk" : "text-fog hover:text-chalk"}`}
              >
                <span className="label-xs">{pl.code}</span>
                <span className="text-lg font-medium tracking-tight md:text-2xl">{pl.name}</span>
                <span
                  aria-hidden
                  className={`absolute inset-x-0 -bottom-px h-px origin-left bg-signal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div
          id={`platform-panel-${p.id}`}
          role="tabpanel"
          aria-labelledby={`platform-tab-${p.id}`}
          data-testid="platform-panel"
          className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-8"
        >
          <div className="lg:col-span-7">
            <Frame className="aspect-[16/10] overflow-hidden bg-carbon">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={p.id}
                  className="absolute inset-0"
                  initial={reduce ? false : { opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <PlatformMedia p={p} priority={idx === 0} />
                </motion.div>
              </AnimatePresence>
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/60 to-transparent" />
              <div className="label-xs pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 text-chalk/80">
                <span aria-hidden className="h-1.5 w-1.5 bg-signal" />
                {p.code} · Concept render
              </div>
            </Frame>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={p.id}
              className="flex flex-col lg:col-span-5"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <p className="label-xs text-fog">{p.role}</p>
              <h3 data-testid="platform-panel-name" className="display-2 mt-4 text-chalk">
                {p.name}
              </h3>
              <p className="mt-3 text-lg text-chalk/80">{p.tagline}</p>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-fog">{p.summary}</p>

              <dl className="mt-8 border-t border-line">
                {p.descriptors.map((d) => (
                  <div key={d.k} className="grid grid-cols-[120px_1fr] gap-4 border-b border-line py-3">
                    <dt className="label-xs pt-0.5 text-fog">{d.k}</dt>
                    <dd className="text-sm text-chalk">{d.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <Btn to={`/platforms/${p.id}`} variant="ghost" testId={`platform-view-${p.id}`}>
                  View {p.name}
                </Btn>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Btn, EASE, Eyebrow, Frame, Meta, Reveal, Rule } from "@/components/Primitives";
import { PlatformMedia } from "@/components/home/PlatformSelector";
import CTA from "@/components/home/CTA";
import { PLATFORMS, platformById } from "@/lib/platforms";

export default function PlatformDetailPage() {
  const { id } = useParams();
  const p = platformById(id);
  const reduce = useReducedMotion();
  if (!p) return <Navigate to="/platforms" replace />;

  const others = PLATFORMS.filter((x) => x.id !== p.id);

  return (
    <div data-testid={`platform-detail-${p.id}`} className="bg-ink">
      <section className="relative isolate h-[88svh] min-h-[560px] overflow-hidden">
        <motion.div
          key={p.id}
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.05, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <PlatformMedia p={p} priority />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/30" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/80 to-transparent" />
        <div className="wrap relative flex h-full flex-col justify-between pt-28 pb-12 md:pb-16">
          <Link to="/platforms" data-testid="platform-back-link" className="label inline-flex items-center gap-2 text-chalk/80 transition-colors hover:text-chalk">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> All platforms
          </Link>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Eyebrow index={p.code} title={p.role} className="text-chalk/80" />
              <h1 data-testid="platform-detail-name" className="display-1 mt-6 text-chalk">
                {p.name}
              </h1>
              <p className="mt-4 text-lg text-chalk/80 md:text-xl">{p.tagline}</p>
            </div>
            <div className="border-t border-chalk/15 pt-6 lg:col-span-4">
              <Meta
                className="grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 lg:gap-y-5"
                items={[
                  { k: "Stage", v: "Concept", signal: true },
                  { k: "Designation", v: "Working name" },
                  { k: "Domain", v: "Surface" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="wrap py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="label-xs text-fog">Overview</p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <p data-testid="platform-detail-copy" className="display-3 text-chalk">
              {p.summary}
            </p>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-fog">{p.detail}</p>
          </Reveal>
        </div>

        <Rule className="mt-24" />
        <div className="grid gap-12 py-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="label-xs text-fog">Design focus</p>
          </Reveal>
          <div className="grid gap-px bg-line sm:grid-cols-2 lg:col-span-8">
            {p.descriptors.map((d, i) => (
              <Reveal key={d.k} delay={0.06 * i} className="bg-ink">
                <div data-testid={`platform-descriptor-${d.k.toLowerCase()}`} className="h-full p-8">
                  <p className="label-xs text-fog">{d.k}</p>
                  <p className="mt-8 text-xl font-medium tracking-tight text-chalk">{d.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Rule />
        <div className="grid gap-12 py-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="label-xs text-fog">What we're exploring</p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <ol className="border-t border-line">
              {p.exploring.map((e, i) => (
                <li key={e} data-testid={`platform-exploring-${i}`} className="grid grid-cols-[48px_1fr] gap-4 border-b border-line py-5">
                  <span className="label-xs pt-1 text-fog">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg text-chalk">{e}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Rule />
        <div className="grid gap-12 py-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="label-xs text-fog">Specifications</p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <Frame className="p-8 md:p-10">
              <div className="flex items-center gap-3">
                <span aria-hidden className="signal-dot h-1.5 w-1.5 bg-signal" />
                <p className="label text-chalk">Not published at concept stage</p>
              </div>
              <p data-testid="platform-spec-note" className="mt-6 max-w-xl text-sm leading-relaxed text-fog">
                {p.name} is a design concept. Dimensions, performance and systems specifications will be
                published as prototypes are built and validated. Velaryon does not publish figures it has
                not tested.
              </p>
            </Frame>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line-soft bg-graphite">
        <div className="wrap py-20">
          <Reveal>
            <p className="label-xs text-fog">Other platforms</p>
          </Reveal>
          <div className="mt-8 grid gap-px bg-line md:grid-cols-2">
            {others.map((o) => (
              <Link
                key={o.id}
                to={`/platforms/${o.id}`}
                data-testid={`platform-next-${o.id}`}
                className="group relative flex aspect-[16/7] items-end overflow-hidden bg-carbon"
              >
                <img
                  src={o.img}
                  alt={o.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-[opacity,transform] duration-700 group-hover:scale-[1.03] group-hover:opacity-90"
                  style={{ objectPosition: o.imgPosition }}
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
                <div className="relative p-8">
                  <p className="label-xs text-fog">{o.code}</p>
                  <p className="mt-2 text-3xl font-medium tracking-tight text-chalk">{o.name}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <Btn to="/platforms" variant="link" testId="platform-detail-all-link">
              All platforms
            </Btn>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}

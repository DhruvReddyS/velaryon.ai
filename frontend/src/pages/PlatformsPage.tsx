import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { NextChapter, PageHero } from "@/components/page";
import { Cta, Lines, Reveal, Tag } from "@/components/kit";
import { FLEET, type Vessel } from "@/lib/content";
import { velaryonMedia as media } from "@/lib/velaryonMedia";

/** Each vessel is a sticky full-screen card; the one underneath recedes as the next arrives. */
function StackCard({ v, i }: { v: Vessel; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(p, [0, 1], [1, 0.86]);
  const bright = useTransform(p, [0, 1], ["brightness(1)", "brightness(0.35)"]);
  const radius = useTransform(p, [0, 1], [0, 24]);
  return (
    <div ref={ref} className="p-stack__card" data-testid={`platform-row-${v.id}`}>
      <motion.div className="p-stack__inner" style={reduce ? undefined : { scale, filter: bright, borderRadius: radius, overflow: "hidden" }}>
        {v.video && !reduce ? (
          <video autoPlay muted loop playsInline poster={v.video.poster} style={{ objectPosition: v.position }}>
            <source media="(max-width: 767px)" src={v.video.mobile} />
            <source src={v.video.desktop} />
          </video>
        ) : (
          <img src={v.img} alt={`${v.name}, ${v.role}`} loading={i === 0 ? "eager" : "lazy"} style={{ objectPosition: v.position }} />
        )}
        <div className="p-stack__shade" />
        <div className="p-stack__top"><span>{v.index}</span><span>{v.role}</span></div>
        <div className="p-stack__body">
          <h2>{v.name}</h2>
          <p><em>{v.tagline}</em></p>
          <div className="p-stack__row">
            <p>{v.summary}</p>
            <ul>{v.traits.map((t) => <li key={t}>{t}</li>)}</ul>
            <Cta to={`/platforms/${v.id}`} testId={`platform-row-link-${v.id}`}>View study</Cta>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function PlatformsPage() {
  return (
    <div data-testid="platforms-page">
      <PageHero
        index="02"
        title="Fleet"
        testId="platforms-hero"
        img={media.deck.aerialRun}
        position="55% 50%"
        lines={["The fleet.", <em key="e">One core.</em>]}
        lead="Three visual studies, one shared autonomy and systems direction. Each explores a different question about form, integration and awareness at sea."
        meta={[{ k: "Status", v: "In development" }, { k: "Studies", v: String(FLEET.length).padStart(2, "0") }]}
      />
      <div className="p-stack">
        {FLEET.map((v, i) => <StackCard key={v.id} v={v} i={i} />)}
      </div>
      <section className="p-section p-section--ink">
        <div className="p-head">
          <Tag no="02.1">A note on specifications</Tag>
          <Lines className="d-display" lines={["Studies,", <em key="e">not spec sheets.</em>]} />
        </div>
        <Reveal>
          <p className="p-lede">
            Velaryon publishes platform studies, not performance figures. Designations and specifications will be shared once prototypes are built and validated.
          </p>
        </Reveal>
      </section>
      <NextChapter to="/how-it-works" label="Autonomy" img={media.ocean.distantVessel} />
    </div>
  );
}

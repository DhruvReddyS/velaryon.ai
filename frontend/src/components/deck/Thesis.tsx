import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import { THESIS, chapterNo } from "@/lib/content";
import OceanGL from "@/components/OceanGL";
import { ScrubWords, Tag } from "@/components/kit";

/**
 * Slide — the insight. A live WebGL ocean sits in pre-dawn darkness; as the
 * sentence is read (scrolled), the sun rises over the horizon.
 */
export default function Thesis() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = useTransform(p, [0.04, 0.72], [0, 1]);
  const tod = useTransform(p, [0, 0.95], [0.12, 1]);

  return (
    <section id="thesis" ref={ref} className="d-thesis" data-stops="0.85">
      <div className="d-thesis__sticky">
        <OceanGL tod={tod} className="d-thesis__gl" />
        <div className="d-thesis__veil" />
        <Tag no={chapterNo("thesis")} className="d-thesis__tag">The insight</Tag>
        <ScrubWords text={THESIS} accent={["people"]} className="d-thesis__text" progress={words} />
        <div className="d-thesis__foot">
          <span>Live ocean · real-time render</span>
          <i />
          <span>Autonomy extends people. It doesn't replace their judgement.</span>
        </div>
      </div>
    </section>
  );
}

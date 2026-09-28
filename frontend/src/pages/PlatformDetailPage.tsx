import { Navigate, useParams } from "react-router-dom";
import { NextChapter, PageHero } from "@/components/page";
import { Lines, ParallaxImg, Reveal, ScrubWords, Tag } from "@/components/kit";
import { FLEET, vesselById } from "@/lib/content";

const SPEC_ROWS = [["Length overall", "58%"], ["Displacement", "44%"], ["Endurance", "70%"], ["Propulsion", "52%"], ["Sensor suite", "64%"], ["Autonomy level", "38%"]];

export default function PlatformDetailPage() {
  const { id } = useParams();
  const v = vesselById(id);
  if (!v) return <Navigate to="/platforms" replace />;
  const i = FLEET.indexOf(v);
  const next = FLEET[(i + 1) % FLEET.length];

  return (
    <div data-testid={`platform-detail-${v.id}`} key={v.id}>
      <PageHero
        index={v.index}
        title={`Fleet / ${v.name}`}
        testId="platform-detail-hero"
        img={v.video?.poster ?? v.img}
        position={v.position}
        lines={[v.name, <em key="e">{v.tagline}</em>]}
        lead={v.summary}
        meta={[{ k: "Status", v: "Design study" }, { k: "Role", v: v.role }]}
      />

      <section className="p-section p-section--ink">
        <Tag no="01">Overview</Tag>
        <div className="p-gap">
          <ScrubWords className="p-statement" text={v.detail} accent={["one", "coherent", "integrated"]} />
        </div>
      </section>

      <ParallaxImg src={v.img} alt={`${v.name}, ${v.role}`} className="p-band" position={v.position} amount={12} />

      <section className="p-section">
        <div className="p-head">
          <Tag no="02">Design focus</Tag>
          <Lines className="d-display" lines={["What this study", <em key="e">explores.</em>]} />
        </div>
        <div className="p-grid3">
          {v.traits.map((t, k) => (
            <Reveal key={t} delay={k * 0.08} className="p-cell">
              <span className="p-cell__n">{String(k + 1).padStart(2, "0")}</span>
              <h3>{t}</h3>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="p-section p-section--ink">
        <div className="p-head">
          <Tag no="03">Specifications</Tag>
          <Lines className="d-display" lines={["Classified", <em key="e">until validated.</em>]} />
          <p>Figures are published only once prototypes have been built and tested at sea.</p>
        </div>
        <div className="p-spec">
          {SPEC_ROWS.map(([k, w]) => (
            <Reveal key={k} y={10}>
              <div className="p-spec__row"><span>{k}</span><i style={{ "--w": w } as React.CSSProperties} /></div>
            </Reveal>
          ))}
        </div>
      </section>

      <NextChapter to={`/platforms/${next.id}`} label={next.name} img={next.img} />
    </div>
  );
}

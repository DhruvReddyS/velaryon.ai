import type { CSSProperties, ReactNode } from "react";
import { AUDIENCES, BRAND, CREW, DECK_NOTES, FLEET, LOOP, MARKET, OCEAN_FACTS, RENDER_NOTE, ROADMAP, ROADMAP_CURRENT, THESIS, WHY_NOW, roadmapStatus } from "@/lib/content";
import { velaryonMedia as media } from "@/lib/velaryonMedia";
import { coastX, coverage, stations } from "@/lib/coverage";
import OceanGL from "@/components/OceanGL";

/** Staggered entrance index for elements inside a live slide. */
const r = (i: number) => ({ "data-r": "", style: { "--i": i } as CSSProperties });

function Chrome({ no, label, light = false }: { no: number; label: string; light?: boolean }) {
  return (
    <div className={`s-chrome ${light ? "is-light" : ""}`}>
      <span><img src={light ? "/assets/logo-mark.png" : media.brand.mark} alt="" />{BRAND.name}</span>
      <span>{String(no).padStart(2, "0")} — {label}</span>
    </div>
  );
}

/** Coverage figure rendered as two SVG paths (lit / unlit) — prints crisply. */
function CoverageFigure({ n, rad }: { n: number; rad: number }) {
  const C = 64;
  const R = 40;
  const A = 1.6;
  const pts = stations(n);
  let lit = "";
  let dim = "";
  for (let j = 0; j < R; j++) {
    const y = (j + 0.5) / R;
    const land = coastX(y);
    for (let i = 0; i < C; i++) {
      const x = ((i + 0.5) / C) * A;
      if (x < land) continue;
      const hit = pts.some((p) => (p.x - x) ** 2 + (p.y - y) ** 2 < rad * rad);
      const s = hit ? 0.011 : 0.005;
      const d = `M${(x - s / 2).toFixed(4)} ${(y - s / 2).toFixed(4)}h${s}v${s}h-${s}z`;
      if (hit) lit += d; else dim += d;
    }
  }
  let coast = "M0 0";
  for (let y = 0; y <= 1.0001; y += 0.02) coast += `L${coastX(y).toFixed(4)} ${y.toFixed(4)}`;
  coast += "L0 1Z";
  const pct = Math.round(coverage(pts, rad) * 100);
  return (
    <figure className="s-cov">
      <svg viewBox={`0 0 ${A} 1`} preserveAspectRatio="xMidYMid meet">
        <path d={coast} fill="rgba(143,182,201,0.08)" stroke="rgba(143,182,201,0.4)" strokeWidth="0.003" />
        <path d={dim} fill="rgba(233,238,242,0.2)" />
        <path d={lit} fill="#f29f45" />
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={rad} fill="none" stroke="rgba(242,159,69,0.45)" strokeWidth="0.003" />
            <circle cx={p.x} cy={p.y} r={0.009} fill="#fff" />
          </g>
        ))}
      </svg>
      <figcaption><b>{pct}%</b> of region under watch · {n} platform{n > 1 ? "s" : ""}</figcaption>
    </figure>
  );
}

export type DeckSlide = { id: string; label: string; render: (live: boolean) => ReactNode };

export const SLIDES: DeckSlide[] = [
  {
    id: "cover",
    label: "Cover",
    render: () => (
      <div className="s s--cover">
        <img className="s-bg" src={media.hero.cover} alt="" />
        <div className="s-shade s-shade--cover" />
        <div className="s-cover__brand" {...r(0)}><img src={media.brand.mark} alt="" /><img src={media.brand.wordmark} alt="Velaryon" /></div>
        <h1 className="s-cover__title"><span {...r(1)}>Intelligence</span><em {...r(2)}>at sea.</em></h1>
        <div className="s-cover__meta" {...r(3)}>
          <span>{BRAND.category}</span>
          <span>Company overview · {BRAND.year}</span>
          <span>{BRAND.email}</span>
        </div>
      </div>
    ),
  },
  {
    id: "problem",
    label: "Problem",
    render: () => (
      <div className="s s--split">
        <Chrome no={2} label="Problem" />
        <div className="s-col">
          <h2 className="s-h" {...r(0)}>The ocean is vast.<br /><em>Presence isn't.</em></h2>
          <ul className="s-bullets">
            <li {...r(1)}>Persistent maritime awareness still depends on crewed hulls on station.</li>
            <li {...r(2)}>Every hour at sea costs people, fuel and risk.</li>
            <li {...r(3)}>Coverage ends where a vessel's horizon ends.</li>
          </ul>
        </div>
        <div className="s-media">
          <img src={media.ocean.establishing} alt="" />
          <div className="s-facts">
            {OCEAN_FACTS.map((f, i) => (
              <div key={f.label} {...r(4 + i)}><b>{f.value}<small>{f.suffix}</small></b><p>{f.label}</p><small>Source: {f.source}</small></div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "insight",
    label: "Insight",
    render: (live) => (
      <div className="s s--insight">
        {live ? <OceanGL tod={0.72} className="s-bg" scale={0.5} /> : <img className="s-bg" src={media.ocean.distantVessel} alt="" />}
        <div className="s-shade" />
        <Chrome no={3} label="Insight" />
        <blockquote className="s-quote" {...r(0)}>“{THESIS.split("people")[0]}<em>people</em>{THESIS.split("people")[1]}”</blockquote>
        <p className="s-quote__by" {...r(1)}>— The Velaryon thesis</p>
      </div>
    ),
  },
  {
    id: "solution",
    label: "Solution",
    render: () => (
      <div className="s s--solution">
        <Chrome no={4} label="Solution" />
        <h2 className="s-h" {...r(0)}>One system.<br /><em>Designed together.</em></h2>
        <div className="s-three">
          {[
            ["Platform", "Autonomous surface vessels shaped around the systems they carry."],
            ["Software", "A common stack for perception, mission logic and remote operation."],
            ["Autonomy", "On-platform decision-making inside limits people define."],
          ].map(([t, c], i) => (
            <div key={t} {...r(1 + i)}><span>0{i + 1}</span><h3>{t}</h3><p>{c}</p></div>
          ))}
        </div>
        <img className="s-strip" src={media.engineering.profile} alt="" {...r(4)} />
      </div>
    ),
  },
  {
    id: "fleet",
    label: "Fleet",
    render: () => (
      <div className="s s--fleet">
        <Chrome no={5} label="Product" />
        <h2 className="s-h" {...r(0)}>Three studies. <em>One autonomous core.</em></h2>
        <div className="s-fleet">
          {FLEET.map((v, i) => (
            <article key={v.id} {...r(1 + i)}>
              <div><img src={v.video?.poster ?? v.img} alt="" style={{ objectPosition: v.position }} /><span>{v.index}</span></div>
              <h3>{v.name}</h3>
              <p><em>{v.tagline}</em></p>
              <small>{v.role}</small>
            </article>
          ))}
        </div>
        <p className="s-foot" {...r(4)}>{RENDER_NOTE} Designations and specifications are released as they're validated.</p>
      </div>
    ),
  },
  {
    id: "system",
    label: "System",
    render: () => (
      <div className="s s--system">
        <Chrome no={6} label="System" />
        <h2 className="s-h" {...r(0)}>A continuous loop, <em>not a remote control.</em></h2>
        <div className="s-operator" {...r(1)}><span>Operator</span><p>Defines the mission, sets the limits, supervises — and can redirect at any time.</p></div>
        <ol className="s-loop">
          {LOOP.map((s, i) => (
            <li key={s.n} {...r(2 + i)}><span>{s.n}</span><h3>{s.t}</h3><p>{s.h}</p></li>
          ))}
        </ol>
      </div>
    ),
  },
  {
    id: "proof",
    label: "Proof",
    render: () => (
      <div className="s s--proof">
        <Chrome no={7} label="Proof" />
        <h2 className="s-h" {...r(0)}>More platforms. <em>Persistent watch.</em></h2>
        <div className="s-proof">
          <div {...r(1)}><span>One crewed vessel</span><CoverageFigure n={1} rad={0.13} /></div>
          <div {...r(2)}><span>An autonomous fleet</span><CoverageFigure n={12} rad={0.13} /></div>
        </div>
        <p className="s-foot" {...r(3)}>Illustrative geometric model — each platform watches a fixed radius. Not a performance claim.</p>
      </div>
    ),
  },
  {
    id: "whynow",
    label: "Why now",
    render: () => (
      <div className="s s--light">
        <Chrome no={8} label="Why now" light />
        <h2 className="s-h" {...r(0)}>Three shifts, <em>one window.</em></h2>
        <div className="s-three s-three--light">
          {WHY_NOW.map((w, i) => (
            <div key={w.n} {...r(1 + i)}><span>{w.n}</span><h3>{w.title}</h3><p>{w.copy}</p></div>
          ))}
        </div>
        {MARKET.length > 0 && (
          <div className="s-market">
            {MARKET.map((m, i) => <div key={m.label} {...r(4 + i)}><b>{m.value}</b><p>{m.label}</p><small>Source: {m.source}</small></div>)}
          </div>
        )}
      </div>
    ),
  },
  {
    id: "roadmap",
    label: "Roadmap",
    render: () => (
      <div className="s s--light">
        <Chrome no={9} label="Roadmap" light />
        <h2 className="s-h" {...r(0)}>Nothing worth building <em>arrives finished.</em></h2>
        <ol className="s-road">
          {ROADMAP.map((st, i) => (
            <li key={st.n} className={i < ROADMAP_CURRENT ? "is-done" : i === ROADMAP_CURRENT ? "is-now" : ""} {...r(1 + i)}>
              <i />
              <span>{st.n} · {roadmapStatus(i)}</span>
              <h3>{st.t}</h3>
              <p>{st.c}</p>
            </li>
          ))}
        </ol>
      </div>
    ),
  },
  {
    id: "ask",
    label: "Ask",
    render: () => (
      <div className="s s--ask">
        <img className="s-bg" src={media.deck.departureSun} alt="" />
        <div className="s-shade s-shade--ask" />
        <Chrome no={10} label="The ask" />
        <h2 className="s-h" {...r(0)}>Build what <em>comes next.</em></h2>
        <div className="s-three">
          {AUDIENCES.map((a, i) => (
            <div key={a.k} {...r(1 + i)}><span>{a.k}</span><h3>{a.t}</h3><p>{a.c}</p></div>
          ))}
        </div>
        <div className="s-ask__foot" {...r(4)}>
          <span>{CREW.length ? CREW.map((c) => `${c.name} — ${c.role}`).join(" · ") : "Founding team profiles shared on request"}</span>
          <b>{BRAND.email}</b>
        </div>
      </div>
    ),
  },
];

export const notesFor = (id: string) => DECK_NOTES[id] ?? "";

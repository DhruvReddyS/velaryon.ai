import { Link } from "react-router-dom";
import { AUDIENCES, BRAND, CREW, chapterNo } from "@/lib/content";
import { Lines, Reveal, Tag } from "@/components/kit";

/** Team strip — renders only when approved profiles exist in content.ts. */
export function Crew() {
  if (!CREW.length) {
    return (
      <p className="d-ask__team-empty">
        <span>Founding team</span> Profiles are shared directly with investors and partners. <a href={`mailto:${BRAND.email}`}>Request an introduction ↗</a>
      </p>
    );
  }
  return (
    <div className="d-crew-grid">
      {CREW.map((c, i) => (
        <Reveal key={c.name} delay={i * 0.08} className="d-crew">
          <div className="d-crew__plate">{c.img ? <img src={c.img} alt={c.name} loading="lazy" /> : <span>{c.name.split(" ").map((w) => w[0]).join("")}</span>}</div>
          <span>{c.role}</span>
          <h4>{c.name}</h4>
          <p>{c.focus}</p>
        </Reveal>
      ))}
    </div>
  );
}

/** Slide — the ask: who we're building with. */
export default function Ask({ id = "ask", no = chapterNo("ask") }: { id?: string; no?: string }) {
  return (
    <section id={id} className="d-ask-s">
      <div className="d-ask-s__head">
        <Tag no={no}>The ask</Tag>
        <Lines className="d-display" lines={["Built with the", <em key="e">right crew.</em>]} />
      </div>
      <div className="d-ask-s__grid">
        {AUDIENCES.map((a, i) => (
          <Reveal key={a.k} delay={i * 0.08}>
            <Link to={a.to} className="d-ask" data-cursor="Talk" data-testid={`ask-${a.k.toLowerCase()}`}>
              <span className="d-ask__k">0{i + 1} / {a.k}</span>
              <h3>{a.t}</h3>
              <p>{a.c}</p>
              <span className="d-ask__go">Start a conversation <b>↗</b></span>
              <span className="d-ask__fill" aria-hidden />
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="d-ask-s__team"><Crew /></div>
    </section>
  );
}

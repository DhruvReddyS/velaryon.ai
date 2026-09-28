import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { chapterNo } from "@/lib/content";
import { ASPECT, COLS, ROWS, RANGES, coastX, coverage, patrol, platformsFor, stations } from "@/lib/coverage";
import { sound } from "@/lib/sound";
import { Lines, Tag, useOnScreen } from "@/components/kit";

/** Slide — the proof: an interactive model of watched area vs. platform count. */
export default function Coverage() {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const onScreen = useOnScreen(canvas, "80px");
  const inView = useInView(section, { once: true, margin: "-30% 0px" });
  const [n, setN] = useState(1);
  const [range, setRange] = useState(1);
  const [touched, setTouched] = useState(false);
  const [pct, setPct] = useState(0);
  const r = RANGES[range].r;
  const need = useMemo(() => platformsFor(0.9, r), [r]);
  const state = useRef({ n, r });
  state.current = { n, r };

  // Auto-demo: ramp the fleet up once, until the visitor takes the controls.
  useEffect(() => {
    if (!inView || touched || reduce) { if (reduce) setN(8); return; }
    const c = animate(1, 8, { duration: 3.2, ease: [0.65, 0, 0.35, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, touched, reduce]);

  useEffect(() => { setPct(Math.round(coverage(stations(n), r) * 100)); }, [n, r]);

  useEffect(() => {
    const el = canvas.current;
    if (!el || !onScreen) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = () => { el.width = el.clientWidth * dpr; el.height = el.clientHeight * dpr; };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(el);
    const lit = new Uint8Array(COLS * ROWS);
    let frame = 0;
    const t0 = performance.now();

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      const t = reduce ? 0 : Math.max(0, now - t0) / 1000;
      const { n: count, r: rad } = state.current;
      const W = el.width;
      const H = el.height;
      const s = Math.min(H, W / ASPECT); // region-height → pixels
      const ox = (W - ASPECT * s) / 2;
      const oy = (H - s) / 2;
      ctx.clearRect(0, 0, W, H);

      const pts = stations(count).map((p, i) => patrol(p, i, t, rad));
      coverage(pts, rad, lit);

      // coastline fill
      ctx.fillStyle = "rgba(143,182,201,0.06)";
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      for (let y = 0; y <= 1.0001; y += 0.02) ctx.lineTo(ox + coastX(y) * s, oy + y * s);
      ctx.lineTo(ox, oy + s);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(143,182,201,0.35)";
      ctx.lineWidth = dpr;
      ctx.beginPath();
      for (let y = 0; y <= 1.0001; y += 0.01) { const X = ox + coastX(y) * s; if (y === 0) ctx.moveTo(X, oy); else ctx.lineTo(X, oy + y * s); }
      ctx.stroke();

      // the sea grid
      const cw = (ASPECT * s) / COLS;
      const ch = s / ROWS;
      for (let j = 0; j < ROWS; j++) {
        for (let i = 0; i < COLS; i++) {
          const v = lit[j * COLS + i];
          if (v === 2) continue;
          const x = ox + (i + 0.5) * cw;
          const y = oy + (j + 0.5) * ch;
          if (v) {
            ctx.fillStyle = "rgba(242,159,69,0.85)";
            ctx.fillRect(x - dpr, y - dpr, 2.2 * dpr, 2.2 * dpr);
          } else {
            ctx.fillStyle = "rgba(233,238,242,0.14)";
            ctx.fillRect(x - dpr * 0.5, y - dpr * 0.5, dpr, dpr);
          }
        }
      }

      // platforms: range ring, sonar pulse, marker
      pts.forEach((p, i) => {
        const X = ox + p.x * s;
        const Y = oy + p.y * s;
        ctx.strokeStyle = "rgba(242,159,69,0.35)";
        ctx.lineWidth = dpr;
        ctx.beginPath();
        ctx.arc(X, Y, rad * s, 0, Math.PI * 2);
        ctx.stroke();
        const ph = (t * 0.5 + i * 0.37) % 1;
        ctx.strokeStyle = `rgba(255,255,255,${0.35 * (1 - ph)})`;
        ctx.beginPath();
        ctx.arc(X, Y, Math.max(0, rad * s * ph), 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(X, Y, 3 * dpr, 0, Math.PI * 2);
        ctx.fill();
      });
    };
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); ro.disconnect(); };
  }, [onScreen, reduce]);

  const setCount = (v: number) => {
    setTouched(true);
    if (v !== n) sound.tick(0.8 + v / 40);
    setN(v);
  };

  return (
    <section id="coverage" ref={section} className="d-cov" data-testid="coverage">
      <div className="d-cov__copy">
        <Tag no={chapterNo("coverage")}>The proof</Tag>
        <Lines className="d-display" lines={["More platforms.", <em key="e">Persistent watch.</em>]} />
        <p className="d-cov__lead">A crewed vessel watches one horizon. A fleet of autonomous platforms watches the region. Drag the fleet size and see what changes.</p>

        <div className="d-cov__controls">
          <label className="d-cov__slider">
            <span>Platforms on station <b>{String(n).padStart(2, "0")}</b></span>
            <input type="range" min={1} max={40} value={n} onChange={(e) => setCount(Number(e.target.value))} aria-label="Platforms on station" data-testid="coverage-slider" style={{ "--fill": `${((n - 1) / 39) * 100}%` } as React.CSSProperties} />
          </label>
          <div className="d-cov__seg" role="radiogroup" aria-label="Sensor range">
            <span>Sensor range</span>
            <div>
              {RANGES.map((g, i) => (
                <button key={g.k} role="radio" aria-checked={i === range} className={i === range ? "is-on" : ""} onClick={() => { setTouched(true); setRange(i); sound.tick(1.2); }}>{g.k}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="d-cov__read">
          <div><b>{pct}<small>%</small></b><span>Region under watch</span></div>
          <div><b>{need}</b><span>Platforms for 90% watch</span></div>
        </div>
      </div>

      <div className="d-cov__stage">
        <canvas ref={canvas} aria-label={`Illustration: ${n} platforms watching ${pct}% of a coastal region`} role="img" />
        <span className="d-cov__corner">Region / illustrative</span>
        <p className="d-cov__note">Illustrative geometric model — each platform watches a fixed radius. Not a performance claim.</p>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { sound } from "@/lib/sound";
import { useOnScreen, useUtcClock } from "@/components/kit";

/**
 * Concept operator interface — a simulated illustration of human-directed
 * autonomy. Nothing here represents a shipped product or real telemetry.
 */

type P = [number, number];
const ROUTES: P[][] = [
  [[14, 48], [30, 36], [48, 40], [66, 22], [86, 30], [80, 50], [56, 54], [30, 56], [14, 48]],
  [[14, 48], [26, 24], [50, 14], [74, 12], [90, 22], [70, 38], [44, 46], [24, 58], [14, 48]],
];
const LEVELS = [
  { k: "Supervised", op: 0.9, c: "Operator monitors continuously. Platform executes a defined plan." },
  { k: "Directed", op: 0.55, c: "Operator assigns objectives. Platform plans and reports as it goes." },
  { k: "Delegated", op: 0.25, c: "Periodic check-ins within limits set before departure." },
];

function lengths(r: P[]) {
  const seg = r.slice(1).map((p, i) => Math.hypot(p[0] - r[i][0], p[1] - r[i][1]));
  return { seg, total: seg.reduce((a, b) => a + b, 0) };
}
function along(r: P[], d: number) {
  const { seg } = lengths(r);
  let acc = 0;
  for (let i = 0; i < seg.length; i++) {
    if (d <= acc + seg[i]) {
      const f = (d - acc) / seg[i];
      const a = r[i];
      const b = r[i + 1];
      return { x: a[0] + (b[0] - a[0]) * f, y: a[1] + (b[1] - a[1]) * f, h: Math.atan2(b[1] - a[1], b[0] - a[0]), wp: i };
    }
    acc += seg[i];
  }
  const last = r[r.length - 1];
  return { x: last[0], y: last[1], h: 0, wp: seg.length - 1 };
}

type Log = { id: number; t: string; m: string; tone?: "flare" | "cold" };

export default function MissionConsole() {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const live = useOnScreen(box, "0px");
  const clock = useUtcClock();
  const [route, setRoute] = useState(0);
  const [level, setLevel] = useState(1);
  const [hold, setHold] = useState(false);
  const [dist, setDist] = useState(0);
  const [logs, setLogs] = useState<Log[]>([{ id: 0, t: "--:--:--", m: "Mission loaded · limits confirmed by operator" }]);
  const [contacts, setContacts] = useState<{ id: number; x: number; y: number }[]>([]);
  const lastWp = useRef(-1);
  const logId = useRef(1);
  const r = ROUTES[route];
  const { total } = lengths(r);
  const pos = along(r, dist % total);

  const log = (m: string, tone?: Log["tone"]) => setLogs((l) => [{ id: logId.current++, t: new Date().toISOString().slice(11, 19), m, tone }, ...l].slice(0, 7));

  useEffect(() => {
    if (!live || reduce || hold) return;
    let frame = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min(0.05, Math.max(0, now - prev) / 1000);
      prev = now;
      setDist((d) => d + dt * 6);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [live, reduce, hold]);

  // waypoint + contact events
  useEffect(() => {
    if (pos.wp !== lastWp.current) {
      if (lastWp.current !== -1) log(`Waypoint ${String(pos.wp + 1).padStart(2, "0")} reached · continuing within limits`);
      lastWp.current = pos.wp;
      if (Math.random() < 0.55) {
        const c = { id: logId.current, x: pos.x + (Math.random() * 16 - 8), y: pos.y + (Math.random() * 12 - 6) };
        setContacts((cs) => [...cs.slice(-3), c]);
        window.setTimeout(() => log("Contact detected · tracking · operator notified", "flare"), 900);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos.wp]);

  const setLvl = (i: number) => { setLevel(i); sound.tick(1.1); log(`Autonomy level set to ${LEVELS[i].k.toUpperCase()} by operator`, "cold"); };
  const toggleHold = () => { setHold((h) => !h); sound.tick(0.9); log(hold ? "Resume · mission continues" : "Hold position · commanded by operator", "cold"); };
  const redirect = () => { setRoute((x) => 1 - x); setDist(0); setContacts([]); lastWp.current = -1; sound.tick(1.3); log("Route redirected by operator · new plan accepted", "cold"); };

  const path = r.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
  const cone = `M${pos.x} ${pos.y} L${pos.x + Math.cos(pos.h - 0.45) * 16} ${pos.y + Math.sin(pos.h - 0.45) * 16} A16 16 0 0 1 ${pos.x + Math.cos(pos.h + 0.45) * 16} ${pos.y + Math.sin(pos.h + 0.45) * 16} Z`;

  return (
    <div ref={box} className="m-console" data-testid="mission-console">
      <div className="m-console__bar">
        <span><i className="d-dot" />Concept interface · simulated</span>
        <span>Mission 01 · Coastal watch</span>
        <span>UTC {clock}</span>
      </div>

      <div className="m-console__map">
        <svg viewBox="0 0 100 62" preserveAspectRatio="xMidYMid meet" aria-label="Simulated mission map">
          <defs>
            <pattern id="mgrid" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M5 0H0V5" fill="none" stroke="rgba(143,182,201,0.09)" strokeWidth="0.15" /></pattern>
          </defs>
          <rect width="100" height="62" fill="url(#mgrid)" />
          <path d="M0 0H9C11 8 6 14 9 22C12 30 5 36 8 44C11 52 6 58 7 62H0Z" fill="rgba(143,182,201,0.07)" stroke="rgba(143,182,201,0.35)" strokeWidth="0.25" />
          <path d={path} fill="none" stroke="rgba(233,238,242,0.25)" strokeWidth="0.3" strokeDasharray="1 1" />
          {r.slice(0, -1).map((p, i) => (
            <g key={i} className={i <= pos.wp ? "is-done" : ""}>
              <rect x={p[0] - 0.9} y={p[1] - 0.9} width="1.8" height="1.8" transform={`rotate(45 ${p[0]} ${p[1]})`} className="m-wp" />
              <text x={p[0] + 1.8} y={p[1] - 1.4} className="m-wp__t">WP{String(i + 1).padStart(2, "0")}</text>
            </g>
          ))}
          {contacts.map((c) => (
            <g key={c.id} className="m-contact">
              <rect x={c.x - 2} y={c.y - 2} width="4" height="4" fill="none" />
              <circle cx={c.x} cy={c.y} r="0.6" />
            </g>
          ))}
          <path d={cone} className="m-cone" />
          <circle cx={pos.x} cy={pos.y} r="3" className="m-ping" />
          <g transform={`translate(${pos.x} ${pos.y}) rotate(${(pos.h * 180) / Math.PI})`}>
            <path d="M2.2 0L-1.4 1.2L-0.8 0L-1.4 -1.2Z" fill="#fff" />
          </g>
        </svg>
        <div className="m-console__state">
          <span className={hold ? "is-hold" : ""}>{hold ? "Holding" : "Executing"}</span>
          <span>Level · {LEVELS[level].k}</span>
        </div>
      </div>

      <div className="m-console__side">
        <div className="m-block">
          <p className="m-k">Autonomy level</p>
          <div className="m-levels" role="radiogroup" aria-label="Autonomy level">
            {LEVELS.map((l, i) => (
              <button key={l.k} role="radio" aria-checked={i === level} className={i === level ? "is-on" : ""} onClick={() => setLvl(i)} data-testid={`level-${l.k.toLowerCase()}`}>{l.k}</button>
            ))}
          </div>
          <p className="m-desc">{LEVELS[level].c}</p>
          <div className="m-meter"><span>Operator involvement</span><i><motion.b animate={{ scaleX: LEVELS[level].op }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} /></i></div>
        </div>
        <div className="m-block m-actions">
          <button onClick={toggleHold} data-testid="console-hold">{hold ? "Resume" : "Hold"}</button>
          <button onClick={redirect} data-testid="console-redirect">Redirect</button>
        </div>
        <div className="m-block m-log">
          <p className="m-k">Mission log</p>
          <ul>
            <AnimatePresence initial={false}>
              {logs.map((l) => (
                <motion.li key={l.id} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className={l.tone ? `is-${l.tone}` : ""}>
                  <span>{l.t}</span>{l.m}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
}

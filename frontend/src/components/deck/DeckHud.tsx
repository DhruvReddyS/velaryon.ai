import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { CHAPTERS } from "@/lib/content";
import { useLoaded } from "@/lib/loader";
import { sound } from "@/lib/sound";
import { EASE, useSurfaceTone } from "@/components/kit";

type LenisLike = { scrollTo: (t: number | string, o?: object) => void };
const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

function goTo(top: number) {
  const l = lenis();
  if (l) l.scrollTo(top, { duration: 1.4, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  else window.scrollTo({ top, behavior: "smooth" });
}

/**
 * Every keyboard stop on the home deck. Pinned slides declare `data-stops`
 * (progress values through their pin) so ↓/→ walks beat by beat.
 */
function stops() {
  const vh = window.innerHeight;
  const out: number[] = [];
  CHAPTERS.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = Math.max(0, el.offsetHeight - vh);
    const list = el.dataset.stops?.split(",").map(Number) ?? [0];
    list.forEach((f) => out.push(Math.round(top + travel * f)));
  });
  return out.sort((a, b) => a - b);
}

/** Pitch-deck HUD: slide counter, chapter title, progress, chapter rail and deck keyboard control. */
export default function DeckHud() {
  const ready = useLoaded();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [away, setAway] = useState(false);
  const [hint, setHint] = useState(true);
  const light = useSurfaceTone("bottom");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const lastActive = useRef(0);

  useEffect(() => {
    const nodes = CHAPTERS.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setActive(CHAPTERS.findIndex((c) => c.id === e.target.id));
      }),
      { rootMargin: "-50% 0px -50% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    const footer = document.querySelector("footer");
    const fo = new IntersectionObserver(([e]) => setAway(e.isIntersecting), { rootMargin: "0px 0px -20% 0px" });
    if (footer) fo.observe(footer);
    return () => { io.disconnect(); fo.disconnect(); };
  }, []);

  useEffect(() => {
    if (active !== lastActive.current) { sound.ping(); lastActive.current = active; }
  }, [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.metaKey || e.ctrlKey || e.altKey || t.closest("input, textarea, select, [contenteditable]") || document.documentElement.classList.contains("is-menu-open")) return;
      const fwd = ["ArrowDown", "ArrowRight", "PageDown"].includes(e.key);
      const back = ["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key);
      if (e.key === "p" || e.key === "P") { e.preventDefault(); navigate("/deck"); return; }
      if (!fwd && !back) return;
      e.preventDefault();
      setHint(false);
      const y = window.scrollY;
      const all = stops();
      const target = fwd ? all.find((s) => s > y + 8) : [...all].reverse().find((s) => s < y - 8);
      if (target !== undefined) { goTo(target); sound.tick(fwd ? 1 : 0.85); }
      else if (fwd) goTo(document.documentElement.scrollHeight);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const no = String(active + 1).padStart(2, "0");
  return (
    <motion.div data-chrome className={`v-hud ${away ? "is-away" : ""} ${light ? "is-light" : ""}`} initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.8 }}>
      <div className="v-hud__counter" aria-hidden>
        <span className="v-hud__no">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.b key={no} initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.6, ease: EASE }}>{no}</motion.b>
          </AnimatePresence>
        </span>
        <span className="v-hud__total">/ {String(CHAPTERS.length).padStart(2, "0")}</span>
        <span className="v-hud__label">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.em key={active} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.6, ease: EASE }}>{CHAPTERS[active].label}</motion.em>
          </AnimatePresence>
        </span>
      </div>
      <div className="v-hud__keys">
        <AnimatePresence>{hint && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><kbd>↓</kbd><kbd>↑</kbd> step through</motion.span>}</AnimatePresence>
        <Link to="/deck" className="v-hud__present" data-cursor="Present" data-testid="hud-present"><kbd>P</kbd> Present</Link>
      </div>
      <div className="v-hud__bar" aria-hidden><motion.i style={{ scaleX: progress }} /></div>
      <nav className="v-hud__rail" aria-label="Deck chapters">
        {CHAPTERS.map((c, i) => (
          <button key={c.id} onClick={() => { const el = document.getElementById(c.id); if (el) goTo(el.getBoundingClientRect().top + window.scrollY); }} className={i === active ? "is-active" : ""} data-cursor={c.label} aria-label={`Go to ${c.label}`} aria-current={i === active ? "step" : undefined}>
            <i />
          </button>
        ))}
      </nav>
    </motion.div>
  );
}

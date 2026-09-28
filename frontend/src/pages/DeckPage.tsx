import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { SLIDES, notesFor } from "@/components/present/slides";
import { sound } from "@/lib/sound";
import { BRAND } from "@/lib/content";
import { EASE_IO } from "@/components/kit";

const W = 1920;
const H = 1080;

/** Scales a fixed 1920×1080 canvas to fit its container, letterboxed. */
function Stage({ children, className = "" }: { children: ReactNode; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(0.5);
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setK(Math.min(el.clientWidth / W, el.clientHeight / H));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={box} className={`p-stage ${className}`}>
      <div className="p-stage__canvas" style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${k})` }}>{children}</div>
    </div>
  );
}

function clock(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

/**
 * Presenter mode. ← → / Space to move, N notes, G grid, F fullscreen,
 * P print / save as PDF, Esc to leave. Slide index syncs to the URL hash.
 */
export default function DeckPage() {
  const navigate = useNavigate();
  const [i, setI] = useState(() => Math.min(SLIDES.length - 1, Math.max(0, (parseInt(window.location.hash.slice(1), 10) || 1) - 1)));
  const [dir, setDir] = useState(1);
  const [notes, setNotes] = useState(false);
  const [grid, setGrid] = useState(false);
  const [idle, setIdle] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const start = useRef(Date.now());
  const touch = useRef<number | null>(null);

  const go = useCallback((n: number) => {
    setI((cur) => {
      const next = Math.max(0, Math.min(SLIDES.length - 1, n));
      if (next !== cur) { setDir(next > cur ? 1 : -1); sound.tick(next > cur ? 1 : 0.85); }
      return next;
    });
  }, []);

  useEffect(() => { window.history.replaceState(null, "", `#${i + 1}`); }, [i]);
  useEffect(() => { const t = window.setInterval(() => setElapsed(Date.now() - start.current), 1000); return () => window.clearInterval(t); }, []);

  useEffect(() => {
    document.documentElement.classList.add("is-presenting");
    return () => document.documentElement.classList.remove("is-presenting");
  }, []);

  // hide chrome after the pointer rests
  useEffect(() => {
    let t = 0;
    const wake = () => { setIdle(false); window.clearTimeout(t); t = window.setTimeout(() => setIdle(true), 2600); };
    wake();
    window.addEventListener("pointermove", wake);
    return () => { window.removeEventListener("pointermove", wake); window.clearTimeout(t); };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter"].includes(k)) { e.preventDefault(); go(i + 1); }
      else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(k)) { e.preventDefault(); go(i - 1); }
      else if (k === "Home") go(0);
      else if (k === "End") go(SLIDES.length - 1);
      else if (k === "n" || k === "N") setNotes((v) => !v);
      else if (k === "g" || k === "G") setGrid((v) => !v);
      else if (k === "f" || k === "F") { if (document.fullscreenElement) void document.exitFullscreen(); else void document.documentElement.requestFullscreen?.(); }
      else if (k === "p" || k === "P") { e.preventDefault(); window.print(); }
      else if (/^[1-9]$/.test(k)) go(Number(k) - 1);
      else if (k === "0") go(9);
      else if (k === "Escape") { if (grid) setGrid(false); else if (!document.fullscreenElement) navigate("/"); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i, go, grid, navigate]);

  const slide = SLIDES[i];
  const next = SLIDES[i + 1];

  return (
    <div className={`p-deck ${notes ? "has-notes" : ""} ${idle && !notes ? "is-idle" : ""}`} data-testid="deck-page"
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { if (touch.current === null) return; const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1)); touch.current = null; }}>
      <div className="p-deck__main">
        <Stage>
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={slide.id}
              className="p-slide is-live"
              custom={dir}
              initial={{ clipPath: dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0%)" }}
              exit={{ opacity: 0.4, transition: { duration: 0.9 } }}
              transition={{ duration: 0.9, ease: EASE_IO }}
            >
              {slide.render(true)}
            </motion.div>
          </AnimatePresence>
        </Stage>
        <button className="p-deck__hit p-deck__hit--prev" onClick={() => go(i - 1)} aria-label="Previous slide" />
        <button className="p-deck__hit p-deck__hit--next" onClick={() => go(i + 1)} aria-label="Next slide" />
      </div>

      {notes && (
        <aside className="p-notes" aria-label="Speaker notes">
          <div className="p-notes__top"><span>Speaker notes</span><b>{clock(elapsed)}</b></div>
          <p className="p-notes__k">{String(i + 1).padStart(2, "0")} · {slide.label}</p>
          <p className="p-notes__body">{notesFor(slide.id)}</p>
          {next && (
            <div className="p-notes__next">
              <span>Next · {next.label}</span>
              <Stage className="p-notes__thumb"><div className="p-slide">{next.render(false)}</div></Stage>
            </div>
          )}
        </aside>
      )}

      <div className="p-deck__bar">
        <Link to="/" className="p-deck__exit" data-testid="deck-exit">← Exit</Link>
        <div className="p-deck__dots">
          {SLIDES.map((s, k) => <button key={s.id} className={k === i ? "is-on" : ""} onClick={() => go(k)} aria-label={`Slide ${k + 1}: ${s.label}`} aria-current={k === i ? "step" : undefined}><i /></button>)}
        </div>
        <span className="p-deck__count">{String(i + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}</span>
        <div className="p-deck__tools">
          <button onClick={() => setNotes((v) => !v)} className={notes ? "is-on" : ""} data-testid="deck-notes"><kbd>N</kbd> Notes</button>
          <button onClick={() => setGrid(true)} data-testid="deck-grid"><kbd>G</kbd> Grid</button>
          <button onClick={() => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.())}><kbd>F</kbd> Full</button>
          <button onClick={() => window.print()} data-testid="deck-pdf"><kbd>P</kbd> PDF</button>
        </div>
      </div>

      <AnimatePresence>
        {grid && (
          <motion.div className="p-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-label="All slides">
            <div className="p-grid__head"><span>{BRAND.name} — all slides</span><button onClick={() => setGrid(false)}>Close ✕</button></div>
            <div className="p-grid__list">
              {SLIDES.map((s, k) => (
                <button key={s.id} className={k === i ? "is-on" : ""} onClick={() => { go(k); setGrid(false); }}>
                  <Stage><div className="p-slide">{s.render(false)}</div></Stage>
                  <span>{String(k + 1).padStart(2, "0")} · {s.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Print / PDF: every slide as its own 1920×1080 page. */}
      <div className="p-print" aria-hidden>
        {SLIDES.map((s) => <div key={s.id} className="p-print__page"><div className="p-slide">{s.render(false)}</div></div>)}
      </div>
    </div>
  );
}

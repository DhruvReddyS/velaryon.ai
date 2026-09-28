import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { sound } from "@/lib/sound";
import { Link } from "react-router-dom";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_IO = [0.76, 0, 0.24, 1] as const;

/* ------------------------------------------------------------------ Reveal */

export function Reveal({ children, delay = 0, y = 28, className, style }: { children: ReactNode; delay?: number; y?: number; className?: string; style?: CSSProperties }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------ Lines — masked line rise */

type LinesProps = {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
  /** When provided, animation waits for this flag instead of scroll-into-view. */
  play?: boolean;
};

export function Lines({ lines, as = "h2", className, delay = 0, stagger = 0.09, play }: LinesProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const on = play ?? inView;
  const Tag = motion[as] as typeof motion.h2;
  return (
    <Tag ref={ref as never} className={className}>
      {lines.map((line, i) => (
        <span className="k-line" key={i}>
          <motion.span
            className="k-line__in"
            initial={reduce ? false : { y: "110%", rotate: 2.5 }}
            animate={on || reduce ? { y: "0%", rotate: 0 } : undefined}
            transition={{ duration: 1.15, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------- ScrubWords — scroll lit words */

function Word({ children, progress, range, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; accent?: boolean }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span className={accent ? "k-word k-word--accent" : "k-word"} style={{ opacity, y }}>
      {children}
    </motion.span>
  );
}

export function ScrubWords({ text, accent = [], className, progress }: { text: string; accent?: string[]; className?: string; progress?: MotionValue<number> }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const p = progress ?? scrollYProgress;
  const words = text.split(" ");
  const clean = (w: string) => w.replace(/[^\w'’-]/g, "").toLowerCase();
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const isAccent = accent.includes(clean(w));
        return reduce ? (
          <span key={i} className={isAccent ? "k-word k-word--accent" : "k-word"}>{w}</span>
        ) : (
          <Word key={i} progress={p} range={[start, start + 1 / words.length]} accent={isAccent}>{w}</Word>
        );
      })}
    </p>
  );
}

/* ------------------------------------------------------------ Count up */

export function Count({ to, suffix = "", duration = 2.2, className }: { to: number; suffix?: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration, ease: EASE, onUpdate: (v) => setVal(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);
  return <span ref={ref} className={className}>{val}<small>{suffix}</small></span>;
}

/* --------------------------------------------------------------- Marquee */

export function Marquee({ items, className = "", speed = 40, reverse = false }: { items: string[]; className?: string; speed?: number; reverse?: boolean }) {
  const row = (
    <div className="k-marquee__row" aria-hidden>
      {items.map((it, i) => <span key={i}>{it}<i>✦</i></span>)}
    </div>
  );
  return (
    <div className={`k-marquee ${className}`} style={{ "--k-speed": `${speed}s`, "--k-dir": reverse ? "reverse" : "normal" } as CSSProperties}>
      <div className="k-marquee__track">{row}{row}</div>
    </div>
  );
}

/* ---------------------------------------------------------------- Tag */

export function Tag({ no, children, className = "" }: { no?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`k-tag ${className}`}>
      {no && <span>{no}</span>}
      <i />
      {children}
    </p>
  );
}

/* ------------------------------------------------------------ Magnetic */

export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const leave = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} className={className} style={{ x: sx, y: sy, display: "inline-block" }} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------- Buttons */

type CtaProps = { to?: string; href?: string; children: ReactNode; variant?: "solid" | "ghost" | "light"; testId?: string; className?: string; onClick?: () => void };

export function Cta({ to, href, children, variant = "solid", testId, className = "", onClick }: CtaProps) {
  const inner = (
    <>
      <span className="k-cta__label" data-text={typeof children === "string" ? children : undefined}><span>{children}</span></span>
      <span className="k-cta__icon" aria-hidden>
        <svg viewBox="0 0 16 16"><path d="M4 12 12 4M5.5 4H12v6.5" /></svg>
        <svg viewBox="0 0 16 16"><path d="M4 12 12 4M5.5 4H12v6.5" /></svg>
      </span>
    </>
  );
  const cls = `k-cta k-cta--${variant} ${className}`;
  const hover = () => sound.tick(1.4);
  const node = href ? (
    <a href={href} className={cls} data-testid={testId} data-cursor="Open" onPointerEnter={hover}>{inner}</a>
  ) : to ? (
    <Link to={to} className={cls} data-testid={testId} data-cursor="Open" onPointerEnter={hover}>{inner}</Link>
  ) : (
    <button type="button" className={cls} data-testid={testId} onClick={onClick} onPointerEnter={hover}>{inner}</button>
  );
  return <Magnetic strength={0.22}>{node}</Magnetic>;
}

/* ------------------------------------------------------ Parallax image */

export function ParallaxImg({ src, srcSet, alt, className = "", amount = 12, position = "50% 50%", priority = false }: { src: string; srcSet?: string; alt: string; className?: string; amount?: number; position?: string; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={`k-parallax ${className}`}>
      <motion.img src={src} srcSet={srcSet} sizes="100vw" alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" style={{ y: reduce ? 0 : y, objectPosition: position, scale: 1 + amount / 50 }} />
    </div>
  );
}

/* ----------------------------------------------------- Clip reveal image */

export function ClipImg({ src, srcSet, alt, className = "", position = "50% 50%" }: { src: string; srcSet?: string; alt: string; className?: string; position?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const inset = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const clip = useTransform(inset, (v) => `inset(${v}% ${v * 1.4}% ${v}% ${v * 1.4}%)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  return (
    <motion.div ref={ref} className={`k-clip ${className}`} style={reduce ? undefined : { clipPath: clip }}>
      <motion.img src={src} srcSet={srcSet} sizes="100vw" alt={alt} loading="lazy" decoding="async" style={{ objectPosition: position, scale: reduce ? 1 : scale }} />
    </motion.div>
  );
}

/* ----------------------------------------------------------- Live clock */

export function useUtcClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);
  return now.toISOString().slice(11, 19);
}

/* --------------------------------------------------------- Media query */

export function useMedia(query: string) {
  const [match, setMatch] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [query]);
  return match;
}

/* --------------------------------------------------------- Sound state */

export function useSoundOn() {
  return useSyncExternalStore(sound.subscribe, () => sound.on, () => false);
}

/* ------------------------------------------------------ Surface tone */

/**
 * Reports whether the page surface under a given viewport y-position is a
 * light section (`data-theme="light"`), so fixed chrome can switch colour
 * with real contrast instead of relying on blend modes.
 */
export function useSurfaceTone(at: "top" | "bottom", deps: unknown[] = []) {
  const [light, setLight] = useState(false);
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const y = at === "top" ? 28 : window.innerHeight - 18;
      const hit = document.elementsFromPoint(window.innerWidth / 2, y).find((el) => !(el as HTMLElement).closest?.("[data-chrome]"));
      setLight(!!hit?.closest('[data-theme="light"]'));
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(read); };
    read();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    const t = window.setTimeout(read, 600);
    return () => { window.removeEventListener("scroll", queue); window.removeEventListener("resize", queue); cancelAnimationFrame(frame); window.clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [at, ...deps]);
  return light;
}

/* ----------------------------------------------------------- In view */

/** True while the element is on screen — used to pause canvases and loops. */
export function useOnScreen<T extends Element>(ref: React.RefObject<T | null>, margin = "0px") {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: margin });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, margin]);
  return on;
}

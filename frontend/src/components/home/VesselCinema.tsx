import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  useMotionTemplate,
  type MotionValue,
} from "motion/react";
import type { Platform, CinemaAnnotation } from "@/lib/platforms";

function Annotation({ a, i, p }: { a: CinemaAnnotation; i: number; p: MotionValue<number> }) {
  const enter = 0.55 + i * 0.03;
  const exit = 0.73 + i * 0.035;
  const op = useTransform(p, [enter, enter + 0.06, exit, exit + 0.05], [0, 1, 1, 0]);
  const lineH = useTransform(p, [enter, enter + 0.06], [0, 28]);
  return (
    <motion.div
      aria-hidden
      className="absolute hidden md:block"
      style={{ left: a.x, top: a.y, opacity: op }}
    >
      <div className="flex -translate-x-1/2 flex-col items-center">
        <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.3em] text-slate-200/80">
          {a.label}
        </span>
        <motion.span className="mt-1.5 block w-px bg-slate-300/50" style={{ height: lineH }} />
        <span className="mt-0 block h-1.5 w-1.5 rounded-full bg-slate-200/90" />
      </div>
    </motion.div>
  );
}

function HunterField({ p }: { p: MotionValue<number> }) {
  const op = useTransform(p, [0.2, 0.32, 0.6, 0.72], [0, 1, 1, 0]);
  const draw = useTransform(p, [0.2, 0.38], [0, 1]);
  const trk = useTransform(p, [0.36, 0.46], [0, 1]);
  const m0 = useTransform(p, [0.26, 0.32, 0.36, 0.42], [0, 1, 1, 0.2]);
  const m1 = useTransform(p, [0.4, 0.46, 0.5, 0.56], [0, 1, 1, 0.2]);
  const m2 = useTransform(p, [0.54, 0.6, 0.64, 0.7], [0, 1, 1, 0.2]);
  const micro = [m0, m1, m2];
  const words = ["OBSERVE.", "INTERPRET.", "CONNECT."];
  return (
    <motion.div aria-hidden style={{ opacity: op }} className="absolute inset-0">
      <svg viewBox="0 0 100 62" preserveAspectRatio="none" className="h-full w-full" fill="none">
        {[18, 34, 50].map((y) => (
          <motion.path
            key={y}
            d={`M0 ${y} H 100`}
            stroke="#6e8cab"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="1 3"
            opacity="0.45"
            style={{ pathLength: draw }}
          />
        ))}
        <path
          d="M29 4 L13 44 L45 44 Z"
          fill="rgba(110,140,171,0.07)"
          stroke="rgba(110,140,171,0.35)"
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
        />
        <motion.g style={{ opacity: trk }}>
          <rect x="61" y="26" width="7" height="5" stroke="#cbd5e1" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
          <rect x="76" y="40" width="6" height="4" stroke="#cbd5e1" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        </motion.g>
      </svg>
      <div className="absolute bottom-24 right-5 space-y-2 text-right md:right-12">
        {words.map((w, i) => (
          <motion.span key={w} style={{ opacity: micro[i] }} className="block font-mono text-[10px] uppercase tracking-[0.4em] text-slate-200">
            {w}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function VesselCinema({ platform, testId }: { platform: Platform; testId: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const sp = useSpring(scrollYProgress, { stiffness: 58, damping: 19, mass: 0.9 });

  const hasVideo = Boolean(platform.cinema.video) && !reduce;

  // lazy attach source shortly before the section approaches the viewport
  useEffect(() => {
    const v = videoRef.current;
    const el = ref.current;
    if (!v || !el || !platform.cinema.video || reduce) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const mobile = window.matchMedia("(max-width: 768px)").matches;
          v.src = mobile ? platform.cinema.video!.mobile : platform.cinema.video!.desktop;
          v.load();
          io.disconnect();
        }
      },
      { rootMargin: "120% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [platform, reduce]);

  // heavy, controlled scrub: interpolate currentTime toward the scroll-derived time
  useEffect(() => {
    if (!ready || !hasVideo) return;
    const v = videoRef.current!;
    v.pause();
    let raf = 0;
    const loop = () => {
      const dur = v.duration || 0;
      if (dur > 0) {
        const target = Math.min(dur - 0.05, Math.max(0, sp.get() * dur));
        const diff = target - v.currentTime;
        if (Math.abs(diff) > 0.02) v.currentTime += diff * 0.12;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [ready, hasVideo, sp]);

  // cinematic grade toward the horizon transition
  const sat = useTransform(sp, [0.86, 1], [1, 0.5]);
  const br = useTransform(sp, [0.86, 1], [1, 0.68]);
  const grade = useMotionTemplate`saturate(${sat}) brightness(${br})`;
  const darken = useTransform(sp, [0.86, 1], [0, 0.5]);
  const horizonW = useTransform(sp, [0.84, 1], ["0%", "100%"]);
  const letterH = useTransform(sp, [0, 0.12], ["9vh", "0vh"]);

  // typography chapters
  const kickerOp = useTransform(sp, [0.03, 0.09, 0.76, 0.84], [0, 1, 1, 0]);
  const nameOp = useTransform(sp, [0.15, 0.2, 0.72, 0.83], [0, 1, 1, 0]);
  const nameY = useTransform(sp, [0.15, 0.27], ["112%", "0%"]);
  const tagOp = useTransform(sp, [0.34, 0.44, 0.68, 0.78], [0, 1, 1, 0]);
  const tagY = useTransform(sp, [0.34, 0.46], [26, 0]);
  const midOp = useTransform(sp, [0.75, 0.81, 0.85, 0.9], [0, 1, 1, 0]);
  const closeOp = useTransform(sp, [0.88, 0.96], [0, 1]);
  const closeY = useTransform(sp, [0.88, 0.98], [34, 0]);
  const textDrift = useTransform(sp, [0, 1], [12, -12]);

  // viper identity: silhouette, sweeping light line, clip reveal
  const vReveal = useTransform(sp, [0.05, 0.5], [100, 0]);
  const vClip = useMotionTemplate`inset(0 ${vReveal}% 0 0)`;
  const vLineP = useTransform(sp, [0.05, 0.5], [-5, 105]);
  const vLineLeft = useMotionTemplate`${vLineP}%`;
  const vLineOp = useTransform(sp, [0.03, 0.1, 0.5, 0.6], [0, 1, 1, 0]);
  const vBandOp = useTransform(sp, [0.08, 0.26, 0.44, 0.58], [0, 0.8, 0.8, 0]);

  // image fallback motion (video carries its own)
  const imgScale = useTransform(sp, [0, 1], [1.16, 1.03]);
  const imgY = useTransform(sp, [0, 1], ["3%", "-3%"]);

  if (reduce) {
    return (
      <section data-testid={testId} className="relative bg-abyss py-24">
        <div className="relative h-[70vh] overflow-hidden">
          <img src={platform.cinema.poster} alt={platform.alt} loading="lazy" className="h-full w-full object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-abyss/80 to-transparent" />
          <div className="absolute bottom-10 left-5 md:left-10">
            <p className="font-mono text-[11px] tracking-[0.4em] text-mist">{platform.code}</p>
            <h2 className="mt-3 font-display text-6xl font-medium tracking-[0.14em] text-white sm:text-7xl">{platform.name}</h2>
            <p className="mt-2 font-display text-2xl tracking-tight text-steel-light sm:text-3xl">
              {platform.tagline[0]} {platform.tagline[1]}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      data-testid={testId}
      data-cursor="VIEW"
      className={`relative bg-abyss ${hasVideo ? "h-[200vh] md:h-[380vh]" : "h-[260vh] md:h-[340vh]"}`}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* media layer */}
        <motion.div className="absolute inset-0" style={{ filter: grade }}>
          {platform.id === "viper" ? (
            <>
              <motion.img
                src={platform.cinema.poster}
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ filter: "brightness(0.15)", scale: imgScale, y: imgY }}
              />
              <motion.img
                src={platform.cinema.poster}
                alt={platform.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ clipPath: vClip, scale: imgScale, y: imgY }}
              />
              <motion.img
                src={platform.cinema.poster}
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  opacity: vBandOp,
                  filter: "grayscale(1) contrast(1.8) brightness(1.3)",
                  clipPath: "inset(38% 0 44% 0)",
                  scale: imgScale,
                  y: imgY,
                }}
              />
              <motion.div
                aria-hidden
                className="absolute top-0 z-10 h-full w-[2px]"
                style={{
                  left: vLineLeft,
                  opacity: vLineOp,
                  background:
                    "linear-gradient(to bottom, transparent, rgba(226,232,240,0.85) 38%, rgba(226,232,240,0.85) 62%, transparent)",
                }}
              />
            </>
          ) : (
            <>
              {hasVideo ? (
                <>
                  <motion.img
                    src={platform.cinema.poster}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: platform.cinema.objectPosition ?? "center" }}
                  />
                  <video
                    ref={videoRef}
                    muted
                    playsInline
                    preload="metadata"
                    onLoadedData={() => setReady(true)}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                      ready ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ objectPosition: platform.cinema.objectPosition ?? "center" }}
                    aria-label={platform.alt}
                  />
                </>
              ) : (
                <motion.img
                  src={platform.cinema.poster}
                  alt={platform.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ scale: imgScale, y: imgY, objectPosition: platform.cinema.objectPosition ?? "center" }}
                />
              )}
            </>
          )}
        </motion.div>

        {/* vignette + end darkening */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_55%,rgba(5,7,10,0.55)_100%)]" />
        <motion.div aria-hidden className="absolute inset-0 bg-abyss" style={{ opacity: darken }} />

        {platform.id === "hunter" && <HunterField p={sp} />}

        {/* engineering annotations */}
        <div className="absolute inset-0">
          {platform.cinema.annotations.map((a, i) => (
            <Annotation key={a.label} a={a} i={i} p={sp} />
          ))}
        </div>

        {/* chapters */}
        <motion.div style={{ y: textDrift }} className="absolute inset-0 [text-shadow:0_2px_28px_rgba(5,7,10,0.65)]">
          <motion.p
            style={{ opacity: kickerOp }}
            className="absolute left-5 top-24 font-mono text-[10px] uppercase tracking-[0.4em] text-mist md:left-10"
          >
            {platform.code} — AUTONOMOUS MARITIME PLATFORM
          </motion.p>

          <motion.div
            style={{ opacity: nameOp }}
            className="absolute inset-0 flex flex-col items-center justify-center px-5"
          >
            <div className="overflow-hidden">
              <motion.h2
                style={{ y: nameY }}
                className="text-center font-display text-[17vw] font-medium leading-none tracking-[0.16em] text-white md:text-[12vw]"
              >
                {platform.name}
              </motion.h2>
            </div>
            <motion.p
              style={{ opacity: tagOp, y: tagY }}
              className="mt-6 text-center font-display text-2xl font-medium tracking-tight text-steel-light sm:text-4xl"
            >
              {platform.tagline[0]}
              <br />
              {platform.tagline[1]}
            </motion.p>
          </motion.div>

          <motion.div
            style={{ opacity: midOp }}
            className="absolute bottom-24 right-5 text-right md:right-10"
          >
            {platform.cinema.midCopy.map((l) => (
              <p key={l} className="font-mono text-[10px] uppercase tracking-[0.35em] text-slate-200">
                {l}
              </p>
            ))}
          </motion.div>

          <motion.div
            style={{ opacity: closeOp, y: closeY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center"
          >
            <p className="font-mono text-[11px] tracking-[0.45em] text-mist">
              {platform.code} — {platform.name}
            </p>
            <p className="mt-6 font-display text-4xl font-medium leading-[1.0] tracking-tight text-white sm:text-6xl">
              ENGINEERED FOR
              <br />
              AN AUTONOMOUS OCEAN.
            </p>
          </motion.div>
        </motion.div>

        {/* horizon line — carries into the next vessel */}
        <motion.div
          aria-hidden
          className="absolute left-0 top-[42%] z-10 h-px bg-slate-300/50"
          style={{ width: horizonW }}
        />

        {/* cinematic letterbox */}
        <motion.div aria-hidden className="absolute inset-x-0 top-0 z-20 bg-black" style={{ height: letterH }} />
        <motion.div aria-hidden className="absolute inset-x-0 bottom-0 z-20 bg-black" style={{ height: letterH }} />
      </div>
    </section>
  );
}

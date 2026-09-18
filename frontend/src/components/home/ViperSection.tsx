import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";
import { PLATFORMS } from "@/lib/platforms";

const P = PLATFORMS[0];

export default function ViperSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const lineP = useTransform(p, [0.06, 0.55], [-5, 105]);
  const lineLeft = useMotionTemplate`${lineP}%`;
  const reveal = useTransform(p, [0.06, 0.58], [100, 0]);
  const clip = useMotionTemplate`inset(0 ${reveal}% 0 0)`;
  const lineOp = useTransform(p, [0.04, 0.12, 0.56, 0.66], [0, 1, 1, 0]);
  const bandOp = useTransform(p, [0.1, 0.3, 0.48, 0.62], [0, 0.85, 0.85, 0]);

  const codeOp = useTransform(p, [0.05, 0.13], [0, 1]);
  const nameOp = useTransform(p, [0.1, 0.2], [0, 1]);
  const nameX = useTransform(p, [0.1, 0.24], [-70, 0]);
  const tagOp = useTransform(p, [0.3, 0.42], [0, 1]);
  const tagX = useTransform(p, [0.3, 0.44], [-46, 0]);
  const copyOp = useTransform(p, [0.52, 0.64], [0, 1]);
  const descOp = useTransform(p, [0.58, 0.7], [0, 1]);

  return (
    <section ref={ref} data-testid="viper-section" data-cursor="VIEW" className="relative h-[280vh] bg-[#04060a]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <img
          src={P.img}
          alt={P.alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "brightness(0.16)" }}
        />
        <motion.img
          src={P.img}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: clip }}
        />
        <motion.img
          src={P.img}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: bandOp,
            filter: "grayscale(1) contrast(1.8) brightness(1.3)",
            clipPath: "inset(38% 0 44% 0)",
          }}
        />
        <motion.div
          aria-hidden
          className="absolute top-0 h-full w-[2px]"
          style={{
            left: lineLeft,
            opacity: lineOp,
            background:
              "linear-gradient(to bottom, transparent, rgba(226,232,240,0.85) 38%, rgba(226,232,240,0.85) 62%, transparent)",
          }}
        />

        <div className="absolute bottom-14 left-5 right-5 md:bottom-20 md:left-10">
          <motion.p style={{ opacity: codeOp }} className="font-mono text-[11px] tracking-[0.4em] text-mist">
            {P.code}
          </motion.p>
          <div className="mt-3 overflow-hidden">
            <motion.h2
              style={{ opacity: nameOp, x: nameX }}
              className="font-display text-6xl font-medium tracking-tight text-white sm:text-7xl lg:text-8xl"
            >
              {P.name}
            </motion.h2>
          </div>
          <div className="mt-2 overflow-hidden">
            <motion.p style={{ opacity: tagOp, x: tagX }} className="font-display text-2xl tracking-tight text-steel-light sm:text-4xl">
              {P.tagline[0]} {P.tagline[1]}
            </motion.p>
          </div>
          <motion.p style={{ opacity: copyOp }} className="mt-6 max-w-md text-sm leading-relaxed text-mist">
            {P.copy}
          </motion.p>
          <motion.div style={{ opacity: descOp }} className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {P.descriptors.map((d) => (
              <span key={d} className="font-mono text-[9px] uppercase tracking-[0.28em] text-mist/70">
                {d}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

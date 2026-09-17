import { motion } from "motion/react";
import ChapterLabel from "@/components/ChapterLabel";
import ArrowLink from "@/components/ArrowLink";
import { Reveal, EASE } from "@/components/Reveal";

function TrajectorySvg() {
  return (
    <svg viewBox="0 0 300 120" fill="none" className="h-full w-full" aria-hidden>
      <motion.path
        d="M10 100 C 80 100, 110 40, 180 40 S 260 20, 292 18"
        stroke="#3b526b"
        strokeWidth="1.4"
        strokeDasharray="4 5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />
      <motion.circle
        cx="292"
        cy="18"
        r="3.5"
        fill="#0f172a"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2, duration: 0.4 }}
      />
      <circle cx="10" cy="100" r="3.5" fill="#0f172a" />
    </svg>
  );
}

function PerceptionSvg() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="h-full w-full" aria-hidden>
      {[70, 48, 26].map((r, i) => (
        <motion.path
          key={r}
          d={`M ${100 - r} 95 A ${r} ${r} 0 0 1 ${100 + r} 95`}
          stroke="#3b526b"
          strokeWidth="1.2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 - i * 0.25 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.3 * i, duration: 0.8, ease: EASE }}
        />
      ))}
      <circle cx="100" cy="95" r="4" fill="#0f172a" />
      <motion.circle
        cx="138"
        cy="52"
        r="3"
        fill="#3b526b"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.1, duration: 0.5 }}
      />
    </svg>
  );
}

function IntelligenceSvg() {
  return (
    <svg viewBox="0 0 220 90" fill="none" className="h-full w-full" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.circle
          key={i}
          cx={20 + i * 18}
          cy={30 + ((i * 37) % 30)}
          r="2.5"
          fill="#94a3b8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 * i, duration: 0.4 }}
        />
      ))}
      <motion.path
        d="M110 45 H 150"
        stroke="#3b526b"
        strokeWidth="1.2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.7 }}
      />
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <rect x="156" y="32" width="56" height="26" stroke="#0f172a" strokeWidth="1.2" />
        <text x="184" y="49" textAnchor="middle" fontSize="9" fill="#0f172a" fontFamily="monospace" letterSpacing="2">
          TRACK
        </text>
      </motion.g>
    </svg>
  );
}

function ConnectivitySvg() {
  return (
    <svg viewBox="0 0 300 100" fill="none" className="h-full w-full" aria-hidden>
      <motion.path
        d="M30 70 C 110 20, 190 20, 270 55"
        stroke="#3b526b"
        strokeWidth="1.2"
        strokeDasharray="3 6"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <circle cx="30" cy="70" r="4" fill="#0f172a" />
      <rect x="264" y="49" width="12" height="12" stroke="#0f172a" strokeWidth="1.4" />
      <motion.circle
        cx="30"
        cy="70"
        r="10"
        stroke="#3b526b"
        strokeWidth="1"
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: [0, 0.8, 0], scale: 1.6 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6, duration: 1.6 }}
        style={{ transformOrigin: "30px 70px" }}
      />
    </svg>
  );
}

const PILLARS = [
  {
    title: "AUTONOMY",
    copy: "Mission-level decision making, being designed to let a vessel plan, adapt and execute without a crew on board.",
    svg: <TrajectorySvg />,
    span: "md:col-span-7",
  },
  {
    title: "PERCEPTION",
    copy: "Sensing intended to build a continuous picture of the surface environment — vessels, obstacles, coastline.",
    svg: <PerceptionSvg />,
    span: "md:col-span-5",
  },
  {
    title: "INTELLIGENCE",
    copy: "Sensor data fused into situational awareness: from raw contacts to identified, tracked objects.",
    svg: <IntelligenceSvg />,
    span: "md:col-span-5",
  },
  {
    title: "CONNECTIVITY",
    copy: "A link concept connecting the platform to remote supervision and operations — connected, not unattended.",
    svg: <ConnectivitySvg />,
    span: "md:col-span-7",
  },
];

export default function TechnologyPillars() {
  return (
    <section data-testid="technology-pillars" className="bg-paper py-28 text-slate-900 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <ChapterLabel index="04" title="Technology" light />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-10 max-w-3xl font-display text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
            Intelligence beneath
            <br />
            the surface.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px bg-line md:grid-cols-12">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={0.08 * i} className={`${p.span} bg-paper`}>
              <div className="flex h-full flex-col justify-between p-8 md:p-10" data-testid={`pillar-${p.title.toLowerCase()}`}>
                <div className="h-28 md:h-32">{p.svg}</div>
                <div className="mt-10">
                  <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-slate-500">{p.title}</p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">{p.copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14">
          <ArrowLink to="/technology" testId="technology-section-link" light>
            Explore Technology
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}

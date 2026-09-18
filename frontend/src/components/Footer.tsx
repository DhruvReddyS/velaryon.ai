import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const EXPLORE = [
  { to: "/mission", label: "MISSION" },
  { to: "/platform", label: "PLATFORMS" },
  { to: "/how-it-works", label: "AUTONOMY" },
  { to: "/technology", label: "TECHNOLOGY" },
  { to: "/company", label: "COMPANY" },
  { to: "/newsroom", label: "NEWSROOM" },
];

export default function Footer() {
  const reduce = useReducedMotion();
  const [water, setWater] = useState(false);
  const [fine, setFine] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const wakeFired = useInView(endRef, { once: true, margin: "-8px" });
  const location = useLocation();

  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches && !reduce);
  }, [reduce]);

  const markFilter = water && fine;

  return (
    <footer data-testid="footer" className="relative overflow-hidden bg-black">
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <filter id="velaryon-water" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.028" numOctaves="2" result="n">
              <animate
                attributeName="baseFrequency"
                values="0.012 0.028;0.016 0.034;0.012 0.028"
                dur="10s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="14" />
          </filter>
        </defs>
      </svg>

      {/* massive submerged mark */}
      <div
        data-testid="footer-mark"
        className="relative mx-auto flex justify-center px-5 pt-24 md:pt-36"
        onMouseEnter={() => setWater(true)}
        onMouseLeave={() => setWater(false)}
      >
        <div className="relative h-[44vw] max-h-[560px] w-[86vw] overflow-hidden md:w-[64vw]">
          <img
            src="/assets/logo-mark-light.png"
            alt="Velaryon mark"
            className="mx-auto w-full transition-opacity duration-700"
            style={{
              filter: markFilter ? "url(#velaryon-water)" : undefined,
              opacity: 0.92,
            }}
          />
          {/* final wake: moves through the mark once */}
          <svg aria-hidden viewBox="0 0 260 40" className="absolute bottom-[16%] left-1/2 w-[70%] -translate-x-1/2" fill="none">
            <motion.path
              d="M6 22 Q 65 8 130 22 T 254 22"
              stroke="#94a3b8"
              strokeWidth="1.4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={wakeFired && !reduce ? { pathLength: 1, opacity: [0, 0.8, 0] } : {}}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
            <motion.path
              d="M30 31 Q 95 21 160 31 T 232 31"
              stroke="#3b526b"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={wakeFired && !reduce ? { pathLength: 1, opacity: [0, 0.55, 0] } : {}}
              transition={{ duration: 1.8, delay: 0.25, ease: "easeOut" }}
            />
          </svg>
        </div>
      </div>

      {/* floating minimal navigation */}
      <div className="relative z-10 mx-auto -mt-[20vw] flex max-w-7xl flex-col justify-between gap-10 px-5 md:-mt-[14vw] md:flex-row md:px-10">
        <nav aria-label="Footer explore">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-mist/60">EXPLORE</p>
          <ul className="mt-4 space-y-2.5">
            {EXPLORE.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-testid={`footer-link-${l.label.toLowerCase()}`}
                  className={`font-mono text-xs tracking-[0.25em] transition-colors duration-300 hover:text-white ${
                    location.pathname === l.to ? "text-white" : "text-slate-400"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-mist/60">CONNECT</p>
          <div className="mt-4 flex flex-col gap-2.5 md:items-end">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              data-testid="footer-linkedin-link"
              className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-slate-400 transition-colors duration-300 hover:text-white"
            >
              LINKEDIN
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </a>
            <a
              href="mailto:hello@velaryon.com"
              data-testid="footer-email-link"
              className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-slate-400 transition-colors duration-300 hover:text-white"
            >
              EMAIL
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      {/* extreme bottom */}
      <div ref={endRef} className="relative z-10 mt-24 border-t border-white/[0.08] md:mt-32">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.25em] text-mist/50 md:flex-row md:items-center md:justify-between md:px-10">
          <span>VELARYON — AUTONOMOUS MARITIME SYSTEMS / AUSTRALIA</span>
          <div className="flex gap-8">
            <Link to="/privacy" data-testid="footer-privacy-link" className="transition-colors hover:text-slate-300">
              PRIVACY
            </Link>
            <Link to="/terms" data-testid="footer-terms-link" className="transition-colors hover:text-slate-300">
              TERMS
            </Link>
          </div>
          <span>© 2026 VELARYON</span>
        </div>
      </div>
    </footer>
  );
}

import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { velaryonMedia as media } from "@/lib/velaryonMedia";
import { BRAND, NAV } from "@/lib/content";
import { Cta, useUtcClock } from "@/components/kit";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const clock = useUtcClock();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["45%", "0%"]);
  const spacing = useTransform(scrollYProgress, [0, 1], ["0.12em", "-0.04em"]);
  const toTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (n: number, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 2.2 }); else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="v-footer" data-testid="footer">
      <div className="v-footer__top">
        <div className="v-footer__call">
          <p className="k-tag"><span>∞</span><i />Transmission open</p>
          <h2>Build what <em>comes next.</em></h2>
          <Cta href={`mailto:${BRAND.email}`} testId="footer-email">{BRAND.email}</Cta>
        </div>
        <div className="v-footer__cols">
          <div>
            <p>Index</p>
            {NAV.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
          </div>
          <div>
            <p>Company</p>
            <Link to="/contact">Contact</Link>
            <Link to="/newsroom">Newsroom</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
          <div>
            <p>Status</p>
            <span className="v-footer__live"><i />{BRAND.status}</span>
            <span>UTC {clock}</span>
            <button onClick={toTop} data-cursor="Top">Back to top ↑</button>
          </div>
        </div>
      </div>
      <div className="v-footer__giant" aria-hidden>
        <motion.div style={reduce ? undefined : { y, letterSpacing: spacing }}>VELARYON</motion.div>
      </div>
      <div className="v-footer__base">
        <img src={media.brand.mark} alt="" />
        <span>© {new Date().getFullYear()} {BRAND.name}</span>
        <span>{BRAND.category}</span>
        <span>{BRAND.pillars.join(" · ")}</span>
      </div>
    </footer>
  );
}

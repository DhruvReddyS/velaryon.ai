import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useLoaded } from "@/lib/loader";
import { velaryonMedia as media } from "@/lib/velaryonMedia";
import { BRAND, NAV } from "@/lib/content";
import { sound } from "@/lib/sound";
import { EASE, EASE_IO, useSoundOn, useSurfaceTone, useUtcClock } from "@/components/kit";

const MENU_IMAGES = [media.hero.sunset, media.deck.aerialRun, media.ocean.distantVessel, media.engineering.profile, media.deck.rearCoast, media.final.tinyHorizon];

function RollText({ children }: { children: string }) {
  return <span className="v-roll" data-text={children}><span>{children}</span></span>;
}

function SoundToggle() {
  const on = useSoundOn();
  return (
    <button className={`v-sound ${on ? "is-on" : ""}`} onClick={() => sound.toggle()} aria-pressed={on} aria-label={on ? "Turn sound off" : "Turn sound on"} data-cursor={on ? "Mute" : "Sound"} data-testid="nav-sound">
      <span className="v-sound__bars" aria-hidden><i /><i /><i /><i /></span>
      <span className="v-sound__label">Sound</span>
    </button>
  );
}

export default function Navbar() {
  const ready = useLoaded();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(0);
  const location = useLocation();
  const clock = useUtcClock();
  const light = useSurfaceTone("top", [location.pathname]);
  const menu = useRef<HTMLDivElement>(null);
  const burger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    const read = () => {
      const y = window.scrollY;
      if (y > 160 && y > last + 4) setHidden(true);
      else if (y < last - 4 || y < 160) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", read, { passive: true });
    return () => window.removeEventListener("scroll", read);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("is-menu-open", open);
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (open) lenis?.stop(); else lenis?.start();
    if (!open) return;
    // focus trap + Escape
    const t = window.setTimeout(() => menu.current?.querySelector<HTMLElement>("a")?.focus(), 350);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); burger.current?.focus(); return; }
      if (e.key !== "Tab" || !menu.current) return;
      const items = [burger.current, ...menu.current.querySelectorAll<HTMLElement>("a, button")].filter(Boolean) as HTMLElement[];
      const i = items.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.clearTimeout(t); window.removeEventListener("keydown", onKey); };
  }, [open]);

  const all = [{ label: "Home", to: "/" }, ...NAV, { label: "Contact", to: "/contact" }];

  return (
    <>
      <motion.header
        data-testid="navbar"
        data-chrome
        className={`v-nav ${light && !open ? "is-light" : ""}`}
        initial={{ y: -40, opacity: 0 }}
        animate={ready ? { y: hidden && !open ? "-120%" : 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <Link to="/" aria-label="Velaryon home" className="v-nav__brand" data-cursor="Home">
          <img src={light && !open ? "/assets/logo-mark.png" : media.brand.mark} alt="" />
          <img src={light && !open ? "/assets/logo-wordmark.png" : media.brand.wordmark} alt="Velaryon" />
        </Link>
        <nav className="v-nav__links" aria-label="Primary">
          {NAV.map((l) => (
            <Link key={l.to} to={l.to} className={location.pathname.startsWith(l.to) ? "is-active" : ""} aria-current={location.pathname.startsWith(l.to) ? "page" : undefined} data-testid={`nav-${l.label.toLowerCase()}`}>
              <RollText>{l.label}</RollText>
            </Link>
          ))}
        </nav>
        <div className="v-nav__right">
          <SoundToggle />
          <Link to="/deck" className="v-nav__present" data-testid="nav-present" data-cursor="Present"><RollText>Present</RollText></Link>
          <Link to="/contact" className="v-nav__contact" data-testid="nav-contact"><RollText>Contact</RollText></Link>
          <button ref={burger} className={`v-nav__burger ${open ? "is-open" : ""}`} onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="site-menu" data-testid="nav-menu-toggle">
            <span>{open ? "Close" : "Menu"}</span>
            <i><b /><b /></i>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div ref={menu} id="site-menu" role="dialog" aria-modal="true" aria-label="Site menu" className="v-menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.9, ease: EASE_IO }}>
            <div className="v-menu__media" aria-hidden>
              <AnimatePresence mode="popLayout">
                <motion.img key={hover} src={MENU_IMAGES[hover % MENU_IMAGES.length]} alt="" initial={{ opacity: 0, scale: 1.15 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: EASE }} />
              </AnimatePresence>
              <span>{String(hover).padStart(2, "0")} / {all[hover]?.label}</span>
            </div>
            <nav className="v-menu__list" aria-label="Site">
              {all.map((l, i) => (
                <div key={l.to} className="k-line">
                  <motion.span className="k-line__in" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.25 + i * 0.05, ease: EASE }}>
                    <Link to={l.to} onPointerEnter={() => { setHover(i); sound.tick(1.2); }} onFocus={() => setHover(i)} className={location.pathname === l.to ? "is-active" : ""}>
                      <small>{String(i).padStart(2, "0")}</small>
                      {l.label}
                    </Link>
                  </motion.span>
                </div>
              ))}
            </nav>
            <motion.div className="v-menu__foot" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8, ease: EASE }}>
              <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              <Link to="/deck">Present the deck ↗</Link>
              <span>UTC {clock}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

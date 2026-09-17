import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLoaded } from "@/lib/loader";

const LINKS = [
  { to: "/mission", label: "MISSION" },
  { to: "/platform", label: "PLATFORM" },
  { to: "/technology", label: "TECHNOLOGY" },
  { to: "/company", label: "COMPANY" },
];

export default function Navbar() {
  const ready = useLoaded();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <header
        data-testid="navbar"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "border-b border-white/[0.06] bg-abyss/70 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        } ${ready ? "opacity-100" : "opacity-0"}`}
        style={{ transitionProperty: "opacity, background-color, border-color" }}
      >
        <div className="flex h-16 items-center justify-between px-5 md:px-10">
          <Link
            to="/"
            data-testid="nav-logo"
            aria-label="Velaryon home"
            className="flex items-center gap-3"
          >
            <img src="/assets/logo-mark.png" alt="" className="h-7 w-auto" />
            <img src="/assets/logo-wordmark.png" alt="VELARYON" className="h-3 w-auto brightness-[2.2]" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className={`group relative font-mono text-[11px] tracking-[0.28em] transition-colors duration-300 ${
                  location.pathname === l.to ? "text-white" : "text-mist hover:text-white"
                }`}
              >
                {l.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    location.pathname === l.to ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Link
              to="/contact"
              data-testid="nav-contact-link"
              className="group hidden items-center gap-2 font-mono text-[11px] tracking-[0.28em] text-mist transition-colors duration-300 hover:text-white md:inline-flex"
            >
              CONTACT
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </Link>
            <button
              data-testid="mobile-menu-button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="text-slate-200 md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-abyss/95 px-8 backdrop-blur-xl md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-2">
              {[{ to: "/", label: "HOME" }, ...LINKS, { to: "/contact", label: "CONTACT" }].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={l.to}
                    data-testid={`mobile-link-${l.label.toLowerCase()}`}
                    className="block py-3 font-display text-4xl font-light tracking-tight text-slate-100"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="mt-12 font-mono text-[10px] tracking-[0.3em] text-mist">
              AUTONOMOUS MARITIME SYSTEMS
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

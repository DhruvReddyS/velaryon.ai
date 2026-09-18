import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useLoaded } from "@/lib/loader";
import { EASE } from "@/components/Primitives";

const LINKS = [
  { to: "/mission", label: "Mission" },
  { to: "/platforms", label: "Platforms" },
  { to: "/how-it-works", label: "Autonomy" },
  { to: "/technology", label: "Technology" },
  { to: "/company", label: "Company" },
];

export default function Navbar() {
  const ready = useLoaded();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const solid = scrolled || open;

  return (
    <>
      <header
        data-testid="navbar"
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,opacity] duration-500 ${
          solid ? "border-b border-line-soft bg-ink/85 backdrop-blur-md" : "border-b border-transparent"
        } ${ready ? "opacity-100" : "opacity-0"}`}
      >
        <div className="wrap flex h-[72px] items-center justify-between">
          <Link to="/" data-testid="nav-logo" aria-label="Velaryon home" className="flex items-center gap-3">
            <img src="/assets/logo-mark-light.png" alt="" className="h-7 w-auto" />
            <img src="/assets/logo-wordmark-light.png" alt="VELARYON" className="hidden h-[11px] w-auto sm:block" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
            {LINKS.map((l) => {
              const active = location.pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  data-testid={`nav-link-${l.label.toLowerCase()}`}
                  className={`label relative py-2 transition-colors duration-300 ${active ? "text-chalk" : "text-fog hover:text-chalk"}`}
                >
                  {l.label}
                  {active && <span aria-hidden className="absolute -bottom-0.5 left-0 h-px w-full bg-signal" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-8">
            <div data-testid="nav-status" className="label-xs hidden items-center gap-2 text-fog xl:flex">
              <span aria-hidden className="signal-dot h-1.5 w-1.5 bg-signal" />
              Concept stage · Australia
            </div>
            <Link
              to="/contact"
              data-testid="nav-contact-link"
              className="label hidden border border-chalk/25 px-5 py-3 text-chalk transition-colors duration-300 hover:border-chalk hover:bg-chalk hover:text-ink lg:inline-flex"
            >
              Contact
            </Link>
            <button
              data-testid="mobile-menu-button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="text-chalk lg:hidden"
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-ink px-6 pt-28 pb-10 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col divide-y divide-line-soft border-y border-line-soft">
              {[{ to: "/", label: "Home" }, ...LINKS, { to: "/contact", label: "Contact" }].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5, ease: EASE }}
                >
                  <Link
                    to={l.to}
                    data-testid={`mobile-link-${l.label.toLowerCase()}`}
                    className="flex items-center justify-between py-5 text-2xl font-medium tracking-tight text-chalk"
                  >
                    {l.label}
                    <span className="label-xs text-fog">{String(i).padStart(2, "0")}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="label-xs mt-auto flex items-center gap-2 text-fog">
              <span aria-hidden className="h-1.5 w-1.5 bg-signal" />
              Autonomous maritime systems · Concept stage · Australia
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

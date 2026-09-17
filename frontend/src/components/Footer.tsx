import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const NAV = [
  { to: "/mission", label: "Mission" },
  { to: "/platform", label: "Platform" },
  { to: "/technology", label: "Technology" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/company", label: "Company" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer data-testid="footer" className="border-t border-white/[0.07] bg-abyss">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <img src="/assets/logo-mark.png" alt="" className="h-8 w-auto" />
            <img src="/assets/logo-wordmark.png" alt="VELARYON" className="h-3.5 w-auto brightness-[2.2]" />
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-mist">
            Autonomous maritime systems, being developed for persistent presence at sea.
          </p>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-mist/60">
            STATUS / EARLY-STAGE
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist/60">NAVIGATE</p>
          <ul className="mt-5 space-y-3">
            {NAV.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  data-testid={`footer-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist/60">CONTACT</p>
          <a
            href="mailto:hello@velaryon.com"
            data-testid="footer-email-link"
            className="mt-5 block text-sm text-slate-300 transition-colors hover:text-white"
          >
            hello@velaryon.com
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            data-testid="footer-linkedin-link"
            className="group mt-3 inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
          >
            LinkedIn
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-mist/60">
            LOCATION / TO BE CONFIRMED
          </p>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.25em] text-mist/50 md:flex-row md:items-center md:justify-between md:px-10">
          <span>© 2026 VELARYON</span>
          <div className="flex gap-8">
            <Link to="/privacy" data-testid="footer-privacy-link" className="transition-colors hover:text-slate-300">
              PRIVACY
            </Link>
            <Link to="/terms" data-testid="footer-terms-link" className="transition-colors hover:text-slate-300">
              TERMS
            </Link>
          </div>
          <span>AUTONOMOUS MARITIME SYSTEMS</span>
        </div>
      </div>
    </footer>
  );
}

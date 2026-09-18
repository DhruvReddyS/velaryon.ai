import { Link } from "react-router-dom";
import { PLATFORMS } from "@/lib/platforms";

const COLS = [
  {
    title: "Company",
    links: [
      { to: "/mission", label: "Mission" },
      { to: "/company", label: "Company" },
      { to: "/newsroom", label: "Newsroom" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Platforms",
    links: PLATFORMS.map((p) => ({ to: `/platforms/${p.id}`, label: `${p.code} — ${p.name}` })),
  },
  {
    title: "Systems",
    links: [
      { to: "/how-it-works", label: "Autonomy" },
      { to: "/technology", label: "Technology" },
      { to: "/platforms", label: "Platform family" },
    ],
  },
];

export default function Footer() {
  return (
    <footer data-testid="footer" className="border-t border-line-soft bg-ink">
      <div className="wrap grid gap-14 py-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <img src="/assets/logo-mark-light.png" alt="Velaryon" className="h-10 w-auto" />
          <p className="mt-8 max-w-xs text-sm leading-relaxed text-fog">
            An Australian maritime technology company developing autonomous surface platform concepts
            and the systems that operate them.
          </p>
          <div className="label-xs mt-8 flex items-center gap-2 text-fog">
            <span aria-hidden className="signal-dot h-1.5 w-1.5 bg-signal" />
            Concept stage · Designed in Australia
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6">
          {COLS.map((c) => (
            <div key={c.title}>
              <p className="label-xs text-fog">{c.title}</p>
              <ul className="mt-6 space-y-3">
                {c.links.map((l) => (
                  <li key={l.to + l.label}>
                    <Link
                      to={l.to}
                      data-testid={`footer-link-${l.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      className="text-sm text-chalk/80 transition-colors duration-300 hover:text-signal"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          <p className="label-xs text-fog">Enquiries</p>
          <a
            href="mailto:hello@velaryon.com"
            data-testid="footer-email-link"
            className="mt-6 block text-sm text-chalk/80 transition-colors duration-300 hover:text-signal"
          >
            hello@velaryon.com
          </a>
        </div>
      </div>

      <div className="wrap pb-8">
        <img
          src="/assets/logo-wordmark-light.png"
          alt=""
          aria-hidden
          className="w-full max-w-[880px] opacity-90"
          loading="lazy"
        />
      </div>

      <div className="border-t border-line-soft">
        <div className="wrap label-xs flex flex-col gap-4 py-6 text-fog sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Velaryon. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/privacy" data-testid="footer-privacy-link" className="transition-colors hover:text-chalk">
              Privacy
            </Link>
            <Link to="/terms" data-testid="footer-terms-link" className="transition-colors hover:text-chalk">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

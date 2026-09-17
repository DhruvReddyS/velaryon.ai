import { ArrowUpRight } from "lucide-react";
import ChapterLabel from "@/components/ChapterLabel";
import ArrowLink from "@/components/ArrowLink";
import { Reveal } from "@/components/Reveal";

const BLOCKS = [
  { t: "WHO WE ARE", c: "An early-stage maritime technology company developing autonomous surface platforms and the software that operates them." },
  { t: "MISSION", c: "To make presence at sea persistent, precise and scalable through autonomy." },
  { t: "VISION", c: "An ocean where autonomous platforms handle the routine, the remote and the hazardous — and people direct the mission." },
  { t: "WHY NOW", c: "Autonomy, sensing and compute have matured in other domains. We believe the maritime domain is next — and we intend to be part of proving it." },
];

const TEAM = [
  {
    name: "ARIA NOVAK",
    role: "Founder & CEO",
    bio: "Leads Velaryon's vision and strategy. Background in naval architecture and maritime robotics. Profile placeholder — full biography to be confirmed.",
    img: "/assets/team-1.jpg",
  },
  {
    name: "MAYA CHEN",
    role: "Co-founder & CTO",
    bio: "Owns the autonomy and software architecture. Background in robotics perception and autonomous systems. Profile placeholder — full biography to be confirmed.",
    img: "/assets/team-2.jpg",
  },
  {
    name: "TOMAS ERIKSSON",
    role: "Head of Engineering",
    bio: "Leads platform engineering and integration. Background in marine systems and hardware. Profile placeholder — full biography to be confirmed.",
    img: "/assets/team-3.jpg",
  },
];

export default function CompanyPage() {
  return (
    <div data-testid="company-page" className="bg-paper text-slate-900">
      <section className="flex min-h-[60svh] items-end">
        <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-40 md:px-10">
          <Reveal>
            <ChapterLabel index="07" title="Velaryon" light />
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 font-display text-5xl font-medium leading-[0.98] tracking-tight sm:text-7xl">
              We're building for
              <br />
              an autonomous ocean.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid gap-px bg-line md:grid-cols-2">
            {BLOCKS.map((b, i) => (
              <Reveal key={b.t} delay={0.06 * i} className="bg-paper">
                <div data-testid={`company-block-${b.t.toLowerCase().replace(/\s+/g, "-")}`} className="p-8 md:p-12">
                  <h2 className="font-mono text-xs uppercase tracking-[0.32em] text-slate-500">{b.t}</h2>
                  <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-800">{b.c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal>
            <ChapterLabel index="07.1" title="Team" light />
          </Reveal>
          <div className="mt-16 space-y-24 md:space-y-32">
            {TEAM.map((m, i) => (
              <Reveal key={m.name}>
                <article
                  data-testid={`team-member-${m.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`grid items-center gap-10 md:grid-cols-12 ${
                    i % 2 === 1 ? "" : ""
                  }`}
                >
                  <div className={`md:col-span-6 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                    <div className="overflow-hidden">
                      <img
                        src={m.img}
                        alt={`${m.name}, ${m.role} at Velaryon — placeholder portrait`}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                      />
                    </div>
                  </div>
                  <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl">
                      {m.name}
                    </h3>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.28em] text-slate-500">{m.role}</p>
                    <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-600">{m.bio}</p>
                    <a
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noreferrer"
                      data-testid={`team-linkedin-${m.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="group mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-slate-700 transition-colors hover:text-slate-950"
                    >
                      LinkedIn
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-20 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400">
            Team profiles shown are placeholders pending final company content
          </p>
        </div>
      </section>

      <section className="bg-abyss py-28 text-white">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal>
            <h2 className="max-w-2xl font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Building alongside investors, partners and collaborators.
            </h2>
          </Reveal>
          <div className="mt-10">
            <ArrowLink to="/contact" testId="company-contact-link">
              Start a Conversation
            </ArrowLink>
          </div>
        </div>
      </section>
    </div>
  );
}

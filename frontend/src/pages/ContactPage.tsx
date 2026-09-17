import { useState } from "react";
import { motion } from "motion/react";
import ChapterLabel from "@/components/ChapterLabel";
import { Reveal } from "@/components/Reveal";
import { apiPost } from "@/lib/api";

const INTERESTS = ["INVESTMENT", "STRATEGIC PARTNERSHIP", "TECHNOLOGY COLLABORATION", "GENERAL"];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", organization: "", interest: INTERESTS[0], message: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await apiPost("/contact", form);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full border-b border-white/20 bg-transparent py-3 text-base text-white placeholder:text-slate-500 focus:border-white focus:outline-none transition-colors duration-300";

  return (
    <div data-testid="contact-page" className="relative min-h-screen bg-abyss">
      <img
        src="/assets/vessel-sunset.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-abyss/70 via-abyss/85 to-abyss" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 pb-28 pt-40 md:grid-cols-2 md:px-10">
        <div>
          <Reveal>
            <ChapterLabel index="08" title="Contact" />
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 font-display text-5xl font-medium leading-[0.98] tracking-tight text-white sm:text-6xl">
              Start a
              <br />
              conversation.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-sm text-base leading-relaxed text-mist">
              Velaryon is engaging early with investors, strategic partners and technology
              collaborators. Tell us who you are and what you're exploring.
            </p>
            <div className="mt-10 space-y-2">
              {INTERESTS.slice(0, 3).map((i) => (
                <p key={i} className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist/70">
                  {i}
                </p>
              ))}
            </div>
            <a
              href="mailto:hello@velaryon.com"
              data-testid="contact-email-link"
              className="mt-10 inline-block font-mono text-xs tracking-[0.25em] text-slate-300 underline-offset-4 hover:text-white hover:underline"
            >
              HELLO@VELARYON.COM
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          {status === "sent" ? (
            <motion.div
              data-testid="contact-success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full flex-col justify-center border border-white/15 p-10"
            >
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-white">Message received</p>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-mist">
                Thank you for reaching out. The Velaryon team will be in touch.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={submit} data-testid="contact-form" className="space-y-8">
              <div>
                <label htmlFor="contact-name" className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
                  Name *
                </label>
                <input id="contact-name" data-testid="contact-name-input" required value={form.name} onChange={set("name")} className={field} placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="contact-email" className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
                  Email *
                </label>
                <input id="contact-email" data-testid="contact-email-input" required type="email" value={form.email} onChange={set("email")} className={field} placeholder="you@company.com" />
              </div>
              <div>
                <label htmlFor="contact-org" className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
                  Organization
                </label>
                <input id="contact-org" data-testid="contact-org-input" value={form.organization} onChange={set("organization")} className={field} placeholder="Company / fund / institution" />
              </div>
              <div>
                <label htmlFor="contact-interest" className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
                  Interest
                </label>
                <select
                  id="contact-interest"
                  data-testid="contact-interest-select"
                  value={form.interest}
                  onChange={set("interest")}
                  className={`${field} cursor-pointer bg-abyss`}
                >
                  {INTERESTS.map((i) => (
                    <option key={i} value={i} className="bg-abyss">
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="contact-message" className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
                  Message *
                </label>
                <textarea id="contact-message" data-testid="contact-message-input" required rows={4} value={form.message} onChange={set("message")} className={`${field} resize-none`} placeholder="What would you like to explore?" />
              </div>
              {status === "error" && (
                <p data-testid="contact-error" className="font-mono text-xs tracking-[0.2em] text-red-400">
                  SOMETHING WENT WRONG — PLEASE TRY AGAIN OR EMAIL US DIRECTLY
                </p>
              )}
              <button
                type="submit"
                data-testid="contact-form-submit"
                disabled={status === "sending"}
                className="group inline-flex items-center gap-3 border border-white/40 px-8 py-4 font-mono text-xs uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-abyss disabled:opacity-50"
              >
                {status === "sending" ? "Sending…" : "Send Message"}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </div>
  );
}

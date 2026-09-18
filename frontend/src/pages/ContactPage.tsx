import { useState } from "react";
import { motion } from "motion/react";
import { EASE, Eyebrow, Frame, Meta, Reveal } from "@/components/Primitives";
import { apiPost } from "@/lib/api";

const INTERESTS = ["Investment", "Strategic partnership", "Technology collaboration", "General"];

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
    "w-full border border-line bg-carbon px-4 py-3.5 text-base text-chalk placeholder:text-fog/60 transition-colors duration-300 focus:border-chalk/60 focus:outline-none";
  const lbl = "label-xs mb-3 block text-fog";

  return (
    <div data-testid="contact-page" className="bg-ink">
      <section className="border-b border-line-soft pt-36 pb-16 md:pt-44 md:pb-24">
        <div className="wrap">
          <Reveal>
            <Eyebrow index="08" title="Contact" />
          </Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <Reveal delay={0.08} className="lg:col-span-8">
              <h1 className="display-1 text-chalk">Start a conversation.</h1>
            </Reveal>
            <Reveal delay={0.16} className="flex flex-col justify-end lg:col-span-4">
              <p className="max-w-md text-base leading-relaxed text-fog md:text-lg">
                Velaryon is engaging early with investors, strategic partners and technology
                collaborators. Tell us who you are and what you're exploring.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="wrap grid gap-16 py-20 lg:grid-cols-12 md:py-28">
        <Reveal className="lg:col-span-4">
          <Meta
            className="grid-cols-1 gap-y-8"
            items={[
              { k: "Enquiries", v: "hello@velaryon.com" },
              { k: "Location", v: "Australia" },
              { k: "Response", v: "Within a few working days" },
              { k: "Status", v: "Concept stage", signal: true },
            ]}
          />
          <a
            href="mailto:hello@velaryon.com"
            data-testid="contact-email-link"
            className="label mt-12 inline-block text-chalk underline decoration-line underline-offset-8 transition-colors hover:text-signal hover:decoration-signal"
          >
            Email us directly
          </a>
        </Reveal>

        <div className="lg:col-span-7 lg:col-start-6">
          {status === "sent" ? (
            <motion.div
              data-testid="contact-success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Frame className="p-10 md:p-14">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="h-1.5 w-1.5 bg-signal" />
                  <p className="label text-chalk">Message received</p>
                </div>
                <p className="mt-6 max-w-md text-base leading-relaxed text-fog">
                  Thank you for reaching out. The Velaryon team will be in touch.
                </p>
              </Frame>
            </motion.div>
          ) : (
            <Reveal delay={0.1}>
              <form onSubmit={submit} data-testid="contact-form" className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className={lbl}>Name *</label>
                  <input id="contact-name" data-testid="contact-name-input" required value={form.name} onChange={set("name")} className={field} placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="contact-email" className={lbl}>Email *</label>
                  <input id="contact-email" data-testid="contact-email-input" required type="email" value={form.email} onChange={set("email")} className={field} placeholder="you@company.com" />
                </div>
                <div>
                  <label htmlFor="contact-org" className={lbl}>Organisation</label>
                  <input id="contact-org" data-testid="contact-org-input" value={form.organization} onChange={set("organization")} className={field} placeholder="Company / fund / institution" />
                </div>
                <div>
                  <label htmlFor="contact-interest" className={lbl}>Interest</label>
                  <select id="contact-interest" data-testid="contact-interest-select" value={form.interest} onChange={set("interest")} className={`${field} cursor-pointer appearance-none`}>
                    {INTERESTS.map((i) => (
                      <option key={i} value={i} className="bg-carbon">{i}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact-message" className={lbl}>Message *</label>
                  <textarea id="contact-message" data-testid="contact-message-input" required rows={5} value={form.message} onChange={set("message")} className={`${field} resize-none`} placeholder="What would you like to explore?" />
                </div>
                {status === "error" && (
                  <p data-testid="contact-error" className="label-xs text-signal sm:col-span-2">
                    Something went wrong — please try again or email us directly
                  </p>
                )}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    data-testid="contact-form-submit"
                    disabled={status === "sending"}
                    className="label inline-flex items-center gap-3 bg-chalk px-6 py-4 text-ink transition-colors duration-300 hover:bg-white disabled:opacity-50"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                    <span aria-hidden>→</span>
                  </button>
                </div>
              </form>
            </Reveal>
          )}
        </div>
      </section>
    </div>
  );
}

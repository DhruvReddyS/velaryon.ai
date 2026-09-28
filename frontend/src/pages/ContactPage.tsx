import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE, Lines, Reveal, Tag } from "@/components/kit";
import { useLoaded } from "@/lib/loader";
import { apiPost } from "@/lib/api";
import { BRAND } from "@/lib/content";
import { velaryonMedia as media } from "@/lib/velaryonMedia";

const INTERESTS = ["Investment", "Strategic partnership", "Technology collaboration", "Careers", "General"];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const ready = useLoaded();
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", organization: "", interest: INTERESTS[0], message: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

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

  return (
    <div data-testid="contact-page">
      <section className="p-contact">
        <div className="p-contact__bg" aria-hidden><img src={media.final.tinyHorizon} alt="" /></div>
        <div className="p-contact__intro">
          <Tag no="06">Contact</Tag>
          <div className="p-gap p-gap--s">
            <Lines as="h1" lines={["Start a", <em key="e">conversation.</em>]} play={ready} delay={0.3} />
          </div>
          <Reveal delay={0.3}>
            <p>Velaryon is engaging early with investors, strategic partners and technology collaborators. Tell us who you are and what you're exploring.</p>
            <div className="p-contact__meta">
              <div>Enquiries<b><a href={`mailto:${BRAND.email}`} data-testid="contact-email-link">{BRAND.email}</a></b></div>
              <div>Response<b>Within a few working days</b></div>
              <div>Status<b>{BRAND.status}</b></div>
            </div>
          </Reveal>
        </div>

        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div key="sent" className="p-sent" data-testid="contact-success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
              <Tag no="✓">Transmission received</Tag>
              <h2>Message received.</h2>
              <p>Thank you for reaching out. The Velaryon team will be in touch.</p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={submit} className="p-form" data-testid="contact-form" initial={{ opacity: 0, y: 30 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.5, ease: EASE }}>
              <div className="is-wide">
                <p className="p-form__k">I'm interested in</p>
                <div className="p-chips" role="radiogroup" aria-label="Interest">
                  {INTERESTS.map((i) => (
                    <button type="button" key={i} role="radio" aria-checked={form.interest === i} className={form.interest === i ? "is-on" : ""} onClick={() => setForm((f) => ({ ...f, interest: i }))} data-testid={`contact-interest-${i.split(" ")[0].toLowerCase()}`}>{i}</button>
                  ))}
                </div>
              </div>
              <label className="p-field"><input data-testid="contact-name-input" required value={form.name} onChange={set("name")} placeholder=" " /><span>Name *</span></label>
              <label className="p-field"><input data-testid="contact-email-input" required type="email" value={form.email} onChange={set("email")} placeholder=" " /><span>Email *</span></label>
              <label className="p-field is-wide"><input data-testid="contact-org-input" value={form.organization} onChange={set("organization")} placeholder=" " /><span>Organisation</span></label>
              <label className="p-field is-wide"><textarea data-testid="contact-message-input" required rows={4} value={form.message} onChange={set("message")} placeholder=" " /><span>Message *</span></label>
              {status === "error" && <p className="p-form__err is-wide" data-testid="contact-error">Something went wrong. Please try again or email us directly.</p>}
              <div className="is-wide">
                <button type="submit" className="k-cta" data-testid="contact-form-submit" disabled={status === "sending"}>
                  <span className="k-cta__label" data-text={status === "sending" ? "Sending…" : "Send message"}><span>{status === "sending" ? "Sending…" : "Send message"}</span></span>
                  <span className="k-cta__icon" aria-hidden>
                    <svg viewBox="0 0 16 16"><path d="M4 12 12 4M5.5 4H12v6.5" /></svg>
                    <svg viewBox="0 0 16 16"><path d="M4 12 12 4M5.5 4H12v6.5" /></svg>
                  </span>
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

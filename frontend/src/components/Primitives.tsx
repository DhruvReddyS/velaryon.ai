import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Rule({ className = "", light = false }: { className?: string; light?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={`h-px w-full origin-left ${light ? "bg-bone-line" : "bg-line"} ${className}`}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 1.1, ease: EASE }}
    />
  );
}

export function Eyebrow({
  index,
  title,
  light = false,
  className = "",
  testId,
}: {
  index: string;
  title: string;
  light?: boolean;
  className?: string;
  testId?: string;
}) {
  return (
    <div
      data-testid={testId}
      className={`label flex items-center gap-3 ${light ? "text-bone-fog" : "text-fog"} ${className}`}
    >
      <span className={light ? "text-carbon" : "text-chalk"}>{index}</span>
      <span aria-hidden className={`h-px w-6 ${light ? "bg-bone-line" : "bg-line"}`} />
      <span>{title}</span>
    </div>
  );
}

export function Frame({
  children,
  className = "",
  light = false,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={`tick relative ${light ? "text-bone-fog/70" : "text-fog/70"} ${className}`}>
      <i aria-hidden />
      {children}
    </div>
  );
}

export function Meta({
  items,
  light = false,
  className = "",
}: {
  items: { k: string; v: string; signal?: boolean }[];
  light?: boolean;
  className?: string;
}) {
  return (
    <dl className={`grid gap-x-8 gap-y-4 ${className}`}>
      {items.map((it) => (
        <div key={it.k} className="flex flex-col gap-2">
          <dt className={`label-xs ${light ? "text-bone-fog" : "text-fog"}`}>{it.k}</dt>
          <dd className={`label flex items-center gap-2 ${light ? "text-carbon" : "text-chalk"}`}>
            {it.signal && <span aria-hidden className="signal-dot h-1.5 w-1.5 bg-signal" />}
            {it.v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

type BtnProps = {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "solid" | "ghost" | "link";
  light?: boolean;
  testId: string;
  className?: string;
  external?: boolean;
};

export function Btn({ to, href, children, variant = "solid", light = false, testId, className = "", external }: BtnProps) {
  const base = "group inline-flex items-center gap-3 label transition-colors duration-300";
  const styles = {
    solid: light
      ? "bg-carbon px-6 py-4 text-bone hover:bg-ink"
      : "bg-chalk px-6 py-4 text-ink hover:bg-white",
    ghost: light
      ? "border border-carbon/30 px-6 py-4 text-carbon hover:border-carbon hover:bg-carbon hover:text-bone"
      : "border border-chalk/25 px-6 py-4 text-chalk hover:border-chalk hover:bg-chalk hover:text-ink",
    link: light ? "text-carbon hover:text-signal" : "text-chalk hover:text-signal",
  }[variant];
  const Icon = external ? ArrowUpRight : ArrowRight;
  const inner = (
    <>
      <span>{children}</span>
      <Icon
        aria-hidden
        className={`h-3.5 w-3.5 transition-transform duration-300 ${
          external ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-1"
        }`}
      />
    </>
  );
  const cls = `${base} ${styles} ${className}`;
  if (href) {
    return (
      <a href={href} data-testid={testId} className={cls} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={to ?? "/"} data-testid={testId} className={cls}>
      {inner}
    </Link>
  );
}

export function PageHero({
  index,
  title,
  heading,
  lead,
  meta,
  testId,
}: {
  index: string;
  title: string;
  heading: ReactNode;
  lead?: string;
  meta?: { k: string; v: string; signal?: boolean }[];
  testId: string;
}) {
  return (
    <section data-testid={testId} className="border-b border-line-soft pt-36 pb-16 md:pt-44 md:pb-24">
      <div className="wrap">
        <Reveal>
          <Eyebrow index={index} title={title} />
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal delay={0.08} className="lg:col-span-8">
            <h1 className="display-1 text-chalk">{heading}</h1>
          </Reveal>
          <Reveal delay={0.16} className="flex flex-col justify-end gap-10 lg:col-span-4">
            {lead && <p className="max-w-md text-base leading-relaxed text-fog md:text-lg">{lead}</p>}
            {meta && <Meta items={meta} className="grid-cols-2" />}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

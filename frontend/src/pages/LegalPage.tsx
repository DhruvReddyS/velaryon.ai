import { Eyebrow } from "@/components/Primitives";

export default function LegalPage({ title }: { title: string }) {
  return (
    <div data-testid={`${title.toLowerCase()}-page`} className="min-h-screen bg-ink pt-36 pb-28 md:pt-44">
      <div className="wrap max-w-3xl">
        <Eyebrow index="L" title={title} />
        <h1 className="display-2 mt-10 text-chalk">{title}</h1>
        <p className="mt-10 text-base leading-relaxed text-fog">
          This {title.toLowerCase()} page is a placeholder. Final legal copy for Velaryon will be
          published here before public launch.
        </p>
        <p className="mt-6 text-base leading-relaxed text-fog">
          For any questions in the meantime, contact{" "}
          <a href="mailto:hello@velaryon.com" className="text-chalk underline underline-offset-4 hover:text-signal">
            hello@velaryon.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}

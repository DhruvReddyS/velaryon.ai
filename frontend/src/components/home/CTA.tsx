import { Btn, Reveal } from "@/components/Primitives";

export default function CTA({ light = false }: { light?: boolean }) {
  return (
    <section
      data-testid="cta"
      className={`border-t ${light ? "border-bone-line bg-bone text-carbon" : "border-line-soft bg-ink text-chalk"} py-24 md:py-32`}
    >
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <p className={`label-xs ${light ? "text-bone-fog" : "text-fog"}`}>Work with Velaryon</p>
          <h2 data-testid="cta-heading" className="display-2 mt-6">
            Building alongside investors, partners and collaborators.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col justify-end gap-6 lg:col-span-4">
          <p className={`text-base leading-relaxed ${light ? "text-bone-fog" : "text-fog"}`}>
            We're engaging early with people who want to help shape autonomous maritime systems from
            the ground up.
          </p>
          <div className="flex flex-wrap gap-4">
            <Btn to="/contact" light={light} testId="cta-contact">
              Start a conversation
            </Btn>
            <Btn to="/company" variant="ghost" light={light} testId="cta-company">
              The company
            </Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

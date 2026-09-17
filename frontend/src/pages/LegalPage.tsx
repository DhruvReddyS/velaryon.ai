import ChapterLabel from "@/components/ChapterLabel";

export default function LegalPage({ title }: { title: string }) {
  return (
    <div data-testid={`${title.toLowerCase()}-page`} className="bg-abyss pb-28 pt-40">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <ChapterLabel index="L" title={title} />
        <h1 className="mt-8 font-display text-4xl font-medium tracking-tight text-white sm:text-5xl">{title}</h1>
        <p className="mt-10 text-base leading-relaxed text-mist">
          This {title.toLowerCase()} page is a placeholder. Final legal copy for Velaryon will be
          published here before public launch.
        </p>
        <p className="mt-6 text-base leading-relaxed text-mist">
          For any questions in the meantime, contact{" "}
          <a href="mailto:hello@velaryon.com" className="text-slate-200 underline underline-offset-4 hover:text-white">
            hello@velaryon.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}

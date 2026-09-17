const ITEMS = [
  "AUTONOMOUS MARITIME SYSTEMS",
  "PRECISION ENGINEERING",
  "INTELLIGENCE AT SEA",
  "SOFTWARE-DEFINED VESSELS",
  "PERSISTENT PRESENCE",
];

export default function Marquee() {
  const row = (
    <>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center gap-10">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-mist/60">{item}</span>
          <span aria-hidden className="h-px w-16 bg-white/15" />
        </span>
      ))}
    </>
  );
  return (
    <div
      data-testid="editorial-marquee"
      aria-hidden
      className="overflow-hidden border-y border-white/[0.06] bg-navy py-5"
    >
      <div className="animate-marquee flex w-max items-center gap-10">
        {row}
        {row}
      </div>
    </div>
  );
}

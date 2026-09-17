export default function ChapterLabel({
  index,
  title,
  light = false,
  className = "",
}: {
  index: string;
  title: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      data-testid={`chapter-${title.toLowerCase().replace(/\s+/g, "-")}`}
      className={`flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.32em] ${
        light ? "text-slate-500" : "text-mist"
      } ${className}`}
    >
      <span>{index}</span>
      <span aria-hidden className={`h-px w-12 ${light ? "bg-slate-300" : "bg-white/20"}`} />
      <span>{title}</span>
    </div>
  );
}

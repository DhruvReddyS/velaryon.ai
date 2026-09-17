import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function ArrowLink({
  to,
  children,
  light = false,
  testId,
  className = "",
}: {
  to: string;
  children: React.ReactNode;
  light?: boolean;
  testId: string;
  className?: string;
}) {
  return (
    <Link
      to={to}
      data-testid={testId}
      className={`group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] transition-colors duration-300 ${
        light ? "text-slate-700 hover:text-slate-950" : "text-slate-200 hover:text-white"
      } ${className}`}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className={`absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 ${
            light ? "bg-slate-900" : "bg-white"
          }`}
        />
      </span>
      <ArrowUpRight
        className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </Link>
  );
}

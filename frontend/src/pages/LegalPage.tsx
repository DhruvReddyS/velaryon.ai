import { Lines, Tag } from "@/components/kit";
import { BRAND } from "@/lib/content";

export default function LegalPage({ title }: { title: string }) {
  return (
    <div data-testid={`${title.toLowerCase().replace(/\s+/g, "-")}-page`} style={{ minHeight: "100svh", background: "var(--ink)" }}>
      <div className="p-legal">
        <Tag no="L">{title}</Tag>
        <Lines as="h1" lines={[title]} />
        <p>
          This {title.toLowerCase()} page is a placeholder. Final legal copy for Velaryon will be published here before public launch.
        </p>
        <p>
          For any questions in the meantime, contact <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.
        </p>
      </div>
    </div>
  );
}

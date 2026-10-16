import Link from "next/link";

export function PageHead({
  title,
  eyebrow,
  intro,
  crumbs,
}: {
  title: string;
  eyebrow?: string;
  intro?: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <header className="page-head">
      <div className="container page-head__inner">
        {crumbs && (
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li>
                <Link href="/">Home</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="eyebrow muted" data-reveal>{eyebrow}</p>}
        <h1 className="h1" data-reveal style={{ ["--reveal-delay" as string]: 80 }}>
          {title}
        </h1>
        {intro && (
          <p className="lede" data-reveal style={{ ["--reveal-delay" as string]: 160 }}>
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}

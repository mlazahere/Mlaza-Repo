import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container empty" style={{ paddingTop: "calc(var(--header-h) + 96px)", paddingBottom: "var(--section)" }}>
      <p className="eyebrow muted">Page not found</p>
      <h1 className="h1">This page has been moved or no longer exists</h1>
      <Link href="/shop" className="btn btn--ghost">
        Explore the collection
      </Link>
    </section>
  );
}

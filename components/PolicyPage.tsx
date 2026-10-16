import { PageHead } from "./PageHead";
import { EditorNote } from "./EditorNote";

export function PolicyPage({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro?: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHead title={title} intro={intro} crumbs={[{ label: title }]} />
      <section className="container" style={{ paddingBottom: "var(--section)" }}>
        <div className="prose">
          <EditorNote>
            This page is a draft framework. Have it reviewed against your actual operations and by a legal adviser
            before launch; replace every bracketed item.
          </EditorNote>
          {updated && <p className="muted">Last updated: {updated}</p>}
          {children}
        </div>
      </section>
    </>
  );
}

/** Notes for the MLAZA team about content that needs verified information. Hidden in production builds. */
export function EditorNote({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <p className="editor-note" role="note">
      <strong>Editor note:</strong> {children}
    </p>
  );
}

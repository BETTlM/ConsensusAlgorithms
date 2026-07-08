"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface DocsContentProps {
  presentationNotes: string;
  deepAnalysis: string;
}

export function DocsContent({ presentationNotes, deepAnalysis }: DocsContentProps) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main
      className={`docs-page mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-8 ${
        darkMode ? "docs-dark" : ""
      }`}
    >
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setDarkMode((prev) => !prev)}
          className="rounded-lg border border-line bg-card px-4 py-2 text-sm font-medium text-body transition hover:border-line-strong hover:bg-card-muted"
        >
          {darkMode ? "Light Theme" : "Black Theme"}
        </button>
      </div>

      <section className="rounded-lg border border-line bg-card p-5 md:p-6">
        <h2 className="mb-4 text-xl font-semibold text-ink">Presentation Study Notes</h2>
        <article className="prose-doc rounded-lg border border-line bg-card-muted p-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{presentationNotes}</ReactMarkdown>
        </article>
      </section>

      <section className="rounded-lg border border-line bg-card p-5 md:p-6">
        <h2 className="mb-4 text-xl font-semibold text-ink">Algorithm Deep Analysis</h2>
        <article className="prose-doc rounded-lg border border-line bg-card-muted p-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{deepAnalysis}</ReactMarkdown>
        </article>
      </section>
    </main>
  );
}

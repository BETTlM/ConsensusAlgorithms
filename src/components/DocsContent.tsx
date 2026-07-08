"use client";

import { useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface DocsContentProps {
  presentationNotes: string;
  deepAnalysis: string;
  uiGuide: string;
}

export function DocsContent({
  presentationNotes,
  deepAnalysis,
  uiGuide,
}: DocsContentProps) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`docs-screen min-h-screen bg-page ${darkMode ? "docs-dark" : ""}`}>
      <header className="docs-header bg-header text-white">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <h1 className="text-2xl font-bold leading-tight md:text-3xl">
                Study Docs
              </h1>
              <p className="mt-2 text-sm text-white/90">
                Team notes and deeper algorithm analysis for revision.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setDarkMode((prev) => !prev)}
                className="docs-theme-btn inline-flex items-center rounded-lg border border-line bg-card px-4 py-2.5 text-sm font-medium text-body transition hover:border-line-strong hover:bg-card-muted"
              >
                {darkMode ? "Light Theme" : "Black Theme"}
              </button>
              <Link
                href="/"
                className="docs-back-btn inline-flex items-center rounded-lg bg-white/15 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/25"
              >
                Back to Explorer
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="docs-page mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-8">
        <section className="rounded-lg border border-line bg-card p-5 md:p-6">
          <h2 className="mb-4 text-xl font-semibold text-ink">
            Presentation Study Notes
          </h2>
          <article className="prose-doc rounded-lg border border-line bg-card-muted p-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {presentationNotes}
            </ReactMarkdown>
          </article>
        </section>

        <section className="rounded-lg border border-line bg-card p-5 md:p-6">
          <h2 className="mb-4 text-xl font-semibold text-ink">
            Algorithm Deep Analysis
          </h2>
          <article className="prose-doc rounded-lg border border-line bg-card-muted p-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {deepAnalysis}
            </ReactMarkdown>
          </article>
        </section>

        <section className="rounded-lg border border-line bg-card p-5 md:p-6">
          <h2 className="mb-4 text-xl font-semibold text-ink">UI Guide</h2>
          <article className="prose-doc rounded-lg border border-line bg-card-muted p-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{uiGuide}</ReactMarkdown>
          </article>
        </section>
      </main>
    </div>
  );
}

import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs | Consensus Algorithms Explorer",
  description: "Study docs for consensus algorithm concepts and deeper analysis.",
};

export default function DocsPage() {
  const presentationDocPath = path.join(process.cwd(), "PRESENTATION_DOCS.md");
  const deepAnalysisDocPath = path.join(
    process.cwd(),
    "ALGORITHM_DEEP_ANALYSIS.md"
  );

  const presentationNotes = fs.readFileSync(presentationDocPath, "utf8");
  const deepAnalysis = fs.readFileSync(deepAnalysisDocPath, "utf8");

  return (
    <div className="min-h-screen bg-page">
      <header className="bg-header text-white">
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
            <Link
              href="/"
              className="inline-flex shrink-0 items-center rounded-lg bg-white/15 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/25"
            >
              Back to Explorer
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-8">
        <section className="rounded-lg border border-line bg-card p-5 md:p-6">
          <h2 className="mb-4 text-xl font-semibold text-ink">
            Presentation Study Notes
          </h2>
          <pre className="whitespace-pre-wrap break-words rounded-lg border border-line bg-card-muted p-4 text-sm leading-relaxed text-body">
            {presentationNotes}
          </pre>
        </section>

        <section className="rounded-lg border border-line bg-card p-5 md:p-6">
          <h2 className="mb-4 text-xl font-semibold text-ink">
            Algorithm Deep Analysis
          </h2>
          <pre className="whitespace-pre-wrap break-words rounded-lg border border-line bg-card-muted p-4 text-sm leading-relaxed text-body">
            {deepAnalysis}
          </pre>
        </section>
      </main>
    </div>
  );
}

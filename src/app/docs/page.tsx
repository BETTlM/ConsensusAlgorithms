import fs from "fs";
import path from "path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consensus Algorithms Reference Guide",
  description:
    "Complete reference documentation for blockchain consensus algorithms covered in the Comparative Explorer.",
};

export default function DocsPage() {
  const filePath = path.join(process.cwd(), "docs", "CONSENSUS_ALGORITHMS.md");
  const content = fs.readFileSync(filePath, "utf8");

  return (
    <div className="min-h-screen bg-page">
      <header className="bg-header text-white">
        <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
          <Link
            href="/"
            className="text-sm font-medium text-white/80 hover:text-white hover:underline"
          >
            ← Back to explorer
          </Link>
          <h1 className="mt-4 text-2xl font-bold md:text-3xl">
            Consensus Algorithms Reference Guide
          </h1>
        </div>
      </header>
      <article className="prose-doc mx-auto max-w-4xl px-4 py-10 md:px-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>
    </div>
  );
}

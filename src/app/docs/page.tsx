import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { DocsContent } from "@/components/DocsContent";

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
  const uiGuideDocPath = path.join(process.cwd(), "UI_GUIDE.md");

  const presentationNotes = fs.readFileSync(presentationDocPath, "utf8");
  const deepAnalysis = fs.readFileSync(deepAnalysisDocPath, "utf8");
  const uiGuide = fs.readFileSync(uiGuideDocPath, "utf8");

  return (
    <DocsContent
      presentationNotes={presentationNotes}
      deepAnalysis={deepAnalysis}
      uiGuide={uiGuide}
    />
  );
}

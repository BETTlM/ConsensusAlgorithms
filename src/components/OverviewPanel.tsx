"use client";

import { useSelection } from "@/context/SelectionContext";
import { Panel } from "@/components/ui/Panel";
import { Badge } from "@/components/ui/Badge";

export function OverviewPanel() {
  const { selectedAlgorithm } = useSelection();

  return (
    <Panel
      id="overview"
      sectionNumber={1}
      title="Algorithm Overview"
      subtitle="Name, core mechanism, and how it works step by step"
    >
      <div key={selectedAlgorithm.id} className="animate-fade-in space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-bold text-ink md:text-2xl">
            {selectedAlgorithm.name}
          </h3>
          <Badge variant="accent">{selectedAlgorithm.shortName}</Badge>
        </div>

        <div className="rounded-lg border border-line bg-card-muted p-5">
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
            Core mechanism
          </h4>
          <p className="text-base leading-relaxed text-body">
            {selectedAlgorithm.mechanism}
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
            How it works
          </h4>
          <ol className="space-y-4">
            {selectedAlgorithm.steps.map((step, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="pt-1 text-base leading-relaxed text-body">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <InfoList
            title="Strengths"
            items={selectedAlgorithm.advantages}
            variant="success"
          />
          <InfoList
            title="Limitations"
            items={selectedAlgorithm.limitations}
            variant="warning"
          />
          <InfoList
            title="Security considerations"
            items={selectedAlgorithm.attackConsiderations}
            variant="neutral"
          />
        </div>
      </div>
    </Panel>
  );
}

function InfoList({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant: "success" | "warning" | "neutral";
}) {
  const boxClass = {
    success: "border-green-300 bg-ok-bg",
    warning: "border-amber-300 bg-warn-bg",
    neutral: "border-line bg-card-muted",
  }[variant];

  const titleClass = {
    success: "text-ok",
    warning: "text-warn-ink",
    neutral: "text-ink",
  }[variant];

  return (
    <div className={`rounded-lg border p-4 ${boxClass}`}>
      <h4 className={`mb-3 text-sm font-semibold ${titleClass}`}>{title}</h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-body">
            <span aria-hidden="true" className="shrink-0 font-bold text-muted">
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

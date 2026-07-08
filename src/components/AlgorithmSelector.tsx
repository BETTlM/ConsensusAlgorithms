"use client";

import { consensusAlgorithms } from "@/data/consensus";
import { useSelection } from "@/context/SelectionContext";

export function AlgorithmSelector() {
  const { selectedAlgorithmId, setSelectedAlgorithmId } = useSelection();

  return (
    <>
      <div
        className="flex gap-2 overflow-x-auto pb-2 md:hidden"
        role="tablist"
        aria-label="Consensus algorithms"
      >
        {consensusAlgorithms.map((algo) => {
          const active = selectedAlgorithmId === algo.id;
          return (
            <button
              key={algo.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedAlgorithmId(algo.id)}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-accent text-white shadow-sm"
                  : "border border-line bg-card text-body hover:border-accent hover:text-accent-dark"
              }`}
            >
              {algo.shortName}
            </button>
          );
        })}
      </div>

      <aside className="hidden md:block">
        <nav
          className="sticky top-[7.5rem] space-y-1"
          aria-label="Consensus algorithms"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
            Algorithms
          </p>
          {consensusAlgorithms.map((algo) => {
            const active = selectedAlgorithmId === algo.id;
            return (
              <button
                key={algo.id}
                type="button"
                aria-current={active ? "true" : undefined}
                onClick={() => setSelectedAlgorithmId(algo.id)}
                className={`w-full rounded-lg border px-3 py-3 text-left transition-colors ${
                  active
                    ? "border-accent bg-accent-soft text-accent-dark shadow-sm"
                    : "border-transparent bg-card text-body hover:border-line hover:bg-card-muted"
                }`}
              >
                <span className="block text-sm font-semibold">{algo.shortName}</span>
                <span className="mt-0.5 block text-xs leading-snug text-muted">
                  {algo.name}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

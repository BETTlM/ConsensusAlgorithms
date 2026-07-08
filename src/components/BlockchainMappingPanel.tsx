"use client";

import { useSelection } from "@/context/SelectionContext";
import { Panel } from "@/components/ui/Panel";
import { Badge } from "@/components/ui/Badge";

export function BlockchainMappingPanel() {
  const {
    selectedAlgorithm,
    setHighlightedBlockchainId,
    highlightedBlockchainId,
  } = useSelection();
  const filtered = selectedAlgorithm.blockchains;

  return (
    <Panel
      id="mapping"
      sectionNumber={3}
      title="Real-World Blockchain Mapping"
      subtitle="Networks and cryptocurrencies using this consensus"
    >
      <div
        key={selectedAlgorithm.id}
        className="animate-fade-in grid gap-4 sm:grid-cols-2"
      >
        {filtered.map((chain) => {
          const selected = highlightedBlockchainId === chain.id;
          return (
            <button
              key={chain.id}
              type="button"
              aria-pressed={selected}
              onClick={() =>
                setHighlightedBlockchainId(selected ? null : chain.id)
              }
              className={`rounded-lg border p-5 text-left transition-colors ${
                selected
                  ? "border-accent bg-accent-soft shadow-sm"
                  : "border-line bg-card hover:border-line-strong hover:bg-card-muted"
              }`}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-base font-semibold text-ink">
                    {chain.name}
                  </h4>
                  <span className="text-sm text-muted">{chain.symbol}</span>
                </div>
                <Badge variant={chain.layer === "L1" ? "l1" : "l2"}>
                  {chain.layer}
                </Badge>
              </div>
              <p className="text-sm leading-relaxed text-body">
                {chain.whyThisAlgorithm}
              </p>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-muted">
        Click a card to highlight it in the compatibility matrix below.
      </p>
    </Panel>
  );
}

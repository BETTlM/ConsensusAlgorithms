"use client";

import { useSelection } from "@/context/SelectionContext";
import { Panel } from "@/components/ui/Panel";
import { Badge } from "@/components/ui/Badge";

export function LayerPanel() {
  const { selectedAlgorithm } = useSelection();

  const l1Chains = selectedAlgorithm.blockchains.filter((c) => c.layer === "L1");
  const l2Chains = selectedAlgorithm.blockchains.filter((c) => c.layer === "L2");

  return (
    <Panel
      id="layers"
      sectionNumber={5}
      title="Layer Classification"
      subtitle="Layer 1 base chains vs Layer 2 scaling solutions"
    >
      <div key={selectedAlgorithm.id} className="animate-fade-in space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-line bg-l1-bg/40 p-5">
            <h4 className="mb-2 font-semibold text-l1-ink">Layer 1 (L1)</h4>
            <p className="text-sm leading-relaxed text-body">
              A base chain with its own consensus, validators, and native token.
              It provides final settlement. Examples: Bitcoin, Ethereum, Solana.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-l2-bg/40 p-5">
            <h4 className="mb-2 font-semibold text-l2-ink">Layer 2 (L2)</h4>
            <p className="text-sm leading-relaxed text-body">
              Built on top of an L1. Inherits the base chain&apos;s consensus
              security while handling more transactions off-chain or in a
              separate execution environment.
            </p>
          </div>
        </div>

        {l1Chains.length > 0 && (
          <LayerGroup title="Layer 1 networks" chains={l1Chains} variant="l1" />
        )}
        {l2Chains.length > 0 && (
          <LayerGroup title="Layer 2 networks" chains={l2Chains} variant="l2" />
        )}
        {l2Chains.length === 0 && l1Chains.length > 0 && (
          <p className="text-sm text-muted">
            No L2 rollups listed under {selectedAlgorithm.shortName}. L2s like
            Arbitrum inherit consensus from their settlement L1.
          </p>
        )}
      </div>
    </Panel>
  );
}

function LayerGroup({
  title,
  chains,
  variant,
}: {
  title: string;
  chains: {
    id: string;
    name: string;
    symbol: string;
    layerNote: string;
  }[];
  variant: "l1" | "l2";
}) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-ink">{title}</h4>
      <ul className="space-y-3">
        {chains.map((chain) => (
          <li
            key={chain.id}
            className="rounded-lg border border-line bg-card p-4"
          >
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="font-semibold text-ink">
                {chain.name} ({chain.symbol})
              </span>
              <Badge variant={variant}>{variant.toUpperCase()}</Badge>
            </div>
            <p className="text-sm leading-relaxed text-body">{chain.layerNote}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

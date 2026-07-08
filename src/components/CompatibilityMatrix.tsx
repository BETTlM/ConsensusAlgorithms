"use client";

import { useCallback, useState } from "react";
import { useSelection } from "@/context/SelectionContext";
import { areCompatible, getCompatibilityLabel } from "@/lib/compatibility";
import { Panel } from "@/components/ui/Panel";

export function CompatibilityMatrix() {
  const {
    allBlockchains,
    selectedAlgorithmId,
    setSelectedAlgorithmId,
    highlightedBlockchainId,
    setHighlightedBlockchainId,
  } = useSelection();

  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const count = allBlockchains.length;

  const selectedChainIds = new Set(
    allBlockchains
      .filter((c) => c.consensusId === selectedAlgorithmId)
      .map((c) => c.id)
  );

  const handleTooltip = useCallback((text: string, x: number, y: number) => {
    const maxX = typeof window !== "undefined" ? window.innerWidth - 300 : x;
    const maxY = typeof window !== "undefined" ? window.innerHeight - 100 : y;
    setTooltip({
      text,
      x: Math.min(x + 14, maxX),
      y: Math.min(y + 14, maxY),
    });
  }, []);

  const gridTemplate = `minmax(4.5rem, 14%) repeat(${count}, minmax(0, 1fr))`;

  return (
    <Panel
      id="compatibility"
      sectionNumber={6}
      title="Compatibility Matrix"
      subtitle="Green = same consensus mechanism · Red = different"
    >
      <p className="mb-5 text-sm leading-relaxed text-body">
        Two blockchains are <strong className="font-semibold text-ok">compatible</strong> when
        they share the same consensus protocol. This reflects protocol-level
        agreement, not automatic cross-chain transfers. Example: Ethereum and
        Cardano (both PoS) are compatible; Bitcoin (PoW) and Solana (PoH+PoS)
        are not.
      </p>

      <div
        className="grid w-full gap-px overflow-hidden rounded-lg border border-line bg-line"
        role="grid"
        aria-label="Blockchain consensus compatibility matrix"
        style={{ gridTemplateColumns: gridTemplate }}
      >
        {/* Header row */}
        <div className="bg-card-muted p-1 sm:p-2" role="columnheader" aria-hidden="true" />

        {allBlockchains.map((col) => {
          const highlighted =
            highlightedBlockchainId === col.id || selectedChainIds.has(col.id);
          return (
            <button
              key={`col-${col.id}`}
              type="button"
              title={`${col.name} (${col.consensusName})`}
              aria-label={`Column: ${col.name}`}
              className={`flex aspect-square w-full cursor-pointer items-center justify-center p-0.5 text-center transition-colors ${
                highlighted
                  ? "bg-accent-soft text-accent-dark"
                  : "bg-card-muted text-muted hover:bg-card hover:text-body"
              }`}
              style={{ fontSize: "clamp(0.55rem, 1.1vw, 0.7rem)" }}
              onClick={() => {
                setSelectedAlgorithmId(col.consensusId);
                setHighlightedBlockchainId(col.id);
              }}
            >
              <span className="line-clamp-2 leading-tight font-semibold break-all">
                {col.symbol}
              </span>
            </button>
          );
        })}

        {/* Data rows */}
        {allBlockchains.map((row) => {
          const rowHighlighted =
            highlightedBlockchainId === row.id || selectedChainIds.has(row.id);
          return (
            <div key={`row-${row.id}`} className="contents" role="row">
              <button
                type="button"
                title={`${row.name} (${row.consensusName})`}
                aria-label={`Row: ${row.name}`}
                className={`flex cursor-pointer items-center px-1 py-1 text-left transition-colors sm:px-2 ${
                  rowHighlighted
                    ? "bg-accent-soft text-accent-dark"
                    : "bg-card text-body hover:bg-card-muted"
                }`}
                style={{ fontSize: "clamp(0.55rem, 1vw, 0.75rem)" }}
                onClick={() => {
                  setSelectedAlgorithmId(row.consensusId);
                  setHighlightedBlockchainId(row.id);
                }}
              >
                <span className="line-clamp-2 leading-tight font-semibold">
                  {row.name}
                </span>
              </button>

              {allBlockchains.map((col) => {
                const compatible = areCompatible(row, col);
                const isDiag = row.id === col.id;
                const label = getCompatibilityLabel(row, col);
                return (
                  <div
                    key={`cell-${row.id}-${col.id}`}
                    role="gridcell"
                    tabIndex={0}
                    className={`flex aspect-square w-full items-center justify-center transition-colors ${
                      isDiag
                        ? "bg-card-muted"
                        : compatible
                          ? "bg-ok-bg hover:brightness-95"
                          : "bg-no-bg hover:brightness-95"
                    }`}
                    title={label}
                    onMouseEnter={(e) =>
                      handleTooltip(label, e.clientX, e.clientY)
                    }
                    onMouseMove={(e) =>
                      handleTooltip(label, e.clientX, e.clientY)
                    }
                    onMouseLeave={() => setTooltip(null)}
                    onFocus={(e) =>
                      handleTooltip(label, e.currentTarget.getBoundingClientRect().right, e.currentTarget.getBoundingClientRect().bottom)
                    }
                    onBlur={() => setTooltip(null)}
                  >
                    <span className="sr-only">{label}</span>
                    {!isDiag && (
                      <span
                        aria-hidden="true"
                        className={`font-bold leading-none ${compatible ? "text-ok" : "text-no"}`}
                        style={{ fontSize: "clamp(0.5rem, 1.2vw, 0.65rem)" }}
                      >
                        {compatible ? "✓" : "✗"}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-6 text-sm text-body">
        <span className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-ok-bg text-xs font-bold text-ok ring-1 ring-green-300">
            ✓
          </span>
          Compatible
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-no-bg text-xs font-bold text-no ring-1 ring-red-300">
            ✗
          </span>
          Incompatible
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 rounded bg-card-muted ring-1 ring-line" />
          Same network
        </span>
      </div>

      {tooltip && (
        <div
          className="pointer-events-none fixed z-50 max-w-xs rounded-lg border border-line bg-card px-4 py-3 text-sm leading-snug text-body shadow-lg"
          style={{ left: tooltip.x, top: tooltip.y }}
          role="tooltip"
        >
          {tooltip.text}
        </div>
      )}
    </Panel>
  );
}

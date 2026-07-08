"use client";

import { SelectionProvider } from "@/context/SelectionContext";
import { AlgorithmSelector } from "@/components/AlgorithmSelector";
import { SectionNav } from "@/components/SectionNav";
import { OverviewPanel } from "@/components/OverviewPanel";
import { TrilemmaRadarChart } from "@/components/TrilemmaRadarChart";
import { BlockchainMappingPanel } from "@/components/BlockchainMappingPanel";
import { SmartContractPanel } from "@/components/SmartContractPanel";
import { LayerPanel } from "@/components/LayerPanel";
import { CompatibilityMatrix } from "@/components/CompatibilityMatrix";
import Link from "next/link";

function ExplorerContent() {
  return (
    <div className="min-h-screen bg-page">
      <header className="bg-header text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-white/80">
                Blockchain &amp; Distributed Systems
              </p>
              <h1 className="mt-2 text-2xl font-bold leading-tight md:text-3xl">
                Consensus Algorithms in Blockchain - A Comparative Explorer
              </h1>
              <p className="mt-3 text-base leading-relaxed text-white/90">
                Pick a consensus protocol from the list. Every section below
                updates together: overview, trilemma, blockchain mapping, smart
                contract languages, layer classification, and compatibility.
              </p>
            </div>
            <Link
              href="/docs"
              className="inline-flex shrink-0 items-center rounded-lg bg-white/15 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/25"
            >
              Docs
            </Link>
          </div>
          <div className="mt-6 md:hidden">
            <AlgorithmSelector />
          </div>
        </div>
      </header>

      <SectionNav />

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 md:gap-8 md:px-8">
        <div className="hidden w-52 shrink-0 md:block lg:w-56">
          <AlgorithmSelector />
        </div>

        <main className="min-w-0 flex-1 space-y-8">
          <OverviewPanel />
          <TrilemmaRadarChart />
          <BlockchainMappingPanel />
          <SmartContractPanel />
          <LayerPanel />
          <CompatibilityMatrix />
        </main>
      </div>

      <footer className="border-t border-line bg-card py-8">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
          <p className="text-sm text-muted">
            TPS and trilemma scores are approximate estimates for learning.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <SelectionProvider>
      <ExplorerContent />
    </SelectionProvider>
  );
}

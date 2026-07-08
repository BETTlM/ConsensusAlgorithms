"use client";

import { useSelection } from "@/context/SelectionContext";
import { Panel } from "@/components/ui/Panel";
import { Badge } from "@/components/ui/Badge";

export function SmartContractPanel() {
  const { selectedAlgorithm } = useSelection();

  return (
    <Panel
      id="languages"
      sectionNumber={4}
      title="Smart Contract Language Support"
      subtitle="Programming languages on each network, tied to this consensus"
    >
      <div key={selectedAlgorithm.id} className="animate-fade-in overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Smart contract languages for {selectedAlgorithm.name}
          </caption>
          <thead>
            <tr className="border-b-2 border-line bg-card-muted">
              <th scope="col" className="px-3 py-3 pr-4 font-semibold text-ink">
                Blockchain
              </th>
              <th scope="col" className="px-3 py-3 pr-4 font-semibold text-ink">
                Languages
              </th>
              <th scope="col" className="px-3 py-3 font-semibold text-ink">
                Why this pairing
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedAlgorithm.blockchains.map((chain) => (
              <tr key={chain.id} className="border-b border-line">
                <td className="px-3 py-4 align-top">
                  <div className="font-semibold text-ink">{chain.name}</div>
                  <div className="mt-1">
                    <Badge variant={chain.layer === "L1" ? "l1" : "l2"}>
                      {chain.layer}
                    </Badge>
                  </div>
                </td>
                <td className="px-3 py-4 align-top">
                  {chain.smartContractLanguages.length > 0 ? (
                    <ul className="flex flex-wrap gap-2">
                      {chain.smartContractLanguages.map((lang) => (
                        <li key={lang}>
                          <span className="inline-block rounded-md border border-line bg-card-muted px-2.5 py-1 text-xs font-medium text-accent-dark">
                            {lang}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-sm text-muted">
                      None: no general-purpose smart contracts
                    </span>
                  )}
                </td>
                <td className="px-3 py-4 align-top text-sm leading-relaxed text-body">
                  {chain.languageNote}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

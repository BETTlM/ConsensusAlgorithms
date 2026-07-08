"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  consensusAlgorithms,
  DEFAULT_ALGORITHM_ID,
  getAlgorithmById,
  getAllFlatBlockchains,
} from "@/data/consensus";
import type { ConsensusAlgorithm, FlatBlockchain } from "@/data/types";

interface SelectionContextValue {
  selectedAlgorithmId: string;
  selectedAlgorithm: ConsensusAlgorithm;
  setSelectedAlgorithmId: (id: string) => void;
  highlightedBlockchainId: string | null;
  setHighlightedBlockchainId: (id: string | null) => void;
  allBlockchains: FlatBlockchain[];
}

const SelectionContext = createContext<SelectionContextValue | null>(null);

function resolveAlgorithmId(): string {
  if (typeof window === "undefined") return DEFAULT_ALGORITHM_ID;
  const hash = window.location.hash.replace("#", "");
  return getAlgorithmById(hash) ? hash : DEFAULT_ALGORITHM_ID;
}

function subscribeToHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function useHashAlgorithmId() {
  return useSyncExternalStore(
    subscribeToHash,
    resolveAlgorithmId,
    () => DEFAULT_ALGORITHM_ID
  );
}

export function SelectionProvider({ children }: { children: ReactNode }) {
  const hashAlgorithmId = useHashAlgorithmId();
  const [manualAlgorithmId, setManualAlgorithmId] = useState<string | null>(
    null
  );
  const selectedAlgorithmId = manualAlgorithmId ?? hashAlgorithmId;

  const [highlightedBlockchainId, setHighlightedBlockchainId] = useState<
    string | null
  >(null);

  const setSelectedAlgorithmId = useCallback(
    (id: string) => {
      if (!getAlgorithmById(id)) return;
      setManualAlgorithmId(id);
      window.history.replaceState(null, "", `#${id}`);
      setHighlightedBlockchainId(null);
    },
    []
  );

  const selectedAlgorithm = useMemo(() => {
    return getAlgorithmById(selectedAlgorithmId) ?? consensusAlgorithms[0];
  }, [selectedAlgorithmId]);

  const allBlockchains = useMemo(() => getAllFlatBlockchains(), []);

  const value = useMemo(
    () => ({
      selectedAlgorithmId,
      selectedAlgorithm,
      setSelectedAlgorithmId,
      highlightedBlockchainId,
      setHighlightedBlockchainId,
      allBlockchains,
    }),
    [
      selectedAlgorithmId,
      selectedAlgorithm,
      setSelectedAlgorithmId,
      highlightedBlockchainId,
      allBlockchains,
    ]
  );

  return (
    <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>
  );
}

export function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) {
    throw new Error("useSelection must be used within SelectionProvider");
  }
  return ctx;
}

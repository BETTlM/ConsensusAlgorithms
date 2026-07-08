export type Layer = "L1" | "L2";

export interface BlockchainEntry {
  id: string;
  name: string;
  symbol: string;
  layer: Layer;
  layerNote: string;
  smartContractLanguages: string[];
  languageNote: string;
  whyThisAlgorithm: string;
}

export interface TrilemmaScores {
  scalability: number;
  security: number;
  decentralization: number;
}

export interface ConsensusAlgorithm {
  id: string;
  name: string;
  shortName: string;
  mechanism: string;
  steps: string[];
  trilemma: TrilemmaScores;
  scalabilityNotes: string;
  securityNotes: string;
  decentralizationNotes: string;
  blockTime: string;
  tps: string;
  advantages: string[];
  limitations: string[];
  attackConsiderations: string[];
  blockchains: BlockchainEntry[];
}

export interface FlatBlockchain extends BlockchainEntry {
  consensusId: string;
  consensusName: string;
}

export const SECTIONS = [
  { id: "overview", label: "Overview", number: 1 },
  { id: "trilemma", label: "Trilemma", number: 2 },
  { id: "mapping", label: "Blockchains", number: 3 },
  { id: "languages", label: "Smart Contracts", number: 4 },
  { id: "layers", label: "Layer Model", number: 5 },
  { id: "compatibility", label: "Compatibility", number: 6 },
] as const;

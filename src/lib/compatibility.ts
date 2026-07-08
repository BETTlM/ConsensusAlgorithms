import { FlatBlockchain } from "@/data/types";

export function areCompatible(
  a: FlatBlockchain,
  b: FlatBlockchain
): boolean {
  return a.consensusId === b.consensusId;
}

export function getCompatibilityLabel(
  a: FlatBlockchain,
  b: FlatBlockchain
): string {
  if (a.id === b.id) {
    return `${a.name}: same chain`;
  }
  if (areCompatible(a, b)) {
    return `${a.name} (${a.consensusName}) ↔ ${b.name} (${b.consensusName}): compatible at consensus layer`;
  }
  return `${a.name} (${a.consensusName}) ↔ ${b.name} (${b.consensusName}): incompatible (different consensus)`;
}

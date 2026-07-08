# Consensus Algorithms in Blockchain: A Comparative Explorer

Interactive single-page application comparing ten major blockchain consensus protocols across mechanism design, trilemma trade-offs, deployed networks, smart contract stacks, layer classification, and protocol-level compatibility.

## Prerequisites

- Node.js 18.17+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Documentation

- **In-app reference:** [http://localhost:3000/docs](http://localhost:3000/docs)
- **Source file:** [docs/CONSENSUS_ALGORITHMS.md](docs/CONSENSUS_ALGORITHMS.md)

## Features

1. **Algorithm overview**: mechanism, step-by-step flow, strengths, limitations, security considerations
2. **Trilemma analysis**: radar chart with scalability (TPS, block time), security (51%, Sybil), decentralisation scores
3. **Blockchain mapping**: real networks with L1/L2 filter
4. **Smart contract languages**: tied to each network and consensus design
5. **Layer classification**: L1 vs L2 with definitions
6. **Compatibility matrix**: heatmap of protocol-level consensus compatibility

Select an algorithm in the sidebar (desktop) or tab bar (mobile). All panels update synchronously. URL hash preserves selection (e.g. `#pos`).

## Build

```bash
npm run build
npm start
```

## Stack

Next.js · TypeScript · Tailwind CSS · Recharts · react-markdown

## Algorithms covered

PoW · PoS · DPoS · PoA · pBFT · PoH+PoS · Tendermint · Avalanche · NPoS · LPoS

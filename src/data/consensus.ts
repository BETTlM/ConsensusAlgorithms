import { ConsensusAlgorithm } from "./types";

export const consensusAlgorithms: ConsensusAlgorithm[] = [
  {
    id: "pow",
    name: "Proof of Work",
    shortName: "PoW",
    mechanism:
      "Miners compete to solve a cryptographic puzzle by expending computational energy. The first miner to find a valid hash gets to propose the next block and receives a block reward. This makes rewriting history prohibitively expensive because an attacker would need to redo all the work.",
    steps: [
      "Transactions are broadcast to the network and collected into a candidate block.",
      "Miners repeatedly hash the block header with different nonce values until the hash meets a difficulty target.",
      "The winning miner broadcasts the new block to peers, who validate it and add it to their chain.",
      "Nodes follow the longest valid chain, making deep reorganizations costly in energy and hardware.",
    ],
    trilemma: { scalability: 2, security: 9, decentralization: 8 },
    blockTime: "~10 minutes (Bitcoin)",
    tps: "~7 (Bitcoin, approx.)",
    scalabilityNotes:
      "Block creation is intentionally slow to limit block size and keep full nodes cheap to run. Throughput stays low (single-digit TPS on Bitcoin) because every node must verify every transaction.",
    securityNotes:
      "Strong resistance to 51% attacks when hash rate is high and widely distributed. Sybil resistance comes from the cost of mining hardware and electricity, not identity.",
    decentralizationNotes:
      "Anyone with hardware can mine in theory, but mining pools and ASIC specialization have concentrated power. Still among the most permissionless L1 designs.",
    advantages: [
      "Battle-tested since 2009; no trusted coordinator required.",
      "Sybil resistance tied to real-world resource cost (energy, hardware).",
      "Simple longest-chain fork choice rule.",
    ],
    limitations: [
      "High energy consumption at scale.",
      "Low throughput and long confirmation times on major networks.",
      "Mining pool concentration in practice.",
    ],
    attackConsiderations: [
      "51% attack: control majority hash rate to rewrite recent blocks.",
      "Selfish mining: withhold blocks to gain disproportionate rewards.",
      "Eclipse attack: isolate a node from honest peers (network layer).",
    ],
    blockchains: [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        layer: "L1",
        layerNote:
          "Bitcoin is a standalone Layer 1 base chain with its own PoW consensus and UTXO ledger.",
        smartContractLanguages: [],
        languageNote:
          "Bitcoin Script is intentionally limited, not a general-purpose smart contract platform. Consensus throughput is not designed for complex on-chain programs.",
        whyThisAlgorithm:
          "PoW gives Bitcoin maximal security and predictable issuance without a trusted coordinator, aligning with its goal as neutral, censorship-resistant money.",
      },
      {
        id: "litecoin",
        name: "Litecoin",
        symbol: "LTC",
        layer: "L1",
        layerNote: "Independent Layer 1 fork inspired by Bitcoin with faster block targets.",
        smartContractLanguages: [],
        languageNote: "Same Script limitations as Bitcoin; optimized for payments, not dApps.",
        whyThisAlgorithm:
          "PoW provides familiar security guarantees with shorter block times for faster payment confirmation.",
      },
      {
        id: "dogecoin",
        name: "Dogecoin",
        symbol: "DOGE",
        layer: "L1",
        layerNote: "Standalone PoW Layer 1 with merged mining support from Litecoin.",
        smartContractLanguages: [],
        languageNote: "No general smart contract layer; simple payment-focused chain.",
        whyThisAlgorithm:
          "Inherited PoW from Bitcoin/Litecoin lineage for easy bootstrapping and community trust in mining-based security.",
      },
    ],
  },
  {
    id: "pos",
    name: "Proof of Stake",
    shortName: "PoS",
    mechanism:
      "Validators lock up native tokens as stake and are selected to propose or attest blocks based on stake weight and randomness. Misbehavior can be penalized through slashing. This replaces energy-intensive mining with economic collateral.",
    steps: [
      "Validators deposit stake into a staking contract or protocol deposit.",
      "The protocol pseudo-randomly chooses a block proposer and attesters for each slot or epoch.",
      "Honest validators vote on the canonical chain head; conflicting votes can trigger slashing.",
      "Finality is reached when a supermajority of stake confirms a checkpoint or epoch.",
    ],
    trilemma: { scalability: 5, security: 8, decentralization: 6 },
    blockTime: "~12 seconds (Ethereum)",
    tps: "~15–30 (Ethereum L1, approx.)",
    scalabilityNotes:
      "Higher throughput than PoW L1s via faster blocks and more efficient validation, but still bounded by single-chain execution. L2 rollups scale execution while inheriting PoS security.",
    securityNotes:
      "51% attacks require controlling a majority of staked value. Sybil resistance is economic: creating fake validators is costly. Slashing and finality reduce reorg risk versus pure longest-chain PoW.",
    decentralizationNotes:
      "Open validation is possible but stake concentration and staking pools can centralize influence. Ethereum mitigates this with large validator sets; smaller PoS chains vary.",
    advantages: [
      "Dramatically lower energy use than PoW.",
      "Economic security via slashing and stake-at-risk.",
      "Supports fast finality checkpoints (e.g. Ethereum epochs).",
    ],
    limitations: [
      "Nothing-at-stake problem addressed only with explicit slashing rules.",
      "Wealth concentration can map to validation influence.",
      "Long-range attacks require weak subjectivity or social consensus on checkpoints.",
    ],
    attackConsiderations: [
      "51% stake attack: acquire majority staked tokens or delegate influence.",
      "Sybil attack mitigated by stake requirement, not eliminated at low stake thresholds.",
      "Liveness faults if too many validators go offline simultaneously.",
    ],
    blockchains: [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        layer: "L1",
        layerNote:
          "Ethereum mainnet is a Layer 1 smart-contract platform that migrated from PoW to PoS (The Merge).",
        smartContractLanguages: ["Solidity", "Vyper"],
        languageNote:
          "Solidity is the dominant EVM language; contracts compile to bytecode executed by all PoS validators. PoS finality supports complex DeFi state without mining variance.",
        whyThisAlgorithm:
          "PoS cuts energy use ~99% while preserving open validation and enabling faster finality for a general-purpose programmable chain.",
      },
      {
        id: "cardano",
        name: "Cardano",
        symbol: "ADA",
        layer: "L1",
        layerNote: "Independent Ouroboros PoS Layer 1 with eUTXO accounting model.",
        smartContractLanguages: ["Plutus (Haskell-based)", "Aiken", "Marlowe"],
        languageNote:
          "Plutus smart contracts run on Cardano's PoS validators; formal methods align with Cardano's research-driven Ouroboros design.",
        whyThisAlgorithm:
          "Ouroboros PoS provides provable security properties and energy efficiency for a research-first L1.",
      },
      {
        id: "arbitrum",
        name: "Arbitrum One",
        symbol: "ARB",
        layer: "L2",
        layerNote:
          "Optimistic rollup Layer 2 that posts transaction data to Ethereum and inherits Ethereum PoS finality for settlement.",
        smartContractLanguages: ["Solidity", "Vyper"],
        languageNote:
          "EVM-equivalent execution; Solidity contracts deploy unchanged while consensus security comes from Ethereum PoS underneath.",
        whyThisAlgorithm:
          "Rollups scale execution off L1 but rely on Ethereum's PoS for data availability and dispute resolution, not a separate consensus mechanism.",
      },
      {
        id: "optimism",
        name: "Optimism",
        symbol: "OP",
        layer: "L2",
        layerNote:
          "Optimistic rollup on Ethereum using PoS-secured L1 for batches and fault proofs.",
        smartContractLanguages: ["Solidity"],
        languageNote:
          "Solidity on OP Stack; sequencer orders L2 txs while Ethereum PoS validators finalize L1 state roots.",
        whyThisAlgorithm:
          "Inherits Ethereum PoS security while offering lower fees and higher throughput for EVM dApps.",
      },
    ],
  },
  {
    id: "dpos",
    name: "Delegated Proof of Stake",
    shortName: "DPoS",
    mechanism:
      "Token holders vote for a fixed set of delegates (block producers or witnesses) who take turns producing blocks. This trades broader validator participation for higher throughput and predictable block times.",
    steps: [
      "Users stake tokens and vote for delegate candidates proportional to stake.",
      "Top-ranked delegates become active block producers for an epoch.",
      "Delegates rotate block production in a scheduled round-robin.",
      "Misbehaving delegates can be voted out in the next election cycle.",
    ],
    trilemma: { scalability: 8, security: 5, decentralization: 3 },
    blockTime: "~0.5 seconds (EOS)",
    tps: "~1,000–4,000 (claimed, network-dependent)",
    scalabilityNotes:
      "Fewer producers mean faster consensus rounds and higher TPS. Block times under one second are common. Throughput favors performance over full-node replication costs.",
    securityNotes:
      "A cartel of delegates could collude (smaller validator set ≈ easier 51%-style control). Sybil resistance depends on stake-weighted voting, not per-node PoW.",
    decentralizationNotes:
      "Typically 21–101 elected producers versus thousands of PoW miners or PoS validators. Governance and delegate concentration reduce Nakamoto coefficient.",
    advantages: [
      "Sub-second block times and high nominal TPS.",
      "Predictable schedule reduces fork uncertainty.",
      "Low transaction fees for end users.",
    ],
    limitations: [
      "Small fixed validator set, easier collusion than open PoS.",
      "Voter apathy can entrench incumbent delegates.",
      "Trade-off: performance over Nakamoto coefficient.",
    ],
    attackConsiderations: [
      "Delegate collusion: majority of block producers act maliciously.",
      "Vote buying: large holders influence delegate elections.",
      "Censorship by elected producers delaying or excluding transactions.",
    ],
    blockchains: [
      {
        id: "eos",
        name: "EOS",
        symbol: "EOS",
        layer: "L1",
        layerNote: "Layer 1 using 21 elected block producers under DPoS.",
        smartContractLanguages: ["C++ (EOSIO)"],
        languageNote:
          "C++ contracts compile to WASM on EOS; DPoS fast finality suits high-frequency dApp interactions.",
        whyThisAlgorithm:
          "DPoS was chosen for consumer-grade latency and throughput for decentralized applications.",
      },
      {
        id: "tron",
        name: "TRON",
        symbol: "TRX",
        layer: "L1",
        layerNote: "Layer 1 with 27 Super Representatives elected via DPoS.",
        smartContractLanguages: ["Solidity (TVM-compatible)"],
        languageNote:
          "Solidity-like contracts on TRON Virtual Machine; DPoS enables low-fee entertainment and DeFi use cases.",
        whyThisAlgorithm:
          "High throughput and low fees for content and payment applications via a small producer set.",
      },
      {
        id: "lisk",
        name: "Lisk",
        symbol: "LSK",
        layer: "L1",
        layerNote: "Layer 1 with delegated validators in a DPoS-style model.",
        smartContractLanguages: ["TypeScript/JavaScript (Lisk SDK)"],
        languageNote:
          "JavaScript/TypeScript modules for sidechains; DPoS on mainchain coordinates delegate consensus.",
        whyThisAlgorithm:
          "Developer-friendly stack with DPoS for predictable block production on app-specific sidechains.",
      },
    ],
  },
  {
    id: "poa",
    name: "Proof of Authority",
    shortName: "PoA",
    mechanism:
      "A known set of approved validators (authorities) take turns sealing blocks. Identity and reputation replace anonymous mining or open staking. Validators stake their name rather than large token collateral.",
    steps: [
      "Network operators whitelist trusted validator nodes with verified identities.",
      "Validators rotate block production according to a protocol schedule.",
      "Blocks are signed by the authority's key; peers reject unsigned or out-of-turn blocks.",
      "Governance adds or removes authorities through an off-chain or on-chain admin process.",
    ],
    trilemma: { scalability: 7, security: 4, decentralization: 2 },
    blockTime: "~2–5 seconds",
    tps: "~100–1,000 (private/consortium chains)",
    scalabilityNotes:
      "Small validator sets enable fast blocks and high TPS, ideal for enterprise or test networks where throughput matters more than permissionless access.",
    securityNotes:
      "Resistant to anonymous Sybil floods but vulnerable if authorities collude or keys are compromised. Not suited for adversarial open environments.",
    decentralizationNotes:
      "Highly centralized by design, validators are identifiable and permissioned. Best for consortium or hybrid public-private deployments.",
    advantages: [
      "Fast block times with minimal computational overhead.",
      "No mining, suitable for private and consortium networks.",
      "Accountability: validators are known legal or organizational entities.",
    ],
    limitations: [
      "Not permissionless, validator admission is gated.",
      "Trust in authority honesty replaces anonymous economic security.",
      "Single compromised authority key affects network integrity.",
    ],
    attackConsiderations: [
      "Authority collusion to rewrite or censor history.",
      "Key compromise of a rotating block signer.",
      "Governance capture if authority list is centrally controlled.",
    ],
    blockchains: [
      {
        id: "polygon-poa",
        name: "Polygon PoA (legacy)",
        symbol: "MATIC",
        layer: "L1",
        layerNote:
          "Early Polygon PoS chain used PoA-style validators before broader staking; now evolved but PoA remains common in Polygon ecosystem testnets.",
        smartContractLanguages: ["Solidity"],
        languageNote:
          "EVM-compatible; PoA testnets let developers deploy Solidity cheaply before mainnet.",
        whyThisAlgorithm:
          "PoA delivers low-cost, fast EVM development environments with trusted validator sets.",
      },
      {
        id: "vechain",
        name: "VeChain",
        symbol: "VET",
        layer: "L1",
        layerNote:
          "Hybrid Layer 1 using Authority Masternode (PoA-like) validation for enterprise supply-chain use cases.",
        smartContractLanguages: ["Solidity (EVM-compatible subset)"],
        languageNote:
          "Solidity smart contracts on authority-validated blocks optimized for business integrations.",
        whyThisAlgorithm:
          "Known validators and compliance-friendly governance suit enterprise supply-chain tracking.",
      },
      {
        id: "gnosis",
        name: "Gnosis Chain",
        symbol: "GNO",
        layer: "L1",
        layerNote:
          "EVM Layer 1 formerly xDai, using PoA-style consensus with a limited validator set.",
        smartContractLanguages: ["Solidity"],
        languageNote:
          "Full EVM; PoA enables stable, low-fee blocks for payments and DAO tooling.",
        whyThisAlgorithm:
          "Predictable, energy-light consensus for community-governed payment infrastructure.",
      },
    ],
  },
  {
    id: "pbft",
    name: "Practical Byzantine Fault Tolerance",
    shortName: "pBFT",
    mechanism:
      "Known validators run a multi-round voting protocol (pre-prepare, prepare, commit) to agree on block order despite some faulty or malicious nodes. It provides immediate finality once a quorum commits.",
    steps: [
      "A primary node proposes a block (pre-prepare) to replicas.",
      "Replicas broadcast prepare messages once they accept the proposal.",
      "When a quorum prepares, replicas send commit messages.",
      "After commit quorum, the block is final, no probabilistic confirmations needed.",
    ],
    trilemma: { scalability: 4, security: 7, decentralization: 3 },
    blockTime: "~1–5 seconds",
    tps: "~1,000+ (small validator sets; drops as validators grow)",
    scalabilityNotes:
      "Message complexity grows with validator count (O(n²)), limiting scalability to tens of validators. Excellent for permissioned chains with fixed membership.",
    securityNotes:
      "Tolerates up to f faulty nodes among 3f+1 total (Byzantine fault tolerance). Strong against double-spend within the quorum model; assumes bounded adversary fraction.",
    decentralizationNotes:
      "Permissioned validator sets, not open entry. Suitable for consortium blockchains where participants are known legal entities.",
    advantages: [
      "Immediate finality after commit quorum, no probabilistic confirmations.",
      "Proven BFT safety with up to f faulty nodes in 3f+1 set.",
      "Deterministic transaction ordering for enterprise workflows.",
    ],
    limitations: [
      "O(n²) message complexity limits validator count.",
      "View-change latency when primary node fails.",
      "Requires permissioned, known participant set.",
    ],
    attackConsiderations: [
      "Byzantine replicas sending conflicting messages (bounded by f limit).",
      "Primary node censorship of proposals until view change.",
      "Denial-of-service on communication channels between replicas.",
    ],
    blockchains: [
      {
        id: "hyperledger-fabric",
        name: "Hyperledger Fabric",
        symbol: "N/A",
        layer: "L1",
        layerNote:
          "Permissioned enterprise Layer 1 framework; ordering service can use Raft or BFT variants including pBFT-inspired protocols.",
        smartContractLanguages: ["Go", "JavaScript (chaincode)"],
        languageNote:
          "Chaincode in Go or Node.js runs in isolated containers; pBFT-style ordering gives instant finality for B2B workflows.",
        whyThisAlgorithm:
          "Immediate finality and known participants match enterprise audit and compliance requirements.",
      },
      {
        id: "zilliqa",
        name: "Zilliqa",
        symbol: "ZIL",
        layer: "L1",
        layerNote:
          "Layer 1 combining sharding with BFT consensus within shard committees.",
        smartContractLanguages: ["Scilla", "Solidity (EVM compat layer)"],
        languageNote:
          "Scilla is security-oriented; BFT within shards enables parallel contract execution.",
        whyThisAlgorithm:
          "pBFT per shard gives fast finality while sharding improves throughput beyond single-chain PoW/PoS.",
      },
    ],
  },
  {
    id: "poh",
    name: "Proof of History + Proof of Stake",
    shortName: "PoH+PoS",
    mechanism:
      "Proof of History creates a verifiable chronological sequence of hashes (a cryptographic clock) before PoS validators vote on block order. This reduces communication overhead and lets the network process transactions in parallel pipelines.",
    steps: [
      "A leader node generates a continuous PoH hash sequence, timestamping events.",
      "Transactions are inserted into the PoH stream with verifiable ordering.",
      "PoS validators vote on forks using the PoH sequence as trusted time reference.",
      "Tower BFT locks in votes over time, providing fast finality with slashing for violations.",
    ],
    trilemma: { scalability: 9, security: 6, decentralization: 4 },
    blockTime: "~400 ms",
    tps: "~2,000–4,000 (theoretical peak higher; approx.)",
    scalabilityNotes:
      "PoH enables parallel transaction processing and sub-second slots. High TPS relative to most L1s, though real-world throughput depends on hardware and network conditions.",
    securityNotes:
      "PoS slashing and Tower BFT protect against double votes. PoH alone does not secure consensus, it is combined with PoS. Historical outages showed operational risks from validator concentration.",
    decentralizationNotes:
      "High hardware requirements for validators and leaders favor well-capitalized operators. Validator count is moderate compared to Ethereum.",
    advantages: [
      "Cryptographic clock reduces inter-node coordination overhead.",
      "Sub-second slots enable high throughput on a single chain.",
      "Tower BFT adds progressive finality with slashing.",
    ],
    limitations: [
      "PoH alone does not secure the network, must pair with PoS/BFT.",
      "High validator hardware and bandwidth requirements.",
      "Network outages documented when load exceeds validator capacity.",
    ],
    attackConsiderations: [
      "Denial-of-service flooding validators with transactions.",
      "PoS-level attacks: stake concentration and voting manipulation.",
      "Leader schedule predictability can aid targeted attacks on block producers.",
    ],
    blockchains: [
      {
        id: "solana",
        name: "Solana",
        symbol: "SOL",
        layer: "L1",
        layerNote: "High-performance Layer 1 combining PoH sequencing with PoS validation.",
        smartContractLanguages: ["Rust", "C", "Anchor (Rust framework)"],
        languageNote:
          "Rust compiles to BPF bytecode on Solana runtime; PoH's high throughput matches compute-heavy parallel programs.",
        whyThisAlgorithm:
          "PoH+PoS targets web-scale throughput on a single global state machine without sharding.",
      },
    ],
  },
  {
    id: "tendermint",
    name: "Tendermint BFT",
    shortName: "Tendermint",
    mechanism:
      "Validators propose blocks in rounds using BFT voting (prevote and precommit). Once more than two-thirds of stake precommits, the block is instantly finalized. Tendermint Core separates consensus from application logic via ABCI.",
    steps: [
      "A proposer is selected deterministically based on stake for each height/round.",
      "Validators prevote on a proposed block if it is valid.",
      "If a prevote quorum exists, validators precommit.",
      "Two-thirds precommit finalizes the block; new height begins with no reorgs under honest majority.",
    ],
    trilemma: { scalability: 5, security: 8, decentralization: 5 },
    blockTime: "~6 seconds (Cosmos Hub)",
    tps: "~200–400 (approx., chain-dependent)",
    scalabilityNotes:
      "Instant finality with moderate TPS. Validator set size is capped in practice (~100–200) due to BFT messaging overhead.",
    securityNotes:
      "Byzantine fault tolerant with >2/3 honest stake assumption. Slashing for double-signing. Strong finality eliminates long confirmation waits.",
    decentralizationNotes:
      "Open staking with delegated validators, but BFT limits set size. Cosmos ecosystem chains inherit similar trade-offs via CometBFT.",
    advantages: [
      "Single-block finality, no chain reorganizations under honest majority.",
      "Clean separation of consensus (CometBFT) and application (Cosmos SDK).",
      "IBC protocol enables standardized cross-chain communication.",
    ],
    limitations: [
      "Validator set size practically capped (~100–200) due to BFT overhead.",
      "Liveness stalls if ≥⅓ validators unresponsive or Byzantine.",
      "Each app-chain must bootstrap its own validator economics.",
    ],
    attackConsiderations: [
      "Double-signing by validators (mitigated by slashing).",
      "Censoring proposer withholding valid blocks.",
      "Coordinated liveness attack with ≥⅓ stake offline or adversarial.",
    ],
    blockchains: [
      {
        id: "cosmos-hub",
        name: "Cosmos Hub",
        symbol: "ATOM",
        layer: "L1",
        layerNote: "Flagship Layer 1 of the Cosmos network using CometBFT (Tendermint successor).",
        smartContractLanguages: ["CosmWasm (Rust)", "Go (modules)"],
        languageNote:
          "CosmWasm Rust contracts on Cosmos SDK; Tendermint finality supports IBC cross-chain messaging.",
        whyThisAlgorithm:
          "Tendermint enables sovereign app-chains with instant finality and interoperability via IBC.",
      },
      {
        id: "osmosis",
        name: "Osmosis",
        symbol: "OSMO",
        layer: "L1",
        layerNote: "Cosmos SDK Layer 1 DEX chain with CometBFT consensus.",
        smartContractLanguages: ["Rust (CosmWasm)"],
        languageNote:
          "CosmWasm on Osmosis leverages fast BFT finality for AMM liquidity operations.",
        whyThisAlgorithm:
          "Same Tendermint stack as Cosmos for IBC-native DeFi with quick settlement.",
      },
    ],
  },
  {
    id: "avalanche",
    name: "Avalanche Consensus",
    shortName: "Avalanche",
    mechanism:
      "Validators repeatedly subsample random peers and prefer the transaction or block favored by a supermajority of the sample. Repeated subsampling converges quickly to agreement (metastable consensus) without traditional linear block chains in all subnets.",
    steps: [
      "A client broadcasts a transaction to validators.",
      "Each validator queries a random subset of other validators for their preference.",
      "If a supermajority agrees, the validator switches preference; rounds repeat.",
      "Confidence builds until conflict is statistically impossible, fast probabilistic then practical finality.",
    ],
    trilemma: { scalability: 8, security: 7, decentralization: 5 },
    blockTime: "~2 seconds (C-Chain)",
    tps: "~4,500+ (C-Chain claims; approx.)",
    scalabilityNotes:
      "Subsampling avoids all-to-all voting, enabling high throughput and thousands of validators in theory. Subnets allow custom chains with shared security model.",
    securityNotes:
      "Resists Sybil attacks when stake is distributed; safety requires honest supermajority. Different from longest-chain PoW, uses repeated random sampling for convergence.",
    decentralizationNotes:
      "Open staking with delegation, but validator requirements and subnet architecture create varying decentralization across the ecosystem.",
    advantages: [
      "Subsampling achieves low communication overhead vs full BFT.",
      "Fast convergence to agreement in practice.",
      "Subnet model allows custom execution environments.",
    ],
    limitations: [
      "Safety proofs assume honest supermajority of stake.",
      "Parameter tuning (k sample size, α threshold) affects security margins.",
      "Heterogeneous subnet security varies by validator set.",
    ],
    attackConsiderations: [
      "Sybil attack if stake distribution is too concentrated.",
      "Snowball preference manipulation during early sampling rounds.",
      "Cross-subnet security not automatically equivalent to primary network.",
    ],
    blockchains: [
      {
        id: "avalanche-c",
        name: "Avalanche C-Chain",
        symbol: "AVAX",
        layer: "L1",
        layerNote:
          "EVM-compatible Layer 1 contract chain on Avalanche primary network.",
        smartContractLanguages: ["Solidity"],
        languageNote:
          "Solidity on C-Chain; Avalanche consensus provides sub-second confirmation for EVM dApps.",
        whyThisAlgorithm:
          "Metastable consensus targets high throughput EVM compatibility without sharding complexity.",
      },
      {
        id: "avalanche-x",
        name: "Avalanche X-Chain",
        symbol: "AVAX",
        layer: "L1",
        layerNote:
          "DAG-based payment chain on Avalanche using the same family of consensus protocols.",
        smartContractLanguages: [],
        languageNote:
          "Asset transfer focused; no general smart contracts, optimized for UTXO-style payments.",
        whyThisAlgorithm:
          "Avalanche protocol family optimized for fast payment finality on a DAG structure.",
      },
    ],
  },
  {
    id: "npos",
    name: "Nominated Proof of Stake",
    shortName: "NPoS",
    mechanism:
      "Token holders nominate validators they trust; the protocol uses election algorithms (Phragmén) to select an active validator set that maximizes stake backing while promoting decentralization. Validators produce blocks and earn rewards shared with nominators.",
    steps: [
      "Nominators bond tokens and select up to 16 validator candidates.",
      "An election algorithm chooses the active validator set each era based on nominations.",
      "Selected validators produce blocks in BABE (block production) and finalize in GRANDPA.",
      "Rewards and slashing are distributed between validators and their nominators.",
    ],
    trilemma: { scalability: 4, security: 8, decentralization: 7 },
    blockTime: "~6 seconds",
    tps: "~1,000 (Polkadot relay chain theoretical; parachains add parallel throughput)",
    scalabilityNotes:
      "Relay chain focuses on shared security and coordination; parachains scale execution in parallel. Base relay TPS is moderate but ecosystem throughput is higher.",
    securityNotes:
      "Shared security model with slashing. GRANDPA finality gives strong guarantees. Nomination limits aim to prevent validator cartels.",
    decentralizationNotes:
      "Phragmén election spreads nominations across validators. Nominator participation is encouraged, improving validator set diversity versus fixed DPoS delegates.",
    advantages: [
      "Phragmén election optimizes stake coverage and validator diversity.",
      "Shared security across parachains via relay chain.",
      "GRANDPA provides batch finality for relay chain blocks.",
    ],
    limitations: [
      "Relay chain throughput limits shared security model scaling.",
      "Complex architecture, parachain slots require allocation/collators.",
      "Nominator UX complexity vs simple delegate voting.",
    ],
    attackConsiderations: [
      "Validator set cartels if nominations cluster on few operators.",
      "Parachain collusion separate from relay chain validator security.",
      "Slashing risks for nominators backing misbehaving validators.",
    ],
    blockchains: [
      {
        id: "polkadot",
        name: "Polkadot",
        symbol: "DOT",
        layer: "L1",
        layerNote:
          "Relay chain Layer 1 coordinating parachains with NPoS validator election.",
        smartContractLanguages: ["Rust (ink!)", "Solidity (via parachains)"],
        languageNote:
          "ink! Rust on parachains; relay chain NPoS secures heterogeneous WASM/EVM parachains.",
        whyThisAlgorithm:
          "NPoS balances wide nominator participation with efficient validator set selection for multichain security.",
      },
      {
        id: "kusama",
        name: "Kusama",
        symbol: "KSM",
        layer: "L1",
        layerNote:
          "Canary network Layer 1, Polkadot's experimental sibling with the same NPoS stack.",
        smartContractLanguages: ["Rust (ink!)"],
        languageNote:
          "Same Substrate/ink! stack as Polkadot for rapid protocol testing under NPoS.",
        whyThisAlgorithm:
          "Identical consensus philosophy for real-world testing before Polkadot upgrades.",
      },
    ],
  },
  {
    id: "lpos",
    name: "Liquid Proof of Stake",
    shortName: "LPoS",
    mechanism:
      "Anyone can become a baker (validator) or delegate stake to any baker without fixed delegation limits, unlike DPoS's capped delegate lists. Liquid delegation keeps stake portable while bakers produce blocks under PoS rules with on-chain governance.",
    steps: [
      "Users delegate XTZ to bakers without locking governance rights (liquid).",
      "Bakers must hold a security deposit (roll) to bake blocks.",
      "The protocol selects bakers for block rights based on stake weight.",
      "Governance votes on protocol upgrades; misbehavior can result in loss of deposit.",
    ],
    trilemma: { scalability: 4, security: 7, decentralization: 6 },
    blockTime: "~30 seconds",
    tps: "~40 (approx.)",
    scalabilityNotes:
      "Moderate throughput with longer block times prioritizing on-chain governance and formal verification over raw TPS.",
    securityNotes:
      "Stake-at-risk discourages double baking. Open delegation without fixed delegate caps reduces some DPoS cartel risks.",
    decentralizationNotes:
      "Liquid delegation allows users to switch bakers freely. Baker count is higher than typical DPoS but lower than Ethereum's validator count.",
    advantages: [
      "No fixed delegate cap, users delegate to any baker.",
      "On-chain governance amends protocol without hard forks.",
      "Formal verification culture supported by Michelson design.",
    ],
    limitations: [
      "Moderate TPS (~40), prioritizes governance over raw throughput.",
      "Roll requirement (8,000 XTZ) sets baker entry barrier.",
      "Smaller ecosystem than EVM-dominant chains.",
    ],
    attackConsiderations: [
      "Double baking by validators (slashed on proof).",
      "Governance attacks via coordinated voting with large stake.",
      "Baker downtime reduces rewards but affects liveness marginally.",
    ],
    blockchains: [
      {
        id: "tezos",
        name: "Tezos",
        symbol: "XTZ",
        layer: "L1",
        layerNote: "Self-amending Layer 1 with on-chain governance and LPoS baking.",
        smartContractLanguages: ["Michelson", "SmartPy", "Ligo", "Archetype"],
        languageNote:
          "Michelson is Tezos' stack-based language; formal verification culture pairs with LPoS governance for protocol upgrades.",
        whyThisAlgorithm:
          "LPoS keeps delegation flexible while funding a large baker ecosystem without hard-coded delegate limits.",
      },
    ],
  },
];

export const DEFAULT_ALGORITHM_ID = "pow";

export function getAlgorithmById(id: string): ConsensusAlgorithm | undefined {
  return consensusAlgorithms.find((a) => a.id === id);
}

export function getAllFlatBlockchains() {
  return consensusAlgorithms.flatMap((algo) =>
    algo.blockchains.map((chain) => ({
      ...chain,
      consensusId: algo.id,
      consensusName: algo.name,
    }))
  );
}

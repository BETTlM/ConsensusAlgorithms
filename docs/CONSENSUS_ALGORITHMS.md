# Consensus Algorithms in Blockchain: Reference Guide

This document accompanies the **Comparative Explorer** interactive application. It defines ten major consensus mechanisms, explains how each works, analyses the blockchain trilemma trade-offs, maps real-world networks, documents smart contract language support, classifies Layer 1 vs Layer 2 deployments, and summarises protocol-level compatibility.

---

## Table of Contents

1. [Introduction to Consensus](#1-introduction-to-consensus)
2. [The Blockchain Trilemma](#2-the-blockchain-trilemma)
3. [Layer 1 vs Layer 2](#3-layer-1-vs-layer-2)
4. [Compatibility at the Protocol Level](#4-compatibility-at-the-protocol-level)
5. [Algorithm Reference](#5-algorithm-reference)
   - [Proof of Work (PoW)](#51-proof-of-work-pow)
   - [Proof of Stake (PoS)](#52-proof-of-stake-pos)
   - [Delegated Proof of Stake (DPoS)](#53-delegated-proof-of-stake-dpos)
   - [Proof of Authority (PoA)](#54-proof-of-authority-poa)
   - [Practical Byzantine Fault Tolerance (pBFT)](#55-practical-byzantine-fault-tolerance-pbft)
   - [Proof of History + Proof of Stake](#56-proof-of-history--proof-of-stake)
   - [Tendermint BFT (CometBFT)](#57-tendermint-bft-cometbft)
   - [Avalanche Consensus](#58-avalanche-consensus)
   - [Nominated Proof of Stake (NPoS)](#59-nominated-proof-of-stake-npos)
   - [Liquid Proof of Stake (LPoS)](#510-liquid-proof-of-stake-lpos)
6. [Summary Comparison Table](#6-summary-comparison-table)
7. [Glossary](#7-glossary)

---

## 1. Introduction to Consensus

A **consensus algorithm** is the protocol by which nodes in a distributed blockchain network agree on:

- Which transactions are valid
- The order in which they are included
- The current canonical state of the ledger

Without consensus, independent nodes would maintain conflicting histories. Consensus mechanisms differ in **how** agreement is reached, **who** may participate in block production, and **what resources** are required to attack the network.

Every design makes trade-offs among three properties (see Section 2):

| Property | Question it answers |
|----------|---------------------|
| **Scalability** | How many transactions per second (TPS) can the network process, and how fast are blocks finalised? |
| **Security** | How resistant is the network to 51% attacks, Sybil attacks, and double-spending? |
| **Decentralisation** | How many independent participants can validate or produce blocks without permission? |

---

## 2. The Blockchain Trilemma

Coined in the context of distributed ledger design, the **blockchain trilemma** observes that maximising all three properties simultaneously is practically impossible with current architectures.

### 2.1 Scalability

Measured by:

- **Block creation time**: interval between consecutive blocks
- **Transactions per second (TPS)**: throughput under typical load

Higher scalability often requires fewer validators, faster (less verified) block propagation, or off-chain execution; each of which can reduce security or decentralisation.

### 2.2 Security

Evaluated against:

- **51% attack**: adversary controls majority of mining hash rate or staked value to rewrite history
- **Sybil attack**: adversary creates many fake identities to gain disproportionate influence
- **Finality**: how many confirmations are needed before a transaction is irreversible

### 2.3 Decentralisation

Measured by breadth of participation:

- Number of independent miners, validators, or authorities
- **Nakamoto coefficient**: minimum entities needed to collude for 51% control
- Permissionless vs permissioned entry

### 2.4 Scoring in the Explorer

The interactive explorer assigns comparative scores from **1 (weak)** to **10 (strong)** for each pillar per algorithm. These are **educational estimates**, not live benchmarks.

---

## 3. Layer 1 vs Layer 2

| | Layer 1 (L1) | Layer 2 (L2) |
|---|-------------|-------------|
| **Definition** | Base blockchain with its own consensus | Scaling solution settling on an L1 |
| **Consensus** | Runs its own protocol (PoW, PoS, etc.) | Inherits L1 consensus for security |
| **Examples** | Bitcoin, Ethereum, Solana | Arbitrum, Optimism (on Ethereum) |
| **Role** | Final settlement and shared security | Higher throughput, lower fees |

**Important:** An L2 listed under Proof of Stake in the explorer uses Ethereum's PoS for settlement. Its consensus compatibility is with other PoS-secured chains at the protocol inheritance level, not because it runs an independent validator set.

---

## 4. Compatibility at the Protocol Level

Two blockchains are **compatible** (in the explorer's matrix) when they share the **same consensus mechanism family**.

| Pair | Consensus | Compatible? |
|------|-----------|-------------|
| Ethereum ↔ Cardano | Both PoS | Yes |
| Bitcoin ↔ Litecoin | Both PoW | Yes |
| Bitcoin ↔ Solana | PoW vs PoH+PoS | No |
| Cosmos Hub ↔ Osmosis | Both Tendermint | Yes |

**What compatibility does NOT mean:**

- Automatic cross-chain asset bridges
- Shared smart contract bytecode
- Identical validator sets

It means both networks solve agreement using the same class of protocol, which is a prerequisite for understanding cross-chain interoperability research (atomic swaps, light clients, shared security).

---

## 5. Algorithm Reference

---

### 5.1 Proof of Work (PoW)

**ID:** `pow`

#### Core mechanism

Miners compete to find a nonce such that the block header hash is below a difficulty target. The first valid block is propagated; nodes extend the longest valid chain. Security derives from the cost of redoing cumulative work.

#### How it works

1. Transactions are broadcast and pooled into a candidate block.
2. Miners iterate nonce values, hashing the block header until the hash meets the target.
3. The winning block is broadcast; peers validate and append it.
4. Nodes follow the chain with the most accumulated proof-of-work.

#### Trilemma profile

| Pillar | Score | Notes |
|--------|-------|-------|
| Scalability | 2/10 | ~10 min blocks, ~7 TPS (Bitcoin) |
| Security | 9/10 | Strong when hash rate is distributed |
| Decentralisation | 8/10 | Permissionless, but pool concentration |

#### Deployed networks

| Network | Symbol | Layer | Why PoW |
|---------|--------|-------|---------|
| Bitcoin | BTC | L1 | Censorship-resistant money without trusted coordinator |
| Litecoin | LTC | L1 | Faster confirmations with proven PoW model |
| Dogecoin | DOGE | L1 | Payment chain with merged mining |

#### Smart contract languages

| Network | Languages | Notes |
|---------|-----------|-------|
| Bitcoin | None (Script only) | Script is not Turing-complete; no general smart contracts |
| Litecoin | None | Payment-focused |
| Dogecoin | None | Payment-focused |

#### Security considerations

- 51% attack via majority hash rate
- Selfish mining strategies
- Eclipse attacks at the P2P network layer

---

### 5.2 Proof of Stake (PoS)

**ID:** `pos`

#### Core mechanism

Validators bond native tokens as stake. Block proposers and attesters are selected pseudo-randomly proportional to stake. Misbehaviour triggers **slashing** (stake confiscation). Energy use is negligible compared to PoW.

#### How it works

1. Validators deposit stake into a protocol contract.
2. The protocol selects proposer and attesters per slot/epoch.
3. Validators vote on the canonical head; equivocation is slashable.
4. Finality occurs when a supermajority of stake attests a checkpoint.

#### Trilemma profile

| Pillar | Score | Notes |
|--------|-------|-------|
| Scalability | 5/10 | ~12 s blocks, ~15–30 TPS on Ethereum L1 |
| Security | 8/10 | Economic security; slashing |
| Decentralisation | 6/10 | Open staking; pool concentration risk |

#### Deployed networks

| Network | Symbol | Layer | Why PoS |
|---------|--------|-------|---------|
| Ethereum | ETH | L1 | Energy efficiency + programmable finality post-Merge |
| Cardano | ADA | L1 | Ouroboros research-driven PoS |
| Arbitrum One | ARB | L2 | Inherits Ethereum PoS for rollup settlement |
| Optimism | OP | L2 | Same OP Stack rollup on Ethereum |

#### Smart contract languages

| Network | Languages | Consensus tie-in |
|---------|-----------|------------------|
| Ethereum | Solidity, Vyper | EVM bytecode executed by all PoS validators |
| Cardano | Plutus, Aiken, Marlowe | eUTXO contracts on Ouroboros validators |
| Arbitrum / Optimism | Solidity, Vyper | EVM-equivalent; L1 PoS secures fraud proofs |

#### Security considerations

- 51% stake attack
- Long-range attacks (mitigated by weak subjectivity / checkpoints)
- Validator liveness failures

---

### 5.3 Delegated Proof of Stake (DPoS)

**ID:** `dpos`

#### Core mechanism

Token holders elect a **fixed set of delegates** (block producers). Delegates rotate block production in round-robin. Throughput increases because consensus involves tens of nodes, not thousands.

#### How it works

1. Users stake and vote for delegate candidates.
2. Top delegates become active producers for an epoch.
3. Delegates produce blocks on a schedule.
4. Misbehaving delegates can be voted out.

#### Trilemma profile

| Pillar | Score | Notes |
|--------|-------|-------|
| Scalability | 8/10 | Sub-second blocks; high claimed TPS |
| Security | 5/10 | Small set easier to collude |
| Decentralisation | 3/10 | Typically 21–101 producers |

#### Deployed networks

| Network | Symbol | Layer | Why DPoS |
|---------|--------|-------|----------|
| EOS | EOS | L1 | Low-latency dApp platform |
| TRON | TRX | L1 | High throughput content/payments |
| Lisk | LSK | L1 | JS/TS sidechains with delegate mainchain |

#### Smart contract languages

| Network | Languages |
|---------|-----------|
| EOS | C++ (EOSIO/WASM) |
| TRON | Solidity (TVM) |
| Lisk | TypeScript/JavaScript |

---

### 5.4 Proof of Authority (PoA)

**ID:** `poa`

#### Core mechanism

A whitelist of **known validators** (authorities) rotate block signing. Participation is permissioned. Validators stake their **reputation and identity**, not anonymous hash power or open stake.

#### How it works

1. Operators approve validator identities.
2. Validators produce blocks in rotation.
3. Blocks must carry valid authority signatures.
4. Governance adds or removes authorities.

#### Trilemma profile

| Pillar | Score | Notes |
|--------|-------|-------|
| Scalability | 7/10 | Fast blocks; high TPS in consortium settings |
| Security | 4/10 | Trusts known parties; not adversarial-open |
| Decentralisation | 2/10 | Permissioned by design |

#### Deployed networks

| Network | Symbol | Layer | Why PoA |
|---------|--------|-------|---------|
| Polygon PoA (legacy) | MATIC | L1 | Fast EVM test/development environments |
| VeChain | VET | L1 | Enterprise supply-chain with authority masternodes |
| Gnosis Chain | GNO | L1 | Community payment chain (formerly xDai) |

#### Smart contract languages

All listed networks support **Solidity** on EVM-compatible execution environments.

---

### 5.5 Practical Byzantine Fault Tolerance (pBFT)

**ID:** `pbft`

#### Core mechanism

Known replicas run a three-phase protocol: **pre-prepare → prepare → commit**. Agreement is reached if fewer than one-third of nodes are Byzantine faulty. Blocks are **immediately final** after commit quorum.

#### How it works

1. Primary proposes a block (pre-prepare).
2. Replicas broadcast prepare messages.
3. On prepare quorum, replicas send commit.
4. Block is final after commit quorum.

#### Trilemma profile

| Pillar | Score | Notes |
|--------|-------|-------|
| Scalability | 4/10 | O(n²) messages; ~tens of validators |
| Security | 7/10 | Proven BFT bounds |
| Decentralisation | 3/10 | Permissioned membership |

#### Deployed networks

| Network | Symbol | Layer | Why pBFT/BFT |
|---------|--------|-------|--------------|
| Hyperledger Fabric | N/A | L1 | Enterprise instant finality |
| Zilliqa | ZIL | L1 | BFT within sharded committees |

#### Smart contract languages

| Network | Languages |
|---------|-----------|
| Hyperledger Fabric | Go, JavaScript (chaincode) |
| Zilliqa | Scilla, Solidity (EVM layer) |

---

### 5.6 Proof of History + Proof of Stake

**ID:** `poh`

#### Core mechanism

**Proof of History (PoH)** generates a verifiable sequence of SHA-256 hashes acting as a cryptographic clock. **Proof of Stake** validators vote on block order using PoH as a time reference. **Tower BFT** adds progressive finality with slashing.

PoH does not alone secure the network; it is an ordering optimisation combined with PoS.

#### How it works

1. Leader generates continuous PoH hash chain.
2. Transactions are inserted into the PoH stream.
3. Validators vote on forks referencing PoH order.
4. Tower BFT locks votes over time.

#### Trilemma profile

| Pillar | Score | Notes |
|--------|-------|-------|
| Scalability | 9/10 | ~400 ms slots; ~2,000–4,000 TPS |
| Security | 6/10 | PoS slashing; operational history matters |
| Decentralisation | 4/10 | High hardware requirements |

#### Deployed networks

| Network | Symbol | Layer | Why PoH+PoS |
|---------|--------|-------|-------------|
| Solana | SOL | L1 | Single-chain web-scale throughput |

#### Smart contract languages

| Network | Languages | Notes |
|---------|-----------|-------|
| Solana | Rust, C, Anchor | Compiled to BPF; suited to parallel execution |

---

### 5.7 Tendermint BFT (CometBFT)

**ID:** `tendermint`

#### Core mechanism

Validators run rounds of **prevote** and **precommit**. When >⅔ of stake precommits, the block is **instantly final**. Application logic is decoupled via ABCI/Cosmos SDK. CometBFT is the maintained successor to Tendermint Core.

#### How it works

1. Proposer selected by stake-weight for each height.
2. Validators prevote on valid proposals.
3. Prevote quorum triggers precommit phase.
4. >⅔ precommit finalises block; no reorgs under honest majority.

#### Trilemma profile

| Pillar | Score | Notes |
|--------|-------|-------|
| Scalability | 5/10 | ~6 s blocks; ~200–400 TPS |
| Security | 8/10 | BFT + slashing |
| Decentralisation | 5/10 | Open staking; capped validator set |

#### Deployed networks

| Network | Symbol | Layer | Why Tendermint |
|---------|--------|-------|--------------|
| Cosmos Hub | ATOM | L1 | Sovereign chains + IBC interoperability |
| Osmosis | OSMO | L1 | IBC-native DEX |

#### Smart contract languages

| Network | Languages |
|---------|-----------|
| Cosmos Hub | CosmWasm (Rust), Go modules |
| Osmosis | CosmWasm (Rust) |

---

### 5.8 Avalanche Consensus

**ID:** `avalanche`

#### Core mechanism

Validators **repeatedly subsample** random peers and adopt the majority preference. Over rounds, the network converges to one outcome (**metastable consensus**) with low message complexity compared to classical BFT.

#### How it works

1. Transaction broadcast to validators.
2. Each validator queries random subset for preference.
3. Supermajority alignment updates local preference.
4. Confidence accumulates until reversal is statistically infeasible.

#### Trilemma profile

| Pillar | Score | Notes |
|--------|-------|-------|
| Scalability | 8/10 | ~2 s blocks; high claimed TPS on C-Chain |
| Security | 7/10 | Requires honest supermajority of stake |
| Decentralisation | 5/10 | Varies by subnet |

#### Deployed networks

| Network | Symbol | Layer | Why Avalanche |
|---------|--------|-------|---------------|
| Avalanche C-Chain | AVAX | L1 | EVM + metastable consensus |
| Avalanche X-Chain | AVAX | L1 | DAG payments (no smart contracts) |

#### Smart contract languages

| Network | Languages |
|---------|-----------|
| C-Chain | Solidity |
| X-Chain | None (asset transfers only) |

---

### 5.9 Nominated Proof of Stake (NPoS)

**ID:** `npos`

#### Core mechanism

Token holders **nominate** validators. The **Phragmén election** selects an active set maximising stake coverage and diversity. Block production uses **BABE**; finality uses **GRANDPA** on Polkadot/Kusama relay chains.

#### How it works

1. Nominators bond tokens and pick up to 16 validators.
2. Election algorithm selects active validator set each era.
3. Validators produce blocks (BABE) and finalise (GRANDPA).
4. Rewards and slashing split between validators and nominators.

#### Trilemma profile

| Pillar | Score | Notes |
|--------|-------|-------|
| Scalability | 4/10 | Relay chain moderate; parachains parallelise |
| Security | 8/10 | Shared security + GRANDPA finality |
| Decentralisation | 7/10 | Phragmén spreads nominations |

#### Deployed networks

| Network | Symbol | Layer | Why NPoS |
|---------|--------|-------|----------|
| Polkadot | DOT | L1 | Multichain shared security |
| Kusama | KSM | L1 | Canary network for Polkadot upgrades |

#### Smart contract languages

| Network | Languages |
|---------|-----------|
| Polkadot parachains | Rust (ink!), Solidity (EVM parachains) |
| Kusama | Rust (ink!) |

---

### 5.10 Liquid Proof of Stake (LPoS)

**ID:** `lpos`

#### Core mechanism

Any token holder may **delegate freely to any baker** (validator) without a fixed delegate list (contrast DPoS). Bakers post a security deposit (roll). On-chain governance amends the protocol.

#### How it works

1. Users delegate XTZ to bakers (liquid, not locked from governance).
2. Bakers hold required roll deposit.
3. Protocol assigns block rights by stake weight.
4. Governance votes on upgrades; double baking is penalised.

#### Trilemma profile

| Pillar | Score | Notes |
|--------|-------|-------|
| Scalability | 4/10 | ~30 s blocks; ~40 TPS |
| Security | 7/10 | Stake-at-risk; open delegation |
| Decentralisation | 6/10 | Flexible delegation; roll barrier |

#### Deployed networks

| Network | Symbol | Layer | Why LPoS |
|---------|--------|-------|----------|
| Tezos | XTZ | L1 | Self-amending chain with flexible delegation |

#### Smart contract languages

| Network | Languages |
|---------|-----------|
| Tezos | Michelson, SmartPy, Ligo, Archetype |

---

## 6. Summary Comparison Table

| Algorithm | ID | Block time | Approx. TPS | Scalability | Security | Decentralisation |
|-----------|-----|------------|-------------|-------------|----------|------------------|
| Proof of Work | pow | ~10 min | ~7 | 2 | 9 | 8 |
| Proof of Stake | pos | ~12 s | ~15–30 | 5 | 8 | 6 |
| DPoS | dpos | ~0.5 s | ~1,000+ | 8 | 5 | 3 |
| PoA | poa | ~2–5 s | ~100–1,000 | 7 | 4 | 2 |
| pBFT | pbft | ~1–5 s | ~1,000+ | 4 | 7 | 3 |
| PoH + PoS | poh | ~400 ms | ~2,000–4,000 | 9 | 6 | 4 |
| Tendermint | tendermint | ~6 s | ~200–400 | 5 | 8 | 5 |
| Avalanche | avalanche | ~2 s | ~4,500+ | 8 | 7 | 5 |
| NPoS | npos | ~6 s | ~1,000* | 4 | 8 | 7 |
| LPoS | lpos | ~30 s | ~40 | 4 | 7 | 6 |

\*Polkadot relay chain; parachains add parallel throughput.

---

## 7. Glossary

| Term | Definition |
|------|------------|
| **51% attack** | Adversary controls majority of mining power or stake to rewrite blocks |
| **Sybil attack** | Creating many pseudonymous identities to gain undue influence |
| **Finality** | Point after which a block cannot be reverted under protocol rules |
| **Slashing** | Confiscating staked tokens for provable validator misbehaviour |
| **Nakamoto coefficient** | Smallest number of entities needed for 51% control |
| **Rollup (L2)** | Executes transactions off L1, posts proofs or data back for settlement |
| **BFT** | Byzantine Fault Tolerance: agreement despite malicious minority |
| **Weak subjectivity** | New nodes must trust a recent checkpoint in PoS to avoid long-range attacks |
| **IBC** | Inter-Blockchain Communication protocol used in Cosmos ecosystem |
| **GRANDPA** | Polkadot finality gadget providing batch finality |
| **Phragmén election** | Algorithm selecting validators to maximise stake coverage in NPoS |

---

*Document version: 1.0. Aligned with the Comparative Explorer application data.*

# Consensus Algorithms in Blockchain - Team Study Notes

Use this file to quickly understand the concepts before presentation/viva.
It is written for 3 teammates to read and revise, not as a formal report.

---

## 1) Assignment in Simple Words

Your professor asked for one interactive web page that explains and compares consensus algorithms in blockchain.

The page must show:

1. What each algorithm is and how it works step by step.
2. How each one balances the blockchain trilemma:
   - Scalability
   - Security
   - Decentralisation
3. Which real blockchains/cryptocurrencies use each algorithm.
4. Which smart contract languages those blockchains use.
5. Whether those blockchains are Layer 1 or Layer 2.
6. A compatibility matrix showing same-consensus vs different-consensus pairs.
7. Interactivity: selecting/filtering algorithm updates all sections.

---

## 2) Core Concept: What Is Consensus?

Consensus is the rulebook that helps distributed nodes agree on:

- which transactions are valid,
- in what order they are added,
- and what the current blockchain state is.

Without consensus, every node could keep a different version of history.

---

## 3) Blockchain Trilemma (Most Important Theory)

### Scalability
- How fast a chain processes transactions.
- Common metrics: block time and TPS.

### Security
- How hard it is to attack the chain.
- Common threats: 51% attacks, Sybil attacks, double-spend attempts.

### Decentralisation
- How open participation is.
- More independent validators/miners usually means better decentralisation.

### Key point for viva
No major blockchain maximizes all 3 perfectly at the same time.
Every consensus model is a trade-off.

---

## 4) Quick Understanding of Major Consensus Types

### 4.1 Proof of Work (PoW)
- Miners solve computational puzzles.
- Strong security from real-world cost (hardware + electricity).
- Usually slower and energy-heavy.
- Example networks: Bitcoin, Litecoin, Dogecoin.

### 4.2 Proof of Stake (PoS)
- Validators lock stake and are selected to propose/validate blocks.
- Lower energy use than PoW.
- Security comes from economic penalties (slashing).
- Example networks: Ethereum, Cardano.

### 4.3 Delegated Proof of Stake (DPoS)
- Token holders elect delegates/block producers.
- Fast and high throughput.
- Lower decentralisation due to smaller validator set.
- Example networks: EOS, TRON.

### 4.4 Proof of Authority (PoA)
- Known, approved validators produce blocks.
- Very fast in permissioned/consortium settings.
- Lower decentralisation and trust assumptions.
- Example: enterprise-style networks and authority-based chains.

### 4.5 pBFT / BFT-style
- Validators exchange multiple vote rounds to finalize blocks.
- Strong finality and good for known participants.
- Communication overhead grows with validator count.
- Example: Hyperledger-style deployments, BFT-based L1 variants.

### 4.6 PoH + PoS (Solana-style)
- PoH provides ordering/time reference.
- PoS validators secure consensus.
- Very high speed focus, but operational complexity.

### 4.7 Tendermint BFT
- Stake-based BFT finality with validator voting rounds.
- Common in Cosmos ecosystem.
- Good finality and interoperability focus.

### 4.8 Avalanche family
- Repeated random subsampling among validators.
- Fast convergence and high throughput claims.

### 4.9 NPoS (Polkadot-style)
- Nominators back validators.
- Election mechanism aims for better validator distribution.

### 4.10 LPoS (Tezos-style)
- Flexible delegation model.
- Governance and validator participation balanced differently than DPoS.

---

## 5) Layer 1 vs Layer 2 (Must Be Clear)

### Layer 1 (L1)
- Base blockchain with its own consensus.
- Handles final settlement directly.
- Examples: Bitcoin, Ethereum, Solana.

### Layer 2 (L2)
- Built on top of L1 for scaling.
- Usually inherits L1 security/finality model.
- Examples: Arbitrum, Optimism (on Ethereum).

Important:
L2 often does not run completely independent consensus in the same way as L1.

---

## 6) Smart Contract Languages and Why They Matter

Consensus and execution environment are linked in blockchain design.

Common examples:

- Ethereum (PoS): Solidity, Vyper
- Solana (PoH + PoS): Rust
- Cosmos ecosystem (Tendermint stack): CosmWasm (Rust)
- Polkadot ecosystem (NPoS context): Rust/ink!, EVM-parachains may use Solidity
- Tezos (LPoS): Michelson-family tooling

Viva line:
“We mapped language support per blockchain to show practical developer ecosystems, not just protocol theory.”

---

## 7) Compatibility Matrix - How to Explain

In our website:

- **Compatible** = both chains use the same consensus family.
- **Incompatible** = different consensus families.

Example:

- Ethereum vs Cardano -> compatible (both PoS family)
- Bitcoin vs Solana -> incompatible (PoW vs PoH+PoS)

Clarification for viva:
This is consensus-level compatibility, not automatic token bridging.

---

## 8) What To Remember During Demo

1. Start with one algorithm (for example PoW).
2. Show that all sections update when algorithm changes.
3. Switch to PoS and compare differences quickly:
   - trilemma profile,
   - real-world networks,
   - languages,
   - layer entries.
4. End on compatibility matrix with one compatible and one incompatible pair.

---

## 9) Likely Viva Questions (Very Short Answers)

### What is consensus?
A distributed agreement mechanism for transaction validity, order, and state.

### Why are there many consensus algorithms?
Different blockchains optimize different priorities in trilemma trade-offs.

### PoW vs PoS in one line?
PoW = security via computational work; PoS = security via economic stake.

### What is a 51% attack?
Majority control of mining/stake can enable censorship or chain reorganization.

### What is a Sybil attack?
Creating many fake nodes/identities to gain influence; mitigated by cost/permission rules.

### L1 vs L2?
L1 is base consensus chain; L2 scales on top and usually inherits L1 security.

### Compatibility matrix meaning?
Same or different consensus family at protocol level.

---

## 10) 3-Person Revision Split (15-20 min prep)

### Member 1 studies:
- Sections 1, 2, 3, 4.1-4.4

### Member 2 studies:
- Sections 4.5-4.10, 5, 6

### Member 3 studies:
- Sections 7, 8, 9

Then each member teaches their part in 2 minutes to the other two.
If everyone can explain all 10 viva answers, team is ready.


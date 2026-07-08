# UI Guide - What Is What in Our Website

This guide explains the website layout and what each section means.
To keep it simple, it uses **one algorithm example: Proof of Stake (PoS)**.

---

## 1) Top Header Area

- **Title:** `Consensus Algorithms in Blockchain`
- **Docs button (top-right):** Opens `/docs`, where team notes and deep analysis are available.

Purpose:
The header tells users what the site is about and gives a quick path to study material.

---

## 2) Algorithm Selector (Left on Desktop, Top on Mobile)

This is the main control of the website.

What it does:
- You click an algorithm (for example `PoS`, `PoW`, `DPoS`).
- The entire page updates to that selected algorithm.

Example with PoS:
- If you click `PoS`, every section below now shows PoS data, PoS blockchains, and PoS-related details.

---

## 3) Section Navigation Bar (Sticky Horizontal Menu)

This bar has quick-jump buttons like:
- Overview
- Trilemma
- Blockchains
- Smart Contracts
- Layer Model
- Compatibility

What it does:
- Clicking an item scrolls directly to that section.
- It improves demo flow during presentation.

---

## 4) Algorithm Overview Panel

This is the first content section.

What you see:
- Algorithm name and short name (for example Proof of Stake / PoS)
- Core mechanism explanation in plain language
- Step-by-step flow of how it works
- Strengths, limitations, and security considerations

PoS example:
- Shows validators staking tokens.
- Shows proposer/attester selection and slashing concept.

---

## 5) Blockchain Trilemma Panel

This section explains the trade-off between:
- Scalability
- Security
- Decentralisation

What you see:
- A radar chart (visual profile)
- Three score cards with:
  - score out of 10
  - short explanation
  - practical metrics like block time and TPS

PoS example:
- Moderate-to-high balance across all three dimensions compared to PoW/DPoS extremes.

---

## 6) Real-World Blockchain Mapping Panel

This maps the selected consensus to actual blockchains and cryptocurrencies.

What you see:
- Cards containing chain name and symbol
- Layer badge (`L1` or `L2`)
- Short “why this chain uses this algorithm” note

PoS example:
- Ethereum, Cardano, and PoS-linked ecosystems are shown with rationale.

---

## 7) Smart Contract Language Support Panel

This section connects blockchain consensus to developer ecosystem languages.

What you see:
- A table with blockchain names
- Language tags (for example Solidity, Vyper)
- A note explaining why that language-consensus combination is common

PoS example:
- Ethereum row highlights Solidity/Vyper on a PoS-secured chain.

---

## 8) Layer Classification Panel

This section explains Layer 1 vs Layer 2 clearly.

What you see:
- Definition boxes for L1 and L2
- Network list grouped by layer for the selected algorithm

PoS example:
- L1 chains like Ethereum/Cardano and L2 rollup entries tied to PoS settlement.

---

## 9) Compatibility Matrix Panel

This is an interactive compatibility grid for chains.

What you see:
- Green/compatible cells for same consensus family
- Red/incompatible cells for different consensus families
- Symbol labels and hover/focus hints

How to explain in demo:
- “Compatible here means same consensus family, not automatic token bridging.”

PoS example:
- Ethereum and Cardano appear compatible because both are in the PoS family.

---

## 10) Footer

Shows a reminder that TPS and trilemma scores are approximate educational values.

Purpose:
- Clarifies that data is comparative and learning-oriented.

---

## 11) One Full User Flow (Using PoS)

1. Open home page.
2. Select `PoS` in algorithm selector.
3. Read Overview for mechanism and steps.
4. Check Trilemma radar + score cards.
5. See PoS blockchains in mapping panel.
6. Review smart contract languages.
7. Confirm L1/L2 classification.
8. Open compatibility matrix and test PoS chain pairs.

If a user understands this flow for one algorithm, they understand the full UI design.


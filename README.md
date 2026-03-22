# StellarVault

> **Passive Yield, Active Strategy** — A decentralized, non-custodial yield aggregator built on Soroban.

StellarVault automates yield optimization on the Stellar network. Users deposit a single base asset (e.g., USDC) and receive Vault Shares in return. Behind the scenes, the Vault's Strategy Contract continuously moves pooled capital into top-tier Stellar protocols — like Blend and Soroswap — to harvest interest and rewards, then auto-compounds them back into the pool.

No manual fund management. No missed opportunities. Just growing shares.

---

## How It Works

In traditional DeFi, users must manually move funds between lending protocols and AMMs to chase the best return. StellarVault automates this entire process:

1. **Deposit** a base asset (e.g., USDC) into the Vault
2. **Receive** Vault Shares representing your proportional ownership
3. **The Strategy Contract** deploys pooled capital across Stellar protocols
4. **Harvested rewards** are swapped back to the base asset and reinvested
5. **Your shares grow** in value automatically over time

---

## Key Features

**SEP-0056 Compliance**
Fully interoperable with any dashboard or wallet that supports the Stellar Vault standard, modeled after the battle-tested ERC-4626 architecture.

**Auto-Compounding**
Profits are automatically swapped back into the base asset and reinvested, continuously growing the value of your shares without any manual action.

**Gas Efficiency**
By pooling user funds, the high-frequency "harvest" operations are socialized across all depositors — dramatically reducing the cost each individual would bear alone.

**Security-First Design**
Built-in protections include Deposit Limits, Slippage Protection, and an Emergency Shutdown (Panic Button) to safeguard funds in adverse conditions.

---

## Repository Structure

This project uses a monorepo to coordinate the full-stack DeFi experience.

| Directory | Role | Description |
|---|---|---|
| `/contracts` | The Brain | Core Vault (accounting) and Strategy (execution) smart contracts written in Rust |
| `/frontend` | The Face | A Next.js dashboard for tracking APY, depositing assets, and viewing share growth |
| `/backend` | The Memory | A Node.js indexer that watches ledger events to serve historical performance charts and TVL data |

---

## Getting Started

### Prerequisites

| Tool | Version |
|---|---|
| Rust | v1.84.0+ with `wasm32-unknown-unknown` target |
| Stellar CLI | Latest — for deploying and interacting with Soroban |
| Node.js | v20+ — for frontend and backend services |

### Installation

**1. Clone the repository and install root-level tooling**

```bash
git clone https://github.com/your-username/stellar-vault.git
cd stellar-vault
npm install
```

**2. Build and test the smart contracts**

```bash
cd contracts
cargo test
```

**3. Start the frontend**

```bash
cd frontend
npm run dev
```

---

## License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

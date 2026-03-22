# StellarVault — Smart Contracts

Soroban smart contracts implementing the **SEP-0056** (ERC-4626) vault standard on the Stellar network.

## Contracts

| Contract | Description |
|----------|-------------|
| `vault`  | Core accounting contract. Accepts deposits, mints/burns shares, enforces deposit limits and the emergency pause. |
| `strategy` | Capital deployment contract. Receives pooled funds from the Vault and deploys them into Blend lending and Soroswap to earn yield. Harvested rewards are auto-compounded. |

## Prerequisites

| Tool | Version |
|------|---------|
| Rust | v1.84.0+ |
| wasm32 target | `rustup target add wasm32-unknown-unknown` |
| Stellar CLI | Latest — `cargo install --locked stellar-cli` |

## Build

```bash
# From the /contracts directory
cargo build --target wasm32-unknown-unknown --release
```

## Test

```bash
cargo test
```

## Deploy (Testnet)

```bash
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/stellar_vault.wasm \
  --source <YOUR_SECRET_KEY> \
  --network testnet
```

## Architecture

```
User
 │
 ▼
VaultContract  ──deposit/withdraw──►  StrategyContract
 │                                         │
 │  (share accounting, limits, pause)      │  (Blend lending, Soroswap AMM)
 │                                         │
 └──────── share price grows as strategy harvests & compounds ◄──────────┘
```

## Open Issues

See [GitHub Issues](https://github.com/Stellar-Vault-Org/Stellar-Vault/issues) for tracked work items including Blend integration, withdraw logic, and the emergency pause mechanism.

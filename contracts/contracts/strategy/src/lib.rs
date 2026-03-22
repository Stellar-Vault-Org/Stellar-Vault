#![no_std]

//! Strategy Contract
//!
//! Receives capital from the Vault and deploys it across Stellar DeFi
//! protocols (Blend lending, Soroswap AMM) to generate yield.
//! Harvested rewards are swapped back to the base asset and reported
//! to the Vault so share prices increase automatically.

use soroban_sdk::{contract, contractimpl, contracttype, token, Address, Env, symbol_short, Symbol};

const VAULT: Symbol = symbol_short!("VAULT");
const ASSET: Symbol = symbol_short!("ASSET");
const ADMIN: Symbol = symbol_short!("ADMIN");
const TOT_DEP: Symbol = symbol_short!("TOT_DEP");

#[contracttype]
#[derive(Clone, Debug)]
pub struct StrategyInfo {
    pub total_deposited: i128,
    pub vault: Address,
    pub underlying_asset: Address,
}

#[contract]
pub struct StrategyContract;

#[contractimpl]
impl StrategyContract {
    /// Initialize the strategy. Called once by the deployer.
    pub fn initialize(env: Env, admin: Address, vault: Address, underlying_asset: Address) {
        if env.storage().instance().has(&ADMIN) {
            panic!("already initialized");
        }
        env.storage().instance().set(&ADMIN, &admin);
        env.storage().instance().set(&VAULT, &vault);
        env.storage().instance().set(&ASSET, &underlying_asset);
        env.storage().instance().set(&TOT_DEP, &0_i128);
    }

    /// Called by the Vault to deposit funds into the strategy.
    pub fn deposit(env: Env, amount: i128) {
        // Only the registered vault may call this
        let vault: Address = env.storage().instance().get(&VAULT).unwrap();
        vault.require_auth();

        let current: i128 = env.storage().instance().get(&TOT_DEP).unwrap_or(0);
        env.storage().instance().set(&TOT_DEP, &(current + amount));

        // TODO (Issue #5): Forward funds to Blend lending pool via cross-contract call
        // blend_pool_client.supply(&env.current_contract_address(), &amount);
    }

    /// Called by the Vault to pull funds back for a user withdrawal.
    pub fn withdraw(env: Env, amount: i128) -> i128 {
        let vault: Address = env.storage().instance().get(&VAULT).unwrap();
        vault.require_auth();

        let current: i128 = env.storage().instance().get(&TOT_DEP).unwrap_or(0);
        let actual = amount.min(current);
        env.storage().instance().set(&TOT_DEP, &(current - actual));

        // TODO (Issue #5): Redeem from Blend and transfer back to vault
        let asset: Address = env.storage().instance().get(&ASSET).unwrap();
        let token_client = token::Client::new(&env, &asset);
        token_client.transfer(&env.current_contract_address(), &vault, &actual);

        actual
    }

    /// Harvest rewards, swap them to the base asset, and report new total
    /// to the Vault so share prices are updated (auto-compounding).
    pub fn harvest(env: Env, caller: Address) -> i128 {
        caller.require_auth();
        Self::require_admin(&env, &caller);

        // TODO (Issue #5): Claim Blend rewards → swap via Soroswap → redeposit
        // For now returns 0 until Blend integration is complete.
        0
    }

    /// Total assets currently managed by this strategy.
    pub fn total_assets(env: Env) -> i128 {
        env.storage().instance().get(&TOT_DEP).unwrap_or(0)
    }

    pub fn get_info(env: Env) -> StrategyInfo {
        StrategyInfo {
            total_deposited: env.storage().instance().get(&TOT_DEP).unwrap_or(0),
            vault: env.storage().instance().get(&VAULT).unwrap(),
            underlying_asset: env.storage().instance().get(&ASSET).unwrap(),
        }
    }

    fn require_admin(env: &Env, caller: &Address) {
        let admin: Address = env.storage().instance().get(&ADMIN).unwrap();
        if admin != *caller {
            panic!("unauthorized");
        }
    }
}

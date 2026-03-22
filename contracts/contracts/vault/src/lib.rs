#![no_std]

mod errors;
mod storage;
mod types;

pub mod vault {
    use soroban_sdk::{contract, contractimpl, token, Address, Env, String};

    use crate::errors::VaultError;
    use crate::storage::{
        get_admin, get_deposit_limit, get_is_paused, get_strategy, get_total_shares,
        get_total_assets, get_underlying_asset, set_admin, set_deposit_limit, set_is_paused,
        set_strategy, set_total_assets, set_total_shares, set_underlying_asset,
        get_user_shares, set_user_shares,
    };
    use crate::types::VaultInfo;

    #[contract]
    pub struct VaultContract;

    #[contractimpl]
    impl VaultContract {
        // ---------------------------------------------------------------
        // Admin
        // ---------------------------------------------------------------

        /// Initialize the vault. Can only be called once.
        pub fn initialize(
            env: Env,
            admin: Address,
            underlying_asset: Address,
            strategy: Address,
            deposit_limit: i128,
        ) {
            if get_admin(&env).is_some() {
                panic!("already initialized");
            }
            set_admin(&env, &admin);
            set_underlying_asset(&env, &underlying_asset);
            set_strategy(&env, &strategy);
            set_deposit_limit(&env, deposit_limit);
            set_total_shares(&env, 0);
            set_total_assets(&env, 0);
            set_is_paused(&env, false);
        }

        /// Emergency pause — halts deposits and withdrawals.
        pub fn pause(env: Env, caller: Address) {
            caller.require_auth();
            Self::require_admin(&env, &caller);
            set_is_paused(&env, true);
        }

        /// Resume normal operations after a pause.
        pub fn unpause(env: Env, caller: Address) {
            caller.require_auth();
            Self::require_admin(&env, &caller);
            set_is_paused(&env, false);
        }

        /// Update the deposit cap (in base asset units).
        pub fn set_deposit_limit(env: Env, caller: Address, new_limit: i128) {
            caller.require_auth();
            Self::require_admin(&env, &caller);
            set_deposit_limit(&env, new_limit);
        }

        // ---------------------------------------------------------------
        // SEP-0056 core — Deposit
        // ---------------------------------------------------------------

        /// Deposit `amount` of the underlying asset and receive vault shares.
        /// Returns the number of shares minted.
        pub fn deposit(env: Env, caller: Address, amount: i128) -> Result<i128, VaultError> {
            caller.require_auth();
            Self::require_not_paused(&env)?;

            if amount <= 0 {
                return Err(VaultError::InvalidAmount);
            }

            let deposit_limit = get_deposit_limit(&env);
            let total_assets = get_total_assets(&env);
            if total_assets + amount > deposit_limit {
                return Err(VaultError::DepositLimitExceeded);
            }

            // Pull tokens from caller into this contract
            let asset = get_underlying_asset(&env).unwrap();
            let token_client = token::Client::new(&env, &asset);
            token_client.transfer(&caller, &env.current_contract_address(), &amount);

            // Calculate shares to mint (ERC-4626 style)
            let shares = Self::convert_to_shares(&env, amount);

            // Update state
            let new_total_assets = total_assets + amount;
            let new_total_shares = get_total_shares(&env) + shares;
            set_total_assets(&env, new_total_assets);
            set_total_shares(&env, new_total_shares);

            let user_shares = get_user_shares(&env, &caller) + shares;
            set_user_shares(&env, &caller, user_shares);

            // Forward assets to strategy for yield deployment
            let strategy = get_strategy(&env).unwrap();
            token_client.transfer(&env.current_contract_address(), &strategy, &amount);

            Ok(shares)
        }

        // ---------------------------------------------------------------
        // SEP-0056 core — Withdraw
        // ---------------------------------------------------------------

        /// Burn `shares` and receive the proportional amount of underlying asset.
        /// Returns the amount of underlying asset returned to the caller.
        pub fn withdraw(env: Env, caller: Address, shares: i128) -> Result<i128, VaultError> {
            caller.require_auth();
            Self::require_not_paused(&env)?;

            if shares <= 0 {
                return Err(VaultError::InvalidAmount);
            }

            let user_shares = get_user_shares(&env, &caller);
            if shares > user_shares {
                return Err(VaultError::InsufficientShares);
            }

            // Calculate assets to return
            let assets = Self::convert_to_assets(&env, shares);

            // Update state — burn shares first (checks-effects-interactions)
            let new_user_shares = user_shares - shares;
            set_user_shares(&env, &caller, new_user_shares);
            set_total_shares(&env, get_total_shares(&env) - shares);
            set_total_assets(&env, get_total_assets(&env) - assets);

            // Withdraw from strategy back to vault, then to user
            // (Strategy withdrawal call would go here in production)
            let asset = get_underlying_asset(&env).unwrap();
            let token_client = token::Client::new(&env, &asset);
            token_client.transfer(&env.current_contract_address(), &caller, &assets);

            Ok(assets)
        }

        // ---------------------------------------------------------------
        // View helpers (SEP-0056)
        // ---------------------------------------------------------------

        pub fn total_assets(env: Env) -> i128 {
            get_total_assets(&env)
        }

        pub fn total_shares(env: Env) -> i128 {
            get_total_shares(&env)
        }

        pub fn convert_to_shares(env: &Env, assets: i128) -> i128 {
            let total_shares = get_total_shares(env);
            let total_assets = get_total_assets(env);
            if total_shares == 0 || total_assets == 0 {
                assets // 1:1 at initialisation
            } else {
                assets * total_shares / total_assets
            }
        }

        pub fn convert_to_assets(env: &Env, shares: i128) -> i128 {
            let total_shares = get_total_shares(env);
            let total_assets = get_total_assets(env);
            if total_shares == 0 {
                shares
            } else {
                shares * total_assets / total_shares
            }
        }

        pub fn get_info(env: Env) -> VaultInfo {
            VaultInfo {
                total_assets: get_total_assets(&env),
                total_shares: get_total_shares(&env),
                deposit_limit: get_deposit_limit(&env),
                is_paused: get_is_paused(&env),
            }
        }

        pub fn balance_of(env: Env, user: Address) -> i128 {
            get_user_shares(&env, &user)
        }

        // ---------------------------------------------------------------
        // Private helpers
        // ---------------------------------------------------------------

        fn require_admin(env: &Env, caller: &Address) {
            let admin = get_admin(env).expect("not initialized");
            if admin != *caller {
                panic!("unauthorized");
            }
        }

        fn require_not_paused(env: &Env) -> Result<(), VaultError> {
            if get_is_paused(env) {
                Err(VaultError::VaultPaused)
            } else {
                Ok(())
            }
        }
    }
}

#![no_std]
use soroban_sdk::{Address, Env, Symbol, symbol_short};

const ADMIN: Symbol = symbol_short!("ADMIN");
const ASSET: Symbol = symbol_short!("ASSET");
const STRATEGY: Symbol = symbol_short!("STRATEGY");
const TOT_SHARES: Symbol = symbol_short!("TOT_SH");
const TOT_ASSETS: Symbol = symbol_short!("TOT_AS");
const DEP_LIMIT: Symbol = symbol_short!("DEP_LIM");
const IS_PAUSED: Symbol = symbol_short!("PAUSED");

pub fn get_admin(env: &Env) -> Option<Address> {
    env.storage().instance().get(&ADMIN)
}
pub fn set_admin(env: &Env, admin: &Address) {
    env.storage().instance().set(&ADMIN, admin);
}

pub fn get_underlying_asset(env: &Env) -> Option<Address> {
    env.storage().instance().get(&ASSET)
}
pub fn set_underlying_asset(env: &Env, asset: &Address) {
    env.storage().instance().set(&ASSET, asset);
}

pub fn get_strategy(env: &Env) -> Option<Address> {
    env.storage().instance().get(&STRATEGY)
}
pub fn set_strategy(env: &Env, strategy: &Address) {
    env.storage().instance().set(&STRATEGY, strategy);
}

pub fn get_total_shares(env: &Env) -> i128 {
    env.storage().instance().get(&TOT_SHARES).unwrap_or(0)
}
pub fn set_total_shares(env: &Env, val: i128) {
    env.storage().instance().set(&TOT_SHARES, &val);
}

pub fn get_total_assets(env: &Env) -> i128 {
    env.storage().instance().get(&TOT_ASSETS).unwrap_or(0)
}
pub fn set_total_assets(env: &Env, val: i128) {
    env.storage().instance().set(&TOT_ASSETS, &val);
}

pub fn get_deposit_limit(env: &Env) -> i128 {
    env.storage().instance().get(&DEP_LIMIT).unwrap_or(i128::MAX)
}
pub fn set_deposit_limit(env: &Env, val: i128) {
    env.storage().instance().set(&DEP_LIMIT, &val);
}

pub fn get_is_paused(env: &Env) -> bool {
    env.storage().instance().get(&IS_PAUSED).unwrap_or(false)
}
pub fn set_is_paused(env: &Env, val: bool) {
    env.storage().instance().set(&IS_PAUSED, &val);
}

pub fn get_user_shares(env: &Env, user: &Address) -> i128 {
    env.storage().persistent().get(user).unwrap_or(0)
}
pub fn set_user_shares(env: &Env, user: &Address, shares: i128) {
    env.storage().persistent().set(user, &shares);
}

#![no_std]
use soroban_sdk::contracttype;

#[contracttype]
#[derive(Clone, Debug)]
pub struct VaultInfo {
    pub total_assets: i128,
    pub total_shares: i128,
    pub deposit_limit: i128,
    pub is_paused: bool,
}

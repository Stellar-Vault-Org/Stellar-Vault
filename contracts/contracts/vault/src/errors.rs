#![no_std]
use soroban_sdk::contracterror;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum VaultError {
    /// Deposit or withdrawal amount must be greater than zero.
    InvalidAmount = 1,
    /// Deposit would exceed the vault's deposit limit.
    DepositLimitExceeded = 2,
    /// Caller does not have enough shares to withdraw.
    InsufficientShares = 3,
    /// The vault is paused — all mutations are blocked.
    VaultPaused = 4,
    /// Slippage tolerance exceeded during strategy interaction.
    SlippageExceeded = 5,
}

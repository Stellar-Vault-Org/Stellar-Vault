#![cfg(test)]

use soroban_sdk::{
    testutils::{Address as _, AuthorizedFunction, AuthorizedInvocation},
    Address, Env, IntoVal,
};

use crate::vault::{VaultContract, VaultContractClient};

fn create_vault<'a>(env: &Env) -> (VaultContractClient<'a>, Address, Address, Address) {
    let contract_id = env.register_contract(None, VaultContract);
    let client = VaultContractClient::new(env, &contract_id);

    let admin = Address::generate(env);
    let asset = Address::generate(env);
    let strategy = Address::generate(env);

    client.initialize(&admin, &asset, &strategy, &1_000_000_000_i128);

    (client, admin, asset, strategy)
}

#[test]
fn test_initialize() {
    let env = Env::default();
    let (client, _admin, _asset, _strategy) = create_vault(&env);
    let info = client.get_info();
    assert_eq!(info.total_assets, 0);
    assert_eq!(info.total_shares, 0);
    assert!(!info.is_paused);
}

#[test]
fn test_pause_and_unpause() {
    let env = Env::default();
    env.mock_all_auths();
    let (client, admin, _asset, _strategy) = create_vault(&env);

    client.pause(&admin);
    assert!(client.get_info().is_paused);

    client.unpause(&admin);
    assert!(!client.get_info().is_paused);
}

#[test]
#[should_panic(expected = "unauthorized")]
fn test_pause_non_admin_fails() {
    let env = Env::default();
    env.mock_all_auths();
    let (client, _admin, _asset, _strategy) = create_vault(&env);
    let rando = Address::generate(&env);
    client.pause(&rando);
}

#[test]
fn test_share_conversion_initial() {
    let env = Env::default();
    let (client, _, _, _) = create_vault(&env);
    // With no deposits yet, shares == assets (1:1)
    assert_eq!(client.convert_to_shares(&1000_i128), 1000);
    assert_eq!(client.convert_to_assets(&1000_i128), 1000);
}

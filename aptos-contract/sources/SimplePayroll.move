module simple_salary_addr::simplepayroll{
    use std::signer;
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::aptos_coin::{Self,AptosCoin};
    use aptos_std::table::{Self, Table};
    use aptos_framework::event::{Self, EventHandle};
    use aptos_framework::account;
    use aptos_framework::timestamp;
    use std::string::{String, utf8};
    use std::vector;
    use std::debug;

    use aptos_std::crypto_algebra::{Element, from_u64, multi_scalar_mul, eq, multi_pairing, upcast, pairing, add, zero, deserialize};
    use aptos_std::bls12381_algebra::{Fr, FormatFrLsb, FormatG1Compr, FormatG2Compr, FormatFq12LscLsb, G1, G2, Gt, Fq12, FormatGt};

    use simple_salary_addr::Verifier;

    /// Errors
    const E_NOT_INITIALIZED: u64 = 1;
    const E_ALREADY_INITIALIZED: u64 = 2;
    const E_NOT_ORGANIZATION: u64 = 3;
    const E_NOT_ENOUGH_BALANCE: u64 = 4;
    const E_EMPLOYEE_NOT_FOUND: u64 = 5;
    const E_ORGANIZATION_NOT_FOUND: u64 = 6;

    struct Organization has key, store {
        org_address: address,
        org_name: String,
        org_treasury: Coin<AptosCoin>,
        employees: vector<address>,
    }

    struct Employee has store, drop, copy {
        employee_account: address,
        employee_commitment: String,
        company_account: address,
        daily_salary: u64,
        last_payed: u64,
    }

    struct PayrollStorage has key {
        organizations: Table<address, Organization>,
        employees: Table<address, Employee>,
        org_added_event: EventHandle<OrganizationAddedEvent>,
        treasury_funded_event: EventHandle<TreasuryFundedEvent>,
        empl_added_event: EventHandle<EmployeeAddedEvent>,
        empl_verified_event: EventHandle<EmployeeVerifiedEvent>,
        payout_made_event: EventHandle<PayoutMadeEvent>,
    }

    //#[event]
    struct OrganizationAddedEvent has drop, store {
        org_address: address,
        org_name: String,
        timestamp: u64,
    }

    //#[event]
    struct TreasuryFundedEvent has drop, store {
        org_address: address,
        amount: u64,
        timestamp: u64
    }

    //#[event]
    struct EmployeeAddedEvent has drop, store {
        employee_account: address,
        employee_commitment: String,
        company_account: address,
        daily_salary: u64,
        last_payed: u64,
        timestamp: u64
    }

    //#[event]
    struct EmployeeVerifiedEvent has drop, store {
        employee_account: address,
        timestamp:u64
    }


   // #[event]
    struct PayoutMadeEvent has drop, store {
        employee_account: address,
        amount: u64,
        timestamp: u64
    }

    public entry fun initialize(account: &signer) {
        let account_addr = signer::address_of(account);
        assert!(!exists<PayrollStorage>(account_addr), E_ALREADY_INITIALIZED);
        
        move_to(account, PayrollStorage {
            organizations: table::new(),
            employees: table::new(),
            org_added_event: account::new_event_handle<OrganizationAddedEvent>(account),
            treasury_funded_event: account::new_event_handle<TreasuryFundedEvent>(account),
            empl_added_event: account::new_event_handle<EmployeeAddedEvent>(account),
            empl_verified_event: account::new_event_handle<EmployeeVerifiedEvent>(account),
            payout_made_event: account::new_event_handle<PayoutMadeEvent>(account),
        });
    }

    public entry fun add_organization(org_address: &signer,owner: address, org_name: String) acquires PayrollStorage {
        let account_addr = signer::address_of(org_address);
        let storage = borrow_global_mut<PayrollStorage>(owner);
        
        let organization = Organization {
            org_address: account_addr,
            org_name: org_name,
            org_treasury: coin::zero<AptosCoin>(),
            employees: vector::empty<address>(),
        };
        table::add(&mut storage.organizations, account_addr, organization);

        let event = OrganizationAddedEvent{
            org_address: account_addr,
            org_name: org_name,
            timestamp: timestamp::now_seconds()
        };
        event::emit_event<OrganizationAddedEvent>(
                &mut storage.org_added_event,
                event,
        );
    }

    public entry fun fund_organization_treasury(account: &signer, owner: address, amount: u64) acquires PayrollStorage {
        let account_addr = signer::address_of(account);
        let storage = borrow_global_mut<PayrollStorage>(owner);
        assert!(table::contains(&storage.organizations, account_addr), E_NOT_ORGANIZATION);
        
        let org = table::borrow_mut(&mut storage.organizations, account_addr);
        let coins = coin::withdraw<AptosCoin>(account, amount);
        coin::merge(&mut org.org_treasury, coins);

        let event = TreasuryFundedEvent{
            org_address: account_addr,
            amount: amount,
            timestamp: timestamp::now_seconds()
        };
        event::emit_event<TreasuryFundedEvent>(
                &mut storage.treasury_funded_event,
                event,
        );
    }

     public entry fun add_employee(
        company_account: &signer,
        employee_account: address,
        employee_commitment: String,
        owner: address,
        daily_salary: u64,
    ) acquires PayrollStorage {
        let company_addr = signer::address_of(company_account);
        let storage = borrow_global_mut<PayrollStorage>(owner);
        assert!(table::contains(&storage.organizations,company_addr), E_NOT_ORGANIZATION);
        
        let employee = Employee {
            employee_account: employee_account,
            employee_commitment: employee_commitment,
            company_account: company_addr,
            daily_salary: daily_salary,
            last_payed: timestamp::now_seconds(),
        };
        table::add(&mut storage.employees, employee_account, employee);
        let org = table::borrow_mut(&mut storage.organizations, company_addr);
        vector::push_back(&mut org.employees, employee_account);

        let event = EmployeeAddedEvent{
            employee_account: employee_account,
            company_account: company_addr,
            employee_commitment: employee_commitment,
            daily_salary: daily_salary,
            last_payed: timestamp::now_seconds(),
            timestamp: timestamp::now_seconds()
        };
        event::emit_event<EmployeeAddedEvent>(
                &mut storage.empl_added_event,
                event,
        );
    }

    public entry fun payout(employee_address: address, owner: address) acquires PayrollStorage{
        let storage = borrow_global_mut<PayrollStorage>(owner);
        assert!(table::contains(&storage.employees,employee_address), E_EMPLOYEE_NOT_FOUND);
        let employee = table::borrow_mut(&mut storage.employees, employee_address);
        assert!(table::contains(&storage.organizations,employee.company_account), E_ORGANIZATION_NOT_FOUND);
        let organization = table::borrow_mut(&mut storage.organizations, employee.company_account);
        let days_worked = (timestamp::now_seconds()-employee.last_payed)/(24*60*60);
        let payout_amount=days_worked*employee.daily_salary;
        
        assert!(coin::value(&organization.org_treasury) >= payout_amount, E_NOT_ENOUGH_BALANCE); // Error code 1: Insufficient funds in company treasury
        
        let payment = coin::extract(&mut organization.org_treasury, payout_amount);
        coin::deposit(employee.employee_account, payment);

        employee.last_payed = timestamp::now_seconds();
        

        let event = PayoutMadeEvent {
            employee_account:employee_address,
            amount:payout_amount,
            timestamp: timestamp::now_seconds()
        };

        event::emit_event<PayoutMadeEvent>(
                &mut storage.payout_made_event,
                event,
        );
    }
     public fun verify_proof<G1,G2,Gt,S>(
        vk_alpha_g1: &Element<G1>,
        vk_beta_g2: &Element<G2>,
        vk_gamma_g2: &Element<G2>,
        vk_delta_g2: &Element<G2>,
        vk_uvw_gamma_g1: &vector<Element<G1>>,
        public_inputs: &vector<Element<S>>,
        proof_a: &Element<G1>,
        proof_b: &Element<G2>,
        proof_c: &Element<G1>,
    ): bool {
        let left = pairing<G1,G2,Gt>(proof_a, proof_b);
        let scalars = vector[from_u64<S>(1)];
        std::vector::append(&mut scalars, *public_inputs);
        let right = zero<Gt>();
        let right = add(&right, &pairing<G1,G2,Gt>(vk_alpha_g1, vk_beta_g2));
        let right = add(&right, &pairing(&multi_scalar_mul(vk_uvw_gamma_g1, &scalars), vk_gamma_g2));
        let right = add(&right, &pairing(proof_c, vk_delta_g2));
        debug::print(&left);
        debug::print(&right);
        eq(&left, &right)
    }


    public entry fun verify_employee(
        vk_alpha_g1_in: vector<u8>,
        vk_beta_g2_in: vector<u8>,
        vk_gamma_g2_in: vector<u8>,
        vk_delta_g2_in: vector<u8>,
        vk_uvw_gamma_g1_in: vector<vector<u8>>,
        public_inputs_in: vector<vector<u8>>,
        proof_a_in: vector<u8>,
        proof_b_in: vector<u8>,
        proof_c_in: vector<u8>,
    ) {
        let vk_alpha_g1 = std::option::extract(&mut deserialize<G1, FormatG1Compr>(&vk_alpha_g1_in));
        let vk_beta_g2 = std::option::extract(&mut deserialize<G2, FormatG2Compr>(&vk_beta_g2_in));
        let vk_gamma_g2 = std::option::extract(&mut deserialize<G2, FormatG2Compr>(&vk_gamma_g2_in));
        let vk_delta_g2 = std::option::extract(&mut deserialize<G2, FormatG2Compr>(&vk_delta_g2_in));
        let vk_gamma_abc_g1: vector<Element<G1>> = vector[
            std::option::extract(&mut deserialize<G1, FormatG1Compr>(vector::borrow(&vk_uvw_gamma_g1_in, 0))),
            std::option::extract(&mut deserialize<G1, FormatG1Compr>(vector::borrow(&vk_uvw_gamma_g1_in, 1))),
        ];
        let public_inputs: vector<Element<Fr>> =vector[
            std::option::extract(&mut deserialize<Fr, FormatFrLsb>(vector::borrow(&public_inputs_in, 0))),
        ];
        let proof_a = std::option::extract(&mut deserialize<G1, FormatG1Compr>(&proof_a_in));
        let proof_b = std::option::extract(&mut deserialize<G2, FormatG2Compr>(&proof_b_in));
        let proof_c = std::option::extract(&mut deserialize<G1, FormatG1Compr>(&proof_c_in));

        
        assert!(verify_proof<G1, G2, Gt, Fr>(
            &vk_alpha_g1,
            &vk_beta_g2,
            &vk_gamma_g2,
            &vk_delta_g2,
            &vk_gamma_abc_g1,
            &public_inputs,
            &proof_a,
            &proof_b,
            &proof_c,
        ),1);
    }

    #[view]
    public fun get_organization(org_address: address, owner:address):(address, String, u64) acquires PayrollStorage {
        let storage = borrow_global<PayrollStorage>(owner);
        assert!(table::contains(&storage.organizations, org_address), E_ORGANIZATION_NOT_FOUND);
        let org = table::borrow(&storage.organizations, org_address);
        
        (org.org_address,org.org_name,coin::value(&org.org_treasury))
    }

    #[view]
    public fun get_employee(employee_address: address, owner: address): (address,String,address,u64,u64) acquires PayrollStorage {
        let storage = borrow_global<PayrollStorage>(owner);
        assert!(table::contains(&storage.employees, employee_address), E_EMPLOYEE_NOT_FOUND);
        let employee = table::borrow(&storage.employees, employee_address);
        
        (employee.employee_account,employee.employee_commitment,employee.company_account,employee.daily_salary,employee.last_payed)
    }

    #[view]
    public fun get_org_employees(org_address: address, owner:address):vector<address> acquires PayrollStorage {
        let storage = borrow_global<PayrollStorage>(owner);
        assert!(table::contains(&storage.organizations, org_address), E_ORGANIZATION_NOT_FOUND);
        let org = table::borrow(&storage.organizations, org_address);

        org.employees
    }
}
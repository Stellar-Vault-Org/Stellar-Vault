# Contributing to StellarVault 🏦

Thank you for helping us build the future of yield on Stellar! To maintain the security and quality of our financial logic, we follow the structured workflow below.

---

## 🚦 The Contribution Loop

### 1. Finding & Claiming Work
We use an Issue-First approach.
* Browse Issues: Look for labels like [Contract], [Frontend], or [Backend].
* The Claim: Comment on an issue. A maintainer will assign it to you. Do not submit a PR for an unassigned issue.

### 2. Development Standards
Each layer of the stack has specific requirements:

#### 🦀 Smart Contracts (/contracts)
* Logic Separation: Keep the "Accounting" (Vault) and "Yield Logic" (Strategy) in separate modules/crates.
* Safety: Use i128 for all financial calculations. Never use floats.
* Testing: 100% test coverage is required for all math-related functions.

#### ⚛️ Frontend (/frontend)
* Stack: Next.js (App Router), Tailwind CSS, TypeScript.
* Wallets: All interactions must go through the @stellar/freighter-api.
* UX: Provide clear loading states and "Transaction Pending" notifications.

#### 🗄 Backend (/backend)
* Stack: Node.js/TypeScript + PostgreSQL.
* Goal: Efficiently index ContractEvents to feed the frontend API.

---

## 📂 Creating Your Pull Request

1.  Branching: Name your branch type/description (e.g., contract/add-withdraw-logic or ui/fix-mobile-nav).
2.  Atomic Commits: Keep your commits small and descriptive. 
3.  PR Template: Your PR description must include:
    * Closes #IssueNumber
    * A summary of the changes.
    * Screenshots (if UI related).
    * A log of the cargo test results.

---

## 🛠 Project Initialization Note
If you are the first contributor to a module:
- Run the initialization command (e.g., cargo init or npx create-next-app).
- Include a .gitkeep if the directory structure is created before logic is added.
- Ensure a .gitignore is present to keep the repo clean.

Let's build something liquid! 🌊

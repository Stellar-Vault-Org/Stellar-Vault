import AppShell from "@/components/layout/AppShell";
import DepositForm from "@/components/vault/DepositForm";

export default function DepositPage() {
  return (
    <AppShell title="DEPOSIT & WITHDRAW">
      <div className="px-8 pt-8 pb-4">
        <h2 className="font-display text-[42px] leading-none tracking-wider mb-2">
          MANAGE YOUR{" "}
          <span className="text-sky">POSITION.</span>
        </h2>
        <p className="text-[14px] text-text-sub font-light">
          Deposit USDC to start earning automated yield. Withdraw at any time — no lock-ups.
        </p>
      </div>
      <DepositForm />
    </AppShell>
  );
}

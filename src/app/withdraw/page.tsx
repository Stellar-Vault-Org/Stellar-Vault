import { redirect } from "next/navigation";

// The withdraw UI lives in the deposit page (tabbed interface)
export default function WithdrawPage() {
  redirect("/deposit");
}

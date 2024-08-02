import { getPayments, getUserSort } from "@/db";

import PaymentsTable from "@/components/PaymentsTable";
import PaymentsTableSortable from "@/components/PaymentsTableSortable";

export default async function Home() {
  const payments = await getPayments();
  return (
    <main>
      <div className="container mx-auto py-10">
        <PaymentsTable
          payments={payments}
          sort={{ column: "amount", direction: "desc" }}
        />
      </div>
    </main>
  );
}

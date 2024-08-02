import { getPayments, getUserSort } from "@/db";

import PaymentsTable from "@/components/PaymentsTable";
import PaymentsTableSortable from "@/components/PaymentsTableSortable";
import PaymentsTableInteractive from "@/components/PaymentsTableSortable";

export default async function Home() {
  const payments = await getPayments();
  return (
    <main>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-5 text-center">
          Payments Overview
        </h1>
        <PaymentsTableInteractive
          payments={payments}
          sort={{ column: "id", direction: "asc" }}
        />
      </div>
    </main>
  );
}

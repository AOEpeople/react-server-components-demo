import { type Payment, type Sort } from "@/db";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { getPaymentsSort } from "@/lib/getPaymentsSort";

type PaymentsTableProps = {
  readonly payments: Payment[];
  readonly sort: Sort;
};

export default function PaymentsTable({ payments, sort }: PaymentsTableProps) {
  const sortedPayments = payments.toSorted(getPaymentsSort(sort));

  return (
    <Table>
      <TableHeader className="bg-slate-300 ">
        <TableHead>ID</TableHead>
        <TableHead>Amount</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Email</TableHead>
      </TableHeader>
      <TableBody>
        {sortedPayments.map(({ id, amount, email, status }, index) => (
          <TableRow
            key={id}
            className={`${index % 2 === 0 ? "bg-slate-100" : "bg-slate-50"}`}
          >
            <TableCell>{id}</TableCell>
            <TableCell>{amount}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

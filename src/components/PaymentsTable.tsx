import { type Payment, type Sort } from "@/db";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function PaymentsTable({
  payments,
  sort,
}: {
  readonly payments: Payment[];
  readonly sort: Sort;
}) {
  const sortedPayments = [...payments].sort((a, b) => {
    if (sort.direction === "asc") {
      if (sort.column === "amount") {
        return a[sort.column] - b[sort.column];
      } else {
        return a[sort.column]
          .toString()
          .localeCompare(b[sort.column].toString());
      }
    } else {
      if (sort.column === "amount") {
        return b[sort.column] - a[sort.column];
      } else {
        return b[sort.column]
          .toString()
          .localeCompare(a[sort.column].toString());
      }
    }
  });

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

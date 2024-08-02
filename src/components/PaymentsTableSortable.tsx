"use client";

import { useReducer } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { type TableColumn, type Payment, type Sort } from "@/db";
import { saveUserSort } from "@/actions/tableActions";
import { getPaymentsSort } from "@/lib/getPaymentsSort";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";

type PaymentsTableInteractiveProps = {
  readonly payments: Payment[];
  readonly sort: Sort;
};

export default function PaymentsTableInteractive({
  payments,
  sort: initialSort,
}: PaymentsTableInteractiveProps) {
  const [sort, toggleSortByColumn] = useReducer(toggleSortReducer, initialSort);

  const sortedPayments = payments.toSorted(getPaymentsSort(sort));

  return (
    <Table>
      <TableHeader className="bg-slate-300 ">
        <TableHead>
          <Button variant="ghost" onClick={() => toggleSortByColumn("id")}>
            ID
            <SortArrow column="id" sort={sort} />
          </Button>
        </TableHead>
        <TableHead>
          <Button variant="ghost" onClick={() => toggleSortByColumn("amount")}>
            Amount
            <SortArrow column="amount" sort={sort} />
          </Button>
        </TableHead>
        <TableHead>
          <Button variant="ghost" onClick={() => toggleSortByColumn("status")}>
            Status
            <SortArrow column="status" sort={sort} />
          </Button>
        </TableHead>
        <TableHead>
          <Button variant="ghost" onClick={() => toggleSortByColumn("email")}>
            Email
            <SortArrow column="email" sort={sort} />
          </Button>
        </TableHead>
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

function SortArrow({
  sort,
  column,
}: {
  readonly sort: Sort;
  readonly column: Sort["column"];
}) {
  if (sort.column !== column) {
    return <ArrowUpDown className="ml-2 h-3 w-3" />;
  }
  if (sort.direction === "desc") {
    return <ArrowUp className="ml-2 h-3 w-3  text-black" />;
  } else {
    return <ArrowDown className="ml-2 h-3 w-3  text-black" />;
  }
}

function toggleSortReducer(currentSort: Sort, column: TableColumn): Sort {
  if (currentSort.column === column) {
    return {
      column,
      direction: currentSort.direction === "asc" ? "desc" : "asc",
    };
  } else {
    return { column, direction: "asc" };
  }
}

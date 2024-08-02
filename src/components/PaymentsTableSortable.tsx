"use client";
import { useReducer } from "react";
import { type Payment, type Sort } from "@/db";
import { saveUserSort } from "@/actions/tableActions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

export default function PaymentsTableInteractive({
  payments,
  sort: initialSort,
}: {
  payments: Payment[];
  sort: Sort;
}) {
  const [sort, toggleSort] = useReducer(toggleSortReducer, initialSort);

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

  const onColumnSelect = (column: Sort["column"]) => {
    toggleSort(column);
    //saveUserSort(sort);
  };
  return (
    <Table>
      <TableHeader className="bg-slate-300 ">
        <TableHead>
          <Button variant="ghost" onClick={() => onColumnSelect("id")}>
            ID
            <SortArrow column="id" sort={sort} />
          </Button>
        </TableHead>
        <TableHead>
          <Button variant="ghost" onClick={() => onColumnSelect("amount")}>
            Amount
            <SortArrow column="amount" sort={sort} />
          </Button>
        </TableHead>
        <TableHead>
          <Button variant="ghost" onClick={() => onColumnSelect("status")}>
            Status
            <SortArrow column="status" sort={sort} />
          </Button>
        </TableHead>
        <TableHead>
          <Button variant="ghost" onClick={() => onColumnSelect("email")}>
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

function toggleSortReducer(currentSort: Sort, column: keyof Payment): Sort {
  if (currentSort.column === column) {
    return {
      column,
      direction: currentSort.direction === "asc" ? "desc" : "asc",
    };
  } else {
    return { column, direction: "asc" };
  }
}

function SortArrow({ sort, column }: { sort: Sort; column: Sort["column"] }) {
  if (sort.column !== column) {
    return <ArrowUpDown className="ml-2 h-3 w-3" />;
  }
  if (sort.direction === "desc") {
    return <ArrowUp className="ml-2 h-3 w-3  text-black" />;
  } else {
    return <ArrowDown className="ml-2 h-3 w-3  text-black" />;
  }
}

import { type Payment, type Sort } from "@/db";

export function getPaymentsSort(sort: Sort) {
  return function paymentSort(a: Payment, b: Payment): number {
    if (sort.column === "amount" && sort.direction === "asc") {
      return a.amount - b.amount;
    } else if (sort.column === "amount" && sort.direction === "desc") {
      return b.amount - a.amount;
    } else if (sort.direction === "asc") {
      return a[sort.column].toString().localeCompare(b[sort.column].toString());
    } else if (sort.direction === "desc") {
      return b[sort.column].toString().localeCompare(a[sort.column].toString());
    } else {
      return 0;
    }
  };
}

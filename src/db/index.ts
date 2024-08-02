import * as fs from "fs";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export type Sort = { column: keyof Payment; direction: "asc" | "desc" };

export async function getPayments(): Promise<Payment[]> {
  const fileData = fs.readFileSync(
    `${process.cwd()}/src/db/payments.json`,
    "utf8"
  );
  const data = JSON.parse(fileData);
  return data.payments;
}

export async function getUserSort(): Promise<Sort> {
  const fileData = fs.readFileSync(
    `${process.cwd()}/src/db/user-sort.json`,
    "utf8"
  );
  const sort = JSON.parse(fileData);
  return sort;
}

export async function setUserSort(sort: Sort): Promise<void> {
  fs.writeFileSync(
    `${process.cwd()}/src/db/user-sort.json`,
    JSON.stringify(sort, null, 2)
  );
}

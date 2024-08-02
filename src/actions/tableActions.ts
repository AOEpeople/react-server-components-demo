"use server";
import { setUserSort, type Sort } from "@/db";

export async function saveUserSort(sort: Sort): Promise<void> {
  return setUserSort(sort);
}

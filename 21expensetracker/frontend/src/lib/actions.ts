import { queryOptions } from "@tanstack/react-query";

import { api } from "./api";

export async function getTotalSpent() {
  const res = await api.expenses["/total"].$get();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // console.log('Res', res)
  const data = await res.json();
  const total = await data.value;
  return total;
}

export async function getAllExpenses() {
  const res = await api.expenses.$get();
  if (!res.ok) {
    throw new Error("Server error");
  }
  const data = await res.json();
  // console.log(data);
  return data.expenses;
}

interface createExpenseType {
  title: string;
  amount: number;
}

export async function createExpense({ value }: { value: createExpenseType }) {
  const res = await api.expenses.$post({ json: value });

  if (!res.ok) {
    throw new Error("servor error");
  }
  return res;
}

export async function getCurrentUser() {
  const res = await api.auth.me.$get();
  if (!res.ok) {
    throw new Error("Server Error");
  }
  const data = await res.json();
  const user = data.user;
  return user;
}

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user-from-auth"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});

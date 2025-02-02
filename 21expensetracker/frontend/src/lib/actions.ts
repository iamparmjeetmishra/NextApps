import { queryOptions, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import type { CreateExpenseType } from "@server/db/schema";

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

export function useTotalExpenses() {
  const { isPending, error, data } = useQuery({
    queryKey: ["total-spent"],
    queryFn: getTotalSpent,
    staleTime: Infinity,
  });

  return {
    isPending,
    error,
    data,
  };
}

// For Getting Expenses

export async function getAllExpenses() {
  const res = await api.expenses.$get();
  if (!res.ok) {
    throw new Error("Server error");
  }
  const data = await res.json();
  // console.log(data);
  return data.expenses;
}

export const getAllExpensesQueryOptions = queryOptions({
  queryKey: ["get-all-expenses"],
  queryFn: getAllExpenses,
  staleTime: 1000 * 60 * 5,
});

// Creating Expense

export async function createExpense({ value }: { value: CreateExpenseType }) {
  const res = await api.expenses.$post({ json: value });

  if (!res.ok) {
    throw new Error("servor error");
  }
  return res;
}

export const loadingCreateExpenseQueryOptions = queryOptions<{
  expense?: CreateExpenseType;
}>({
  queryKey: ["loading-create-expense"],
  queryFn: async () => {
    return {};
  },
  staleTime: Infinity,
});

// Deleting expense
export async function deleteExpense({ id }: { id: number }) {
  const res = await api.expenses[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  });

  if (!res.ok) {
    throw new Error("Server Error");
    toast("Failed to Delete", {
      description: `Error: ${res}`,
    });
  }

  toast("Item Deleted");
}

// For User

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

export function useGetCurrentUser() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-current-user"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
  });

  return {
    isPending,
    error,
    data,
  };
}

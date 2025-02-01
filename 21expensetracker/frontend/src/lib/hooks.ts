import type { CreateExpenseType } from "@server/db/schema";

import { queryOptions, useQuery } from "@tanstack/react-query";

import { getAllExpenses, getCurrentUser, getTotalSpent } from "./actions";

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

export function useAllExpenses() {
  const { isPending, data, error } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
    staleTime: Infinity,
  });

  return {
    isPending,
    error,
    data,
  };
}

export const useToGetAllExpensesQueryOptions = queryOptions({
  queryKey: ["get-all-expenses-query"],
  queryFn: getAllExpenses,
  staleTime: Infinity,
});

export const loadingCreateExpenseQueryOptions = queryOptions<{
  expense?: CreateExpenseType;
}>({
  queryKey: ["loading-create-expense"],
  queryFn: async () => {
    return {};
  },
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

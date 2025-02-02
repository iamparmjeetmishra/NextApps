import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Trash } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteExpense, getAllExpensesQueryOptions, loadingCreateExpenseQueryOptions, useTotalExpenses } from "@/lib/actions";

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Expenses,
});

function Expenses() {
  const { data, error, isPending } = useQuery(getAllExpensesQueryOptions);
  const { data: loadingCreateExpenseData } = useQuery(loadingCreateExpenseQueryOptions);
  console.log("data", loadingCreateExpenseData);

  const { data: fetchedTotalSpent } = useTotalExpenses();

  if (error)
    return `An error has occurred: ${error.message}`;

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <Table>
        <TableCaption>A list of your recent expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loadingCreateExpenseData?.expense && (
            <TableRow>
              <TableCell className="font-medium"><Skeleton className="h-2" /></TableCell>
              <TableCell>{loadingCreateExpenseData?.title}</TableCell>
              <TableCell>{loadingCreateExpenseData?.amount}</TableCell>
              <TableCell>{loadingCreateExpenseData?.date}</TableCell>
            </TableRow>
          )}
          {isPending
            ? Array.from({ length: 3 })
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-3" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                  </TableRow>
                ))
            : data?.map((item: typeof data) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <ExpenseDeleteButton id={item.id} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
            <TableCell>{fetchedTotalSpent}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

function ExpenseDeleteButton({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const mutaion = useMutation({
    mutationFn: deleteExpense,
    onError: () => {
      toast("Error", {
        description: `Failed to delete expense: ${id}`,
      });
    },
    onSuccess: () => {
      toast("Expense Deleted", {
        description: `Successfully deleted: ${id}`,
      });

      queryClient.setQueryData(
        getAllExpensesQueryOptions.queryKey,
        (existingExpenses) => ({
          ...existingExpenses,
          expenses: existingExpenses!.expenses.filter((e) => e.id !== id),
        }),
      );
    },
  });

  return (
    <Button
      disabled={mutaion.isPending}
      onClick={() => mutaion.mutate({ id })}
      variant="outline"
      size="icon"
    >
      {mutaion.isPending ? "..." : <Trash className="size-4" />}
    </Button>
  );
}

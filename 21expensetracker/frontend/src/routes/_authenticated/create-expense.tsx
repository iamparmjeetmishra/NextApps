import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createExpense, getAllExpensesQueryOptions, loadingCreateExpenseQueryOptions } from "@/lib/actions";
import { createExpenseSchema } from "@server/db/schema";

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: CreateExpenseComponent,
});

function CreateExpenseComponent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const form = useForm({
    validators: {
      onChange: createExpenseSchema,
    },
    defaultValues: {
      userId: "",
      title: "",
      amount: 0,
      date: new Date().toISOString(),
    },
    onSubmit: async ({ value }) => {
      // await new Promise(r => setTimeout(r, 3000))
      const existingExpenses = await queryClient.ensureQueryData(getAllExpensesQueryOptions);

      navigate({ to: "/expenses" });

      queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {
        expense: value,
      });

      try {
        const newExpense = await createExpense({ value });

        queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {
          ...existingExpenses,
          expanses: [newExpense, ...existingExpenses.expenses],
        });

        toast("Expense Created", {
          description: `Success: ${newExpense.id}`,
        });
      }
      catch (error) {
        toast("Error", {
          description: `Failed to create: ${error}`,
        });
      }
      finally {
        queryClient.setQueryData(loadingCreateExpenseQueryOptions.queryKey, {});
      }
    },
  });

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();
    void form.handleSubmit();
  }

  return (
    <div className="flex mt-6 justify-center max-w-2xl flex-col gap-4 mx-auto">
      <h2>Create Expense</h2>

      <form
        onSubmit={handleFormSubmit}
        className="border p-4 rounded space-y-2"
      >
        <form.Field
          name="title"
          validators={{
            onChange: createExpenseSchema.shape.title,
          }}
          children={field => (
            <>
              <Label htmlFor="title">Title</Label>
              <Input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(e.target.value)}
                placeholder="title"
              />
              {field.state.meta.isTouched
                ? (
                    <em>{field.state.meta.errors}</em>
                  )
                : null}
            </>
          )}
        />
        <br />
        <form.Field
          name="amount"
          validators={{
            onChange: createExpenseSchema.shape.amount,
          }}
          children={field => (
            <>
              <Label htmlFor="amount">Amount</Label>
              <Input
                type="number"
                inputMode="numeric"
                pattern="[0-9]+"
                placeholder="enter your amount"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={e => field.handleChange(Number(e.target.value))}
              />
              {field.state.meta.isTouched
                ? (
                    <em>{field.state.meta.errors}</em>
                  )
                : null}
            </>
          )}
        />
        <br />
        <form.Field
          name="date"
          validators={{
            onChange: createExpenseSchema.shape.date,
          }}
          children={field => (
            <>
              <Calendar
                mode="single"
                selected={new Date(field.state.value)}
                onSelect={date => field.handleChange((date ?? new Date()).toISOString())}
                className="rounded-md border w-fit"
              />
              {field.state.meta.isTouched
                ? (
                    <em>{field.state.meta.errors}</em>
                  )
                : null}
            </>
          )}
        />
        <form.Subscribe
          selector={state => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}

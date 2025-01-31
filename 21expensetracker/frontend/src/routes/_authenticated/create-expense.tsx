import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createExpense } from "@/lib/actions";
import { createExpenseSchema } from "@/lib/types";

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: CreateExpenseComponent,
});

function CreateExpenseComponent() {
  const navigate = useNavigate();
  const form = useForm({
    validators: {
      onChange: createExpenseSchema,
    },
    defaultValues: {
      userId: "",
      title: "",
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      // await new Promise(r => setTimeout(r, 3000))
      const res = await createExpense({ value });

      if (!res.ok) {
        throw new Error("server error");
      }

      navigate({ to: "/expenses" });
    },
  });

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
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

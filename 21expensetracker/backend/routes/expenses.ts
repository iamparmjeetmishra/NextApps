import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().nonempty().min(3).max(50),
  amount: z.number().int().positive(),
})

type ExpenseType = z.infer<typeof expenseSchema>

const createExpenseSchema = expenseSchema.omit({ id: true })


const fakeExpenses: ExpenseType[] = [
  {
    id: 1,
    title: "Coffee",
    amount: 3.5,
  },
  {
    id: 2,
    title: "Lunch",
    amount: 20,
  },
  {
    id: 3,
    title: "Dinner",
    amount: 30,
  },
];

export const expensesRoute = new Hono()
	.get("/", async (c) => {
		return await c.json({ expenses: fakeExpenses });
	})
  .post("/", zValidator("json", createExpenseSchema), async (c) => {
    const expense = await c.req.valid("json");
    fakeExpenses.push({...expense, id: fakeExpenses.length+1 })
    console.log(expense)
    c.status(201)
		return c.json(expense);
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const expense = fakeExpenses.find(expense => expense.id === id)
    if (!expense) {
      return c.notFound()
    }
    return c.json(expense)
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const index = fakeExpenses.findIndex(expense => expense.id === id)
    if (index === -1) {
      return c.notFound()
    }

    const deletedExpense = fakeExpenses.splice(index, 1)[0]
    return c.json({expense: deletedExpense})
  })
// .put

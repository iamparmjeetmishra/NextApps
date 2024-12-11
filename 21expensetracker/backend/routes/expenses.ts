import { Hono } from "hono";

type ExpenseType = {
  id: number,
  title: string,
  amount: number,
}

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
  .post("/", async (c) => {
    const expense = await c.req.json();
    console.log(expense)
		return c.json(expense);
	});
// .delete
// .put

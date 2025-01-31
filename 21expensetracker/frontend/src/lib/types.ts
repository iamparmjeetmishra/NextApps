import { z } from "zod";

export const createExpenseSchema = z.object({
  userId: z.string(),
  title: z.string().nonempty().min(1, { message: "item must be two character long or more" }),
  amount: z.number().nonnegative().min(0.1, { message: "item price must be above zero." }),
});

export type createExpenseType = z.infer<typeof createExpenseSchema>;

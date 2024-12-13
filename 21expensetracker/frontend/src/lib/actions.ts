import { api } from "./api";

export  async function getTotalSpent() {
	const res = await api.expenses["total-spent"].$get();
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
	const data = await res.json();
	console.log(data.totalExpense);
	// console.log('data', data)
	return data.totalExpense;
}

export  async function getAllExpenses() {
	const res = await api.expenses.$get();
	if (!res.ok) {
		throw new Error("Server error");
	}
	const data = await res.json();
	return data;
}


type createExpenseType = {
  title: string
  amount: number
}


export async function createExpense({value}: {value:createExpenseType}) {
  await api.expenses.$post({json: value})
}
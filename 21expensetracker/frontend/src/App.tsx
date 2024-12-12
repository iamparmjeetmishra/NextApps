import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

async function getTotalSpent() {
	const res = await api.expenses["total-spent"].$get();
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
	const data = await res.json();
	console.log(data.totalExpense);
	// console.log('data', data)
	return data.totalExpense;
}

export default function App() {
	const { isPending, error, data } = useQuery({
		queryKey: ["total-spent"],
		queryFn: getTotalSpent,
	});

	if (isPending) return "loading...";

	if (error) return "An error has occurred: " + error.message;

	return (
		<div className="bg-black/70 min-h-screen text-white flex flex-col items-center p-4">
			<Card className={"w-[380px]"}>
				<CardHeader>
					<CardTitle>Total Spent</CardTitle>
					<CardDescription>
						The Total Amount You've spent
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					{isPending ? "..." : data}
				</CardContent>
				<CardFooter>
					<Button className="w-full">Refresh Total Expenses.</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

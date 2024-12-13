
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/expenses")({
	component: Expenses,
});

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
import { Skeleton } from "@/components/ui/skeleton";
import { getAllExpenses } from "@/lib/actions";



function Expenses() {
	const { isPending, data, error } = useQuery({
		queryKey: ["get-all-expenses"],
		queryFn: getAllExpenses,
	});

	if (error) return "An error has occurred: " + error.message;

	return (
		<div className="max-w-2xl mx-auto mt-6">
			<Table>
				<TableCaption>A list of your recent expenses.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Id</TableHead>
						<TableHead>Title</TableHead>
						<TableHead>Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{isPending
            ? Array(3).fill(0).map((_, i) => (
              <TableRow key={i}>
									<TableCell className="font-medium">
										<Skeleton className="h-4" />
									</TableCell>
									<TableCell><Skeleton className="h-3" /></TableCell>
									<TableCell><Skeleton className="h-4" /></TableCell>
								</TableRow>
            ))
						: data?.expenses.map((item) => (
								<TableRow key={item.id}>
									<TableCell className="font-medium">
										{item.id}
									</TableCell>
									<TableCell>{item.title}</TableCell>
									<TableCell>{item.amount}</TableCell>
								</TableRow>
							))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell>Total</TableCell>
						<TableCell></TableCell>
						<TableCell>00</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
}

import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function App() {
  const [totalSpent, setTotalSpent] = useState(0)
  useEffect(() => {
    async function fetchTotal() {
      const res = await fetch("/api/expenses/total-spent")
      console.log(res)
      await setTotalSpent(await res.json())
    }
    fetchTotal()
  }, [totalSpent])
  return (
    <div className="bg-black/70 min-h-screen text-white flex flex-col items-center justify-center">
      <Card className={"w-[380px]"} >
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The Total Amount You've spent</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {totalSpent}
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Refresh Total Expenses.
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

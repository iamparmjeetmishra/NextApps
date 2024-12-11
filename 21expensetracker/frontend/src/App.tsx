import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { api } from "@/lib/api";



export default function App() {
  const [totalSpent, setTotalSpent] = useState(0)

  useEffect(() => {
    async function fetchTotal() {
      const res = await api.expenses["total-spent"].$get()
      const data = await res.json()
      console.log(data.totalExpense)
      // console.log('data', data)
      setTotalSpent(data.totalExpense || 1)
    }
    fetchTotal()
  }, [])


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

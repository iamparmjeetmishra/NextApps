import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/expenses')({
  component: Expenses,
})

async function getAllExpenses() {
  const res = await api.expenses.$get()
  if (!res.ok) {
    throw new Error('Server error')
  }
  const data = await res.json()
  return data
}

function Expenses() {
  const { isPending, data, error} = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses
  })

  if(error) return "An error has occurred: " + error.message

  return <div>
    {data?.expenses.map((item) => (
      <li key={item.id} className='flex items-center gap-2'>
        <span>{item.title}</span>
        <span>{item.amount}</span>
      </li>
    ))}
  </div>
}

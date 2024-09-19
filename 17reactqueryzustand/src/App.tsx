import { useQuery } from "@tanstack/react-query"
import { getUsers } from "./api/user"
import { useUserStore } from "./store/userStore"

export default function App() {

  // const { users, setUsers } = useUserStore()
  const { filters } = useUserStore()

  console.log('hi')
  const { data } = useQuery({
    queryKey: ['users', filters],
    queryFn: () => getUsers(filters),
  })

  console.log(data)

 

  return (
    <div>
      <h2>App</h2>
      <FiltersComponent />
      {
        data?.map((user) => {
          return <div key={user.id}>{ user.name }</div>
        })
      }
    </div>
  )
}

function FiltersComponent() {
  const { setFilters } = useUserStore()
  
 return null
}
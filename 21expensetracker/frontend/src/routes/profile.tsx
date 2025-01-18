import { useGetCurrentUser } from '@/lib/hooks'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})


function RouteComponent() {
  const { isPending, error, data } = useGetCurrentUser()
  console.log(data)
  if (isPending) return "loading.."
  if(error) return "error.."
  return <div>
    <p>id: {data.id}</p>
    <p>name: {data.name}</p>
    <p>email: {data.email}</p>
    <img src={data.picture} width="200" className='border rounded' />
  </div>
}

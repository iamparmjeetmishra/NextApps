import { User } from '../types/user'

export type GetUsersFilters = {
   limit: number;
   page: number
}

export async function getUsers(filters?: GetUsersFilters) {
   // Do something with filters

   await new Promise((resolve) => setTimeout(resolve, 1000))

   return [{id: 1, name: 'John'}] as User[]
}
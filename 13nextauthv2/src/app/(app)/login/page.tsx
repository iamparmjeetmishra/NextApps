'use client'

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast, { Toaster }  from "react-hot-toast"

export default function LoginPage() {
  const router = useRouter()

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const [btnDisabled, setBtnDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/login', user)
      console.log('response,', response)
      console.log('Login Success success', response.data)
      router.push('/profile')

    } catch (error: any) {
      console.log('Login failed')
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if
      (
        user.email.length > 0 &&
        user.password.length > 0
      ) {
        setBtnDisabled(false)
    } else {
        setBtnDisabled(true)
      }
  }, [user])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster
        position="bottom-right"
      />
      <h1 className="text-2xl font-bold">{loading ? 'Processing' : 'Login'}</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
        type="email"
        className=""
      />
      <hr />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
        type="password"
        className=""
      />
      <hr />
      <button
        onClick={onLogin}
        className="p-2 mt-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        disabled={btnDisabled}
      >
        {
          btnDisabled ? 'Please fill the form' : 'Login'
        }
      </button>
      <Link className="bg-orange-500 rounded p-2" href={'/sign-up'}>Visit Signup Page</Link>
    </main>
  )
}

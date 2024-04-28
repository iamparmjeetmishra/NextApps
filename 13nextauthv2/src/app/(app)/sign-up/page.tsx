'use client'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast, { Toaster }  from "react-hot-toast"

export default function SignUpPage() {
  const router = useRouter()

  const [user, setUser] = useState({
    email: '',
    password: '',
    username: ''
  })

  const [btnDisabled, setBtnDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  

  const onSignUp = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/sign-up', user)
      console.log('response,', response)
      console.log('Sign Up success', response.data)
      router.push('/login')

    } catch (error: any) {
      console.log('Sign up failed')
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if
      (
        user.email.length > 0 &&
        user.password.length > 0 &&
        user.username.length > 0 
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
      <h1>{loading ? 'Processing' : 'Signup'}</h1>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
        type="text"
        className=""
      />
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
        onClick={onSignUp}
        className="p-2 mt-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        disabled={btnDisabled}
      >
        {
          btnDisabled ? 'Please fill the form' : 'Signup'
        }
      </button>
      <Link href={'/login'}>Visit Login Page</Link>
    </main>
  )
}

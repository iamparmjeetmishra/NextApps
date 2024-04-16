"use client"

import Link from "next/link"
import React, {useState} from "react"
import { useRouter } from "next/navigation"
import {axios} from 'axios'


export default function LoginPage() {

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const onLogin = async () => {
        
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Signup</h1>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="email"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="text"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="password"
                    />
                </div>
                <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 mt-2">Login Here</button>
                <Link href='/signup'>Register Here</Link>
            </div>
        </div>
    )
}
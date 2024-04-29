'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


export default function Profile() {

	const router = useRouter()
	const [data, setData] = useState('nothings')

	const getUserDetails = async () => {
		try {
			const response = await axios.post('/api/users/me')
			console.log(response.data)
			setData(response.data.data._id)
		} catch (error) {
			console.log('error get profile data', error)
		}
	}

	const logout = async () => {
		try {
			await axios.get('/api/users/logout')
			toast.success('Successful logout')
			router.push('/login')
		} catch (error: any) {
			console.log('Error Loging out', error)
			toast.error(error.message)

		}
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h2
				className="font-bold text-2xl border p-4"
			>{data === 'Nothing' ? 'No Profile Data' : <Link href={`/profile/${data}`}>{
					data
				}</Link>}</h2>
			<button
				onClick={getUserDetails}
				className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>Data</button>
			<button
				onClick={logout}
				className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>Logout</button>
		</div>
	)
}

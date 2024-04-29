'use client'


export default function page({params}: any) {
  return (
     <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h2>Profile Page</h2>
        <h2>{params.id}</h2>
    </div>
  )
}

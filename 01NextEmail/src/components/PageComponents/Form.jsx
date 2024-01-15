"use client"

import React, { useState } from 'react'
import { toast } from 'sonner'
import * as z from "zod"
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";



const formSchema = z.object({
    fullName: z.string().min(3).max(30),
    email: z.string().email(),
    message: z.string().min(5)
})



export default function FormPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        message: '',
    })


    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful, isSubmitting } } = useForm({ resolver: zodResolver(formSchema) })

    const submitData =  data => {
        setFormData(data)
        if (data) {
            console.log('Done', data)
            toast.success('Email Submit Successfully')
            reset()
            return
        }
        // toast error
        console.log(result?.error)
        toast.error('Error', 'Something went wrong')
    }


    return (
        <>
            <section className='md:flex md:flex-row flex flex-col justify-center gap-6 mt-5 p-4'>
                <main className='md:w-[50%]'>
                    <form onSubmit={handleSubmit(submitData)} className="space-y-8 w-full">
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="fullName" className="label">
                                Your Name
                            </label>
                            <div className="relative mb-1 ">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <FaUser className="w-5 " />
                                </div>
                                <input type="text" id="fullName" className='input' placeholder="Enter your name" {...register("fullName")} />
                            </div>
                            {errors.fullName?.message && (<div className='text-red-600'>{errors.fullName.message}</div>)}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email" className="label">
                                Your Email
                            </label>
                            <div className="relative mb-1">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <MdEmail className="w-5" />
                                </div>
                                <input type="email" className='input' id="email" placeholder="Enter your email" {...register("email")} autoComplete='false' />
                            </div>
                            {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="message" className="label">
                                Your Message
                            </label>
                            <div className="relative mb-1 ">
                                <div className="absolute inset-y-0 start-0 flex items-start pt-3.5 ps-3.5 pointer-events-none">
                                    <TfiWrite className="w-5" />
                                </div>
                                <textarea rows={4} className='input' id="message" placeholder="Enter your message" {...register("message")} />
                            </div>
                            {errors.message && <span className='text-red-600'>{errors.message.message}</span>}
                        </div>
                        <button disabled={isSubmitting} type='submit' className='px-10 py-3 flex justify-center w-full bg-neutral-800/90 font-semibold rounded-xl  hover:bg-gradient-to-r from-twOg-100 to-twOg-200 hover:transition-background-color'>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                    </form>
                </main>
                <div className='md:w-[50%] p-6 border shadow-xl rounded-xl flex flex-col items-center justify-center bg-slate-800'>
                    <h2 className='text-2xl font-bold underline mb-8'> Form Data </h2>
                    <pre>{JSON.stringify(formData, null, 2)}</pre>
                </div>
            </section>
        </>
    )
}
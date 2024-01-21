
import Phone from '@/components/ui/Phone'

const d = new Date();
let year = d.getFullYear();

export default function Home() {



  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-4">
      <h2 className='text-2xl p-8 mb-10 bg-black w-full text-center font-extrabold' >Next OTP Login App</h2>
      <div className='flex flex-col gap-4 items-center'>
        <p className='text-xl font-bold'>Please Enter Your Phone</p>
        <p className='text-balance w-3/4 text-center mb-4 '>Note: This is dummy App where it demonstrate the OTP Box funcionality. How It looks simple but technically very hard.</p>
        <Phone />
      </div>
      <footer className="container font-medium py-8 px-2 mt-6  mx-auto w-full border-y border-gray-600 text-center">
      © {year} | Made with ♡ by <a href="https://parmjeetmishra.com" target="_blank" className="hover:text-cyan-600 " >Parm</a>
    </footer>
    </main>
  )
}

import Form from '@/components/PageComponents/Form'
const d = new Date();
let year = d.getFullYear();
export default function Home() {
  return (
    <section className='container mx-auto flex flex-col justify-around h-screen'>
      <div className='flex items-center'>
        <h2 className='text-5xl font-extrabold mx-auto p-6 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text '>React Hook Form + Zod</h2>
      </div>
      <Form />
      <footer className="container font-medium py-8 px-2 mt-6  mx-auto w-full border-y border-gray-600 text-center">
      © {year} All Rights Reserved | Made with ♡ by <a href="https://parmjeetmishra.com" target="_blank" className="hover:text-cyan-600 " >Parm</a>
    </footer>
    </section>
  )
}

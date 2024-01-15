import Form from '@/components/PageComponents/Form'

export default function Home() {
  return (
    <section className='container mx-auto'>
      <div className='flex items-center'>
        <h2 className='text-5xl font-extrabold mx-auto p-6 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text '>React Hook Form + Zod</h2>
      </div>
      <Form />
    </section>
  )
}

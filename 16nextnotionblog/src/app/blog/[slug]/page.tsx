import prisma from "@/lib/prisma"

export default async function Blog(
   { params }: { params: { slug: string } }
) {

   const blog = await prisma.post.findUnique({
      where: {
         slug: params.slug
      }
   })

   if (!blog) {
      return <p>Blog Not found</p>
   }

   return (
      <section className="py-24">
         <div className="container">
            <h1 className="text-3xl font-semibold">{blog.title}</h1>
            <div
               className="prose mt-4"
               dangerouslySetInnerHTML={{__html: blog.content}}
            >
            </div>
         </div>
      </section>
   )
}
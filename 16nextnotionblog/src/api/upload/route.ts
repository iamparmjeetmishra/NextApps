import { put } from "@vercel/blob"
import { NextResponse } from "next/server"


export const runtime = 'edge'

export async function POST(req: Request) {
   if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return new Response(
         'Missing Blog Read and Write Token'
         ,{
            status: 401
         }
      )
   }
   const file = req.body || ''
   const fileName = req.headers.get('x-vercel-filename') || 'file.txt'
   const contentType = req.headers.get('content-type') || 'text/plain'
   const fileType = `.${contentType.split('/')[1]}`


   // construct final filename based on content type if not provided

   const finalName = fileName.includes(fileType)
      ? fileName
      : `${fileName}${fileType}`
   
   const blob = await put(finalName, file, {
      contentType,
      access: 'public'
   })

   return NextResponse.json(blob)
}
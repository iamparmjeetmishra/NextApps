"use server"

import { auth } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm"
import { cookies } from "next/headers"
import { UTApi } from "uploadthing/server"
import { db } from "./db"
import { files_table } from "./db/schema"

const utAPI = new UTApi()

export async function deleteFile(fileId: number) {
  const session = await auth()

  if (!session.userId) {
    return { error: "Unauthorized" }
  }

  const [file] = await db
    .select()
    .from(files_table)
    .where(
      and(eq(files_table.id, fileId), eq(files_table.ownerId, session.userId))
    )

  // Delete from Uploadthing

  if (!file) {
    return { error: "file not found" }
  }

  const utapiResult = await utAPI.deleteFiles([file.url.replace("https://utfs.io/f/", "")])

  console.log("utapiresult", utapiResult)

  const dbDeleteResult = await db
    .delete(files_table)
    .where(eq(files_table.id, fileId))

  console.log("dbDeleteResult", dbDeleteResult)

  //revalidate the page
  const c = await cookies()

  c.set("force-refresh", JSON.stringify(Math.random()))

  return { success: true }
}
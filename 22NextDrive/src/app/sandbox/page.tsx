import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { Button } from "~/components/ui/button";
import { mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { folders_table } from "~/server/db/schema";

export default async function SandboxPage() {
  const user = await auth();
  if (!user.userId) throw new Error("User not found");

  const folders = await db
    .select()
    .from(folders_table)
    .where(eq(folders_table.ownerId, user.userId));

  console.log("folders", folders);
  return (
    <div className="flex h-screen flex-col gap-4 bg-stone-600 text-white">
      <h1>Seed Function</h1>
      <form
        className="rouded max-w-2xl rounded border p-2"
        action={async () => {
          "use server";
          const user = await auth();
          if (!user.userId) {
            throw new Error("User not found");
          }

          const rootFolder = await db
            .insert(folders_table)
            .values({
              name: "root",
              ownerId: user.userId,
              parent: null,
            })
            .$returningId();

          const insertableFolders = mockFolders.map((folder) => ({
            name: folder.name,
            ownerId: user.userId,
            parent: rootFolder[0]!.id,
          }));

          await db.insert(folders_table).values(insertableFolders);

          // const folderInsert = await db.insert(folders_table).values(
          //   mockFolders.map((folder, index) => ({
          //     id: index + 1,
          //     name: folder.name,
          //     ownerId: user.userId,
          //     parent: index !== 0 ? 1 : null,
          //   }))
          // );
          // console.log("folder", folderInsert);

          // const fileInsert = await db.insert(files_table).values(
          //   mockFiles.map((file, index) => ({
          //     id: index + 1,
          //     name: file.name,
          //     ownerId: user.userId,
          //     size: 5000,
          //     url: file.url,
          //     parent: (index % 3) + 1,
          //   }))
          // );
          // console.log("files", fileInsert);
        }}
      >
        <Button variant="outline" type="submit">
          Seed Button
        </Button>
      </form>
    </div>
  );
}

import { Button } from "~/components/ui/button";
import { mockFiles, mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { files_table, folders_table } from "~/server/db/schema";

export default function SandboxPage() {
  return (
    <div className="flex h-screen flex-col gap-4 bg-stone-600 text-white">
      <h1>Seed Function</h1>
      <form
        className="rouded max-w-2xl rounded border p-2"
        action={async () => {
          "use server";

          console.log("user");

          const folderInsert = await db.insert(folders_table).values(
            mockFolders.map((folder, index) => ({
              id: index + 1,
              name: folder.name,
              parent: index !== 0 ? 1 : null,
            })),
          );
          console.log("folder", folderInsert);
          const fileInsert = await db.insert(files_table).values(
            mockFiles.map((file, index) => ({
              id: index + 1,
              name: file.name,
              size: 5000,
              url: file.url,
              parent: (index % 3) + 1,
            })),
          );
          console.log("files", fileInsert);
        }}
      >
        <Button variant="outline" type="submit">
          Seed Button
        </Button>
      </form>
    </div>
  );
}

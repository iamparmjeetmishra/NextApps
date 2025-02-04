import "server-only";

import { eq } from "drizzle-orm";
import { createFileType } from "~/lib/types";
import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as foldersSchema
} from "~/server/db/schema";

export const QUERIES = {
  getAllParentsForFolder: async function (folderId: number) {
    const parents = [];
    let currentId: number | null = folderId;
    while (currentId !== null) {
      const folder = await db
        .selectDistinct()
        .from(foldersSchema)
        .where(eq(foldersSchema.id, currentId));

      if (!folder[0]) {
        throw new Error("Parent folder not found");
      }
      // parents.push(folder[0]); // this will order reverse in breadcrumbs
      parents.unshift(folder[0]);
      currentId = folder[0]?.parent;
    }
    return parents;
  },

  getFolders: function (folderId: number) {
    return db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parent, folderId))
      .orderBy(foldersSchema.id)
  },

  getFiles: function (folderId: number) {
    return db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parent, folderId));
  },
  getFolderById: async function (folderId: number) {
    const folder = await db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.id, folderId))
    return folder[0]
  }
};


export const MUTATIONS = {
  createFile: async function (input: {
    file: createFileType
    userId: string
  }) {
    return await db.insert(filesSchema).values({
      ...input.file,
      ownerId: input.userId
    })
  }
}
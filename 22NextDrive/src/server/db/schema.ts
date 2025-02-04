import "server-only"

import { bigint, index, int, singlestoreTableCreator, text, timestamp } from "drizzle-orm/singlestore-core"

// export const users = singlestoreTable("users_table", {
//   id: int("id").primaryKey().autoincrement(),
//   name: text("name"),
//   age: int("age")
// })

export const createTable = singlestoreTableCreator((name) => `drive-tutorial_${name}`)

export const files_table = createTable("files_table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  size: int("size").notNull(),
  url: text("url").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
}, (t) => {
  return [
    index("parent_index").on(t.parent)
  ]
})

export const folders_table = createTable("folders_table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }),
  createdAt: timestamp("created_at").notNull().defaultNow()
}, (t) => {
  return [
    index("parent_index").on(t.parent)
  ]
})

export type DB_FileType = typeof files_table.$inferSelect
export type DB_FolderType = typeof folders_table.$inferSelect


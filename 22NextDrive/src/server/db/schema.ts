import { int, text, singlestoreTable, index, singlestoreTableCreator, bigint, timestamp } from "drizzle-orm/singlestore-core"

// export const users = singlestoreTable("users_table", {
//   id: int("id").primaryKey().autoincrement(),
//   name: text("name"),
//   age: int("age")
// })

export const createTable = singlestoreTableCreator((name) => `drive-tutorial_${name}`)

export const files = createTable("files_table", {
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

export const folders = createTable("folders_table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }),
  createdAt: timestamp("created_at").notNull().defaultNow()
}, (t) => {
  return [
    index("parent_index").on(t.parent)
  ]
})
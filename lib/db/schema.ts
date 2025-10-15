import {
  date,
  json,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
});

export const resend_webhooks = pgTable("resend_webhooks", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 256 }).notNull(),
  createdAt: date("created_at").notNull().defaultNow(),
  data: json("data").notNull(),
});

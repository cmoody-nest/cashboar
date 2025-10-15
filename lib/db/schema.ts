import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const resend_webhooks = pgTable("resend_webhooks", {
  id: serial("id").primaryKey(),
  type: varchar("eventType", { length: 256 }).notNull(),
  emailId: varchar("emailId", { length: 256 }).notNull(),
  recipient: varchar("recipient", { length: 256 }).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  deliveryStatus: varchar("deliveryStatus", { length: 256 }).notNull(),
});

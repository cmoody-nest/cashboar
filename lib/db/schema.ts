import {
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const genderEnum = pgEnum("gender", ["male", "female"]);
export const profileStatus = pgEnum("user_status", [
  "active",
  "pending",
  "suspended",
]);

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  // Primary info
  firstName: varchar("firstName", { length: 256 }).notNull(),
  lastName: varchar("lastName", { length: 256 }).notNull(),
  dateOfBirth: timestamp("dateOfBirth").notNull(),
  gender: genderEnum("gender").notNull(),
  // Location
  state: varchar("state", { length: 256 }).notNull(),
  city: varchar("city", { length: 256 }).notNull(),
  zipCode: varchar("zipCode", { length: 20 }).notNull(),
  // Other
  status: profileStatus("status").default("pending").notNull(),
  supabaseId: varchar("supabaseId").notNull().unique(),
});

export const resend_webhooks = pgTable("resend_webhooks", {
  id: serial("id").primaryKey(),
  type: varchar("eventType", { length: 256 }).notNull(),
  emailId: varchar("emailId", { length: 256 }).notNull(),
  recipient: varchar("recipient", { length: 256 }).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  deliveryStatus: varchar("deliveryStatus", { length: 256 }).notNull(),
});

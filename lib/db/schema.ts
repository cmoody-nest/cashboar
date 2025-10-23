import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const gender = pgEnum("gender", ["male", "female"]);
export const profileStatus = pgEnum("profile_status", [
  "active",
  "pending",
  "suspended",
]);
export const offerwallType = pgEnum("offerwall_type", ["coresave", "besitos"]);
export const offerStatus = pgEnum("offer_status", ["claimed", "completed"]);

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  // Primary info
  firstName: varchar("firstName", { length: 256 }).notNull(),
  lastName: varchar("lastName", { length: 256 }).notNull(),
  dateOfBirth: timestamp("dateOfBirth").notNull(),
  gender: gender("gender").notNull(),
  // Location
  state: varchar("state", { length: 256 }).notNull(),
  city: varchar("city", { length: 256 }).notNull(),
  zipCode: varchar("zipCode", { length: 20 }).notNull(),
  // Other
  supabaseId: varchar("supabaseId").notNull().unique(),
}).enableRLS();

export const resend_webhooks = pgTable("resend_webhooks", {
  id: serial("id").primaryKey(),
  type: varchar("eventType", { length: 256 }).notNull(),
  emailId: varchar("emailId", { length: 256 }).notNull(),
  recipient: varchar("recipient", { length: 256 }).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  deliveryStatus: varchar("deliveryStatus", { length: 256 }).notNull(),
}).enableRLS();

export const receipts = pgTable("receipts", {
  id: serial("id").primaryKey(),
  url: varchar("url", { length: 1024 }).notNull(),
  profileId: integer("profileId")
    .notNull()
    .references(() => profiles.id, {
      onDelete: "cascade",
    }),
}).enableRLS();

export const profile_offers = pgTable(
  "profile_offers",
  {
    id: serial("id").primaryKey(),
    offerId: varchar("offerId", { length: 256 }).notNull(),
    offerwallType: offerwallType("offerwallType").notNull(),
    status: offerStatus("status").notNull(),
    source: varchar("source", { length: 512 }).notNull(),
    profileId: integer("profileId")
      .notNull()
      .references(() => profiles.id, {
        onDelete: "cascade",
      }),
  },
  (table) => [
    uniqueIndex("idx_profile_offer_unique_offer_per_profile").on(
      table.offerId,
      table.offerwallType,
      table.profileId,
    ),
  ],
).enableRLS();

export const profilesRelations = relations(profiles, ({ many }) => ({
  receipts: many(receipts),
  savedOffers: many(profile_offers),
}));

export const receiptsRelations = relations(receipts, ({ one }) => ({
  profile: one(profiles, {
    fields: [receipts.profileId],
    references: [profiles.id],
  }),
}));

export const profilesOffersRelations = relations(profile_offers, ({ one }) => ({
  profile: one(profiles, {
    fields: [profile_offers.profileId],
    references: [profiles.id],
  }),
}));

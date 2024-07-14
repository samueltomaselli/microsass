import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  user: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const patientTable = pgTable("patient", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(() => new Date()),
});

export const appointmentTable = pgTable("appointment", {
  id: text("id").primaryKey(),
  type: text("type"),
  title: text("title"),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  date: timestamp("date", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  description: text("description"),
  patientId: text("patient_id")
    .notNull()
    .references(() => patientTable.id),
});

// drizzle/schema/challans.ts
import { pgTable, serial, integer, varchar, text, timestamp, numeric } from "drizzle-orm/pg-core";
import { users } from "./users"; // path adjust kar lena agar alag folder me ho

export const challans = pgTable("challans", {
  id: serial("id").primaryKey(),

  // unique challan number (auto-generated, e.g. CH-20251019-XYZ123)
  challanNumber: varchar("challan_number", { length: 50 }).notNull().unique(),

  // relation with user table
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // amount (decimal)
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),

  // why the challan is generated — e.g. "Tuition Fee", "Library Fine", etc.
  purpose: varchar("purpose", { length: 200 }),

  // bank details where student will deposit
  bankName: varchar("bank_name", { length: 100 }),
  bankAccount: varchar("bank_account", { length: 100 }),
  branch: varchar("branch", { length: 100 }),

  // pdf path or url of generated challan
  pdfPath: text("pdf_path"),

  // qr or barcode data
  qrData: text("qr_data"),

  // payment info
  status: varchar("status", { length: 20 }).notNull().default("pending"), // pending | paid | expired
  transactionRef: varchar("transaction_ref", { length: 255 }),

  // expiry (optional)
  expiresAt: timestamp("expires_at"),

  // timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

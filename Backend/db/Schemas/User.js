import { pgTable, serial, varchar, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 20 }).notNull().default('student'), 
  department: varchar('department', { length: 100 }),
  year: varchar('year', { length: 20 }),
  cnic: varchar('cnic', { length: 20 }),
  program: varchar('program', { length: 50 }),
  semester: varchar('semester', { length: 20 }),
  batch: varchar('batch', { length: 20 }),
  address: text('address'),
  status: varchar('status', { length: 20 }).notNull().default('active'), 
  avatar: text('avatar'),
  verificationToken: varchar('verification_token', { length: 255 }),
  tokenExpires: timestamp('token_expires'),
  isEmailVerified: boolean('is_email_verified').default(false),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userSessions = pgTable('user_sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 500 }).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

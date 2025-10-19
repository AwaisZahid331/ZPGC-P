import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  cnic: z.string().optional(),
  program: z.string().optional(),
  department: z.string().optional(),
  semester: z.string().optional(),
  batch: z.string().optional(),
  address: z.string().optional(),
  role: z.string().optional(),
  year: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
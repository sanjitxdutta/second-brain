import { z } from "zod";

export const userSignupSchema = z.object({
  name: z.string().min(3).max(10),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/[^A-Za-z0-9]/, "Must include a special character"),
});

export type UserSignupInput = z.infer<typeof userSignupSchema>;
import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Does not an email format'),
  password: z.string().min(6, 'Password should have at lest 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Does not an email format'),
  password: z.string().min(6, 'Password should have at lest 6 characters'),
});

export const AuthenticatedUserSchema = z.object({
  id: z.string(),
  email: z.string().email('Does not an email format'),
  token: z.string(),
  //   refreshToken: z.string(),
  //   permissions: PermissionsSchema,
});

export type AuthenticatedUser = z.infer<typeof AuthenticatedUserSchema>;

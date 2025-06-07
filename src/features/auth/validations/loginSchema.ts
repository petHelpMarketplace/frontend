import { emailField, passwordField } from '@/shared/validations/fields';
import { z } from 'zod';

export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

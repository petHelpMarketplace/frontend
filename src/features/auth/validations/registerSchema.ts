import {
  emailField,
  nameField,
  passwordField,
  phoneField,
} from '@/shared/validations/fields';
import { z } from 'zod';

export const registerSchema = z
  .object({
    name: nameField,
    phone: phoneField,
    email: emailField,
    password: passwordField,
    confirmPassword: z.string({
      required_error: 'Підтвердіть пароль',
    }),
  })
  .refine(data => data.password !== data.email, {
    message: 'Не можна використовувати email як пароль',
    path: ['password'],
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Паролі не збігаються',
    path: ['confirmPassword'],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;

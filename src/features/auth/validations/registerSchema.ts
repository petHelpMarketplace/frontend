import {
  emailField,
  // family_nameField,
  nameField,
  passwordField,
  phoneField,
} from '@/shared/validations/fields';
import { z } from 'zod';

export const registerSchema = z
  .object({
    name: nameField,
    // family_name: family_nameField,
    phone: phoneField,
    email: emailField,
    password: passwordField,
    password_confirmation: z.string({
      required_error: 'Підтвердіть пароль',
    }),
  })
  .refine(data => data.password !== data.email, {
    message: 'Не можна використовувати email як пароль',
    path: ['password'],
  })
  .refine(data => data.password === data.password_confirmation, {
    message: 'Паролі не збігаються',
    path: ['password_confirmation'],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;

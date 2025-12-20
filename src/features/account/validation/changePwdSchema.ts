import { passwordField } from '@/shared/validations/fields';
import { z } from 'zod';

export const changePwdSchema = (email?: string) =>
  z
    .object({
      current_password: z.string().min(12, 'Введіть поточний пароль'),
      new_password: passwordField,
      password_confirmation: z.string({
        required_error: 'Підтвердіть новий пароль',
      }),
    })
    .refine(data => data.new_password !== data.current_password, {
      message: 'Новий пароль не може збігатися з поточним',
      path: ['new_password'],
    })
    .refine(data => data.new_password !== email, {
      message: 'Не можна використовувати email як пароль',
      path: ['password'],
    })
    .refine(data => data.new_password === data.password_confirmation, {
      message: 'Паролі не збігаються',
      path: ['password_confirmation'],
    });

// export type ChangePwdSchemaType = z.infer<typeof changePwdSchema>;
export type ChangePwdSchemaType = z.infer<ReturnType<typeof changePwdSchema>>;

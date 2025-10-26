// import { nameField, phoneField } from '@/shared/validations/fields';
import { z } from 'zod';

const fileSizeLimit = 10 * 1024 * 1024; // 10MB

export const avatarSchema = z
  .instanceof(File)
  .refine(
    file =>
      ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(
        file.type
      ),
    {
      message:
        'Неправильний формат файлу. Оберіть зображення у форматі JPG, JPEG, WEBP або PNG.',
    }
  )
  .refine(file => file.size <= fileSizeLimit, {
    message: 'Розмір файлу перевищує допустимий. Максимум - 10 МБ.',
  });

export const accountInfoSchema = z.object({
  avatar: avatarSchema,
  // name: nameField,
  // family_name: nameField,
  // phone: phoneField,
});

export type AccountInfoSchemaType = z.infer<typeof accountInfoSchema>;

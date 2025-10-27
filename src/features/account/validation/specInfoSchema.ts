// import { nameField, phoneField } from '@/shared/validations/fields';
import { z } from 'zod';

const fileSizeLimit = 10 * 1024 * 1024; // 10MB

// 1. Схема для валідації об'єкта File (коли користувач обирає новий файл)
export const fileAvatarSchema = z
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

// Після завантаження валідуємо url як рядок
export const avatarSchema = z
  .union([fileAvatarSchema, z.string().url(), z.literal('')])
  .optional()
  .nullable();

export const specInfoSchema = z.object({
  avatar: avatarSchema,
  // name: nameField,
  // family_name: nameField,
  // phone: phoneField,
});

export type SpecInfoSchemaType = z.infer<typeof specInfoSchema>;

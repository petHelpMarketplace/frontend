import { nameField, phoneField } from '@/shared/validations/fields';
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
  bio: z
    .string()
    .min(2, 'Має містити мінімум 2 символи')
    .max(500, 'Не може перевищувати 500 символів'),
  name: nameField,
  family_name: nameField.optional(),
  phone: phoneField,
  district: z.string(),
  experience: z
    .number({
      required_error: 'Вкажіть кількість років досвіду',
      invalid_type_error: 'Поле має бути числом',
    })
    .min(0, 'Мінімальне значення - 0')
    .max(50, 'Максимальне значення - 50 років')
    .step(0.5),
});

export type SpecInfoSchemaType = z.infer<typeof specInfoSchema>;

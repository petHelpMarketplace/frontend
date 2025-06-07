import {
  animalField,
  nameField,
  serviceField,
} from '@/shared/validations/fields';
import { z } from 'zod';

export const reviewSchema = z
  .object({
    rating: z.number().min(1, 'Оберіть оцінку').max(5),
    name: nameField,
    lastName: z.string().optional(),
    animal: animalField,
    service: serviceField,
    review: z
      .string()
      .min(30, 'Має містити мінімум 30 символів')
      .max(300, 'Не може перевищувати 300 символів'),
  })
  .superRefine((data, ctx) => {
    const { lastName } = data;

    if (lastName) {
      const result = nameField.safeParse(lastName);

      if (!result.success) {
        result.error.errors.forEach(error => {
          ctx.addIssue({
            path: ['lastName'],
            message: error.message,
            code: 'custom',
          });
        });
      }
    }
  });

export type ReviewSchemaType = z.infer<typeof reviewSchema>;

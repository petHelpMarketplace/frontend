import { z } from 'zod';
import { emailRegex, streetOrHouseRegex } from '@/shared/constants/regex';
import { timeSlots } from '@/features/booking/constants/bookingTime';
import { dogWeightRanges } from '@/shared/constants/dogsWeight';

const baseSchema = z.object({
  animal: z.enum(['собаки', 'коти']),
  service: z.string({ required_error: 'Оберіть послугу' }),
  weight: z
    .enum(dogWeightRanges, {
      invalid_type_error: 'Оберіть вагу собаки',
    })
    .optional(),
  details: z
    .string()
    .min(10, 'Поле має містити мінімум 10 символів')
    .max(500, 'Поле не може перевищувати 500 символів'),
  date: z.string({ required_error: 'Оберіть дату виконання замовлення' }),
  time: z
    .array(
      z.enum(timeSlots, {
        invalid_type_error: 'Оберіть час виконання замовлення',
      })
    )
    .min(1, 'Оберіть хоча б один проміжок часу'),
  email: z
    .string({ required_error: 'Введіть email' })
    .max(255, 'Email не може перевищувати 255 символів')
    .regex(emailRegex, 'Невірний формат email'),
});

// ------------------------------------------------------------------
// Schema for "customer"
const customerSchema = baseSchema.extend({
  locationOption: z.literal('customer'),
  district: z.string({ required_error: 'Оберіть район' }),
  street: z
    .string()
    .min(3, 'Поле має містити мінімум 3 символи')
    .max(50, 'Поле не може перевищувати 50 символів')
    .regex(
      streetOrHouseRegex,
      'Поле не може містити емодзі, ієрогліфів, нестандартних символів'
    ),
  house: z
    .string()
    .min(2, 'Поле має містити мінімум 2 символи')
    .max(50, 'Поле не може перевищувати 50 символів')
    .regex(
      streetOrHouseRegex,
      'Поле не може містити емодзі, ієрогліфів, нестандартних символів'
    ),
});

// ------------------------------------------------------------------
// Schema for "specialist"
const specialistSchema = baseSchema.extend({
  locationOption: z.literal('specialist'),
  district: z.string().optional(),
  street: z.string().optional(),
  house: z.string().optional(),
});

// ------------------------------------------------------------------
// Combined schema based on locationOption
export const bookingSchema = z
  .discriminatedUnion('locationOption', [customerSchema, specialistSchema])
  .superRefine((data, ctx) => {
    // Weight is required only for dogs
    if (data.animal === 'собаки' && !data.weight) {
      ctx.addIssue({
        code: 'custom',
        path: ['weight'],
        message: 'Оберіть вагу собаки',
      });
    }
  });

export type BookingSchemaType = z.infer<typeof bookingSchema>;

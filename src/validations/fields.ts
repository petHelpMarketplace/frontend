import { emailRegex, nameRegex } from '@/shared/constants/regex';
import { z } from 'zod';

export const nameField = z
  .string({
    required_error: 'Поле обов’язкове',
  })
  .min(2, 'Має містити мінімум 2 символи')
  .max(100, 'Не може перевищувати 100 символів')
  .regex(nameRegex, 'Може містити тільки літери, апострофи та дефіси.');

export const emailField = z
  .string({
    required_error: 'Email обов’язковий',
  })
  .max(255, 'Email не може перевищувати 255 символів')
  .regex(emailRegex, 'Невірний формат email');

export const animalField = z.enum(['собаки', 'коти']);
export const serviceField = z.string({ required_error: 'Оберіть послугу' });

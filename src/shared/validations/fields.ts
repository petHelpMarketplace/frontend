/**
 * Reusable Zod field schemas used across multiple features.
 * Use these fields in your form schemas to keep validation consistent.
 *
 * Example usage:
 *   import { nameField } from '@/shared/validations/fields';
 *
 *   const schema = z.object({
 *     name: nameField,
 *     email: emailField,
 *     phone: phoneField.optional(),
 *   });
 */

import { animals } from '@/shared/constants/animals';
import {
  emailRegex,
  lowerCaseRegex,
  nameRegex,
  numberRegex,
  specialCharRegex,
  upperCaseRegex,
} from '@/shared/constants/regex';
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

export const passwordField = z
  .string({
    required_error: 'Пароль обов’язковий',
  })
  .min(12, 'Пароль має містити мінімум 12 символів')
  .regex(upperCaseRegex, 'Пароль має містити хоча б одну велику літеру')
  .regex(lowerCaseRegex, 'Пароль має містити хоча б одну малу літеру')
  .regex(numberRegex, 'Пароль має містити хоча б одну цифру')
  .regex(specialCharRegex, 'Пароль має містити хоча б один спеціальний символ');

export const phoneField = z
  .string({
    required_error: 'Номер телефону обов’язковий',
  })
  .min(10, 'Введіть коректний номер телефону');

export const animalField = z.enum(animals);
export const serviceField = z.string({ required_error: 'Оберіть послугу' });

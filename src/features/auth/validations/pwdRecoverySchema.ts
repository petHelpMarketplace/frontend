import { emailField } from '@/shared/validations/fields';
import { z } from 'zod';

export const pwdRecoverySchema = z.object({
  email: emailField.trim(),
});

export type PwdRecoverySchemaType = z.infer<typeof pwdRecoverySchema>;

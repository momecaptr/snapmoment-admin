import { z } from 'zod';

// Сообщения об ошибках
const errorMessages = {
  invalidEmailFormat: 'Invalid email format',
  required: 'Required',
};
const adminPasswordRules = z
  .string()
  .refine((val) => val === "admin", {
    message: "Wrong password",
  });

const commonEmailRules = z
  .string()
  .min(1, { message: errorMessages.required })
  .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, { message: errorMessages.invalidEmailFormat });

export const signInAdminSchema = z.object({
  email: commonEmailRules,
  password: adminPasswordRules
});
export type SignInAdminSchemaType = z.infer<typeof signInAdminSchema>;

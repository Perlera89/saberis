import { z } from "zod";

const emailSchema = z
  .string()
  .email("Correo electrónico inválido")
  .min(1, "El correo electrónico es requerido");

const passwordSchema = z
  .string()
  .min(6, "La contraseña debe tener al menos 6 caracteres");

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "El nombre de usuario debe tener al menos 2 caracteres")
      .min(1, "Nombre de usuario es requerido"),
    email: emailSchema,
    role: z.enum(["student", "teacher"], {
      errorMap: () => ({ message: "Rol inválido" }),
    }),
    thunbnail: z.string().optional(),
    password: passwordSchema
      .regex(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
      .regex(/[0-9]/, "La contraseña debe tener al menos un número")
      .regex(
        /[^a-zA-Z0-9]/,
        "La contraseña debe tener al menos un carácter especial"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type RegisterSchemaData = z.infer<typeof registerSchema>;
export type LoginSchemaData = z.infer<typeof loginSchema>;

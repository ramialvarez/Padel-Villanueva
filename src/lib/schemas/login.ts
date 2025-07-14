import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("El email es obligatorio")
    .email("El formato de email no es valido"),
  password: z
    .string()
    .nonempty("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

import { z } from "zod";

export const grupoSchema = z.object({
  grupos: z.array(
    z.object({
      nombre: z.string(),
      parejas: z
        .array(z.string())
        .min(1, "Debe seleccionar al menos una pareja"),
    })
  ),
});

export type GrupoFormData = z.infer<typeof grupoSchema>;

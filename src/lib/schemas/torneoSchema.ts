import { GeneroTorneo, CategoriaTorneo } from "@/constants/torneo";
import { z } from "zod";

export const torneoSchema = z.object({
  titulo: z.string().min(3, "Debe tener al menos 3 caracteres"),
  imagen: z
    .instanceof(File, { message: "Debés subir una imagen válida" })
    .nullable(),
  fecha_inicio: z.string().min(1, "La fecha de inicio es requerida"),
  fecha_fin: z.string().min(1, "La fecha de fin es requerida"),
  genero: z.nativeEnum(GeneroTorneo).optional(),
  categoria: z.nativeEnum(CategoriaTorneo).optional(),
});

export type TorneoFormData = z.infer<typeof torneoSchema>;

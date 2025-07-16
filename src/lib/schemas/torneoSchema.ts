import { Genero, CategoriaTorneo } from "@/constants/torneo";
import { z } from "zod";

export const torneoSchema = z.object({
  titulo: z.string().min(3, "Debe tener al menos 3 caracteres"),
  imagen: z.string().url().optional(),
  fecha_inicio: z.coerce.date(),
  fecha_fin: z.coerce.date(),
  genero: z.nativeEnum(Genero),
  categoria: z.nativeEnum(CategoriaTorneo),
});

export type TorneoFormData = z.infer<typeof torneoSchema>;

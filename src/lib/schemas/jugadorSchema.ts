import { GeneroJugador, CategoriaJugador } from "@/constants/torneo";
import { z } from "zod";

export const jugadorSchema = z.object({
  nombre: z.string(),
  imagen: z
    .instanceof(File, { message: "Debés subir una imagen válida" })
    .nullable(),
  genero: z.nativeEnum(GeneroJugador).optional(),
  categoria: z.nativeEnum(CategoriaJugador).optional(),
  observado: z.boolean(),
});

export type JugadorFormData = z.infer<typeof jugadorSchema>;

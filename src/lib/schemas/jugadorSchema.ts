import { GeneroJugador, CategoriaJugador } from "@/constants/torneo";
import { z } from "zod";

export const jugadorSchema = z.object({
  nombre: z.string(),
  imagen: z.string().url().optional(),
  genero: z.nativeEnum(GeneroJugador),
  categoria: z.nativeEnum(CategoriaJugador),
  observado: z.boolean(),
});

export type JugadorFormData = z.infer<typeof jugadorSchema>;

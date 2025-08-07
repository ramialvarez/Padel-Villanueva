import { z } from "zod";

export const parejaSchema = z
  .object({
    jugador1: z.string().min(1, "Seleccioná un jugador 1"),
    jugador2: z.string().min(1, "Seleccioná un jugador 2"),
  })
  .refine((data) => data.jugador1 !== data.jugador2, {
    message: "Los jugadores deben ser diferentes",
    path: ["jugador2"],
  });

export type parejaFormData = z.infer<typeof parejaSchema>;

import { z } from "zod";
import type { Database } from "@/types/supabase";

type Player = Database["public"]["Tables"]["jugadores"]["Row"];

export const jugadorTorneoSchema = z.object({
  jugadores: z.array(z.custom<Player>()),
});

export type jugadorTorneoFormData = z.infer<typeof jugadorTorneoSchema>;

import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";
import { addToast } from "@heroui/react";
import type { ParejaFormData } from "@/lib/schemas/parejaSchema";

type Pareja = Database["public"]["Tables"]["parejas"]["Row"];
type NewPareja = Database["public"]["Tables"]["parejas"]["Insert"];
type UpdatePareja = Database["public"]["Tables"]["parejas"]["Update"];

export async function getParejasTournament(
  torneoId: string | undefined
): Promise<Pareja[]> {
  const { data, error } = await supabase
    .from("parejas")
    .select("*")
    .eq("torneo_id", torneoId);

  if (error) {
    throw new Error("Error al obtener las parejas del torneo" + error);
  }

  console.log("PAREJAS", data);
  return data;
}

export async function getParejaById(
  id: string | undefined
): Promise<Pareja | null> {
  const { error, data } = await supabase
    .from("parejas")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Error al obtener la pareja" + error);
  }

  return data;
}

export async function handleCreatePareja(
  data: ParejaFormData[],
  torneoId: string
) {
  try {
    for (const p of data) {
      const pareja: NewPareja = {
        jugador_uno: p.jugador1,
        jugador_dos: p.jugador2,
        torneo_id: torneoId,
        games_jugados: 0,
        games_ganados: 0,
        games_perdidos: 0,
        partidos_jugados: 0,
        partidos_ganados: 0,
        partidos_perdidos: 0,
        sets_jugados: 0,
        sets_ganados: 0,
        sets_perdidos: 0,
      };

      await insertPareja(pareja);

      addToast({
        title: "Pareja insertada correctamente",
        color: "success",
      });
    }
  } catch (error) {
    addToast({
      title: "Error al insertar la pareja " + error,
      color: "danger",
    });
    throw error;
  }
}

export async function insertPareja(pareja: NewPareja): Promise<Pareja> {
  const { data, error } = await supabase
    .from("parejas")
    .insert(pareja)
    .select()
    .single();

  if (error) throw new Error("Error al crear la pareja" + error.message);

  return data;
}

/* export async function handleUpdatePlayer(
  data: JugadorFormData,
  id: string | undefined
) {
  try {
    const player: UpdatePlayer = {
      id: id,
      nombre: data.nombre,
      categoria: String(data.categoria),
      genero: String(data.genero),
      observado: data.observado,
    };

    await updatePlayer(player);

    addToast({
      title: "Jugador editado correctamente",
      color: "success",
    });
  } catch (error) {
    addToast({
      title: "Error al editar el jugador " + error,
      color: "danger",
    });
    throw error;
  }
}

export async function updatePlayer(player: UpdatePlayer): Promise<Player> {
  const { data, error } = await supabase
    .from("jugadores")
    .update(player)
    .eq("id", player.id)
    .select()
    .single();

  if (error) throw new Error("Error al editar el jugador" + error.message);

  return data;
}

export async function deletePlayer(id: string, nombre: string) {
  const { error } = await supabase.from("jugadores").delete().eq("id", id);

  if (error) {
    console.error("Error eliminando jugador:", error);
    throw new Error("Error al eliminar el jugador");
  }

  console.log("Jugador eliminado exitosamente");
} */

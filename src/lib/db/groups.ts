import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";
import { addToast } from "@heroui/react";
import type { GrupoFormData } from "@/lib/schemas/grupoSchema";
import { asignarParejaAGrupo } from "@/lib/db/parejas";

type Grupo = Database["public"]["Tables"]["grupos"]["Row"];
type NewGrupo = Database["public"]["Tables"]["grupos"]["Insert"];
type UpdateGrupo = Database["public"]["Tables"]["grupos"]["Update"];

export async function handleCreateGroup(data: GrupoFormData, torneoId: string) {
  try {
    for (const grupo of data.grupos) {
      const nuevoGrupo: NewGrupo = {
        torneo_id: torneoId,
        nombre: grupo.nombre,
      };

      const grupoCreado = await insertGroup(nuevoGrupo);

      // 2. Asignar cada pareja al grupo recién creado
      for (const parejaId of grupo.parejas) {
        await asignarParejaAGrupo(parejaId, grupoCreado.id);
      }
    }

    addToast({
      title: "Grupos creados correctamente",
      color: "success",
    });
  } catch (error) {
    addToast({
      title: "Error al crear los grupos: " + error,
      color: "danger",
    });
    throw error;
  }
}

export async function insertGroup(grupo: NewGrupo): Promise<Grupo> {
  const { data, error } = await supabase
    .from("grupos")
    .insert(grupo)
    .select()
    .single();

  if (error) throw new Error("Error al crear el grupo" + error.message);

  return data;
}

import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";
import { addToast } from "@heroui/react";
import { type JugadorFormData } from "@/lib/schemas/jugadorSchema";

type Player = Database["public"]["Tables"]["jugadores"]["Row"];
type NewPlayer = Database["public"]["Tables"]["jugadores"]["Insert"];

export async function getAllPlayers(
  page: number,
  limit: number,
  filters: { search: string; genero: string; categoria: string }
): Promise<{ data: Player[]; count: number }> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("jugadores")
    .select("*", { count: "exact" })
    .order("nombre", { ascending: true })
    .range(from, to);

  if (filters.genero) {
    query = query.eq("genero", filters.genero);
  }

  if (filters.categoria) {
    query = query.eq("categoria", filters.categoria);
  }

  if (filters.search) {
    query = query.ilike("nombre", `%${filters.search}%`);
  }

  const { data, count, error } = await query;

  if (error) throw error;

  return { data: data ?? [], count: count ?? 0 };
}

export async function handleCreatePlayer(data: JugadorFormData) {
  try {
    let imageUrl: string | null = null;

    if (data.imagen) {
      imageUrl = await uploadImage(data.imagen, data.nombre);
    }

    const player: NewPlayer = {
      nombre: data.nombre,
      categoria: data?.categoria,
      genero: data?.genero,
      observado: data.observado,
      imagen: imageUrl,
    };

    await insertPlayer(player);

    addToast({
      title: "Jugador insertado correctamente",
      color: "success",
    });
  } catch (error) {
    addToast({
      title: "Error al insertar el jugador " + error,
      color: "danger",
    });
    throw error;
  }
}

export async function insertPlayer(player: NewPlayer): Promise<Player> {
  const { data, error } = await supabase
    .from("jugadores")
    .insert(player)
    .select()
    .single();

  if (error) throw new Error("Error al crear el jugador" + error.message);

  return data;
}

export async function deletePlayer(id: string) {
  const { error } = await supabase.from("jugadores").delete().eq("id", id);

  if (error) {
    throw new Error("Error al eliminar el jugador");
  }
}

export async function uploadImage(
  file: File,
  playerName: string
): Promise<string> {
  const slugPlayer = playerName.toLowerCase().replace(/\s+/g, "-");
  const safeFileName = file.name.replace(/\s+/g, "-").toLowerCase();
  const path = `${slugPlayer}/${safeFileName}`;

  const { data: existingFiles, error: listError } = await supabase.storage
    .from("jugadores")
    .list(slugPlayer);

  if (listError) throw listError;

  const alreadyExists = existingFiles?.some(
    (item) => item.name === safeFileName
  );

  if (alreadyExists) {
    const confirmOverwrite = window.confirm(
      `Ya existe un archivo llamado "${safeFileName}" en la carpeta "${slugPlayer}". ¿Deseás reemplazarlo?`
    );
    if (!confirmOverwrite)
      return supabase.storage.from("jugadores").getPublicUrl(path).data
        .publicUrl;
  }

  const { error: uploadError } = await supabase.storage
    .from("jugadores")
    .upload(path, file, {
      upsert: true,
      cacheControl: "3600",
      contentType: file.type,
    });

  if (uploadError) {
    throw uploadError;
  }

  const urlPublica = supabase.storage.from("jugadores").getPublicUrl(path)
    .data.publicUrl;
  return urlPublica;
}

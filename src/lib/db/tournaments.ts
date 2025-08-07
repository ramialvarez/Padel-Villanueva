import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";
import { addToast } from "@heroui/react";
import { type TorneoFormData } from "@/lib/schemas/torneoSchema";

type Tournament = Database["public"]["Tables"]["torneos"]["Row"];
type NewTournament = Database["public"]["Tables"]["torneos"]["Insert"];
type UpdateTournament = Database["public"]["Tables"]["torneos"]["Update"];

export async function getAllTournaments(
  page: number,
  limit: number,
  filters: {
    search: string;
    fecha_inicio: string;
    fecha_fin: string;
    genero: string;
    categoria: string;
  }
): Promise<{ data: Tournament[]; count: number }> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("torneos")
    .select("*", { count: "exact" })
    .order("titulo", { ascending: true })
    .range(from, to);

  if (filters.genero) {
    query = query.eq("genero", filters.genero);
  }

  if (filters.categoria) {
    query = query.eq("categoria", filters.categoria);
  }

  if (filters.search) {
    query = query.ilike("titulo", `%${filters.search}%`);
  }

  if (filters.fecha_inicio) {
    query = query.eq("fecha_inicio", filters.fecha_inicio);
  }

  if (filters.fecha_fin) {
    query = query.eq("fecha_fin", filters.fecha_fin);
  }

  const { data, count, error } = await query;

  if (error) throw error;

  return { data: data ?? [], count: count ?? 0 };
}

export async function getTorneoById(
  id: string | undefined
): Promise<Tournament | null> {
  const { error, data } = await supabase
    .from("torneos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Error al obtener el torneo" + error);
  }

  return data;
}

export async function handleCreateTournament(data: TorneoFormData) {
  try {
    let imageUrl: string | null = null;

    if (data.imagen) {
      imageUrl = await uploadImage(
        data.imagen,
        data.titulo,
        String(data.fecha_inicio)
      );
    }

    const tournament: NewTournament = {
      titulo: data.titulo,
      fecha_inicio: String(data.fecha_inicio),
      fecha_fin: String(data.fecha_fin),
      estado: "En curso",
      categoria: String(data?.categoria),
      genero: String(data?.genero),
      imagen: imageUrl,
    };

    const createdTournament = await insertTournament(tournament);

    addToast({
      title: "Torneo insertado correctamente",
      color: "success",
    });

    return createdTournament;
  } catch (error) {
    addToast({
      title: "Error al insertar el torneo " + error,
      color: "danger",
    });
    console.log(error);
    throw error;
  }
}

export async function insertTournament(
  tournament: NewTournament
): Promise<Tournament> {
  const { data, error } = await supabase
    .from("torneos")
    .insert(tournament)
    .select()
    .single();

  if (error) throw new Error("Error al crear el torneo" + error.message);

  return data;
}

export async function handleUpdateTournament(
  data: TorneoFormData,
  id: string | undefined
) {
  try {
    const tournament: UpdateTournament = {
      id: id,
      titulo: data.titulo,
      fecha_inicio: String(data.fecha_inicio),
      fecha_fin: String(data.fecha_fin),
      categoria: String(data?.categoria),
      genero: String(data?.genero),
    };

    // Solo si se subió una nueva imagen, la procesamos
    if (data.imagen) {
      const imageUrl = await uploadImage(
        data.imagen,
        data.titulo,
        String(data.fecha_inicio)
      );
      tournament.imagen = imageUrl;
    }

    await updateTournament(tournament);

    addToast({
      title: "Torneo editado correctamente",
      color: "success",
    });
  } catch (error) {
    addToast({
      title: "Error al editar el torneo " + error,
      color: "danger",
    });
    throw error;
  }
}

export async function updateTournament(
  tournament: UpdateTournament
): Promise<Tournament> {
  const { data, error } = await supabase
    .from("torneos")
    .update(tournament)
    .eq("id", tournament.id)
    .select()
    .single();

  if (error) throw new Error("Error al editar el torneo" + error.message);

  return data;
}

export async function deleteTournament(
  id: string,
  titulo: string,
  fecha: string
) {
  try {
    await eliminarImagenes(titulo, fecha);

    const { error } = await supabase.from("torneos").delete().eq("id", id);

    if (error) {
      console.error("Error eliminando torneo:", error);
      throw new Error("Error al eliminar el torneo");
    }

    console.log("Torneo eliminado exitosamente");
  } catch (error) {
    console.error("Error en deleteTournament:", error);
    throw error;
  }
}

export async function eliminarImagenes(tournamentTitle: string, date: string) {
  const folderPath = tournamentTitle
    .replace(",", "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");

  const safeDate = date.trim();

  const fullPath = `${folderPath}/${safeDate}`;

  console.log("Intentando eliminar carpeta:", fullPath);

  const { data: files, error: listError } = await supabase.storage
    .from("torneos")
    .list(fullPath + "/", { limit: 100 });

  if (listError) {
    console.error("Error listando archivos:", listError);
    throw new Error("No se pudo listar la carpeta.");
  }

  if (!files || files.length === 0) {
    console.log("No hay archivos para eliminar.");
    return;
  }

  files.forEach((f) => console.log("Archivo encontrado:", f.name));

  const filesToDelete = files.map((file) => `${fullPath}/${file.name}`);
  console.log("Archivos a eliminar:", filesToDelete);

  const { data: removed, error: removeError } = await supabase.storage
    .from("torneos")
    .remove(filesToDelete);

  if (removeError) {
    console.error("Error eliminando archivos:", removeError);
    throw new Error("No se pudieron eliminar los archivos.");
  }

  console.log("Archivos eliminados con éxito:", removed);
}

export async function uploadImage(
  file: File,
  tournamentTitle: string,
  date: string // formato ISO: "2025-09-14"
): Promise<string> {
  const safeTournamentTitle = tournamentTitle
    .replace(",", "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");

  const safeDate = date.trim(); // aseguramos que no tenga espacios

  const safeFileName = file.name.replace(/\s+/g, "-").toLowerCase();
  const path = `${safeTournamentTitle}/${safeDate}/${safeFileName}`;

  const { data: existingFiles, error: listError } = await supabase.storage
    .from("torneos")
    .list(`${safeTournamentTitle}/${safeDate}`);

  if (listError) throw listError;

  const alreadyExists = existingFiles?.some(
    (item) => item.name === safeFileName
  );

  if (alreadyExists) {
    const confirmOverwrite = window.confirm(
      `Ya existe un archivo llamado "${safeFileName}" en "${safeTournamentTitle}/${safeDate}". ¿Deseás reemplazarlo?`
    );
    if (!confirmOverwrite)
      return supabase.storage.from("torneos").getPublicUrl(path).data.publicUrl;
  }

  const { error: uploadError } = await supabase.storage
    .from("torneos")
    .upload(path, file, {
      upsert: true,
      cacheControl: "3600",
      contentType: file.type,
    });

  if (uploadError) {
    throw uploadError;
  }

  return supabase.storage.from("torneos").getPublicUrl(path).data.publicUrl;
}

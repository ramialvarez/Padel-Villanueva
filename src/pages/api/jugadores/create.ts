import { getSessionFromAstroCookies } from "@/lib/getSession";
import { supabase } from "@/lib/supabase";
import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const formData = await request.formData();

    const nombre = formData.get("nombre") as string;
    const categoria = formData.get("categoria") as string;
    const genero = formData.get("genero") as string;
    const observado = formData.get("observado") === "true";
    const imagen = formData.get("imagen") as File | null;

    if (!nombre || !categoria || !genero) {
      return new Response(
        JSON.stringify({
          error: "Faltan campos obligatorios",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    let imageUrl: string | null = null;

    if (imagen && imagen.size > 0) {
      imageUrl = await uploadImageServer(imagen, nombre);
    }

    const playerData = {
      nombre: nombre,
      imagen: imageUrl,
      genero: genero,
      categoria: categoria,
      observado: observado,
    };

    const { data, error } = await supabase
      .from("jugadores")
      .insert(playerData)
      .select()
      .single();

    if (error) {
      throw new Error("Error al crear el jugador: " + error.message);
    }

    return new Response(
      JSON.stringify({
        success: true,
        data,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Error desconocido",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

async function uploadImageServer(
  file: File,
  playerName: string
): Promise<string> {
  const slugPlayer = playerName.toLowerCase().replace(/\s+/g, "-");
  const safeFileName = file.name.replace(/\s+/g, "-").toLowerCase();
  const path = `${slugPlayer}/${safeFileName}`;

  // Verificar si existe
  const { data: existingFiles, error: listError } = await supabase.storage
    .from("jugadores")
    .list(slugPlayer);

  if (listError) throw listError;

  // Subir archivo (con upsert para sobrescribir si existe)
  const { error: uploadError } = await supabase.storage
    .from("jugadores")
    .upload(path, file, {
      upsert: true,
      cacheControl: "3600",
      contentType: file.type,
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("jugadores").getPublicUrl(path);
  return data.publicUrl;
}

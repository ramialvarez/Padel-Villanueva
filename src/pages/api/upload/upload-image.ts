import { supabase } from "@/lib/supabase";
import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const imagen = formData.get("file") as File;
    const playerName = formData.get("playerName") as string;

    console.log("Datos recibidos:", {
      hasImage: !!imagen,
      imageSize: imagen?.size,
      playerName,
    });

    if (!imagen || !playerName) {
      return new Response(
        JSON.stringify({ error: "Faltan datos requeridos" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (imagen.size === 0) {
      return new Response(JSON.stringify({ error: "El archivo está vacío" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const imageUrl = await uploadImageServer(imagen, playerName);

    console.log("Upload exitoso, URL:", imageUrl);

    return new Response(JSON.stringify({ url: imageUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error uploading image:", error);

    return new Response(
      JSON.stringify({
        error: "Error al subir imagen",
        details: error instanceof Error ? error.message : String(error),
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

  console.log("Intentando subir archivo:", {
    path,
    fileType: file.type,
    fileSize: file.size,
  });

  try {
    // Verificar si el archivo ya existe
    const { data: existingFiles, error: listError } = await supabase.storage
      .from("jugadores")
      .list(slugPlayer);

    if (listError) {
      console.error("Error listando archivos:", listError);
      throw new Error(
        `Error verificando archivos existentes: ${listError.message}`
      );
    }

    const alreadyExists = existingFiles?.some(
      (item) => item.name === safeFileName
    );
    console.log("Archivo ya existe:", alreadyExists);

    // Subir el archivo
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("jugadores")
      .upload(path, file, {
        upsert: alreadyExists,
        cacheControl: "3600",
        contentType: file.type,
      });

    if (uploadError) {
      console.error("Error de upload:", uploadError);
      throw new Error(`Error subiendo archivo: ${uploadError.message}`);
    }

    console.log("Upload data:", uploadData);

    // Obtener la URL pública
    const { data: urlData } = supabase.storage
      .from("jugadores")
      .getPublicUrl(path);

    console.log("URL pública generada:", urlData.publicUrl);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error en uploadImageServer:", error);
    throw error;
  }
}

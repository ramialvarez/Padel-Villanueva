import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

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
    .select("*", { count: "exact" }) // importante para paginación
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

export async function insertPlayer(Player: NewPlayer) {}

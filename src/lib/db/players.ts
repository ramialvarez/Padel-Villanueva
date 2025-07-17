import { supabase } from "@/lib/supabase";

export async function getAllPlayers() {
  return await supabase.from("jugadores").select("*");
}

export async function createPlayer() {}

import { getAllPlayers } from "@/lib/db/players";
import { useEffect, useState } from "react";

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    const { data, error } = await getAllPlayers();
    if (!error) setPlayers(data);
  };
}

import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/store/queryClient";
import { getAllPlayers, insertPlayer } from "@/lib/db/players";
import type { Database } from "@/types/supabase";

type Player = Database["public"]["Tables"]["jugadores"]["Row"];
type NewPlayer = Database["public"]["Tables"]["jugadores"]["Insert"];

export function usePlayers(
  page = 1,
  limit = 10,
  filters: { search: string; genero: string; categoria: string }
) {
  const playersQuery = useQuery<{
    data: Player[];
    count: number;
  }>(
    {
      queryKey: ["jugadores", page, filters],
      queryFn: () => getAllPlayers(page, limit, filters),
      staleTime: 1000 * 60 * 5,
    },
    queryClient
  );

  const createPlayer = useMutation(
    {
      mutationFn: (player: NewPlayer) => insertPlayer(player),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["jugadores"] });
      },
    },
    queryClient
  );

  return {
    players: playersQuery.data?.data,
    totalCount: playersQuery.data?.count,
    isLoading: playersQuery.isLoading,
    isError: playersQuery.isError,
    createPlayer: createPlayer.mutate,
    isCreating: createPlayer.isPending,
  };
}

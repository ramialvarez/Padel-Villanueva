import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/store/queryClient";
import {
  getAllPlayers,
  handleCreatePlayer,
  deletePlayer,
} from "@/lib/db/players";
import type { Database } from "@/types/supabase";
import { type JugadorFormData } from "@/lib/schemas/jugadorSchema";
import { addToast } from "@heroui/react";

type Player = Database["public"]["Tables"]["jugadores"]["Row"];

export function usePlayers(
  page = 1,
  limit = 10,
  filters?: { search: string; genero: string; categoria: string }
) {
  const playersQuery = useQuery<{
    data: Player[];
    count: number;
  }>(
    {
      queryKey: ["jugadores", page, filters],
      queryFn: () =>
        getAllPlayers(
          page,
          limit,
          filters || { search: "", genero: "", categoria: "" }
        ),
      staleTime: 1000 * 60 * 5,
    },
    queryClient
  );

  const createPlayer = useMutation(
    {
      mutationFn: (formData: JugadorFormData) => handleCreatePlayer(formData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["jugadores"] });
        window.location.replace("/admin/jugadores/listado");
      },
    },
    queryClient
  );

  const eliminarJugador = useMutation<
    void,
    Error,
    { id: string; nombre: string }
  >(
    {
      mutationFn: ({ id, nombre }) => deletePlayer(id, nombre),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["jugadores"] });
        queryClient.refetchQueries({ queryKey: ["jugadores"] });

        addToast({
          title: "Jugador eliminado correctamente",
          color: "success",
        });
      },
      onError: (error) => {
        addToast({
          title:
            "Error al eliminar el jugador: " +
            (error instanceof Error ? error.message : String(error)),
          color: "danger",
        });
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
    delatePlayer: eliminarJugador.mutate,
    isDeleting: eliminarJugador.isPending,
  };
}

import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/store/queryClient";
import {
  getAllPlayers,
  getPlayerById,
  handleCreatePlayer,
  handleUpdatePlayer,
  deletePlayer,
} from "@/lib/db/players";
import { addToast } from "@heroui/react";
import type { JugadorFormData } from "@/lib/schemas/jugadorSchema";

export function usePlayers(
  page = 1,
  limit = 10,
  filters?: { search: string; genero: string; categoria: string }
) {
  const query = useQuery(
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

  return {
    players: query.data?.data ?? [],
    count: query.data?.count ?? 0,
    isLoading: query.isLoading,
    error: query.error,
  };
}

export function usePlayer(id?: string | undefined) {
  const getPlayer = useQuery(
    {
      queryKey: ["jugador", id],
      queryFn: () => getPlayerById(id),
      staleTime: 1000 * 60 * 5,
    },
    queryClient
  );

  return {
    player: getPlayer?.data,
    isLoading: getPlayer.isLoading,
  };
}

export function useCreatePlayer() {
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

  return {
    createPlayer: createPlayer.mutate,
    isCreating: createPlayer.isPending,
  };
}

export function useUpdatePlayer() {
  const updatePlayer = useMutation<
    void,
    Error,
    { formData: JugadorFormData; id: string | undefined }
  >(
    {
      mutationFn: ({ formData, id }) => handleUpdatePlayer(formData, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["jugadores"] });
        window.location.replace("/admin/jugadores/listado");
      },
    },
    queryClient
  );

  return {
    updatePlayer: updatePlayer.mutate,
    isUpdating: updatePlayer.isPending,
  };
}

export function useDeletePlayer() {
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
          title: "Error al eliminar el jugador: " + error.message,
          color: "danger",
        });
      },
    },
    queryClient
  );

  return {
    deletePlayer: eliminarJugador.mutate,
    isDeleting: eliminarJugador.isPending,
  };
}

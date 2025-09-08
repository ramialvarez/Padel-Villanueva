import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/store/queryClient";
import { handleCreateGroup } from "@/lib/db/groups";
import { addToast } from "@heroui/react";
import type { GrupoFormData } from "@/lib/schemas/grupoSchema";

/*export function useGrupos() {
  const query = useQuery(
    {
      queryKey: ["grupos"],
      queryFn: () => getAllGroups(),
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
}*/

/*export function useTournamentGroups({
  genero = "",
  categoria = "",
}: TournamentPlayersOptions) {
  const query = useQuery(
    {
      queryKey: ["jugadoresTorneo", genero, categoria],
      queryFn: () => getQualifiedPlayers(genero, categoria),
      staleTime: 1000 * 60 * 5,
    },
    queryClient
  );

  return {
    jugadoresAptos: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}*/

/*export function usePlayer(id?: string | undefined) {
  const getPlayer = useQuery(
    {
      queryKey: ["grupo", id],
      queryFn: () => getPlayerById(id),
      staleTime: 1000 * 60 * 5,
    },
    queryClient
  );

  return {
    player: getPlayer?.data,
    isLoading: getPlayer.isLoading,
  };
}*/

export function useCreateGroup(idTorneo?: string | undefined) {
  const createGrupo = useMutation<
    void,
    Error,
    { data: GrupoFormData; idTorneo: string }
  >(
    {
      mutationFn: ({ data, idTorneo }) => handleCreateGroup(data, idTorneo),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["grupos"] });
        window.location.replace(`/admin/torneos/${idTorneo}/añadirGrupos`);
      },
    },
    queryClient
  );

  return {
    createGrupo: createGrupo.mutate,
    isCreating: createGrupo.isPending,
  };
}

/* export function useUpdatePlayer() {
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
} */

/*export function useDeletePlayer() {
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
}*/

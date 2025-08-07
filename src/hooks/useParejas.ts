import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/store/queryClient";
import {
  getParejasTournament,
  getParejaById,
  handleCreatePareja,
} from "@/lib/db/parejas";
import { addToast } from "@heroui/react";
import type { ParejaFormData } from "@/lib/schemas/parejaSchema";

type TournamentPlayersOptions = {
  genero?: string;
  categoria?: string;
};

export function useParejasTournament(id?: string | undefined) {
  const query = useQuery(
    {
      queryKey: ["parejas", id],
      queryFn: () => getParejasTournament(id),
      staleTime: 1000 * 60 * 5,
    },
    queryClient
  );

  return {
    parejas: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}

export function usePareja(id?: string | undefined) {
  const getPareja = useQuery(
    {
      queryKey: ["pareja", id],
      queryFn: () => getParejaById(id),
      staleTime: 1000 * 60 * 5,
    },
    queryClient
  );

  return {
    pareja: getPareja?.data,
    isLoading: getPareja.isLoading,
  };
}

export function useCreatePareja(idTorneo?: string | undefined) {
  const createPareja = useMutation<
    void,
    Error,
    { data: ParejaFormData[]; idTorneo: string }
  >(
    {
      mutationFn: ({ data, idTorneo }) => handleCreatePareja(data, idTorneo),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["torneos"] });
        window.location.replace(`/admin/torneos/${idTorneo}/añadirGrupos`);
      },
    },
    queryClient
  );

  return {
    createPareja: createPareja.mutate,
    isCreating: createPareja.isPending,
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
} */

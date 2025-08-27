import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/store/queryClient";
import {
  getAllTournaments,
  deleteTournament,
  getTorneoById,
  handleCreateTournament,
  handleUpdateTournament,
} from "@/lib/db/tournaments";
import { addToast } from "@heroui/react";
import type { TorneoFormData } from "@/lib/schemas/torneoSchema";

export function useTournaments(
  page = 1,
  limit = 10,
  filters?: {
    search: string;
    fecha_inicio: string;
    fecha_fin: string;
    genero: string;
    categoria: string;
  }
) {
  const query = useQuery(
    {
      queryKey: ["torneos", page, filters],
      queryFn: () =>
        getAllTournaments(
          page,
          limit,
          filters || {
            search: "",
            fecha_inicio: "",
            fecha_fin: "",
            genero: "",
            categoria: "",
          }
        ),
      staleTime: 1000 * 60 * 5,
    },
    queryClient
  );

  return {
    tournaments: query.data?.data ?? [],
    count: query.data?.count ?? 0,
    isLoading: query.isLoading,
    error: query.error,
  };
}

export function useTournament(id?: string | undefined) {
  const getTournament = useQuery(
    {
      queryKey: ["torneo", id],
      queryFn: () => getTorneoById(id),
      staleTime: 1000 * 60 * 5,
    },
    queryClient
  );

  return {
    tournament: getTournament?.data,
    isLoading: getTournament.isLoading,
  };
}

export function useCreateTournament() {
  const createTournament = useMutation(
    {
      mutationFn: (formData: TorneoFormData) =>
        handleCreateTournament(formData),
      onSuccess: (tournament) => {
        queryClient.invalidateQueries({ queryKey: ["torneos"] });
        if (tournament?.id) {
          window.location.replace(
            `/admin/torneos/${tournament.id}/agregarParejas`
          );
        }
      },
    },
    queryClient
  );

  return {
    createTournament: createTournament.mutate,
    isCreating: createTournament.isPending,
  };
}

export function useUpdateTournament() {
  const updateTournament = useMutation<
    void,
    Error,
    { formData: TorneoFormData; id: string | undefined }
  >(
    {
      mutationFn: ({ formData, id }) => handleUpdateTournament(formData, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["torneos"] });
        window.location.replace("/admin/torneos/listado");
      },
    },
    queryClient
  );

  return {
    updateTournament: updateTournament.mutate,
    isUpdating: updateTournament.isPending,
  };
}

export function useDeleteTournament() {
  const eliminarTorneo = useMutation<
    void,
    Error,
    { id: string; nombre: string; fecha: string }
  >(
    {
      mutationFn: ({ id, nombre, fecha }) =>
        deleteTournament(id, nombre, fecha),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["torneos"] });
        queryClient.refetchQueries({ queryKey: ["torneos"] });
        addToast({
          title: "Torneo eliminado correctamente",
          color: "success",
        });
      },
      onError: (error) => {
        addToast({
          title: "Error al eliminar el torneo: " + error.message,
          color: "danger",
        });
      },
    },
    queryClient
  );

  return {
    deleteTournament: eliminarTorneo.mutate,
    isDeleting: eliminarTorneo.isPending,
  };
}

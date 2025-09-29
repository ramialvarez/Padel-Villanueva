import { useMemo } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addToast, Button, Form, Select, SelectItem } from "@heroui/react";
import { grupoSchema, type GrupoFormData } from "@/lib/schemas/grupoSchema";
import { useParejasTournament } from "@/hooks/useParejas";
import { usePlayersByIds } from "@/hooks/usePlayers";
import { useCreateGroup } from "@/hooks/useGrupos";

type Props = {
  torneoId?: string;
};

export default function AñadirGrupoForm({ torneoId }: Props) {
  const { parejas } = useParejasTournament(torneoId);
  const { createGrupo, isCreating } = useCreateGroup(torneoId);

  // Obtener todos los jugadores únicos de las parejas
  const jugadoresIds = useMemo(() => {
    if (!parejas) return [];
    const ids = new Set<string>();
    parejas.forEach((pareja) => {
      if (pareja.jugador_uno) ids.add(pareja.jugador_uno);
      if (pareja.jugador_dos) ids.add(pareja.jugador_dos);
    });
    return Array.from(ids);
  }, [parejas]);

  // Obtener todos los jugadores necesarios de una vez
  const { playersMap, isLoading: loadingPlayers } =
    usePlayersByIds(jugadoresIds);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<GrupoFormData>({
    resolver: zodResolver(grupoSchema),
    defaultValues: { grupos: [] },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "grupos",
  });

  // Observar todos los grupos para saber qué parejas están ocupadas
  const watchedGroups = watch("grupos");

  // Obtener parejas ya asignadas a grupos
  const parejasAsignadas = useMemo(
    () => new Set(watchedGroups.flatMap((grupo) => grupo.parejas || [])),
    [watchedGroups]
  );

  // Parejas disponibles (no asignadas a ningún grupo)
  const parejasDisponibles = useMemo(
    () => parejas?.filter((pareja) => !parejasAsignadas.has(pareja.id)) || [],
    [parejas, parejasAsignadas]
  );

  const siguienteLetra = () => String.fromCharCode(65 + fields.length);

  const crearNuevoGrupo = () => {
    append({
      nombre: siguienteLetra(),
      parejas: [],
    });
  };

  const actualizarParejasGrupo = (
    grupoIndex: number,
    nuevasParejas: string[]
  ) => {
    const grupoActual = fields[grupoIndex];
    update(grupoIndex, {
      ...grupoActual,
      parejas: nuevasParejas,
    });
  };

  const eliminarGrupo = (index: number) => {
    remove(index);
    // Reordenar las letras de los grupos restantes
    const gruposActualizados = fields
      .filter((_, i) => i !== index)
      .map((grupo, i) => ({
        ...grupo,
        nombre: String.fromCharCode(65 + i),
      }));

    // Actualizar todos los grupos de una vez
    gruposActualizados.forEach((grupo, i) => {
      if (i < fields.length - 1) {
        update(i, grupo);
      }
    });
  };

  const onSubmit = (data: GrupoFormData) => {
    if (!torneoId) {
      addToast({
        title: "ID del torneo requerido",
        color: "danger",
      });
      return;
    }

    createGrupo({ data, idTorneo: torneoId });
  };

  // Función segura para obtener nombre de pareja
  const obtenerNombrePareja = useMemo(() => {
    if (!parejas || !playersMap) return () => "";

    return (parejaId: string) => {
      const pareja = parejas.find((p) => p.id === parejaId);
      if (!pareja) return parejaId;

      const jugadorUno = playersMap.get(pareja.jugador_uno);
      const jugadorDos = playersMap.get(pareja.jugador_dos);

      const nombreUno = jugadorUno?.nombre || `Jugador ${pareja.jugador_uno}`;
      const nombreDos = jugadorDos?.nombre || `Jugador ${pareja.jugador_dos}`;

      return `${nombreUno} - ${nombreDos}`;
    };
  }, [parejas, playersMap]);

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-6 max-w-4xl sm:mx-auto m-6 p-6 border border-gray-line rounded-xl shadow bg-white backdrop-blur-md relative top-0"
    >
      <div className="flex flex-col justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Añadir Grupos</h2>
        <Button
          type="button"
          onClick={crearNuevoGrupo}
          className="bg-bordo hover:bg-rojo-oscuro text-white"
        >
          + Crear Grupo {siguienteLetra()}
        </Button>
      </div>

      {loadingPlayers && (
        <div className="text-center py-8">
          <p className="text-gray-500">Cargando jugadores...</p>
        </div>
      )}

      {!loadingPlayers && fields.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 w-full">
          <p className="text-lg mb-2">No hay grupos creados</p>
          <p className="text-sm">Haz clic en "Crear Grupo A" para comenzar</p>
        </div>
      )}

      {!loadingPlayers && (
        <div className="space-y-6 w-full">
          {fields.map((grupo, index) => (
            <div
              key={grupo.id}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Grupo {grupo.nombre}
                </h3>
                <Button
                  type="button"
                  onClick={() => eliminarGrupo(index)}
                  className="bg-gray-700 hover:bg-gray-800 text-white"
                  size="sm"
                >
                  🗑️ Eliminar
                </Button>
              </div>

              <Controller
                control={control}
                name={`grupos.${index}.parejas`}
                render={({ field }) => (
                  <div className="space-y-4">
                    <Select
                      label={`Parejas para el Grupo ${grupo.nombre}`}
                      placeholder="Selecciona las parejas"
                      selectionMode="multiple"
                      selectedKeys={new Set(field.value || [])}
                      onSelectionChange={(keys) => {
                        const nuevasParejas = Array.from(keys as Set<string>);
                        field.onChange(nuevasParejas);
                        actualizarParejasGrupo(index, nuevasParejas);
                      }}
                      className="w-full"
                      isDisabled={
                        parejasDisponibles.length === 0 &&
                        (!field.value || field.value.length === 0)
                      }
                    >
                      {parejasDisponibles.map((pareja) => (
                        <SelectItem key={pareja.id} value={pareja.id}>
                          {obtenerNombrePareja(pareja.id)}
                        </SelectItem>
                      ))}
                    </Select>

                    {field.value && field.value.length > 0 && (
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <p className="text-sm font-medium text-gray-700 mb-3">
                          Parejas en el Grupo {grupo.nombre} (
                          {field.value.length}):
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {field.value.map((parejaId) => (
                            <div
                              key={parejaId}
                              className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-sm border border-blue-200"
                            >
                              {obtenerNombrePareja(parejaId)}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {(!field.value || field.value.length === 0) && (
                      <div className="text-gray-500 text-sm italic p-3 bg-white rounded-lg border border-gray-200">
                        No hay parejas asignadas a este grupo
                      </div>
                    )}
                  </div>
                )}
              />

              {errors.grupos?.[index]?.parejas && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.grupos[index]?.parejas?.message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {fields.length > 0 && !loadingPlayers && (
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              Grupos creados:{" "}
              <span className="font-medium">{fields.length}</span>
            </p>
            <p>
              Parejas asignadas:{" "}
              <span className="font-medium">{parejasAsignadas.size}</span> de{" "}
              <span className="font-medium">{parejas?.length || 0}</span>
            </p>
          </div>
          <div>
            <Button
              type="submit"
              isLoading={isCreating}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3"
              disabled={fields.length === 0}
            >
              Guardar Todos los Grupos
            </Button>
          </div>
        </div>
      )}

      {errors.grupos && typeof errors.grupos.message === "string" && (
        <div className="p-4 bg-red-50 border-t border-red-200">
          <p className="text-red-600 font-medium text-center">
            {errors.grupos.message}
          </p>
        </div>
      )}
    </Form>
  );
}

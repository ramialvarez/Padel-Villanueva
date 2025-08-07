import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Select, SelectItem } from "@heroui/react";
import LabelForm from "@/components/forms/LabelForm";
import { useTournament } from "@/hooks/useTournaments";
import { useTournamentPlayers } from "@/hooks/usePlayers";
import { parejaSchema, type ParejaFormData } from "@/lib/schemas/parejaSchema";
import { Trash2 } from "lucide-react";
import { useCreatePareja, useParejasTournament } from "@/hooks/useParejas";

type Props = {
  id?: string;
};

type Pareja = {
  jugador1: string;
  jugador2: string;
  esNueva: boolean;
};

export default function AñadirParejaForm({ id }: Props) {
  const { tournament } = useTournament(id);
  const { jugadoresAptos } = useTournamentPlayers({
    genero: tournament?.genero,
    categoria: tournament?.categoria,
  });

  const { createPareja, isCreating } = useCreatePareja(id);
  const { parejas: existentes, isLoading } = useParejasTournament(id);

  const {
    handleSubmit: handleAddSubmit,
    control,
    reset: resetAddForm,
  } = useForm<ParejaFormData>({
    resolver: zodResolver(parejaSchema),
    defaultValues: { jugador1: "", jugador2: "" },
  });

  const [parejas, setParejas] = useState<Pareja[]>([]);

  useEffect(() => {
    if (isLoading || !existentes) return;

    setParejas(
      existentes.map((p) => ({
        jugador1: p.jugador_uno,
        jugador2: p.jugador_dos,
        esNueva: false,
      }))
    );
  }, [existentes]);

  const addPlayer = (data: ParejaFormData) => {
    const jugadorYaUsado = parejas.some(
      (p) =>
        p.jugador1 === data.jugador1 ||
        p.jugador2 === data.jugador1 ||
        p.jugador1 === data.jugador2 ||
        p.jugador2 === data.jugador2
    );
    if (jugadorYaUsado) {
      alert("Uno o ambos jugadores ya están en una pareja");
      return;
    }
    setParejas((prev) => [...prev, { ...data, esNueva: true }]);
    resetAddForm();
  };

  const deletePareja = (index: number) => {
    setParejas((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmitFinal = () => {
    const nuevas = parejas.filter((p) => p.esNueva);
    if (nuevas.length === 0) return;
    createPareja({ data: nuevas, idTorneo: id! });
  };

  return (
    <div className="flex flex-col items-start justify-center gap-6 max-w-4xl sm:mx-auto m-6 p-6 border border-gray-line rounded-xl shadow bg-white backdrop-blur-md relative top-0">
      <h2 className="text-3xl font-bold">
        Añadir Parejas - {tournament?.titulo}
      </h2>

      <Form
        onSubmit={handleAddSubmit(addPlayer)}
        className="flex flex-row gap-4"
      >
        <Controller
          control={control}
          name="jugador1"
          render={({ field, fieldState: { error } }) => (
            <div className="flex flex-col gap-1 w-full">
              <LabelForm text="Jugador uno" obligatorio={true} />
              <Select
                className="w-xs"
                size="sm"
                items={jugadoresAptos}
                selectedKeys={field.value ? new Set([field.value]) : new Set()}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0] as string)
                }
                isInvalid={!!error}
                errorMessage={error?.message}
                label="Jugador uno"
              >
                {(item) => (
                  <SelectItem key={item.value}>{item.label}</SelectItem>
                )}
              </Select>
            </div>
          )}
        />

        <Controller
          control={control}
          name="jugador2"
          render={({ field, fieldState: { error } }) => (
            <div className="flex flex-col gap-1 w-full">
              <LabelForm text="Jugador dos" obligatorio={true} />
              <Select
                className="w-xs"
                size="sm"
                items={jugadoresAptos}
                selectedKeys={field.value ? new Set([field.value]) : new Set()}
                onSelectionChange={(keys) =>
                  field.onChange(Array.from(keys)[0] as string)
                }
                isInvalid={!!error}
                errorMessage={error?.message}
                label="Jugador dos"
              >
                {(item) => (
                  <SelectItem key={item.value}>{item.label}</SelectItem>
                )}
              </Select>
            </div>
          )}
        />

        <Button
          className="mt-10 w-full bg-bordo hover:bg-rojo-oscuro text-white"
          type="submit"
        >
          Agregar Jugador
        </Button>
      </Form>

      <div>
        <h3 className="text-2xl font-bold">Parejas</h3>
        <div>
          {isLoading ? (
            <p>Cargando parejas...</p>
          ) : parejas.length > 0 ? (
            <>
              <ul>
                {parejas.map((p, index) => (
                  <li key={index} className="flex gap-4 items-center">
                    {`${index + 1}. ${
                      jugadoresAptos.find((j) => j.value === p.jugador1)?.label
                    } - ${
                      jugadoresAptos.find((j) => j.value === p.jugador2)?.label
                    }`}
                    <button onClick={() => deletePareja(index)}>
                      <Trash2 className="size-4" color="#840414" />
                    </button>
                  </li>
                ))}
              </ul>

              <Button
                type="button"
                className="bg-gray-700 hover:bg-gray-text/80 text-gray-line mt-6"
                isLoading={isCreating}
                onClick={() => onSubmitFinal()}
              >
                Añadir Parejas
              </Button>
            </>
          ) : (
            <p>No hay parejas registradas</p>
          )}
        </div>
      </div>
    </div>
  );
}

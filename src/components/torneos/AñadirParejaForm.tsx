import { useEffect, useState } from "react";
import type { Database } from "@/types/supabase";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Select, SelectItem } from "@heroui/react";
import LabelForm from "@/components/forms/LabelForm";
import { useTournament } from "@/hooks/useTournaments";
import { useTournamentPlayers } from "@/hooks/usePlayers";
import { parejaSchema, type parejaFormData } from "@/lib/schemas/parejaSchema";
import { Trash2 } from "lucide-react";

type Pareja = {
  jugador1: {
    id: string;
    nombre: string;
  };
  jugador2: {
    id: string;
    nombre: string;
  };
};

type Props = {
  id?: string;
};

export default function AñadirParejaForm({ id }: Props) {
  const { tournament } = useTournament(id);
  const { jugadoresAptos } = useTournamentPlayers({
    genero: tournament?.genero,
    categoria: tournament?.categoria,
  });

  const { handleSubmit, control, getValues, resetField } =
    useForm<parejaFormData>({
      resolver: zodResolver(parejaSchema),
      defaultValues: {
        jugador1: "",
        jugador2: "",
      },
    });

  const [parejas, setParejas] = useState<Pareja[]>([]);

  useEffect(() => {}, []);

  const addPlayer = (jugador1Id: string, jugador2Id: string) => {
    const jugador1Data = jugadoresAptos.find((j) => j.value === jugador1Id);
    const jugador2Data = jugadoresAptos.find((j) => j.value === jugador2Id);

    if (!jugador1Data || !jugador2Data) return;

    const pareja: Pareja = {
      jugador1: { id: jugador1Id, nombre: jugador1Data.label },
      jugador2: { id: jugador2Id, nombre: jugador2Data.label },
    };

    setParejas((prev) => [...prev, pareja]);
    resetField("jugador1");
    resetField("jugador2");
  };

  /*const deletePareja = (index: number) => {
    const newParejas = parejas.splice(index, 1);
    setParejas([...newParejas]);
  };*/

  const deletePareja = (pareja: Pareja) => {
    const newParejas = parejas.filter(
      (p) =>
        p.jugador1.id != pareja.jugador1.id &&
        p.jugador2.id != pareja.jugador2.id
    );
    setParejas([...newParejas]);
  };

  const onSubmit = () => {};

  return (
    <Form className="flex flex-col items-start justify-center gap-6 max-w-4xl sm:mx-auto m-6 p-6 border border-gray-line rounded-xl shadow bg-white backdrop-blur-md relative top-0">
      <h2 className="text-3xl text-title-black font-bold">Añadir Parejas</h2>
      <div className="flex gap-4 w-full">
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
                onSelectionChange={(keys) => {
                  const selectedValue = Array.from(keys)[0];
                  field.onChange(selectedValue);
                }}
                isInvalid={!!error}
                errorMessage={error?.message}
                label="Selecciona un jugador"
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
                onSelectionChange={(keys) => {
                  const selectedValue = Array.from(keys)[0];
                  field.onChange(selectedValue);
                }}
                isInvalid={!!error}
                errorMessage={error?.message}
                label="Selecciona un jugador"
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
          size="md"
          onClick={() => {
            const { jugador1, jugador2 } = getValues();
            if (jugador1 === jugador2)
              return alert("Los jugadores deben ser distintos");

            const jugadorYaUsado = parejas.some(
              (p) =>
                p.jugador1.id === jugador1 ||
                p.jugador2.id === jugador1 ||
                p.jugador1.id === jugador2 ||
                p.jugador2.id === jugador2
            );

            if (jugadorYaUsado) {
              alert("Uno o ambos jugadores ya están en una pareja");
              return;
            }
            addPlayer(jugador1, jugador2);
          }}
        >
          Agregar Jugador
        </Button>
      </div>
      <div className="flex flex-col">
        <h3 className="text-2xl text-title-black font-bold">Parejas</h3>
        <ul>
          {parejas.length > 0 ? (
            parejas.map((pareja, index) => (
              <li
                className="flex items-center justify-center gap-8"
                key={index}
              >
                {index +
                  1 +
                  ". " +
                  pareja.jugador1.nombre +
                  " - " +
                  pareja.jugador2.nombre}
                <button
                  onClick={() => {
                    deletePareja(pareja);
                  }}
                >
                  <Trash2 className="size-4" color="#840414" />
                </button>
              </li>
            ))
          ) : (
            <p className="mt-2">No hay parejas registradas en el torneo</p>
          )}
        </ul>
      </div>
    </Form>
  );
}

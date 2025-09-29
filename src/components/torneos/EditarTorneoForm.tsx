import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { torneoSchema, type TorneoFormData } from "@/lib/schemas/torneoSchema";
import {
  generoTorneoOptions,
  categoriaTorneoOptions,
  GeneroTorneo,
  CategoriaTorneo,
} from "@/constants/torneo";
import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import LabelForm from "@/components/forms/LabelForm";
import { useTournament, useUpdateTournament } from "@/hooks/useTournaments";
import { useEffect } from "react";

type Props = {
  id: string | undefined;
};

export default function EditarTorneoForm({ id }: Props) {
  const { updateTournament } = useUpdateTournament();
  const { tournament, isLoading } = useTournament(id);
  const { handleSubmit, control, reset } = useForm<TorneoFormData>({
    resolver: zodResolver(torneoSchema),
    defaultValues: {
      titulo: "",
      imagen: null,
      fecha_inicio: undefined,
      fecha_fin: undefined,
      genero: undefined,
      categoria: undefined,
    },
  });

  useEffect(() => {
    if (tournament) {
      reset({
        titulo: tournament.titulo,
        imagen: null,
        fecha_fin: tournament.fecha_fin,
        fecha_inicio: tournament.fecha_inicio,
        genero: tournament.genero as GeneroTorneo,
        categoria: tournament.categoria as CategoriaTorneo,
      });
    }
  }, [tournament, reset]);

  const onSubmit = async (formData: TorneoFormData) => {
    if (!id) return;
    updateTournament({ formData, id });
  };

  if (isLoading || !tournament)
    return (
      <p className="flex items-center justify-center">Cargando torneo...</p>
    );

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start justify-center gap-6 max-w-xl sm:mx-auto mx-2 my-2 px-6 py-4 border border-gray-line rounded-xl shadow bg-white backdrop-blur-md relative top-1"
    >
      <h2 className="text-3xl text-title-black font-bold">Editar Torneo</h2>

      <Controller
        control={control}
        name="titulo"
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col gap-1 w-full">
            <LabelForm text="Titulo" obligatorio={true} />
            <Input
              className="text-title-black"
              {...field}
              placeholder="Ingresa el titulo del torneo"
              isRequired
              isInvalid={!!error}
              errorMessage={error?.message}
            />
          </div>
        )}
      />

      <Controller
        control={control}
        name="imagen"
        render={({ field: { onChange }, fieldState: { error } }) => (
          <div className="flex flex-col gap-1 w-full">
            <LabelForm text="Imagen" obligatorio={true} />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                onChange(file || null);
              }}
              className="text-sm p-3 rounded-lg w-full bg-[#f4f4f5]"
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
          </div>
        )}
      />

      <Controller
        control={control}
        name="fecha_inicio"
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col gap-1 w-full">
            <LabelForm text="Fecha de inicio" obligatorio={true} />
            <Input
              className="text-title-black"
              type="date"
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value || "")}
              isRequired
              isInvalid={!!error}
              errorMessage={error?.message}
            />
          </div>
        )}
      />

      <Controller
        control={control}
        name="fecha_fin"
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col gap-1 w-full">
            <LabelForm text="Fecha de fin" obligatorio={true} />
            <Input
              className="text-title-black"
              type="date"
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value || "")}
              isRequired
              isInvalid={!!error}
              errorMessage={error?.message}
            />
          </div>
        )}
      />

      <Controller
        control={control}
        name="genero"
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col gap-1 w-full">
            <LabelForm text="Genero" obligatorio={true} />
            <Select
              selectedKeys={field.value ? new Set([field.value]) : new Set()}
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys)[0] as string;
                field.onChange(selectedValue);
              }}
              isInvalid={!!error}
              errorMessage={error?.message}
              items={generoTorneoOptions}
              label="Selecciona un género"
            >
              {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
            </Select>
          </div>
        )}
      />

      <Controller
        control={control}
        name="categoria"
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col gap-1 w-full">
            <LabelForm text="Categoria" obligatorio={true} />
            <Select
              selectedKeys={field.value ? new Set([field.value]) : new Set()}
              onSelectionChange={(keys) => {
                const selectedValue = Array.from(keys)[0] as string;
                field.onChange(selectedValue);
              }}
              isInvalid={!!error}
              errorMessage={error?.message}
              items={categoriaTorneoOptions}
              label="Selecciona una categoria"
            >
              {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
            </Select>
          </div>
        )}
      />

      <Button
        className="mx-auto bg-bordo hover:bg-rojo-oscuro text-white"
        type="submit"
      >
        Editar Torneo
      </Button>
    </Form>
  );
}

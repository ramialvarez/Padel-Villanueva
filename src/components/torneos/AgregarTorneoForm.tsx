import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { torneoSchema, type TorneoFormData } from "@/lib/schemas/torneoSchema";
import {
  generoTorneoOptions,
  categoriaTorneoOptions,
} from "@/constants/torneo";
import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import LabelForm from "@/components/forms/LabelForm";
import { useCreateTournament } from "@/hooks/useTournaments";

export default function AgregarTorneoForm() {
  const { handleSubmit, control } = useForm<TorneoFormData>({
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

  const { createTournament } = useCreateTournament();

  const onSubmit = async (data: TorneoFormData) => {
    console.log(data);
    createTournament(data);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start justify-center gap-6 max-w-xl sm:mx-auto m-6 p-6 border border-gray-line rounded-xl shadow bg-white backdrop-blur-md relative top-0"
    >
      <h2 className="text-3xl text-title-black font-bold">Crear Torneo</h2>

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
        Crear Torneo
      </Button>
    </Form>
  );
}

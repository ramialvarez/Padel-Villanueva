import {
  Form,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Button,
} from "@heroui/react";
import LabelForm from "@/components/forms/LabelForm";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  jugadorSchema,
  type JugadorFormData,
} from "@/lib/schemas/jugadorSchema";
import {
  generoJugadorOptions,
  categoriaJugadorOptions,
  GeneroJugador,
  CategoriaJugador,
} from "@/constants/torneo";
import { usePlayer, useUpdatePlayer } from "@/hooks/usePlayers";
import { useEffect } from "react";

type Props = {
  id: string | undefined;
};

export default function EditarJugadorForm({ id }: Props) {
  const { updatePlayer } = useUpdatePlayer();
  const { player, isLoading } = usePlayer(id);

  const { handleSubmit, control, reset } = useForm<JugadorFormData>({
    resolver: zodResolver(jugadorSchema),
    defaultValues: {
      nombre: "",
      imagen: null,
      genero: undefined,
      categoria: undefined,
      observado: false,
    },
  });

  useEffect(() => {
    if (player) {
      reset({
        nombre: player.nombre,
        imagen: null,
        genero: player.genero as GeneroJugador,
        categoria: player.categoria as CategoriaJugador,
        observado: player.observado ?? false,
      });
    }
  }, [player, reset]);

  const onSubmit = async (formData: JugadorFormData) => {
    if (!id) return;
    updatePlayer({ formData, id });
  };

  if (isLoading || !player)
    return (
      <p className="flex items-center justify-center">Cargando jugador...</p>
    );

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl sm:mx-auto p-6 mx-2 border border-gray-line rounded-xl shadow bg-white relative top-10 flex flex-col items-start gap-6"
    >
      <h2 className="text-3xl text-title-black font-bold">Editar Jugador</h2>
      <Controller
        control={control}
        name="nombre"
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col gap-1 w-full">
            <LabelForm text="Nombre" obligatorio={true} />
            <Input
              className="text-title-black"
              {...field}
              placeholder="Ingresa el nombre del jugador. Por ejemplo: Alvarez, Francisco"
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
              items={generoJugadorOptions}
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
              items={categoriaJugadorOptions}
              label="Selecciona una categoria"
            >
              {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
            </Select>
          </div>
        )}
      />

      <Controller
        control={control}
        name="observado"
        render={({ field }) => (
          <Checkbox isSelected={field.value} onValueChange={field.onChange}>
            ¿Está observado?
          </Checkbox>
        )}
      />

      <Button
        className="mx-auto bg-bordo hover:bg-rojo-oscuro text-white mt-2"
        type="submit"
      >
        Editar jugador
      </Button>
    </Form>
  );
}

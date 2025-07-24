import FormField from "@/components/forms/FormField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import LabelForm from "@/components/forms/LabelForm";
import {
  jugadorSchema,
  type JugadorFormData,
} from "@/lib/schemas/jugadorSchema";
import {
  generoJugadorOptions,
  categoriaJugadorOptions,
} from "@/constants/torneo";

export default function AgregarJugadorForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JugadorFormData>({
    resolver: zodResolver(jugadorSchema),
  });

  const onSubmit: SubmitHandler<JugadorFormData> = async (
    data: JugadorFormData
  ) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        window.location.href = "/admin/torneos/listado";
      }
    } catch (e) {}
  };

  return (
    <div className="flex items-center justify-center min-h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center border-2 border-gray-line  m-6 w-xl  bg-white backdrop-blur-md shadow-xl rounded-lg p-10"
      >
        <h2 className="text-3xl text-title-black font-bold">Agregar Jugador</h2>
        <div className="px-4 py-3 w-lg">
          <LabelForm text="Nombre" />
          <FormField<JugadorFormData>
            type="text"
            placeholder="Ingrese el nombre y apellido"
            name="nombre"
            register={register}
            error={errors.nombre}
          />
        </div>
        <div className="px-4 py-3 w-lg">
          <LabelForm text="Imagen" />
          <FormField<JugadorFormData>
            type="file"
            name="imagen"
            register={register}
            error={errors.imagen}
          />
        </div>
        <div className="px-4 py-3 w-lg">
          <LabelForm text="Genero" />
          <FormField<JugadorFormData>
            type="select"
            name="genero"
            register={register}
            error={errors.genero}
            options={generoJugadorOptions}
          />
        </div>
        <div className="px-4 py-3 w-lg">
          <LabelForm text="Categoria" />
          <FormField<JugadorFormData>
            type="select"
            name="categoria"
            register={register}
            error={errors.categoria}
            options={categoriaJugadorOptions}
          />
        </div>
        <div className="px-4 py-3 w-lg">
          <LabelForm text="Observado" />
          <FormField<JugadorFormData>
            type="checkbox"
            name="observado"
            register={register}
            error={errors.observado}
          />
        </div>
        <div className="mt-4">
          <Button type="submit">Agregar jugador</Button>
        </div>
      </form>
    </div>
  );
}

import FormField from "@/components/forms/FormField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { torneoSchema, type TorneoFormData } from "@/lib/schemas/torneoSchema";
import { generoOptions, categoriaTorneoOptions } from "@/constants/torneo";
import Button from "@/components/ui/Button.tsx";
import LabelForm from "../forms/LabelForm";

export default function CrearTorneoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TorneoFormData>({
    resolver: zodResolver(torneoSchema),
  });

  const onSubmit: SubmitHandler<TorneoFormData> = async (formData) => {
    try {
    } catch (e) {
      alert(`Ocurrio un error ${e}`);
      return;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center border-2 border-gray-line  m-6 w-xl  bg-white backdrop-blur-md shadow-xl rounded-lg p-10"
      >
        <h2 className="text-3xl text-title-black font-bold">Crear Torneo</h2>
        <div className="px-4 py-3 w-lg">
          <LabelForm text="Titulo" />
          <FormField<TorneoFormData>
            type="text"
            placeholder="Ingrese el titulo"
            name="titulo"
            register={register}
            error={errors.titulo}
          />
        </div>
        <div className="px-4 py-3 w-lg">
          <LabelForm text="Imagen" />
          <FormField<TorneoFormData>
            type="file"
            name="imagen"
            register={register}
            error={errors.imagen}
          />
        </div>
        <div className="px-4 py-3 w-lg">
          <LabelForm text="Fecha de inicio" />
          <FormField<TorneoFormData>
            type="date"
            name="fecha_inicio"
            register={register}
            error={errors.fecha_inicio}
          />
        </div>
        <div className="px-4 py-3 w-lg">
          <LabelForm text="Fecha de fin" />
          <FormField<TorneoFormData>
            type="date"
            name="fecha_fin"
            register={register}
            error={errors.fecha_fin}
          />
        </div>
        <div className="px-4 py-3 w-lg">
          <LabelForm text="Genero" />
          <FormField<TorneoFormData>
            type="select"
            name="genero"
            register={register}
            error={errors.genero}
            options={generoOptions}
          />
        </div>
        <div className="px-4 py-3 w-lg">
          <LabelForm text="Categoria" />
          <FormField<TorneoFormData>
            type="select"
            name="categoria"
            register={register}
            error={errors.categoria}
            options={categoriaTorneoOptions}
          />
        </div>
        <div className="mt-4">
          <Button text="Crear Torneo" type="submit" />
        </div>
      </form>
    </div>
  );
}

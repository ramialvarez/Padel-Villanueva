import FormField from "@/components/forms/FormField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import LabelForm from "@/components/forms/LabelForm";
import { loginSchema, type LoginFormData } from "@/lib/schemas/login";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (
    data: LoginFormData
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
        <h2 className="text-3xl text-title-black font-bold">Iniciar Sesion</h2>
        <div className="px-4 py-3 w-lg">
          <LabelForm text="Email" obligatorio={true}/>
          <FormField<LoginFormData>
            type="text"
            placeholder="Ingrese el email"
            name="email"
            register={register}
            autocomplete="username"
            error={errors.email}
          />
        </div>
        <div className="px-4 py-3 w-lg">
          <LabelForm text="Contraseña" obligatorio={true}/>
          <FormField<LoginFormData>
            type="password"
            placeholder="Ingrese su contraseña"
            name="password"
            register={register}
            autocomplete="current-password"
            error={errors.password}
          />
        </div>

        <div className="mt-4">
          <Button type="submit">Iniciar Sesión</Button>
        </div>
      </form>
    </div>
  );
}

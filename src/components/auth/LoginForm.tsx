import LabelForm from "@/components/forms/LabelForm";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/schemas/login";
import { Form, Input, Button, addToast } from "@heroui/react";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { handleSubmit, control } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
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

      if (!res.ok) {
        throw new Error("Error en la respuesta");
      }

      addToast({
        title: "Sesión iniciada correctamente",
        color: "success",
      });

      window.location.href = "/admin/torneos/listado";
    } catch (e) {
      addToast({
        title: "Error al iniciar sesión " + e,
        color: "danger",
      });
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl sm:mx-auto m-6 p-6 border border-gray-line rounded-xl shadow bg-white relative top-30 flex flex-col items-start gap-6"
    >
      <h2 className="text-3xl text-title-black font-bold">Iniciar Sesion</h2>
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col gap-1 w-full">
            <LabelForm text="Email" obligatorio={true} />
            <Input
              className="text-title-black"
              {...field}
              placeholder="Ingresa el email"
              isRequired
              isInvalid={!!error}
              errorMessage={error?.message}
            />
          </div>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col gap-1 w-full">
            <LabelForm text="Contraseña" obligatorio={true} />
            <Input
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-solid outline-transparent"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeClosed className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <Eye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              className="text-title-black"
              type={isVisible ? "text" : "password"}
              {...field}
              placeholder="Ingrese la contraseña"
              isRequired
              isInvalid={!!error}
              errorMessage={error?.message}
            />
          </div>
        )}
      />
      <div className="mt-4 mx-auto">
        <Button
          className=" bg-bordo hover:bg-rojo-oscuro text-white"
          type="submit"
        >
          Iniciar Sesión
        </Button>
      </div>
    </Form>
  );
}

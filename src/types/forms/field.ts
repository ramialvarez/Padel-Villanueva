import type {
  FieldError,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

export type Option = { value: string; label: string };

export type FormFieldProps<TFormData extends FieldValues> = {
  type: "text" | "number" | "select" | "email" | "file" | "date" | "password";
  placeholder?: string;
  name: Path<TFormData>;
  register: UseFormRegister<TFormData>;
  error?: FieldError;
  autocomplete?: string;
  options?: Option[]; // Para select
  valueAsNumber?: boolean;
};

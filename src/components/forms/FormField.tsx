import type { FormFieldProps } from "@/types/forms/field";
import type { FieldValues } from "react-hook-form";

export default function FormField<TFormData extends FieldValues>({
  type,
  placeholder,
  name,
  register,
  error,
  autocomplete,
  options,
  valueAsNumber,
}: FormFieldProps<TFormData>) {
  if (type === "select") {
    return (
      <div className="form-control bg-gray-input text-gray-text px-4 py-3 rounded-xl">
        <select
          {...register(name)}
          className="input-select w-full focus:outline-none"
        >
          <option value="">Selecciona una opción</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="error-message">{error.message}</p>}
      </div>
    );
  }

  // Input normal
  return (
    <div className="w-full">
      <input
        className="bg-gray-input text-gray-text px-4 py-3 w-full rounded-xl focus:outline-gray-line"
        type={type}
        autoComplete={autocomplete}
        placeholder={placeholder}
        {...register(name, valueAsNumber ? { valueAsNumber: true } : {})}
      />
      <span className="block min-h-[1.5rem] font-medium font-inter text-red-400 text-sm leading-tight max-h-[2.5rem] overflow-hidden">
        {error?.message || "\u00A0"}
      </span>
    </div>
  );
}

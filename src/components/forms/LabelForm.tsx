type Props = {
  text: string;
  obligatorio?: boolean;
};

export default function LabelForm({ text, obligatorio = false }: Props) {
  return (
    <label className="font-medium mb-2 block">
      {text}
      {obligatorio && (
        <span className="relative group ml-2 text-red-600 text-sm">
          *
          <span className="absolute left-2 top-full mt-1 w-max text-xs bg-red-100 text-red-700 px-2 py-1 rounded shadow-lg hidden group-hover:block z-10">
            Este campo es obligatorio
          </span>
        </span>
      )}
    </label>
  );
}

import { Search } from "lucide-react";

type Props = {
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchFilter({ placeholder, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1 w-xs">
      <label htmlFor="search" className="text-sm font-medium text-foreground">
        Nombre o apellido del jugador
      </label>
      <button className=" flex items-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-3 py-[8px] focus-within:border-black transition">
        <Search className="w-5 h-5" />
        <input
          type="text"
          id="search"
          placeholder={placeholder}
          className="w-full text-sm text-black placeholder:text-black bg-transparent focus:outline-none"
          onChange={onChange}
        />
      </button>
    </div>
  );
}

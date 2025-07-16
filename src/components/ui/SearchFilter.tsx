import { Search } from "lucide-react";

type Props = {
  placeholder: string;
};

export default function SearchFilter({ placeholder }: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor="search" className="font-medium mb-2 block">
        Nombre o apellido del jugador
      </label>
      <div className="flex items-center gap-2 w-sm bg-gray-input border-2 border-gray-line rounded-lg p-2">
        <Search color="#61758a" />
        <input
          className="w-full focus:outline-none"
          type="text"
          id="search"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

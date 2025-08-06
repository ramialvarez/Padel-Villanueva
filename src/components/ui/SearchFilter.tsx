import { Search } from "lucide-react";
import { Input } from "@heroui/react";
type Props = {
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchFilter({ placeholder, onChange }: Props) {
  return (
    <>
      <Input
        startContent={<Search className="w-5 h-5" />}
        classNames={{
          label: "text-base", 
        }}
        className="max-w-xs sm:w-xs"
        label="Nombre o apellido del jugador"
        labelPlacement="outside"
        variant="bordered"
        type="text"
        id="search"
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
}

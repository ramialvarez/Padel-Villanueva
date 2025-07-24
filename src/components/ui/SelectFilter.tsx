import { Select, SelectItem } from "@heroui/react";
import { Mars, UserRound } from "lucide-react";

const iconMap = {
  genero: Mars,
  categoria: UserRound,
};
export interface Option {
  value: string;
  label: string;
}

interface SelectFilterProps {
  items: Option[];
  label: string;
  iconName: keyof typeof iconMap;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function SelectFilter({
  items,
  label,
  iconName,
  placeholder = "Seleccioná una opción",
  onChange,
}: SelectFilterProps) {
  const Icon = iconMap[iconName];
  return (
    <Select
      className="max-w-xs w-xs"
      variant="bordered"
      labelPlacement="outside"
      items={items}
      label={label}
      startContent={<Icon />}
      placeholder={placeholder}
      isClearable={true}
      onChange={(e) => {
        onChange(e.target.value); 
      }}
      classNames={{
        value: "text-black", 
        trigger: "focus:outline-none focus:ring-0 focus:ring-transparent",
      }}
    >
      {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
    </Select>
  );
}

import { UserRound, Star } from "lucide-react";

const iconMap = {
  user: UserRound,
  star: Star,
};

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  labelText: string;
  primeraOpcion: string;
  id: string;
  iconName: keyof typeof iconMap;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
};

export default function SelectFilter({
  options,
  labelText,
  primeraOpcion,
  id,
  iconName,
  value,
  onChange,
  disabled,
}: Props) {
  const Icon = iconMap[iconName];
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-medium mb-2 block">
        {labelText}
      </label>
      <div className="flex items-center gap-2 w-sm bg-gray-input border-2 border-gray-line rounded-lg p-2">
        <Icon color="#61758a" />
        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full focus:outline-none bg-gray-input text-title-black font-medium"
        >
          <option value="" className="font-medium">
            {primeraOpcion}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="font-medium"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

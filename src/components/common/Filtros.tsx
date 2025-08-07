import SearchFilter from "@/components/ui/SearchFilter";
import SelectFilter from "@/components/ui/SelectFilter";
import { Input } from "@heroui/react";

type Props = {
  handleFilterChange: (key: string, value: string) => void;
  placeholderSearch: string;
  generoOptions: { value: string; label: string }[];
  categoriaOptions: { value: string; label: string }[];
  withDate?: boolean;
};
export default function Filtros({
  handleFilterChange,
  placeholderSearch,
  generoOptions,
  categoriaOptions,
  withDate = false,
}: Props) {
  return (
    <>
      <SearchFilter
        placeholder={placeholderSearch}
        onChange={(e) => handleFilterChange("search", e.target.value)}
      />
      <SelectFilter
        items={generoOptions}
        label="Genero"
        iconName="genero"
        placeholder="Selecciona un genero"
        onChange={(value) => handleFilterChange("genero", value)}
      />
      <SelectFilter
        items={categoriaOptions}
        label="Categoria"
        iconName="categoria"
        placeholder="Selecciona una categoria"
        onChange={(value) => handleFilterChange("categoria", value)}
      />
      {withDate && (
        <>
          <Input
            type="date"
            className="max-w-xs lg:w-[200px] sm:w-xs"
            label="Fecha de inicio del torneo"
            labelPlacement="outside"
            variant="bordered"
            id="start-date"
            onChange={(e) => handleFilterChange("fecha_inicio", e.target.value)}
          />

          <Input
            type="date"
            className="max-w-xs lg:w-[200px] sm:w-xs"
            label="Fecha de fin del torneo"
            labelPlacement="outside"
            variant="bordered"
            id="end-date"
            onChange={(e) => handleFilterChange("fecha_fin", e.target.value)}
          />
        </>
      )}
    </>
  );
}

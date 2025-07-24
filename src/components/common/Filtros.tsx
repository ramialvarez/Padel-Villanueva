import {
  categoriaJugadorOptions,
  generoJugadorOptions,
} from "@/constants/torneo";
import SearchFilter from "@/components/ui/SearchFilter";
import SelectFilter from "@/components/ui/SelectFilter";

type Props = {
  handleFilterChange: (key: string, value: string) => void;
};
export default function Filtros({ handleFilterChange }: Props) {
  return (
    <>
      <SearchFilter
        placeholder="Ingresa el nombre o apellido"
        onChange={(e) => handleFilterChange("search", e.target.value)}
      />
      <SelectFilter
        items={generoJugadorOptions}
        label="Genero"
        iconName="genero"
        placeholder="Selecciona un genero"
        onChange={(value) => handleFilterChange("genero", value)}
      />
      <SelectFilter
        items={categoriaJugadorOptions}
        label="Categoria"
        iconName="categoria"
        placeholder="Selecciona una categoria"
        onChange={(value) => handleFilterChange("categoria", value)}
      />
    </>
  );
}

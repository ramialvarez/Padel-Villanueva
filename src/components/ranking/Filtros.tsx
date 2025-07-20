import { categoriaJugadorOptions, generoOptions } from "@/constants/torneo";
import SearchFilter from "../ui/SearchFilter";
import SelectFilter from "../ui/SelectFilter";

type Props = {
  handleFilterChange: (key: string, value: string) => void;
};
export default function Filtros({ handleFilterChange }: Props) {
  return (
    <section className="flex sm:flex-row flex-col items-center justify-center gap-6">
      <SearchFilter
        placeholder="Ingresa el nombre o apellido del jugador"
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
        items={categoriaJugadorOptions}
        label="Categoria"
        iconName="categoria"
        placeholder="Selecciona una categoria"
        onChange={(value) => handleFilterChange("categoria", value)}
      />
    </section>
  );
}

import { useState } from "react";
import type { Database } from "@/types/supabase";
import { categoriaJugadorOptions, generoOptions } from "@/constants/torneo";
import SearchFilter from "../ui/SearchFilter";
import SelectFilter from "../ui/SelectFilter";
import TablaJugadores from "../ui/TablaJugadores";
import { usePlayers } from "@/hooks/usePlayers";

type Player = Database["public"]["Tables"]["jugadores"]["Row"];
const PAGE_SIZE = 10;

export default function ListadoJugadores() {
  const [filters, setFilters] = useState({
    search: "",
    genero: "",
    categoria: "",
  });
  const [page, setPage] = useState(1);

  const { players, isLoading } = usePlayers();

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPage(1);
  };

  const filteredPlayers = players?.filter((player) => {
    const fullName = `${player.nombre}`.toLowerCase();
    const matchSearch = fullName.includes(filters.search.toLowerCase());
    const matchGenero = filters.genero
      ? player.genero === filters.genero
      : true;
    const matchCategoria = filters.categoria
      ? player.categoria === filters.categoria
      : true;
    return matchSearch && matchGenero && matchCategoria;
  });

  const totalPages = Math.ceil((filteredPlayers?.length ?? 0) / PAGE_SIZE);

  const playersToShow = filteredPlayers?.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="w-full">
      <section className="flex items-center gap-6">
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

      <section className="py-6">
        <TablaJugadores players={playersToShow ?? []} isLoading={isLoading} />
      </section>
    </div>
  );
}

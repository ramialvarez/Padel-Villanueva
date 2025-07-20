import { useState, useEffect } from "react";
import Tabla from "@/components/ranking/Tabla";
import { usePlayers } from "@/hooks/usePlayers";
import Filtros from "@/components/ranking/Filtros";
import { Pagination, Alert } from "@heroui/react";

const PAGE_SIZE = 10;

export default function Ranking() {
  const [filters, setFilters] = useState({
    search: "",
    genero: "",
    categoria: "",
  });

  const [page, setPage] = useState(1);

  // Hook actualizado: pasa filtros
  const { players, isLoading, totalCount } = usePlayers(
    page,
    PAGE_SIZE,
    filters
  );

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPage(1); // Reset a página 1
  };

  // Función separada para manejar el cambio de página
  const handlePageChange = (newPage: number) => {
    console.log("Cambiando a página:", newPage); // Para debug
    setPage(newPage);
  };

  const totalPages = Math.ceil((totalCount ?? 0) / PAGE_SIZE);

  return (
    <div className="w-full p-6 flex flex-col gap-4 bg-gradient-to-br from-rojo-medium/30 bg-rojo-oscuro/30 to-bordo/30">
      <Filtros handleFilterChange={handleFilterChange} />
      <Alert variant="bordered" className="bg-rojo-medium/75">
        <span className="text-small w-full font-medium block text-inherit leading-5">
          Los jugadores en <strong>gris</strong> son aquellos que se encuentran
          observados.
        </span>
      </Alert>

      <section className="flex flex-col items-center justify-center gap-4">
        <Tabla players={players ?? []} isLoading={isLoading} />

        {totalPages > 1 && (
          <Pagination
            classNames={{
              cursor: "bg-title-black text-white",
            }}
            total={totalPages}
            page={page}
            onChange={handlePageChange}
            showControls
            loop={false}
            isCompact={true}
          />
        )}
      </section>
    </div>
  );
}

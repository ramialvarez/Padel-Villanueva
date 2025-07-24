import { useState } from "react";
import Tabla from "@/components/ranking/Tabla";
import { usePlayers } from "@/hooks/usePlayers";
import Filtros from "@/components/common/Filtros";
import { Pagination, Alert } from "@heroui/react";

const PAGE_SIZE = 10;

export default function Ranking() {
  const [filters, setFilters] = useState({
    search: "",
    genero: "",
    categoria: "",
  });

  const [page, setPage] = useState(1);

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
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil((totalCount ?? 0) / PAGE_SIZE);

  return (
    <div className="w-full p-6 flex flex-col gap-4">
      <section className="flex sm:flex-row flex-col items-center justify-center gap-6">
        <Filtros handleFilterChange={handleFilterChange} />
      </section>

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

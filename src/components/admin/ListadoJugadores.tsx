import { useState } from "react";
import { Button, Pagination } from "@heroui/react";
import TablaJugadores from "@/components/admin/TablaJugadores";
import { usePlayers } from "@/hooks/usePlayers";
import Filtros from "@/components/common/Filtros";
import { Plus } from "lucide-react";

const PAGE_SIZE = 10;

export default function ListadoJugadores() {
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
    <div className="w-full h-auto overflow-hidden">
      <section className="flex items-center gap-6 mb-6">
        <section className="flex lg:flex-row flex-col items-center justify-center lg:flex-wrap gap-6 lg:m-0 m-auto">
          <Filtros handleFilterChange={handleFilterChange} />
          <a href="/admin/jugadores/agregarJugador">
            <Button
              className="bg-bordo hover:bg-rojo-oscuro text-white lg:mt-[22px] mt-0"
              endContent={<Plus />}
            >
              Agregar Jugador
            </Button>
          </a>
        </section>
      </section>
      <section className="flex flex-col items-center justify-center gap-4">
        <TablaJugadores players={players ?? []} isLoading={isLoading} />

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

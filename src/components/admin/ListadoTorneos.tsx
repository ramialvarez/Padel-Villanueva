import { useState } from "react";
import { Button, Pagination } from "@heroui/react";
import TablaTorneos from "@/components/admin/TablaTorneos";
import Filtros from "@/components/common/Filtros";
import { Plus } from "lucide-react";
import { useDeleteTournament, useTournaments } from "@/hooks/useTournaments";
import {
  categoriaTorneoOptions,
  generoTorneoOptions,
} from "@/constants/torneo";

const PAGE_SIZE = 10;

export default function ListadoTorneos() {
  const [filters, setFilters] = useState({
    search: "",
    fecha_inicio: "",
    fecha_fin: "",
    genero: "",
    categoria: "",
  });

  const [page, setPage] = useState(1);
  const {
    tournaments,
    count: totalCount,
    isLoading,
  } = useTournaments(page, PAGE_SIZE, filters);

  const { deleteTournament, isDeleting } = useDeleteTournament();

  console.log("FILTERS", filters);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPage(1);
  };

  const handleDelete = (
    event: React.MouseEvent<HTMLSpanElement>,
    id: string,
    nombre: string,
    fecha: string
  ) => {
    event.preventDefault();
    deleteTournament({ id, nombre, fecha });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil((totalCount ?? 0) / PAGE_SIZE);

  return (
    <div className="w-full h-auto overflow-hidden">
      <section className="flex items-center gap-6 mb-6">
        <section className="flex lg:flex-row flex-col items-center justify-center lg:flex-wrap gap-6 lg:m-0 m-auto">
          <Filtros
            handleFilterChange={handleFilterChange}
            placeholderSearch="Ingrese el nombre del torneo"
            generoOptions={generoTorneoOptions}
            categoriaOptions={categoriaTorneoOptions}
            withDate={true}
          />
          <a href="/admin/torneos/agregarTorneo">
            <Button
              className="bg-bordo hover:bg-rojo-oscuro text-white lg:mt-[22px] mt-0"
              endContent={<Plus />}
            >
              Agregar Torneo
            </Button>
          </a>
        </section>
      </section>
      <section className="flex flex-col items-center justify-center gap-4">
        <TablaTorneos
          tournaments={tournaments ?? []}
          isLoading={isLoading}
          deleteTournament={handleDelete}
          isDeleting={isDeleting}
        />

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

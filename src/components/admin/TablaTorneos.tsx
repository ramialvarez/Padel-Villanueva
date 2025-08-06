import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Skeleton,
  Chip,
} from "@heroui/react";
import { Pencil, Trash2 } from "lucide-react";
import type { Database } from "@/types/supabase";

type Tournament = Database["public"]["Tables"]["torneos"]["Row"];

type Props = {
  tournaments: Tournament[];
  isLoading?: boolean;
  deleteTournament: (
    e: React.MouseEvent<HTMLSpanElement>,
    id: string,
    nombre: string,
    fecha: string
  ) => void;
  isDeleting?: boolean;
};

const columns = [
  { name: "TORNEO", uid: "torneo" },
  { name: "FECHA", uid: "fecha" },
  { name: "GÉNERO", uid: "genero" },
  { name: "CATEGORIA", uid: "categoria" },
  { name: "ACCIONES", uid: "acciones" },
];

export default function TablaJugadores({
  tournaments,
  isLoading,
  deleteTournament,
  isDeleting,
}: Props) {
  const renderCell = React.useCallback(
    (tournament: Tournament, columnKey: string) => {
      switch (columnKey) {
        case "torneo":
          return (
            <User
              avatarProps={{
                radius: "lg",
                src: tournament.imagen ?? undefined,
              }}
              name={tournament.titulo}
            />
          );
        case "fecha":
          const fechaInicio = new Date(tournament.fecha_inicio);
          const fechaFin = new Date(tournament.fecha_fin);

          const formatFecha = (fecha: Date) =>
            new Intl.DateTimeFormat("es-AR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }).format(fecha);

          return (
            <div className="flex flex-col text-sm text-bold">
              <span>Inicio: {formatFecha(fechaInicio)}</span>
              <span>Fin: {formatFecha(fechaFin)}</span>
            </div>
          );

        case "genero":
          return (
            <div className="flex flex-col">
              <Chip
                className={`
                      text-sm font-medium
                      ${
                        tournament.genero === "Masculino"
                          ? "bg-[#B2FFFF]"
                          : tournament.genero === "Femenino"
                          ? "bg-[#FFB5C0]"
                          : "bg-[#FFEE8C]"
                      }
                    `}
              >
                {tournament.genero}
              </Chip>
            </div>
          );
        case "categoria":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {tournament.categoria}
              </p>
            </div>
          );
        case "acciones":
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Editar torneo">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => {
                    window.location.href = `/admin/torneos/${tournament.id}/editarTorneo`;
                  }}
                >
                  <Pencil />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar torneo">
                <span
                  className={`text-lg text-danger cursor-pointer active:opacity-50 ${
                    isDeleting ? "opacity-50 pointer-events-none" : ""
                  }`}
                  onClick={(e) => {
                    if (!isDeleting) {
                      deleteTournament(
                        e,
                        tournament.id,
                        tournament.titulo,
                        String(tournament.fecha_inicio)
                      );
                    }
                  }}
                >
                  {isDeleting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-danger"></div>
                  ) : (
                    <Trash2 />
                  )}
                </span>
              </Tooltip>
            </div>
          );
        default:
          return null;
      }
    },
    [deleteTournament, isDeleting]
  );

  return (
    <div className="relative w-full">
      {isDeleting && (
        <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-danger mx-auto mb-2"></div>
            <p className="text-gray-600">Eliminando torneo...</p>
          </div>
        </div>
      )}

      <Table aria-label="Tabla de torneos con precarga">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "acciones" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        {isLoading ? (
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={`skeleton-${i}`}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-4 w-32 rounded-lg" />
                      <Skeleton className="h-3 w-24 rounded-lg" />
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Skeleton className="h-4 w-20 rounded-lg" />
                </TableCell>

                <TableCell>
                  <Skeleton className="h-4 w-20 rounded-lg" />
                </TableCell>

                <TableCell>
                  <Skeleton className="h-4 w-24 rounded-lg" />
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded-md" />
                    <Skeleton className="h-6 w-6 rounded-md" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody
            items={tournaments ?? []}
            emptyContent={"No existen torneos con los filtros aplicados."}
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey as string)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
    </div>
  );
}

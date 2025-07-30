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
} from "@heroui/react";
import { Pencil, Trash2 } from "lucide-react";
import type { Database } from "@/types/supabase";

type Player = Database["public"]["Tables"]["jugadores"]["Row"];

type Props = {
  players: Player[];
  isLoading?: boolean;
  deletePlayer: (e: React.MouseEvent<HTMLSpanElement>, id: string) => void;
  isDeleting?: boolean;
};

const columns = [
  { name: "JUGADOR", uid: "jugador" },
  { name: "GÉNERO", uid: "genero" },
  { name: "CATEGORIA", uid: "categoria" },
  { name: "ACCIONES", uid: "acciones" },
];

export default function TablaJugadores({
  players,
  isLoading,
  deletePlayer,
  isDeleting,
}: Props) {
  const renderCell = React.useCallback(
    (player: Player, columnKey: string) => {
      switch (columnKey) {
        case "jugador":
          return (
            <User
              avatarProps={{ radius: "lg", src: player.imagen ?? undefined }}
              name={player.nombre}
            />
          );
        case "genero":
        case "categoria":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {player[columnKey]}
              </p>
            </div>
          );
        case "acciones":
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Editar jugador">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Pencil />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar jugador">
                <span
                  className={`text-lg text-danger cursor-pointer active:opacity-50 ${
                    isDeleting ? "opacity-50 pointer-events-none" : ""
                  }`}
                  onClick={(e) => {
                    if (!isDeleting) {
                      deletePlayer(e, player.id);
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
    [deletePlayer, isDeleting]
  ); 

  return (
    <div className="relative w-full">
      {isDeleting && (
        <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-danger mx-auto mb-2"></div>
            <p className="text-gray-600">Eliminando jugador...</p>
          </div>
        </div>
      )}

      <Table aria-label="Tabla de jugadores con precarga">
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
            items={players ?? []}
            emptyContent={"No existen jugadores con los filtros aplicados."}
          >
            {(item) => (
              <TableRow
                key={item.id}
                className={item.observado ? "bg-gray-input" : "bg-white"}
              >
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

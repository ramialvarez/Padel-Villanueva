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

import type { Database } from "@/types/supabase";

type Player = Database["public"]["Tables"]["jugadores"]["Row"];

type Props = {
  players: Player[];
  isLoading?: boolean;
};

const columns = [
  { name: "JUGADOR", uid: "jugador" },
  { name: "GÉNERO", uid: "genero" },
  { name: "CATEGORIA", uid: "categoria" },
];

export default function TablaJugadores({ players, isLoading }: Props) {
  const renderCell = React.useCallback((player: Player, columnKey: string) => {
    switch (columnKey) {
      case "jugador":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{player.nombre}</p>
          </div>
        );
      case "genero":
      case "categoria":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{player[columnKey]}</p>
          </div>
        );
      default:
        return null;
    }
  }, []);

  return (
    <Table aria-label="Tabla de jugadores con precarga">
      <TableHeader columns={columns} className="bg-gray-text">
        {(column) => (
          <TableColumn key={column.uid} align={"center"}>
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
              className={`h-12 ${
                item.observado ? "bg-gray-input" : "bg-white"
              }`}
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey as string)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
}

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
} from "@heroui/react";

import { Trash2, Pencil } from "lucide-react";

type User = {
  id: number;
  name: string;
  categoria: string;
  genero: string;
  avatar: string;
};

export const columns = [
  { name: "JUGADOR", uid: "jugador" },
  { name: "GÉNERO", uid: "genero" },
  { name: "CATEGORIA", uid: "categoria" },
  { name: "ACCIONES", uid: "acciones" },
];

export const users = [
  {
    id: 1,
    name: "Tony Reichert",
    categoria: "Segunda",
    genero: "Masculino",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    id: 2,
    name: "Zoey Lang",
    categoria: "Tercera",
    genero: "Femenino",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    id: 3,
    name: "Jane Fisher",
    categoria: "Cuarta",
    genero: "Femenino",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  {
    id: 4,
    name: "William Howard",
    categoria: "Primera",
    genero: "Masculino",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  },
  {
    id: 5,
    name: "Kristen Copper",
    categoria: "Primera",
    genero: "Femenino",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
  },
];

export default function TablaJugadores() {
  const renderCell = React.useCallback((user: User, columnKey: string) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "jugador":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            name={cellValue}
          ></User>
        );
      case "genero":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "categoria":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "acciones":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar usuario">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Pencil />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar usuario">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <Trash2 />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={users}
        emptyContent={"No existen jugadores con los filtros aplicados."}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

import { useTournament } from "@/hooks/useTournaments";
import PanelSectionComponent from "@/components/admin/PanelSection";

import {
  Table,
  TableHeader,
  TableColumn,
  TableCell,
  TableBody,
  TableRow,
} from "@heroui/react";
import type { JSX } from "react";

interface Props {
  torneoId: string | undefined;
}

type PanelItem = {
  href: string;
  label: string;
  icon: JSX.Element;
  colorBg: string;
  colorText: string;
  gradient: string;
};

type PanelSection = {
  id: string;
  title: string;
  items: PanelItem[];
};

export default function Panel({ torneoId }: Props) {
  const { tournament } = useTournament(torneoId);

  const sections: PanelSection[] = [
    {
      id: "datos",
      title: "DATOS DEL TORNEO",
      items: [
        {
          href: `/admin/torneos/${torneoId}/agregarImagen`,
          label: "Gestionar imágenes",
          colorBg: "bg-gradient-to-br from-purple-500 to-purple-600",
          colorText: "text-white",
          gradient: "from-purple-500/20 to-purple-600/20",
          icon: (
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          ),
        },
      ],
    },
    {
      id: "jugadores",
      title: "JUGADORES",
      items: [
        {
          href: `/admin/torneos/${torneoId}/agregarParejas`,
          label: "Gestionar parejas",
          colorBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
          colorText: "text-white",
          gradient: "from-emerald-500/20 to-emerald-600/20",
          icon: (
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          ),
        },
        {
          href: `/admin/torneos/${torneoId}/agregarGrupos`,
          label: "Administrar grupos",
          colorBg: "bg-gradient-to-br from-amber-500 to-amber-600",
          colorText: "text-white",
          gradient: "from-amber-500/20 to-amber-600/20",
          icon: (
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          ),
        },
      ],
    },
    {
      id: "partidos",
      title: "PARTIDOS",
      items: [
        {
          href: `/admin/torneos/${torneoId}/agregarPartido`,
          label: "Crear partido",
          colorBg: "bg-gradient-to-br from-rose-500 to-rose-600",
          colorText: "text-white",
          gradient: "from-rose-500/20 to-rose-600/20",
          icon: (
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          ),
        },
        {
          href: `/torneos/${torneoId}/ordenDeJuego`,
          label: "Ver partidos",
          colorBg: "bg-gradient-to-br from-blue-500 to-blue-600",
          colorText: "text-white",
          gradient: "from-blue-500/20 to-blue-600/20",
          icon: (
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          ),
        },
      ],
    },
    {
      id: "resultados",
      title: "RESULTADOS",
      items: [
        {
          href: `/torneos/${torneoId}/grupos`,
          label: "Tabla de posiciones",
          colorBg: "bg-gradient-to-br from-teal-500 to-teal-600",
          colorText: "text-white",
          gradient: "from-teal-500/20 to-teal-600/20",
          icon: (
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h6a1 1 0 100-2H3zm0 4a1 1 0 100 2h4a1 1 0 100-2H3z"
              clipRule="evenodd"
            />
          ),
        },
        {
          href: `/torneos/${torneoId}/bracket`,
          label: "Cuadros de eliminación",
          colorBg: "bg-gradient-to-br from-pink-500 to-pink-600",
          colorText: "text-white",
          gradient: "from-pink-500/20 to-pink-600/20",
          icon: (
            <path
              fillRule="evenodd"
              d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z"
              clipRule="evenodd"
            />
          ),
        },
      ],
    },
  ];

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl mx-auto my-2 overflow-hidden">
        <Table aria-label="Panel de opciones del torneo">
          <TableHeader>
            <TableColumn className="flex flex-col h-full text-center py-2 bg-rojo-medium/75 text-gray-line text-md">
              Panel de Opciones
              <span className="text-sm text-white">{tournament?.titulo}</span>
            </TableColumn>
          </TableHeader>
          <TableBody>
            {sections.map((section) => (
              <TableRow key={section.id}>
                <TableCell>
                  <PanelSectionComponent section={section} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

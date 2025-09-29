import Carrousel from "@/components/home/Carrousel.jsx";

export default function PadelBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Carrusel de fondo */}
      <div className="absolute inset-0">
        <Carrousel />
      </div>

      {/* Overlay con gradiente y opacidad */}
      <div className="absolute inset-0 bg-black/40 bg-opacity-70"></div>
    </div>
  );
}

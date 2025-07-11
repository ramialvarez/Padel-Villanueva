import { c as createComponent, a as renderComponent, r as renderTemplate } from '../../../chunks/astro/server_BIskFmgd.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useForm } from 'react-hook-form';
import '../../../chunks/supabase_SJ1iq0XH.mjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { B as Button, $ as $$Layout } from '../../../chunks/Layout_CQDkd6hq.mjs';
export { renderers } from '../../../renderers.mjs';

function FormField({
  type,
  placeholder,
  name,
  register,
  error,
  options,
  valueAsNumber
}) {
  if (type === "select") {
    return /* @__PURE__ */ jsxs("div", { className: "form-control bg-gray-input text-gray-text px-4 py-3 rounded-xl", children: [
      /* @__PURE__ */ jsxs(
        "select",
        {
          ...register(name),
          className: "input-select w-full focus:outline-none",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Selecciona una opción" }),
            options?.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.label }, opt.value))
          ]
        }
      ),
      error && /* @__PURE__ */ jsx("p", { className: "error-message", children: error.message })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        className: "bg-gray-input text-gray-text px-4 py-3 w-full rounded-xl focus:outline-gray-line",
        type,
        placeholder,
        ...register(name, valueAsNumber ? { valueAsNumber: true } : {})
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "block min-h-[1.5rem] font-medium font-inter text-red-400 text-sm leading-tight max-h-[2.5rem] overflow-hidden", children: error?.message || " " })
  ] });
}

var Genero = /* @__PURE__ */ ((Genero2) => {
  Genero2["M"] = "Masculino";
  Genero2["F"] = "Femenino";
  Genero2["X"] = "Mixto";
  return Genero2;
})(Genero || {});
var Categoria = /* @__PURE__ */ ((Categoria2) => {
  Categoria2["Primera"] = "Primera";
  Categoria2["Segunda"] = "Segunda";
  Categoria2["Tercera"] = "Tercera";
  Categoria2["Cuarta"] = "Cuarta";
  Categoria2["Quinta"] = "Quinta";
  Categoria2["Sexta"] = "Sexta";
  Categoria2["Septima"] = "Septima";
  Categoria2["Octava"] = "Octava";
  Categoria2["Suma15"] = "Suma 15";
  Categoria2["Suma14"] = "Suma 14";
  Categoria2["Suma13"] = "Suma 13";
  Categoria2["Suma12"] = "Suma 12";
  Categoria2["Suma11"] = "Suma11";
  Categoria2["Suma10"] = "Suma 10";
  Categoria2["Suma9"] = "Suma 9";
  Categoria2["Suma8"] = "Suma 8";
  Categoria2["Suma7"] = "Suma 7";
  return Categoria2;
})(Categoria || {});
function enumToOptions(enumObj) {
  return Object.values(enumObj).map((value) => ({
    value,
    label: value
  }));
}
const generoOptions = enumToOptions(Genero);
const categoriaOptions = enumToOptions(Categoria);

const torneoSchema = z.object({
  titulo: z.string().min(3, "Debe tener al menos 3 caracteres"),
  imagen: z.string().url().optional(),
  fecha_inicio: z.coerce.date(),
  fecha_fin: z.coerce.date(),
  genero: z.nativeEnum(Genero),
  categoria: z.nativeEnum(Categoria)
});

function LabelForm({ text }) {
  return /* @__PURE__ */ jsx("label", { className: "font-medium mb-2 block", children: text });
}

function CrearTorneoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(torneoSchema)
  });
  const onSubmit = async (formData) => {
  };
  return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-full", children: /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: handleSubmit(onSubmit),
      className: "flex flex-col items-center justify-center border-2 border-gray-line  m-6 w-xl  bg-white backdrop-blur-md shadow-xl rounded-lg p-10",
      children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl text-title-black font-bold", children: "Crear Torneo" }),
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 w-lg", children: [
          /* @__PURE__ */ jsx(LabelForm, { text: "Titulo" }),
          /* @__PURE__ */ jsx(
            FormField,
            {
              type: "text",
              placeholder: "Ingrese el titulo",
              name: "titulo",
              register,
              error: errors.titulo
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 w-lg", children: [
          /* @__PURE__ */ jsx(LabelForm, { text: "Imagen" }),
          /* @__PURE__ */ jsx(
            FormField,
            {
              type: "file",
              name: "imagen",
              register,
              error: errors.imagen
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 w-lg", children: [
          /* @__PURE__ */ jsx(LabelForm, { text: "Fecha de inicio" }),
          /* @__PURE__ */ jsx(
            FormField,
            {
              type: "date",
              name: "fecha_inicio",
              register,
              error: errors.fecha_inicio
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 w-lg", children: [
          /* @__PURE__ */ jsx(LabelForm, { text: "Fecha de fin" }),
          /* @__PURE__ */ jsx(
            FormField,
            {
              type: "date",
              name: "fecha_fin",
              register,
              error: errors.fecha_fin
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 w-lg", children: [
          /* @__PURE__ */ jsx(LabelForm, { text: "Genero" }),
          /* @__PURE__ */ jsx(
            FormField,
            {
              type: "select",
              name: "genero",
              register,
              error: errors.genero,
              options: generoOptions
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 w-lg", children: [
          /* @__PURE__ */ jsx(LabelForm, { text: "Categoria" }),
          /* @__PURE__ */ jsx(
            FormField,
            {
              type: "select",
              name: "categoria",
              register,
              error: errors.categoria,
              options: categoriaOptions
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(Button, { text: "Crear Torneo", type: "submit" }) })
      ]
    }
  ) });
}

const $$CrearTorneo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Crear Torneo" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CrearTorneoForm", CrearTorneoForm, {})} ` })}`;
}, "C:/Users/x1/Desktop/Padel Villanueva/padel-villanueva/src/pages/admin/torneos/crearTorneo.astro", void 0);

const $$file = "C:/Users/x1/Desktop/Padel Villanueva/padel-villanueva/src/pages/admin/torneos/crearTorneo.astro";
const $$url = "/admin/torneos/crearTorneo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CrearTorneo,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

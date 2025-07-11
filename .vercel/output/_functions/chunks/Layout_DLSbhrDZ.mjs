import { c as createComponent, b as createAstro, m as maybeRenderHead, s as spreadAttributes, e as addAttribute, f as renderSlot, a as renderComponent, r as renderTemplate, g as renderScript, h as renderHead } from './astro/server_BIskFmgd.mjs';
import { jsx } from 'react/jsx-runtime';
import 'react';
/* empty css                               */

function Button({
  text,
  type = "button",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type,
      className: "w-auto h-12 text-white bg-rojo-oscuro/90 hover:bg-rojo-medium hover:transition p-2 flex items-center justify-center rounded-xl transform hover:scale-105 transition duration-300",
      ...props,
      children: text
    }
  );
}

const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};

const $$Astro$2 = createAstro();
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Icon;
  const {
    color = "currentColor",
    size = 24,
    "stroke-width": strokeWidth = 2,
    absoluteStrokeWidth = false,
    iconNode = [],
    class: className,
    ...rest
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes({
    ...defaultAttributes,
    width: size,
    height: size,
    stroke: color,
    "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
    ...rest
  })}${addAttribute(["lucide", className], "class:list")}> ${iconNode.map(([Tag, attrs]) => renderTemplate`${renderComponent($$result, "Tag", Tag, { ...attrs })}`)} ${renderSlot($$result, $$slots["default"])} </svg>`;
}, "C:/Users/x1/Desktop/Padel Villanueva/padel-villanueva/node_modules/.pnpm/@lucide+astro@0.525.0_astro_a896104771d2911d1db6abf91af64d4c/node_modules/@lucide/astro/src/Icon.astro", void 0);

const createLucideIcon = (iconName, iconNode) => {
  const Component = createComponent(
    ($$result, $$props, $$slots) => {
      const { class: className, ...restProps } = $$props;
      return renderTemplate`${renderComponent(
        $$result,
        "Icon",
        $$Icon,
        {
          class: mergeClasses(
            Boolean(iconName) && `lucide-${toKebabCase(iconName)}`,
            Boolean(className) && className
          ),
          iconNode,
          ...restProps
        },
        { default: () => renderTemplate`${renderSlot($$result, $$slots["default"])}` }
      )}`;
    },
    void 0,
    "none"
  );
  return Component;
};

const Menu = createLucideIcon("menu", [["path", { "d": "M4 12h16" }], ["path", { "d": "M4 18h16" }], ["path", { "d": "M4 6h16" }]]);

const X = createLucideIcon("x", [["path", { "d": "M18 6 6 18" }], ["path", { "d": "m6 6 12 12" }]]);

const $$Astro$1 = createAstro();
const $$NavLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$NavLink;
  const { url, text } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li class="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-rojo after:transition-all after:duration-300 hover:after:w-full"> <a${addAttribute(`${url}`, "href")} aria-current="page"> ${text} </a> </li>`;
}, "C:/Users/x1/Desktop/Padel Villanueva/padel-villanueva/src/components/ui/NavLink.astro", void 0);

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const session = "";
  return renderTemplate`${maybeRenderHead()}<nav class="shadow-md border-b-0 text-gray-700 font-medium"> <div class="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8"> <div class="flex items-center flex-1 gap-4"> <a href="/"> <img src="/logo_navbar.webp" class="h-12 w-auto" alt="Logo padel villanueva"> </a> <ul class="hidden sm:flex sm:items-center sm:ml-6 gap-6"> ${renderComponent($$result, "NavLink", $$NavLink, { "url": "/ranking", "text": "Ranking" })} ${renderComponent($$result, "NavLink", $$NavLink, { "url": "/torneoActual", "text": "Torneo Actual" })} ${renderComponent($$result, "NavLink", $$NavLink, { "url": "/torneos", "text": "Torneos" })} ${Boolean(session) && renderTemplate`${renderComponent($$result, "NavLink", $$NavLink, { "url": "/admin/panel", "text": "Panel de Administraci\xF3n" })}`} </ul> </div> <div class="hidden sm:flex sm:items-center"> ${renderTemplate`<a href="/signin"> ${renderComponent($$result, "Button", Button, { "text": "Iniciar sesion" })} </a>`} </div> <div class="flex items-center sm:hidden"> <button type="button" id="mobile-menu-button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-white hover:bg-carmin focus:outline-none focus:ring-2 focus:ring-inset focus:ring-carmin transition-colors duration-200" aria-controls="mobile-menu" aria-expanded="false"> <span class="sr-only">Abrir menú principal</span> ${renderComponent($$result, "Menu", Menu, { "class": "size-6", "id": "menu-closed-icon" })} ${renderComponent($$result, "X", X, { "class": "size-6 hidden", "id": "menu-open-icon" })} </button> </div> </div> <div class="hidden sm:hidden bg-white shadow-lg rounded-b-lg" id="mobile-menu"> <div class="px-2 pt-2 pb-3"> <ul class="flex flex-col gap-6 px-3 py-2"> ${renderComponent($$result, "NavLink", $$NavLink, { "url": "/ranking", "text": "Ranking" })} ${renderComponent($$result, "NavLink", $$NavLink, { "url": "/torneoActual", "text": "Torneo Actual" })} ${renderComponent($$result, "NavLink", $$NavLink, { "url": "/torneos", "text": "Torneos" })} ${Boolean(session) && renderTemplate`${renderComponent($$result, "NavLink", $$NavLink, { "url": "/admin/panel", "text": "Panel de Administraci\xF3n" })}`} </ul> </div> <div class="pt-4 pb-3 border-t border-gray-200"> ${renderTemplate`<a href="/signin" class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-carmin transition-colors duration-200">
Iniciar sesión
</a>`} </div> </div> </nav> ${renderScript($$result, "C:/Users/x1/Desktop/Padel Villanueva/padel-villanueva/src/components/Navbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/x1/Desktop/Padel Villanueva/padel-villanueva/src/components/Navbar.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const title = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Padel Villanueva</title><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="icon" href="/favicon.ico" sizes="any"><!-- fallback --><meta name="keywords" content="padel, villanueva, torneo, ranking"><title>${title}</title><meta name="description" content="Pagina web de la cancha de Padel del Villanueva Futbol Club, donde podrás ver el ranking de la misma, e información sobre los torneos que se llevan a cabo en la misma.">${renderHead()}</head> <body> ${renderComponent($$result, "Navbar", $$Navbar, {})} <main> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "C:/Users/x1/Desktop/Padel Villanueva/padel-villanueva/src/layouts/Layout.astro", void 0);

export { $$Layout as $, Button as B };

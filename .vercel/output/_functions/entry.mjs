import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_BFqrK_M9.mjs';
import { manifest } from './manifest_CToGsO2J.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/torneos/creartorneo.astro.mjs');
const _page2 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.11.0_@types+node@24_4e7e1a6a58df1cd26f2296062149be90/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/torneos/crearTorneo.astro", _page1],
    ["src/pages/index.astro", _page2]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "c9879dd7-49e1-4e65-913d-8540a8f3660e",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };

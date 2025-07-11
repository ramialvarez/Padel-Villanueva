import { d as decodeKey } from './chunks/astro/server_BIskFmgd.mjs';
import './chunks/astro-designed-error-pages_CdHeB3fg.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_Cozm035s.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/x1/Desktop/Padel%20Villanueva/padel-villanueva/","cacheDir":"file:///C:/Users/x1/Desktop/Padel%20Villanueva/padel-villanueva/node_modules/.astro/","outDir":"file:///C:/Users/x1/Desktop/Padel%20Villanueva/padel-villanueva/dist/","srcDir":"file:///C:/Users/x1/Desktop/Padel%20Villanueva/padel-villanueva/src/","publicDir":"file:///C:/Users/x1/Desktop/Padel%20Villanueva/padel-villanueva/public/","buildClientDir":"file:///C:/Users/x1/Desktop/Padel%20Villanueva/padel-villanueva/dist/client/","buildServerDir":"file:///C:/Users/x1/Desktop/Padel%20Villanueva/padel-villanueva/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.11.0_@types+node@24_3f4ada0aa18a2e980f201ad4a711a50d/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/crearTorneo.CtkzLPfJ.css"}],"routeData":{"route":"/admin/torneos/creartorneo","isIndex":false,"type":"page","pattern":"^\\/admin\\/torneos\\/crearTorneo\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"torneos","dynamic":false,"spread":false}],[{"content":"crearTorneo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/torneos/crearTorneo.astro","pathname":"/admin/torneos/crearTorneo","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@keyframes titleSlideDown{0%{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}@keyframes subtitleFadeIn{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes locationFadeIn{0%{opacity:0}to{opacity:1}}.animate-fadeIn[data-astro-cid-37nrbiej]{opacity:0;animation:fadeIn 1s forwards}.animate-titleSlideDown[data-astro-cid-37nrbiej]{opacity:0;animation:titleSlideDown 1.2s forwards .3s}.animate-subtitleFadeIn[data-astro-cid-37nrbiej]{opacity:0;animation:subtitleFadeIn 1.2s forwards .6s}.animate-locationFadeIn[data-astro-cid-37nrbiej]{opacity:0;animation:locationFadeIn 1.2s forwards .9s}.vfc-animation[data-astro-cid-37nrbiej]{position:relative;font-weight:900;color:#8a0303;margin-left:8px}.vfc-text[data-astro-cid-37nrbiej]{position:relative;z-index:2;display:inline-block;animation:vfcTextAnimation 4s infinite}.vfc-highlight[data-astro-cid-37nrbiej]{position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,#8a030333,#fff6,#8a030333);filter:blur(8px);opacity:0;animation:vfcHighlightAnimation 4s infinite}@keyframes vfcTextAnimation{0%{transform:perspective(400px) rotateY(0);text-shadow:0 0 5px rgba(255,255,255,.3)}25%{transform:perspective(400px) rotateY(10deg);text-shadow:0 0 15px rgba(255,255,255,.5),0 0 25px rgba(138,3,3,.5)}50%{transform:perspective(400px) rotateY(0);text-shadow:0 0 25px rgba(255,255,255,.8),0 0 40px rgba(138,3,3,.8)}75%{transform:perspective(400px) rotateY(-10deg);text-shadow:0 0 15px rgba(255,255,255,.5),0 0 25px rgba(138,3,3,.5)}to{transform:perspective(400px) rotateY(0);text-shadow:0 0 5px rgba(255,255,255,.3)}}@keyframes vfcHighlightAnimation{0%{opacity:0;transform:translate(-100%)}35%{opacity:.8}50%{opacity:1;transform:translate(0)}65%{opacity:.8}to{opacity:0;transform:translate(100%)}}\n"},{"type":"external","src":"/_astro/crearTorneo.CtkzLPfJ.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/x1/Desktop/Padel Villanueva/padel-villanueva/src/pages/admin/torneos/crearTorneo.astro",{"propagation":"none","containsHead":true}],["C:/Users/x1/Desktop/Padel Villanueva/padel-villanueva/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/admin/torneos/crearTorneo@_@astro":"pages/admin/torneos/creartorneo.astro.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.11.0_@types+node@24_3f4ada0aa18a2e980f201ad4a711a50d/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/Users/x1/Desktop/Padel Villanueva/padel-villanueva/node_modules/.pnpm/astro@5.11.0_@types+node@24_3f4ada0aa18a2e980f201ad4a711a50d/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BDe7pBpQ.mjs","\u0000@astrojs-manifest":"manifest_C6Kt0Ll5.mjs","@astrojs/react/client.js":"_astro/client.Co0vMr8l.js","C:/Users/x1/Desktop/Padel Villanueva/padel-villanueva/src/components/Navbar.astro?astro&type=script&index=0&lang.ts":"_astro/Navbar.astro_astro_type_script_index_0_lang.DKpMp7La.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/x1/Desktop/Padel Villanueva/padel-villanueva/src/components/Navbar.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"mobile-menu-button\"),n=document.getElementById(\"mobile-menu\"),t=document.getElementById(\"menu-closed-icon\"),o=document.getElementById(\"menu-open-icon\");console.log(\"BOTON\"+e,\"MENU\"+n,\"ICON CLOSED\"+t,\"ICON OPEN\"+o);e&&n&&t&&o&&e.addEventListener(\"click\",()=>{n.classList.toggle(\"hidden\"),t.classList.toggle(\"hidden\"),o.classList.toggle(\"hidden\")});"]],"assets":["/_astro/crearTorneo.CtkzLPfJ.css","/favicon.ico","/favicon.svg","/home.svg","/logos.svg","/logo_navbar.webp","/_astro/client.Co0vMr8l.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"E/I576k65qLqm3nP1v0S4WPng5a7zjtfEL29528I+UA="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };

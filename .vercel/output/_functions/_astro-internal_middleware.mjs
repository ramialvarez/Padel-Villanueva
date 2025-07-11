import { d as defineMiddleware, s as sequence } from './chunks/index_CaGK35sN.mjs';
import { s as supabase } from './chunks/supabase_SJ1iq0XH.mjs';
import './chunks/astro-designed-error-pages_CdHeB3fg.mjs';
import './chunks/astro/server_BIskFmgd.mjs';

async function getSessionFromCookies(context) {
  const { cookies } = context;
  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");
  if (!accessToken || !refreshToken) {
    return null;
  }
  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken.value,
    refresh_token: refreshToken.value
  });
  if (error) {
    cookies.delete("sb-access-token", { path: "/" });
    cookies.delete("sb-refresh-token", { path: "/" });
    return null;
  }
  return data.session;
}

const onRequest$1 = defineMiddleware(async (context, next) => {
  const session = await getSessionFromCookies(context);
  const { url, redirect } = context;
  if (url.pathname.includes("/admin") && !session) {
    return redirect("/signin");
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };

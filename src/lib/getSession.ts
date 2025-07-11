import { supabase } from "@/lib/supabase";
import type { APIContext } from "astro";

export async function getSessionFromCookies(context: APIContext) {
  const { cookies } = context;

  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");

  if (!accessToken || !refreshToken) {
    return null;
  }

  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken.value,
    refresh_token: refreshToken.value,
  });

  if (error) {
    cookies.delete("sb-access-token", { path: "/" });
    cookies.delete("sb-refresh-token", { path: "/" });
    return null;
  }

  return data.session;
}

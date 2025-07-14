import { supabase } from "@/lib/supabase";
import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  

  if (!email || !password) {
    return new Response("Faltan datos", { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    return new Response(error?.message ?? "Error de sesión", { status: 401 });
  }

  cookies.set("sb-access-token", data.session.access_token, { path: "/" });
  cookies.set("sb-refresh-token", data.session.refresh_token, { path: "/" });

  return redirect("/admin");
};

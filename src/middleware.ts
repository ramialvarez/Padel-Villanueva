import { defineMiddleware } from "astro:middleware";
import { getSessionFromCookies } from "@/lib/getSession";

export const onRequest = defineMiddleware(async (context, next) => {
  const session = await getSessionFromCookies(context);

  const { url, redirect } = context;

  if (url.pathname.includes("/admin") && !session) {
    return redirect("/signin");
  }

  return next();
});

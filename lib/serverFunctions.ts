import { NextPageContext } from "next";
import { auth } from "../authClient/isAuth";

export const isServer = () => typeof window === "undefined";
export const checkLoginServerRender = async (ctx: NextPageContext) => {
  const data = await auth(ctx);
  if (isServer() && data.accessToken) {
    ctx.res?.writeHead(301, {
      Location: "https://car-yard.now.sh",
    });
    ctx.res?.end();
  }
  return;
};
export const checkCookieServerRender = async (ctx: NextPageContext) => {
  const data = await auth(ctx);
  if (isServer() && !data.accessToken) {
    ctx.res?.writeHead(301, {
      Location: "https://car-yard.now.sh",
    });
    ctx.res?.end();
  }
  return;
};

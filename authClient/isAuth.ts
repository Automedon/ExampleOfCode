import Router from "next/router";
import cookie from "js-cookie";
import nextCookie from "next-cookies";
import { NextPageContext } from "next";

export const auth = async (ctx: NextPageContext) => {
  const data = await nextCookie(ctx);

  const accessToken = data["access-token"];
  const refreshToken = data["refresh-token"];
  userLogged = !!accessToken;
  return { accessToken, refreshToken };
};

export let userLogged = false;

export const logout = () => {
  cookie.remove("access-token");
  cookie.remove("refresh-token");
  Router.push("/");
};

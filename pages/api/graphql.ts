import cookie from "cookie";
import micro_cors from "micro-cors";
import { ApolloServer } from "apollo-server-micro";

import { verify } from "jsonwebtoken";
import UserModel from "../../server/models/user.model";
import { createTokens } from "../../server/createTokens";
import { typeDefs } from "../../server/typeDefs";
import { resolvers } from "../../server/resolvers";
import { connectToDatabase } from "../../mongoDB";

connectToDatabase(process.env.mongo_URL || "");

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }: any) => {
    const accessToken = req.cookies["access-token"];
    const refreshToken = req.cookies["refresh-token"];
    try {
      const data: any = verify(
        accessToken,
        process.env.JWT_ACCESS_TOKEN_SECRET || "your JWT_REFRESH_TOKEN_SECRET"
      );
      req.userId = data.userId;
      return { req, res };
    } catch {}
    if (!refreshToken) {
      return { req, res };
    }
    let data: any;
    try {
      data = verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET || "your JWT_ACCESS_TOKEN_SECRET"
      );

      req.userId = data.userId;
    } catch {
      return { req, res };
    }
    const user = await UserModel.findById(data.userId);
    if (!user || user.__v !== data.__v) {
      res.setHeader("set-cookie", [
        cookie.serialize("refresh-token", "", {
          httpOnly: true,
          path: "/",
        }),
        cookie.serialize("access-token", "", {
          httpOnly: true,
          path: "/",
        }),
        cookie.serialize("authorization", "", {
          path: "/",
        }),
      ]);
      return { req, res };
    }

    const tokens = createTokens(user);
    res.setHeader("set-cookie", [
      cookie.serialize("refresh-token", tokens.refreshToken, {
        httpOnly: true,
        path: "/",
        secure: true,
      }),
      cookie.serialize("access-token", tokens.accessToken, {
        httpOnly: true,
        path: "/",
        secure: true,
      }),
      cookie.serialize("authorization", "true", {
        path: "/",
      }),
    ]);

    req.userId = user._id;
    return { req, res };
  },
});

// const validOrigins = [
//   `http://localhost:${requestingClientPort}`,
//   "https://somedomain.com",
// ];
//
// function verifyOrigin(ctx) {
//   const origin = ctx.headers.origin;
//   if (!originIsValid(origin)) return false;
//   return origin;
// }
//
// function originIsValid(origin) {
//   return validOrigins.indexOf(origin) != -1;
// }

const handler = apolloServer.createHandler({ path: "/api/graphql" });
export const config = {
  api: {
    bodyParser: false,
  },
};
const cors = micro_cors();
export default cors((req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return;
  }
  return handler(req, res);
});

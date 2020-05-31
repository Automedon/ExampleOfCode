import { IUser } from "./models/user.model";
import { sign } from "jsonwebtoken";

export const createTokens = (user: IUser) => {
  const refreshToken = sign(
    JSON.parse(JSON.stringify({ userId: user._id, __v: user.__v })),
    process.env.JWT_REFRESH_TOKEN_SECRET || "your JWT_REFRESH_TOKEN_SECRET",
    { expiresIn: "7d" }
  );
  const accessToken = sign(
    JSON.parse(JSON.stringify({ userId: user._id })),
    process.env.JWT_ACCESS_TOKEN_SECRET || "your JWT_ACCESS_TOKEN_SECRET",
    {
      expiresIn: "15min",
    }
  );
  return { accessToken, refreshToken };
};

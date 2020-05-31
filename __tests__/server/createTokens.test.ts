import { createTokens } from "../../server/createTokens";
import UserModel from "../../server/models/user.model";

const _doc = {
  _id: "507f191e810c19729de860ea",
  email: "name@email.com",
  hashedPassword:
    "$2a$12$y13D37aeLv/nx4ANE1.ztOVvqCeKVyCwZc1OH4LY73CexFCeknxO.",
};

const user = new UserModel(_doc);

describe("Create tokens", () => {
  it("creating tokens", () => {
    const { accessToken, refreshToken } = createTokens(user);
    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();
    expect(typeof accessToken).toStrictEqual("string");
    expect(typeof refreshToken).toStrictEqual("string");
  });
});

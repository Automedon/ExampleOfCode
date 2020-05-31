import { IResolvers } from "graphql-tools";
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";
import UserModel, { IUser } from "./models/user.model";
import CarModel, { ICar } from "./models/car.model";
import * as bcrypt from "bcryptjs";
import { createTokens } from "./createTokens";
import cookie from "cookie";

export const resolvers: IResolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  Query: {
    graphqlServerIsOn: () => {
      return "Sure dude, I am working";
    },
    findUser: async (parent, args, { req }) => {
      if (!req.userId) {
        return null;
      }
      return UserModel.findOne({ _id: req.userId });
    },
    fetchCars: async (parent, args, ctx, info) => {
      interface allCarsInfo {
        [key: string]: {
          carModel: string[];
          carYear: number[];
        };
      }

      const cars: ICar[] = await CarModel.find();
      const obj: allCarsInfo = {};
      for (let i = 0; i < cars.length; i++) {
        if (!obj[`${cars[i].carMake}`]) {
          obj[cars[i].carMake] = {
            carModel: [cars[i].carModel],
            carYear: [cars[i].carYear],
          };
        } else {
          if (!obj[cars[i].carMake].carModel.includes(cars[i].carModel)) {
            obj[cars[i].carMake].carModel = [
              ...obj[cars[i].carMake].carModel,
              cars[i].carModel,
            ].sort((a, b) => a.localeCompare(b));
            if (!obj[cars[i].carMake].carYear.includes(cars[i].carYear)) {
              obj[cars[i].carMake].carYear = [
                ...obj[cars[i].carMake].carYear,
                cars[i].carYear,
              ].sort((a, b) => a - b);
            }
          }
        }
      }
      const result: allCarsInfo = {};
      Object.keys(obj)
        .sort(function (a, b) {
          return a.localeCompare(b);
        })
        .map(function (v) {
          result[v] = obj[v];
        });
      return { myObject: result, myValue: "JSON" };
    },
    searchCars: async (
      parent,
      { limit = 20, page = 1, ...args },
      ctx,
      info
    ) => {
      const options = {
        page,
        limit,
      };

      if (args["carInStock"] === "false") {
        args["carInStock"] = false;
      } else if (args["carInStock"] === "true") {
        args["carInStock"] = true;
      } else {
        delete args["carInStock"];
      }
      let carYear: any = {};
      if (args["carYear"]) {
        args["carYear"] = { $gte: args["carYear"] };
      }
      // Deleting all empty parameters for searching in DB
      for (let i in args) {
        if (i !== "carInStock") {
          if (!args[i]) {
            delete args[i];
          }
        }
      }

      const cars = await CarModel.paginate(args, options, function (
        err,
        result
      ) {
        return result;
      });

      return cars;
    },
  },
  Mutation: {
    register: async (_, args, ctx) => {
      const { email, password } = args.input;
      if ((await UserModel.find({ email })).length !== 0) {
        return false;
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      try {
        await UserModel.create({ email, hashedPassword });
        return true;
      } catch (e) {
        return false;
      }
    },
    login: async (
      _,
      args: { input: { email: string; password: string } },
      { res }
    ) => {
      const { email, password } = args.input;
      const user = await UserModel.findOne({ email });
      if (!user) {
        return null;
      }
      const valid = await bcrypt.compare(password, user.hashedPassword);
      if (!valid) {
        return null;
      }
      const { accessToken, refreshToken } = createTokens(user);
      res.setHeader("set-cookie", [
        cookie.serialize("refresh-token", refreshToken, {
          httpOnly: true,
          path: "/",
        }),
        cookie.serialize("access-token", accessToken, {
          httpOnly: true,
          path: "/",
        }),
        cookie.serialize("authorization", "true", {
          path: "/",
        }),
      ]);

      return user;
    },
    invalidateTokens: async (_, args, { req }) => {
      if (!req.userId) {
        return false;
      }
      const user = await UserModel.findById(req.userId);

      if (!user) return false;
      user.__v! += 1;
      await user.save();
      return true;
    },
  },
};

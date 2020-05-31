import mongoose, { Model, Schema } from "mongoose";

export interface IUser extends mongoose.Document {
  email: string;
  hashedPassword: string;
}

export const UserSchema: Schema = new mongoose.Schema({
  email: {
    type: "string",
    required: true,
    unique: true,
    dropDups: true,
  },
  hashedPassword: {
    type: "string",
    required: true,
  },
});

let model: Model<IUser>;

try {
  model = mongoose.model<IUser>("UserModel", UserSchema);
} catch {
  model = mongoose.model<IUser>("UserModel");
}

export default model;

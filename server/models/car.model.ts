import mongoose, { Schema, PaginateModel, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export interface ICar extends Document {
  carMake: string;
  carCost: string;
  carModel: string;
  carYear: number;
  carVin: string;
  carImage: string;
  carInStock: boolean;
}

const CarSchema: Schema = new mongoose.Schema({
  carMake: {
    type: "string",
    required: true,
  },
  carCost: {
    type: "string",
    required: true,
  },
  carModel: {
    type: "string",
    required: true,
  },
  carYear: {
    type: "number",
    required: true,
  },
  carVin: {
    type: "string",
    required: true,
  },
  carImage: {
    type: "string",
    required: true,
  },
  carInStock: {
    type: "boolean",
    required: true,
  },
});

CarSchema.plugin(mongoosePaginate);

let model: PaginateModel<ICar>;

try {
  model = mongoose.model("CarModel", CarSchema);
} catch {
  model = mongoose.model("CarModel");
}

export default model;

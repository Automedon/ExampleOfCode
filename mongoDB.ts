import mongoose, { ConnectionOptions } from "mongoose";

const configMongoose: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
let cachedDb: any = null;
export async function connectToDatabase(uri: string) {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb;
  }

  // If no connection is cached, create a new one
  const client = await mongoose.connect(uri, configMongoose);
  // Cache the database connection and return the connection
  cachedDb = client;
  return client;
}

import mongoose from "mongoose";
import config from "../config";
import fs from "fs";
import { resolve } from "path";

const models = resolve(__dirname, "../database/schema");

// ~表示取反 也就是!

fs
  .readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*js$/))
  .forEach(file => require(resolve(models, file)));

export const database = app => {
  mongoose.set("debug", false);
  mongoose.Promise = global.Promise;
  mongoose.connect(config.mongodb, {
    useMongoClient: true
  });
  mongoose.connection.on("disconnected", () => {
    console.log("disconnected");
    mongoose.connect(config.mongodb, {
      useMongoClient: true
    });
  });
  mongoose.connection.on("error", err => {
    console.error(err);
  });
  mongoose.connection.on("open", async => {
    console.log("Connected to MongoDB");
  });
};

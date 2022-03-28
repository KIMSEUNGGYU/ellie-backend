import Moogoose from "mongoose";
import { config } from "../config.js";

export async function connectDB() {
  return Moogoose.connect(config.db.host);
}

// _id -> id
export function useVirtualId(schema) {
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  schema.set("toJSON", { virtuals: true });
  schema.set("toObject", { virtuals: true });
}

// TODO(GYU): Delete blow
let db;

export function getTweets() {
  return db.collection("tweets");
}

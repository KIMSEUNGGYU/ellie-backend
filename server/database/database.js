import Moogoose from "mongoose";
import { config } from "../config.js";

export async function connectDB() {
  return Moogoose.connect(config.db.host);
}

// TODO(GYU): Delete blow
let db;
export function getUsers() {
  return db.collection("users");
}

export function getTweets() {
  return db.collection("tweets");
}

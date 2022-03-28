import MongoDb from "mongodb";

import { config } from "../config.js";

// 해당 모듈 안에서만 사용할 수 있는 db 변수
let db;
export async function connectDB() {
  return MongoDb.MongoClient.connect(config.db.host) //
    .then((client) => {
      db = client.db();
    });
}

// 컬렉션을 줄 수 있는 함수 모듈화
export function getUsers() {
  return db.collection("users");
}

export function getTweets() {
  return db.collection("tweets");
}

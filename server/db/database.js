// db 연결 하는 기능 수행

import mysql from "mysql2";

import { config } from "../config.js";

// mysql.createPool 은 db 접속 도와주고 SQL 구문을 수행시키도록 도와주는 class
const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
});

export const db = pool.promise();

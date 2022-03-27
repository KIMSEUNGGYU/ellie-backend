import { db } from "../db/database.js";

// 데이터 가져올 건데, tweets에서 가져와 근데 users와 연결지어서(join) 가져와
// 연결 할 때 조건(on)이 있는데 tw.userId=us.id 같은 경우 가져와
// 또 정렬은 tw.createdAt 의 DESC 기반으로 가져와
// "SELECT tw.id, tw.text, tw.createdAt, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id ORDER BY tw.createdAt DESC"
const SELECT_JOIN =
  "SELECT tw.id, tw.text, tw.userId, tw.createdAt, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id";

const ORDER_DESC = "ORDER BY tw.createdAt DESC";

export async function getAll() {
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
}

export async function getAllByUsername(username) {
  return db
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username])
    .then((result) => result[0]);
}

export async function getById(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
    .then((result) => result[0][0]);
}

export async function create(text, userId) {
  return db
    .execute(`INSERT INTO tweets (text, createdAt, userId) VALUES (?, ?, ?)`, [
      text,
      new Date(),
      userId,
    ])
    .then((result) => getById(result[0].insertId));
}

export async function update(id, text) {
  return db
    .execute(`UPDATE tweets SET text=? WHERE id=?`, [text, id])
    .then(() => getById(id));
}

export async function remove(id) {
  return db.execute(`DELETE FROM tweets WHERE id=?`, [id]);
}

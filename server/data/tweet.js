import * as userRepository from "./auth.js";

// NOSQL (정보의 중복 > 관계)
// 프로필 DB
// 사용자의 문서 DB: 서버1, 서버2, 서버3
// 서로 관계가 없음. 수평적으로 확장 쉬움
// 관계형 조인쿼리의 성능이 좋지 않음!
// 모든 테이블 간의 관계가 있으면 SQL 사용 고려
// => 특정 테이블의 관계가 있는 경우 정보의 중복성을 관계보다 더 선호함
// => A 컬렉션이 B컬렉션의 정보를 가지고 있다면, 관계를 맺지 말고 A 컬렉션에서 B 컬렉션의 정보를 갖고 있는 것을 선호
// => 왜? 중복을 가지고 있는 것이 관계를 갖는 것보다 성능적으로 확장이 쉬움?

// SQL: 관계형
// 조인쿼리의 성능이 좋음

let tweets = [
  {
    id: "1",
    text: "드림코더분들 화이팅!",
    createdAt: new Date().toString(),
    userId: "1",
    userName: "gyu",
    url: "...",
  },
  {
    id: "2",
    text: "안뇽!",
    createdAt: new Date().toString(),
    userId: "1",
    userName: "gyu",
    url: "...",
  },
];

export async function getAll() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepository.findById(
        tweet.userId
      );
      return { ...tweet, username, name, url };
    })
  );
}

export async function getAllByUsername(username) {
  return getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
}

export async function getById(id) {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
}

export async function create(text, userId) {
  const tweet = {
    id: new Date().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return getById(tweet.id);
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return getById(tweet.id);
}

export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}

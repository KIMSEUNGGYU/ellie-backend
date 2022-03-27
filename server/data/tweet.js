// 하나의 정보는 하나에 있는게 좋음
// SQL 장점, NOSQL 단점
// 각 트윗마다 user 이름과, url 갖고 있는 단점
// 1. 동일한 정보(email, name)가 중복적으로 저장되는 건 좋지 않음
// 2. 사용자가 email 또는 name 정보를 변경할 경우 모든 tweets 데이터를 탐색해서 변경해야함
// 그래서 userId 를 이용해서 user의 정보를 가리키고 있음

import * as userRepository from "./auth.js";

let tweets = [
  {
    id: "1",
    text: "드림코더 분들 화이팅!",
    createdAt: new Date().toString(),
    userId: "1",
  },
  {
    id: "2",
    text: "안녕!",
    createdAt: new Date().toString(),
    userId: "1",
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
  console.log("gyu found", found);
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

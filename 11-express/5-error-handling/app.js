import express from "express";
import fs from "fs";
import fsAsync from "fs/promises";

// require("express-async-errors"); // Common JS
import {} from "express-async-errors";

const app = express();

app.use(express.json());

app.get("/file1", (req, res) => {
  // 1. fs.readFile 처럼 콜백 함수로 비동기처리하는 로직인 경우
  // 해당 콜백 함수에서 응답과 같은 로직을 수행해야 올바르게 처리 가능
  // 아무리 error middleware 를 추가후 에러 발생했더라도 콜백 함수에서 에러를 처리하기 때문에
  // error middlware 까지 도달하지 못함
  // => try-catch 로 감싸도 동작 안함, callback 에서 처리해야함
  // => readFile 과 같이 비동기 적인 것을 이용할 때는 해당하는 콜백함수 내에서 에러 처리를 해야함
  // 1.
  // fs.readFile('/file1.txt', (err, data) => {
  //   if (err) {
  //     res.sendStatus(404);
  //   }
  // });

  // 2.
  try {
    const data = fs.readFileSync("/file1.txt");
  } catch (error) {
    res.sendStatus(404);
  }
});

// 비동기는 try-catch 로 에러를 잡을 수 없음
// 왜냐하면 내부적으로 에러가 발생했기 문에
// promise 인 경우
app.get("/file2", (req, res) => {
  // Promise 도 마찬가지로 callback 함수를 등록하지 않지만, 비슷한 형태인 then, catch 를 수행
  // promise 코드를 호출하더라도 에러를 내부적으로 처리하기 때문에 외부에서 에러 발생하는지 확인 불가 - try-catch 사용 불가
  // promise 에서 에러 처리할 경우 catch 로 처리해야함
  // fsAsync
  //   .readFile("/file2.txt") //
  //   .catch((error) => {
  //     res.sendStatus(404);
  //   });

  return fsAsync.readFile("/file2.txt");
});

// async 예제
app.get("/file3", async (req, res) => {
  const data = await fsAsync.readFile("/file2.txt");
});

// 버전 5 이하에서는: require('express-async-errors');

// Express 5 부터는 이렇게
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(8080);

/**
 * 동기적인 코드인 경우 middleware error handler 까지 떨어지지만
 * 비동기적인 처리(코드)는 (promsie, async-await) 외부에서 에러를 감지할 수 있는 방법이 없어
 * middleware error handler 가 있더라도 알 수 없음
 */

/**
 * Express.js 5.0.0-alpha.7 에서 에러 발생시, 미들웨어 에러 핸들러를 호출할 수 있도록 할 예정
 *
 * Express 4점대 에서는 express-async-erros 를 import 하여 사용 <- 자동으로 미들웨어 에러 핸들로 호출 함(try-catch 없어도?)
 * 단, promise 를 return 하는 경우에만 감지해서 동작
 */

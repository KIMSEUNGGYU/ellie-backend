// 11.7 정리

import express from "express";

const app = express();

// client 가 요청한 body 를 읽기 위해서는
// middlware 로 express.json() 을 등록해야함
app.use(express.json());

// post 요청인 경우 client 가 대부분 body 로 데이터 요청
app.post("/", (req, res, next) => {
  console.log(req.body);
});

app.listen(8080);

// 11.7~10 정리

import express from "express";

import postRouter from "./router/post.js";
import userRouter from "./router/user.js";

const app = express();

app.use(express.json()); // REST API -> Body
// app.use(express.urlencoded({ extended: false })); // HTML Form -> body
// app.use(express.static("public")); // static 한 자원을 자동으로 읽을 수 있도록 설정? 추가, public 안에 있는 모든 리소스 사용 가능!?
// 만약 static 사용하지 않으면, 파일을 버퍼로 읽어서 처리하는 등.. 복잡한 작업 수행
const options = {
  dotfiles: "ignore", // 숨겨진 파일 무시?
  etag: false,
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set("x-timestamp", Date.now());
  },
};
app.use(express.static("public", options)); //

app.use("/posts", postRouter);
app.use("/users", userRouter);

app.listen(8080);

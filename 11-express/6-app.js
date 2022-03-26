// 11.3 ~ 6 정리

import express from "express";

const app = express();

// app.all vs app.use
// all 인 경우 '/api' 로 접속하 모든 요청 수신,
// 하지만 '/api/docs' 와 같이 하위 도메인이 있는 경우 수신하지 않음
// => 즉, 경로가 일치하는 거에 한해서만 모든 요청 수신
// 만약 /api/* 로 처리한 경우 하위 도메인도 처리 가능
app.all("/api", (req, res, next) => {
  console.log("all");
  next();
});

// use 인 경우, 모든 요청 및 "/sky" 를 포함한 모든 (하위)경로 수신
app.use("/sky", (req, res, next) => {
  console.log("all");
  next();
});

app.get(
  "/",
  (req, res, next) => {
    console.log("first");

    // middleware 로 넘기기
    // next('route'); // 다음 라우트인 'second' 부분으로 넘어감
    // next(new Error("Error")); // 다음 라우트인 'second' 부분으로 넘어감

    if (true) {
      return res.send("Hello"); // 하나의 콜백에서는 res 가 하나만 정의되어야 하므로 return 으로 처리
    }

    // res.send("GYu"); // 위에서 return 하지 않으면 에러 발생
  },
  (req, res, next) => {
    console.log("first2");
  }
);

app.get("/", (req, res, next) => {
  console.log("second");
});

// ✨ 필수! 아무것도 처리하지 않고 여기에 도달하면, 정의되어 있지 않는 api
// 즉, 404 Not Found
app.use((req, res, next) => {
  res.status(404).send("Not avaliable! @_@");
});

// ✨ 필수! 에러 처리를 위한 미들웨어!
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("Sorry, try later!");
});

app.listen(8080);

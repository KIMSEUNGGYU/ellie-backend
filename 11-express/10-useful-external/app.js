import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan"; // 사용자에게 요청을 받을 때마다 얼마나 걸렸는지 등 유용한 정보를 log 로 남길 때 사용
import helmet from "helmet"; // 보안에 필요한 headers 를 추가해서 응답할 때 보냄, no-sniff, Download-options 끄기, XXS-protection 보안 등
// helmet 은 보안에 필요한 정보들 추가

// http://expressjs.com/en/resources/middleware/morgan.html
const app = express();

// cookie-parser
// morgan
// cors
// helmet

// cookie-parser
// key: Cookie
// value: yummy_cookie=choco; tasty_cookie=strawberry

const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200, // for options request
  credentials: true, // Access-Control-Allow-Credentials: true
};

app.use(cookieParser()); // http://expressjs.com/en/resources/middleware/cookie-parser.html
app.use(morgan("common")); // http://expressjs.com/en/resources/middleware/morgan.html
app.use(cors(corsOptions));
app.use(helmet()); // https://github.com/helmetjs/helmet

app.get("/", (req, res) => {
  console.log(req.cookies); // it will be undefined without cookie-parser
  console.log(req.cookies.yummy_cookie);
  res.send("Welsome!");
});

app.listen(8080);

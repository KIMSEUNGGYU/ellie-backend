const http = require("http");
// const http2 = require("http2"); // 개발할 때는 http 로 하기, spec 은 같기 때문에 배포할 때 http2 로 배포하면됨.?

// console.log(http.STATUS_CODES);
// console.log(http.METHODS);

// 서버 생성
const server = http.createServer((req, res) => {
  console.log("incomming...");
  console.log(req.headers);
  console.log(req.httpVersion);
  console.log(req.method);
  console.log(req.url);

  res.write("Welcome!");
  res.end();
});

// listen 을 호출해야 server 수행
server.listen(8080);

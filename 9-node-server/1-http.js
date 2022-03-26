const http = require("http");
const fs = require("fs");

// 서버 생성
const server = http.createServer((req, res) => {
  console.log("incomming...");
  //   console.log(req.headers);
  //   console.log(req.httpVersion);
  //   console.log(req.method);
  //   console.log(req.url);

  const url = req.url;
  res.setHeader("Content-type", "text/html");

  if (url === "/") {
    fs.createReadStream("./html/index.html").pipe(res);
  } else if (url === "/courses") {
    fs.createReadStream("./html/courses.html").pipe(res);
  } else {
    fs.createReadStream("./html/not-found.html").pipe(res);
  }
});

// listen 을 호출해야 server 수행
server.listen(8080);

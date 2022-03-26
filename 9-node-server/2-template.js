const http = require("http");
const ejs = require("ejs");

const name = "GYU";
const courses = [
  { name: "HTML" },
  { name: "CSS" },
  { name: "JS" },
  { name: "Node" },
];

// 서버 생성
const server = http.createServer((req, res) => {
  const url = req.url;
  res.setHeader("Content-type", "text/html");

  if (url === "/") {
    ejs
      .renderFile("./template/index.ejs", { name })
      .then((data) => res.end(data));
  } else if (url === "/courses") {
    ejs
      .renderFile("./template/courses.ejs", { courses })
      .then((data) => res.end(data));
  } else {
    ejs
      .renderFile("./template/not-found.ejs", { name })
      .then((data) => res.end(data));
  }
});

// listen 을 호출해야 server 수행
server.listen(8080);

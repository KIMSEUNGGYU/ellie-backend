const { read } = require("fs");
const http = require("http");

const courses = [
  { name: "HTML" },
  { name: "CSS" },
  { name: "JS" },
  { name: "Node" },
];

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/courses") {
    if (method === "GET") {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify(courses));
    } else if (method === "POST") {
      const body = [];

      // 데이터가 넘어올 때 해당 이벤트 콜백 함수 수행
      req.on("data", (chunk) => {
        body.push(chunk);
      });

      // 데이터를 다 받으면 해당 이벤트 콜백 함수 수행
      req.on("end", () => {
        const bodyStr = Buffer.concat(body).toString();
        const course = JSON.parse(bodyStr);

        courses.push(course);

        res.writeHead(201);
        res.end();
      });
    }
  }
});

// listen 을 호출해야 server 수행
server.listen(8080);

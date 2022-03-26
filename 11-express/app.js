import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  //   console.log(req.path);
  //   console.log(req.headers);
  console.log(req.params);
  console.log(req.query);
  console.log("gyu");
});

app.listen(8080);

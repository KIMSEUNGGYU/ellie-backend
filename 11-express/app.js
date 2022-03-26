import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  console.log("gyu");
});

app.listen(8080);

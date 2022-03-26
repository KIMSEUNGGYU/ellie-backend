import express from "express";

const app = express();

app.get("/", (req, res, next) => {
  //   console.log(req.path);
  //   console.log(req.headers);
  console.log(req.params);
  console.log(req.query);

  //   res.send("hi!!");
  //   res.json({ name: "gyu" });
  //   res.sendStatus(400);

  res.setHeader("key", "value");
  res.status(201).send("created");
});

app.listen(8080);

import express from "express";
import "express-async-errors";

import * as tweetControler from "../controller/tweet.js";

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get("/", tweetControler.getTweets);

// GET /tweets/:id
router.get("/:id", tweetControler.getTweet);

// POST /tweets
router.post("/", tweetControler.createTweet);

// PUT /tweets/:id
router.put("/:id", tweetControler.updateTweet);

// delete /tweets/:id
router.delete("/:id", tweetControler.deleteTweet);

export default router;

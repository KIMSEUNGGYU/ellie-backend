import express from "express";
import "express-async-errors";
import { body } from "express-validator";

import * as tweetControler from "../controller/tweet.js";

import { validate } from "../middleware/validator.js";

const router = express.Router();

// validation
// sanitization
// Contract Testing: Client-Server
const validateTweet = [
  body("text")
    .trim()
    .isLength({ min: 3 })
    .withMessage("text should be at least 3 charaters"),
  validate,
];

// GET /tweets
// GET /tweets?username=:username
router.get("/", tweetControler.getTweets);

// GET /tweets/:id
router.get("/:id", tweetControler.getTweet);

// POST /tweets
router.post("/", validateTweet, tweetControler.createTweet);

// PUT /tweets/:id
router.put("/:id", validateTweet, tweetControler.updateTweet);

// delete /tweets/:id
router.delete("/:id", tweetControler.deleteTweet);

export default router;

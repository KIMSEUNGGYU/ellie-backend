import express from "express";
import "express-async-errors";
import { body } from "express-validator";

import * as tweetControler from "../controller/tweet.js";

import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

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
router.get("/", isAuth, tweetControler.getTweets);

// GET /tweets/:id
router.get("/:id", isAuth, tweetControler.getTweet);

// POST /tweets
router.post("/", isAuth, validateTweet, tweetControler.createTweet);

// PUT /tweets/:id
router.put("/:id", isAuth, validateTweet, tweetControler.updateTweet);

// delete /tweets/:id
router.delete("/:id", isAuth, tweetControler.deleteTweet);

export default router;

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "express-async-errors";

import * as userRepository from "../data/auth.js";

// TODO: Make it secure!
const jwtScretKey = "F2dN7x8HVzBWaQeEEDnhsvHXRWqAR63z";
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 12;

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;

  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }

  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });

  // db 가 생성한 사용자의 고유한 id 를 이용해서 jwt 생성
  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;

  const user = await userRepository.findByUsername(username);
  if (!user) {
    // error 메시지를 친절하게 알려주지 않는 이유는 보안성 - 해커가 유추하기 힘들게 하기 위해
    return res.status(401).json({ message: `Invalid user or password` });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: `Invalid user or password` });
  }

  // db 가 생성한 사용자의 고유한 id 를 이용해서 jwt 생성
  const token = createJwtToken(user.id);
  res.status(201).json({ token, username });
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtScretKey, { expiresIn: jwtExpiresInDays });
}

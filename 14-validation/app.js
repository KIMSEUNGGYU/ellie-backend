import express from "express";
import { body, param, validationResult } from "express-validator";

const app = express();
app.use(express.json());

const validate = (req, res, next) => {
  const errors = validationResult(req);
  // 에러가 없다면 다음 미들웨어로 넘어감
  if (errors.isEmpty()) {
    return next();
  }

  // 에러 인 경우 400 에러
  return res.status(400).json({ message: errors.array() });
  // return res.status(400).json({ message: errors.array()[0].msg });
};

app.post(
  "/users",
  [
    // Sanitization 적용? - 사용자가 공백만 보내거나 데이터에 공백 등이 있을 경우(잘못된 형태의 데이터) 이를 처리하는 경우 ? - trim()
    body("name").trim().isLength({ min: 2 }).withMessage("이름은 두글자 이상!"),
    body("age").isInt().withMessage("숫자를 입력해"),
    body("email").isEmail().withMessage("이메일 입력해요").normalizeEmail(), // 대문자로 올 경우, 이메일  형태(소문자)로 변경!?
    body("job.name").notEmpty(),
    validate,
  ],
  (req, res, next) => {
    console.log(req.body);
    res.sendStatus(201);
  }
);

app.get(
  "/:email",
  [param("email").isEmail().withMessage("이메일 입력해요"), validate],
  (req, res, next) => {
    res.send("💌");
  }
);

app.listen(8080);

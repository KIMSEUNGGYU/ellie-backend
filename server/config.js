import dotenv from "dotenv";
dotenv.config();

// 1. 개발자가 config  에 있는 정보를 쉽게 확인 가능
// 2. 없는 config 에 있는 정보를 쉽게 확인 가능

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value === null) {
    throw new Error(`Key ${key} is undefined`);
  }

  return value;
}

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInSec: parseInt(required("JWT_EXPIRES_SEC", 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12)),
  },
  host: {
    port: parseInt(required("HOST_PORT", 8080)),
  },
};

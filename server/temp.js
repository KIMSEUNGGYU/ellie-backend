import bcrypt from "bcrypt";

const password = "abcd1234";
const hashed = bcrypt.hashSync(password, 12); // 동기적 수행
console.log(`password: ${password}, hashed: ${hashed}`);

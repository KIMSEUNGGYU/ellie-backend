const bcrypt = require("bcrypt");

const password = "abcd1234";
// hash 를 생성할 때 길이가 기하급수적으로 늘음 20은 엄청 오래 걸림, 권장 길이는 8~12
const hashed = bcrypt.hashSync(password, 10); // 동기적 수행
console.log(`password: ${password}, hashed: ${hashed}`);

const result = bcrypt.compareSync("abcd1234", hashed);
console.log(result);

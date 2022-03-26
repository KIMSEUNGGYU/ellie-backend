const jwt = require("jsonwebtoken");

// paylod 에는 token에 담고 싶은 정보, 통신 시 해당 데이터를 포함하기에 정말 중요한 데이터만 주고 받기
// secret 키는 jwt 암호/복호화 할 때 사용하는 중요한 key!

const secret = "randomkey";

const token = jwt.sign(
  {
    id: "userId",
    isAdmin: true,
  },
  secret, // 보통 32자리의 키 권장
  { expiresIn: 2 } // (유효시간이 없는)jwt 탈취되면 다시 사람이 영원히 사용 가능 - 그래서 유효시간 줌
);

console.log(token);

const edited =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imd5dSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDgzMTA3NTF9.RaPiR25fhyiUVkP2amQ19uKlGix3M8eOYvoYHkAoCU0";

// 수정된 값은 jwt error - invalid signature
// jwt.verify(edited, secret, (error, decoded) => {
//   console.log(error, decoded);
// });

// 올바른 토큰은 verify 통과
jwt.verify(token, secret, (error, decoded) => {
  console.log(error, decoded);
});

// 유효시간 테스트
// setTimeout(() => {
//   jwt.verify(token, secret, (error, decoded) => {
//     console.log(error, decoded);
//   });
// }, 3000);

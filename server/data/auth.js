// 데이터에 수정 사항이 필요하면 여기서 data 에서 수정하면 됨

let users = [
  {
    id: "1",
    username: "bob",
    password: "",
    name: "bob@gmail.com",
    url: "https://wodgetwhats.com/app/uploads/2019/11/free-profile-photo-watsapp-1.png",
  },
];

console.log(users);

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}

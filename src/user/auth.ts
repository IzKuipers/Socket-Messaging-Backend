import { verify } from "argon2";
import { getUser, getUsers, setUsers } from "./db";
import { Player } from "./interface";
import { createPassword } from "./pswd";

export async function createUser(username: string, password: string) {
  const data: Player = {
    name: username,
    password: await createPassword(password),
    score: 0,
    awards: [],
  };
  const user = await getUser(username);

  if (user) return false;

  const allUsers = await getUsers();

  allUsers.push(data);

  return await setUsers(allUsers);
}

export async function authorize(username: string, password: string) {
  const user = await getUser(username);

  if (!user) {
    return false;
  }

  const valid = await verify(user.password, password);

  return valid;
}

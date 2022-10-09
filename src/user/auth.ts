import { verify } from "argon2";
import { Socket } from "socket.io";
import { broadcastPlayerPresence } from "../clients/main";
import { UserClients } from "./clients";
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

export async function authorize(
  socket: Socket,
  username: string,
  password: string
) {
  console.log(`authorize: Attempting authorization for user ${username}...`);
  const user = await getUser(username);

  if (!user) {
    return false;
  }

  let userExists = false;

  for (const client of UserClients) {
    if (client[1] == username) userExists = true;
  }

  if (!UserClients.has(socket.id) && !userExists) {
    console.log(`Attaching ${socket.id} to user ${username}`);
    UserClients.set(socket.id, username);
    await broadcastPlayerPresence();
  }

  const valid = await verify(user.password as string, password);

  return valid;
}

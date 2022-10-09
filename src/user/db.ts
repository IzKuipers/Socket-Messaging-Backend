import { readFile, writeFile } from "fs/promises";
import { Player } from "./interface";

export async function getUsers() {
  let users;
  try {
    users = await readFile("users.json", { encoding: "utf-8" });
  } catch {
    users = "[]";
    await writeFile("users.json", "[]", { encoding: "utf-8" });
  }

  users = JSON.parse(users) as Player[];

  return users;
}

export async function setUsers(users: Player[]) {
  try {
    await writeFile("users.json", JSON.stringify(users), {
      encoding: "utf-8",
    });
    return true;
  } catch {
    return false;
  }
}

export async function getUser(username: string, forExternal = false) {
  const users = await getUsers();

  for (let i = 0; i < users.length; i++) {
    if (users[i].name == username) {
      const user = users[i];

      if (forExternal) delete user.password;

      return user;
    }
  }

  return null;
}

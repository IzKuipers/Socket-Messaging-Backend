import { UserClients } from "./../user/clients";
import { Player } from "./../user/interface";
import { server } from "./../server/main";
import { getUser } from "../user/db";
export const clients: string[] = [];

export function registerClient(client: string) {
  console.log(`registerClient: ${client} has connected.`);
  if (!clients.includes(client)) {
    clients.push(client);

    broadcastClientPresence(client);

    return true;
  }

  return false;
}

export function removeClient(client: string) {
  const user = UserClients.get(client);
  console.log(
    `removeClient: ${client}${user ? ` (${user}) ` : ""}has disconnected.`
  );
  for (let i = 0; i < clients.length; i++) {
    if (clients[i] == client) {
      clients.splice(i, 1);

      broadcastClientPresence(client);

      return true;
    }
  }

  return false;
}

export function broadcastClientPresence(client: string) {
  server.emit("update-presence", clients, client);
}

export async function broadcastPlayerPresence() {
  const players: Player[] = [];

  for (const entry of UserClients) {
    const user = await getUser(entry[1], true);

    if (!user) continue;

    players.push(user);
  }

  server.emit("player-presence", players);
}

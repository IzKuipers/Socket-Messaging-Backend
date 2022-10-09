import { UserClients } from "./../user/clients";
import { ListenStore } from "./store";
import { broadcastPlayerPresence, clients } from "./../clients/main";
import { Socket } from "socket.io";
import { registerClient, removeClient } from "../clients/main";

export function socketListen(socket: Socket) {
  registerClient(socket.id);

  socket.emit("connected", socket.id, clients);

  socket.on("disconnect", () => {
    removeClient(socket.id);
    if (UserClients.has(socket.id)) {
      UserClients.delete(socket.id);

      broadcastPlayerPresence();
    }
  });

  assignListeners(socket);
}

export function assignListeners(socket: Socket) {
  console.log(`assignListeners: Assigning listeners for socket ${socket.id}`);

  const entries = Object.entries(ListenStore);

  for (let i = 0; i < entries.length; i++) {
    socket.on(entries[i][0], (...args: any[]) => {
      try {
        entries[i][1](socket, ...args);
      } catch {
        console.log(`assignListeners: ${entries[i][0]}: Unable to execute`);
      }
    });
  }
}

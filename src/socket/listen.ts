import { ListenStore } from "./store";
import { clients } from "./../clients/main";
import { Socket } from "socket.io";
import { registerClient, removeClient } from "../clients/main";

export function socketListen(socket: Socket) {
  registerClient(socket.id);

  socket.emit("connected", socket.id, clients);

  socket.on("disconnect", () => {
    removeClient(socket.id);
  });

  assignListeners(socket);
}

export function assignListeners(socket: Socket) {
  const entries = Object.entries(ListenStore);

  for (let i = 0; i < entries.length; i++) {
    socket.on(entries[i][0], (...args: any[]) => {
      try {
        entries[i][1](...args);
      } catch {
        console.log(`socketListen: Unable to execute ${entries[i][0]} (${i})`);
      }
    });
  }
}

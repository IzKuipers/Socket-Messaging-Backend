import { clients } from "./../clients/main";
import { Socket } from "socket.io";
import { registerClient, removeClient } from "../clients/main";

export function socketListen(socket: Socket) {
  registerClient(socket.id);

  socket.emit("connected", socket.id, clients);

  socket.on("disconnect", () => {
    removeClient(socket.id);
  });
}

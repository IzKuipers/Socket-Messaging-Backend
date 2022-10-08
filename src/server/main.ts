import { Server } from "socket.io";
import { socketListen } from "../socket/listen";

export let server: Server;

export function startServer(port?: number) {
  server = new Server(port || 3000, { cors: { origin: "*" } });

  server.on("connection", socketListen);
}

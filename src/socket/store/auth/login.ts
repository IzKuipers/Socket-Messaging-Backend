import { UserClients } from "./../../../user/clients";
import { Socket } from "socket.io";
import { authorize } from "../../../user/auth";
import { ListenCb } from "../../store";

export default async function (
  socket: Socket,
  user: string,
  pswd: string,
  cb: ListenCb
) {
  let isLoggedIn = false;

  for (const client of UserClients) {
    if (client[1] == user) isLoggedIn = true;
  }

  if (isLoggedIn) return cb(false);

  cb(await authorize(socket, user, pswd));
}

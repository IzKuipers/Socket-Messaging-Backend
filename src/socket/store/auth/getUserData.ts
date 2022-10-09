import { Socket } from "socket.io";
import { Player } from "./../../../user/interface";
import { getUser } from "../../../user/db";
import { authorize } from "../../../user/auth";

export default async function (
  socket: Socket,
  username: string,
  password: string,
  cb: (user: Player | null | false) => void
) {
  const auth = await authorize(socket, username, password);

  if (!auth) {
    cb(false);
    return;
  }

  cb(await getUser(username, true));
}

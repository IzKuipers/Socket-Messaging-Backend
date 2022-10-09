import { Socket } from "socket.io";
import { createUser } from "../../../user/auth";
import { ListenCb } from "./../../store";
export default async function (
  _: Socket,
  user: string,
  pswd: string,
  cb: ListenCb
) {
  cb(await createUser(user, pswd));
}

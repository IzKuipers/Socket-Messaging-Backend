import { createUser } from "../../../user/auth";
import { ListenCb } from "./../../store";
export default async function (user: string, pswd: string, cb: ListenCb) {
  cb(await createUser(user, pswd));
}

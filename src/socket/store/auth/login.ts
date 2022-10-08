import { authorize } from "../../../user/auth";
import { ListenCb } from "../../store";

export default async function (user: string, pswd: string, cb: ListenCb) {
  cb(await authorize(user, pswd));
}

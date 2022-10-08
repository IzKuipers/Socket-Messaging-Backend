import { Player } from "./../../../user/interface";
import { getUser } from "../../../user/db";
import { authorize } from "../../../user/auth";

export default async function (
  username: string,
  password: string,
  cb: (user: Player | null | false) => void
) {
  const auth = await authorize(username, password);

  if (!auth) {
    cb(false);
    return;
  }

  cb(await getUser(username));
}

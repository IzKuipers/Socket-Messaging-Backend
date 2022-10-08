import { authorize, createUser } from "../user/auth";

export type ListenCb = (valid: boolean) => void;

export const ListenStore: {
  [key: string]: (...args: any[]) => void;
} = {
  login: async (user: string, pswd: string, cb: ListenCb) => {
    cb(await authorize(user, pswd));
  },
  createUser: async (user: string, pswd: string, cb: ListenCb) => {
    cb(await createUser(user, pswd));
  },
};

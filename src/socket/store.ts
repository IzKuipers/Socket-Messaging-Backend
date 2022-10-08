import createUser from "./store/auth/createUser";
import getUserData from "./store/auth/getUserData";
import login from "./store/auth/login";

export type ListenCb = (valid: boolean) => void;
export type Listener = (...args: any[]) => void;
export type ListenStoreType = { [key: string]: Listener };

export const ListenStore: ListenStoreType = {
  login,
  createUser,
  getUserData,
};

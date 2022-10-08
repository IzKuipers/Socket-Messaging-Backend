import { argon2i, hash } from "argon2";

export async function createPassword(password: string) {
  return await hash(password, {
    type: argon2i,
    memoryCost: 2 ** 10,
    timeCost: 4,
    hashLength: 32,
  });
}

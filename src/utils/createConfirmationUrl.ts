import { v4 } from "uuid";
import { redis } from "../redis";
import { CONFIRM_USER_PREFIX } from "../constants/redisPrefixes";

export const createConfirmationUrl = async (userId: string) => {
  const token = v4();
  await redis.set(`${CONFIRM_USER_PREFIX}${token}`, userId, "ex", 60 * 60 * 24); // 1 day
  console.log( `http://localhost:4000/user/confirm/${token}`)
  return `http://localhost:4000/user/confirm/${token}`;
};

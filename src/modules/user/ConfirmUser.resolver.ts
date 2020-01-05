import { Resolver, Mutation, Arg } from "type-graphql";

import { redis } from "../../redis";
import { User } from "../../entity/User";
import { CONFIRM_USER_PREFIX } from "../../constants/redisPrefixes";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string): Promise<boolean> {
    const userId = await redis.get(CONFIRM_USER_PREFIX + token);

    if (!userId) {
      return false;
    }

    await User.update({ id: userId }, { confirmed: true });
    await redis.del(CONFIRM_USER_PREFIX + token);

    return true;
  }
}

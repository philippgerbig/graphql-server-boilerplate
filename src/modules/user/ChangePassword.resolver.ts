
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import argon2 from "argon2";

import { User } from "../../entity/User";
import { redis } from "../../redis";
import { FORGOT_PASSWORD_PREFIX } from "../../constants/redisPrefixes";
import { ChangePasswordInput } from "./changePassword/ChangePasswordInput";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("data")
    { token, password }: ChangePasswordInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const userId = await redis.get(FORGOT_PASSWORD_PREFIX + token);

    if (!userId) {
      return null;
    }

    const user = await User.findOne(userId);

    if (!user) {
      return null;
    }

    await redis.del(FORGOT_PASSWORD_PREFIX + token);

    user.password = await argon2.hash(password)

    await user.save();

    ctx.req.session!.userId = user.id;

    return user;
  }
}

import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import argon2 from "argon2";

import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";
import logger from '../../utils/logger'

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      logger.debug(`user ${email} not found`)
      return null;
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      logger.debug(`password invalid`)
      return null;
    }

    // TODO: return error that user is not confirmed
    if (!user.confirmed) {
      logger.debug(`user not confirmed`)
      return null;
    }

    ctx.req.session!.userId = user.id;

    return user;
  }
}

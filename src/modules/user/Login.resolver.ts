import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import argon2 from "argon2";

import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";

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
      return null;
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return null;
    }

    // TODO: return error that user is not confirmed
    if (!user.confirmed) {
      return null;
    }

    ctx.req.session!.userId = user.id;

    return user;
  }
}

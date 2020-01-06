import { Resolver, Query, Ctx } from "type-graphql";

import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";
import { AuthenticationError } from "apollo-server-express";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      throw new AuthenticationError('User is not authenticated');
    }

    return User.findOne(ctx.req.session!.userId);
  }
}

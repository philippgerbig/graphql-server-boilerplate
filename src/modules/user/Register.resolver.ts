import { Resolver, Mutation, Query, Arg, UseMiddleware } from 'type-graphql'
import argon2 from 'argon2'
import { User } from '../../entity/User'
import { RegisterInput } from './register/RegisterInput'
import { isAuth } from '../middleware/isAuth'
import { logger } from '../middleware/logger'
import { createConfirmationUrl } from '../../utils/createConfirmationUrl'
import { sendEmail } from '../../utils/sendEmail'

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth, logger)
  @Query(() => String)
  async hello() {
    return 'hi'
  }

  @Mutation(() => User)
  async register(@Arg("data")
  {
    email,
    firstName,
    lastName,
    password
  }: RegisterInput): Promise<User> {
    const hashedPassword = await argon2.hash(password)

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save()

    await sendEmail(email, await createConfirmationUrl(user.id));

    return user
  }
}

import { RegisterInput } from "./register/RegisterInput";
import { User } from "../../entity/User";
import {createResolver} from '../../utils/createResolver'

export const CreateUserResolver = createResolver(
  "User",
  User,
  RegisterInput,
  User
);

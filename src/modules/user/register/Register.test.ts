import { Connection } from "typeorm";
import faker from "faker";

import { testConnection } from "../../../test-utils/testConnection";
import { gCall } from "../../../test-utils/gCall";
import { User } from "../../../entity/User";
import { redis } from "../../../redis";

let conn: Connection;
beforeAll(async () => {
  conn = await testConnection();

  if (redis.status == "end") {
    await redis.connect();
  }
});
afterAll(async () => {
  await conn.close();
  redis.disconnect();
});

const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe("Register", () => {
  const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  it("creates user", async () => {
    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    });

    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`
        }
      }
    });
  });

  it("db user is matching and is not confirmed", async () => {
    const dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.confirmed).toBeFalsy();
    expect(dbUser!.firstName).toBe(user.firstName);
    expect(dbUser!.lastName).toBe(user.lastName);
  })
});

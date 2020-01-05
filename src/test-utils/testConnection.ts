import { createConnection } from "typeorm"

export const testConnection = (drop: boolean = false) => {
  return createConnection(
    {
      "name": "default",
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "philippgerbig",
      "password": "",
      "database": "type-graphql",
      "synchronize": drop,
      "logging": drop,
      "entities": [
        "src/entity/*.*"
      ]
    }
  )
}

# graphql-server-boilerplate
A graphql server boilerplate with apollo-server and typeorm.

---

- [Requirements](#requirements)
- [Installation](#installation)

---

## Requirements

* NodeJS ([installation instructions](https://nodejs.org/en/download/))
* PostgreSQL ([installation instructions](https://www.postgresql.org/download/))
* Redis ([installation instructions](https://redis.io/download))

## Installation

1. Ensure that you have the required software installed.
2. Clone this repository.
3. Install the dependencies using `npm install` or `yarn`.
4. Create a file named `.env` and fill it with the required environment variables (see `.env-example` for an example).
5. Create a file named `ormconfig.json` and fill it with your credentials (username, password, db etc.; see `ormconfig.example.json` for an example).
6. Run the application using `npm run start` or `yarn start`

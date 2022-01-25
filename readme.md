# Volvo Backend assignment

Graphql project for the Volvo backend assignment

## Installation

Use the package manager [yarn](https://yarnpkg.com/) to install the dependencies.

```bash
yarn
```

Create a file named `.env` on the root directory. You can copy the `.env.example`

```bash
cp .env.example .env
```

## Usage

To start the project:
```bash
yarn start:dev
```

There is a postman file in the `docs` folder, you can import this file and use all queries/mutations.
In this file, you can see the endpoint and the test credentials as well.

Tests
```bash
yarn test # run once time
yarn test:watch # watch the editions
yarn test:coverage # generate coverage files
```
## Storage
By default, the system is using sqlite storage. This is not a reliable solution for production, but it is just a simple way to use the ORM.

## Login
For seller endpoint restrictions, you need to generate a new token using the login mutation. You need to copy this token and use it as an Authorization parameter on restricted queries/mutations.

## Improvments
 - Create a docker image with docker-compose to run the project locally
 - Create migration files instead of sync option in ORM config
 - Create pipeline
 - Create some cache layer in Graphql
 - Creates a real login service, instead of fake login
 - Improve the test coverage


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

Then you can see the project running on http://localhost:4000/

Tests
```bash
yarn test # run once time
yarn test:watch # watch the editions
yarn test:coverage # generate coverage files
```
## Storage
By default, the system is using sqlite storage. This is not a reliable solution for production, but it is just a simple way to use the ORM.

## Improvments
 - Create a docker image with docker-compose to run the project locally
 - Create migration files instead of sync option in ORM config
 - Create pipeline
 - Create some cache layer in Graphql
 - Use [data-loader](https://github.com/graphql/dataloader) to avoid n+1 problem on Graphql


